import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Language variants: bots do not run JS, so ?lang=id / ?lang=th must serve the
  // Bahasa or Thai snapshot rather than the English one. Prerender writes them to
  // public/lang-<code>/<route>.html; if the variant is missing we fall through
  // to the default snapshot below.
  app.use((req, res, next) => {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : '';
    if (!/^(id|ru|th)$/.test(lang)) return next();
    const clean = req.path.replace(/\/+$/, '') || '/index';
    const rel = (clean === '/index' ? '/index' : clean) + '.html';
    const candidate = path.resolve(distPath, `lang-${lang}`, '.' + rel);
    if (!candidate.startsWith(path.resolve(distPath, `lang-${lang}`))) return next();
    if (!fs.existsSync(candidate)) return next();
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(candidate);
  });

  // Serve prerendered snapshots explicitly, before express.static.
  // express.static's `extensions` option only kicks in when the path does not
  // exist at all — if a directory shares the snapshot's name (/answers is both
  // answers.html and the answers/ folder holding the individual answer pages)
  // it either redirects to the directory or falls through to the SPA shell, and
  // the page is silently wrong for bots and users alike. Checking <path>.html
  // first removes that whole class of collision.
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const clean = req.path.replace(/\/+$/, '');
    if (!clean || path.extname(clean)) return next();
    const candidate = path.resolve(distPath, '.' + clean + '.html');
    if (!candidate.startsWith(distPath)) return next();
    if (!fs.existsSync(candidate)) return next();
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(candidate);
  });

  app.use(express.static(distPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    redirect: false,
    // Serve prerendered snapshots: /th -> th.html, /cases/x -> cases/x.html
    extensions: ['html'],
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        // HTML snapshots must revalidate on every deploy (hashed assets change)
        res.setHeader('Cache-Control', 'no-cache');
      } else if (/\.(xml|txt)$/.test(filePath)) {
        // SEO files (sitemap.xml, robots.txt, llms.txt) must stay fresh so
        // Google/crawlers re-fetch them — never cache a sitemap for a year.
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
