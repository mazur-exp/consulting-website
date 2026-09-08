import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./hooks/useLanguage";
import Gate from "./pages/gate";
import CountryPage from "./pages/country";
import CasePage from "./pages/case";
import NotFound from "@/pages/not-found";
import AboutPage from "./pages/about";
import AnswersHirePage from "./pages/answers-hire";
import AnswersVsAggregatorsPage from "./pages/answers-vs-aggregators";
import AnswersAdsNotWorkingPage from "./pages/answers-ads-not-working";
import MethodPage from "./pages/method";
import { COUNTRY_ORDER, pathForCountry } from "./config/countries";
import { getCaseBySlug } from "./config/case-studies";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Gate} />
      {COUNTRY_ORDER.map((code) => (
        <Route key={code} path={pathForCountry(code)}>
          <CountryPage code={code} />
        </Route>
      ))}
      <Route path="/about" component={AboutPage} />
      <Route
        path="/answers/grabfood-gofood-account-management"
        component={AnswersHirePage}
      />
      <Route
        path="/answers/delivery-agency-vs-klikit-deliverect"
        component={AnswersVsAggregatorsPage}
      />
      <Route path="/answers/grabfood-ads-not-working" component={AnswersAdsNotWorkingPage} />
      <Route path="/method" component={MethodPage} />
      <Route path="/cases/:slug">
        {(params) => <CasePage caseStudy={getCaseBySlug(params.slug)} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
