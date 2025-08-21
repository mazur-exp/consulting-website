# Delivery Booster - Growth Platform for Food Delivery

## Overview

Delivery Booster is a marketing services platform designed to help restaurants increase their orders and revenue on delivery platforms like GrabFood and GoFood in Southeast Asia (Bali and Thailand). The application provides audit services, menu optimization, promotional strategies, and performance analytics to boost restaurant visibility and sales without compromising profit margins.

The project is built as a modern full-stack web application with a React frontend and Express.js backend, featuring a bilingual interface (Russian/English) and a professional dark theme design optimized for the food delivery consulting industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **UI Components**: Radix UI primitives with shadcn/ui components for accessible, customizable interface elements
- **Animations**: Framer Motion for smooth page transitions and interactive animations
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for API development
- **Language**: TypeScript for full-stack type safety
- **Development**: Hot module replacement and middleware-based request handling
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: User management with username/password authentication structure
- **Migrations**: Automated schema migrations through drizzle-kit
- **Connection**: Neon Database serverless PostgreSQL for production scalability

### Internationalization
- **Languages**: Bilingual support for Russian and English markets
- **Implementation**: Custom React context-based translation system
- **Content**: All user-facing text supports both languages with fallback mechanisms

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit-specific development features
- **Error Handling**: Runtime error overlays and comprehensive error boundaries
- **Hot Reload**: Full-stack hot module replacement for rapid development cycles

## External Dependencies

### UI and Styling
- **Radix UI**: Complete suite of unstyled, accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Modern icon library with consistent design language

### Database and Backend
- **Neon Database**: Serverless PostgreSQL for scalable cloud database hosting
- **Drizzle ORM**: Lightweight, type-safe SQL ORM with excellent TypeScript integration
- **Express.js**: Minimal web framework for Node.js API development

### Development Tools
- **Vite**: Next-generation frontend build tool with plugin ecosystem
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Form and Data Management
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **TanStack React Query**: Powerful data synchronization for server state

### External Assets
- **Unsplash**: Professional stock photography for marketing content
- **Google Fonts**: Web fonts for typography (Inter font family)

## Deployment Configuration

### Production Build Process
The application uses a multi-step build process optimized for cloud deployment:

1. **Client Build**: Vite builds the React frontend to `dist/public` directory
2. **Server Build**: ESBuild compiles the Express server to `dist/index.js`
3. **Static File Setup**: Built client files are copied to `server/public` for production serving

### Cloud Run Compatibility
The server configuration has been optimized for Google Cloud Run deployment:

- **Host Binding**: Server listens on `0.0.0.0:PORT` for external access in containerized environments
- **Static File Serving**: Production mode serves built static files from the correct directory structure
- **Environment Variables**: Uses `PORT` environment variable with fallback to 5000

### Build Scripts
- **Development**: `npm run dev` - Starts development server with hot reload
- **Production Build**: `npm run build` - Builds both client and server for production
- **Production Start**: `npm run start` - Runs the built production server
- **Manual Build**: Use `./build-production.sh` for deployment preparation

### Deployment Requirements
1. Run `npm run build` to create production artifacts
2. Copy `dist/public` to `server/public` for static file serving compatibility  
3. Set `NODE_ENV=production` environment variable
4. Use `node dist/index.js` to start the production server

Date: August 21, 2025