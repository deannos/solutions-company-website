import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import LoginDialog from "@/components/auth/LoginDialog";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";

// What We Do pages
import WhatWeDo from "@/pages/what-we-do/WhatWeDo";
import Industries from "@/pages/what-we-do/industries/Industries";
import Banking from "@/pages/what-we-do/industries/Banking";
import Services from "@/pages/what-we-do/services/Services";

// Who We Are pages
import WhoWeAre from "@/pages/who-we-are/WhoWeAre";

// Insights pages
import Insights from "@/pages/insights/Insights";

// Careers pages
import Careers from "@/pages/careers/Careers";

// Newsroom pages
import Newsroom from "@/pages/newsroom/Newsroom";

// Investors pages
import Investors from "@/pages/investors/Investors";

// Contact pages
import Contact from "@/pages/contact/Contact";

// Admin pages
import ContactMessages from "@/pages/admin/ContactMessages";
import Dashboard from "@/pages/admin/Dashboard";
import Analytics from "@/pages/admin/Analytics";
import Users from "@/pages/admin/Users";

function Router() {
  return (
    <Switch>
      {/* Main routes */}
      <Route path="/" component={Home} />

      {/* What We Do routes */}
      <Route path="/what-we-do" component={WhatWeDo} />
      <Route path="/what-we-do/industries" component={Industries} />
      <Route path="/what-we-do/industries/banking" component={Banking} />
      <Route path="/what-we-do/services" component={Services} />

      {/* Who We Are routes */}
      <Route path="/who-we-are" component={WhoWeAre} />

      {/* Insights routes */}
      <Route path="/insights" component={Insights} />

      {/* Careers routes */}
      <Route path="/careers" component={Careers} />

      {/* Newsroom routes */}
      <Route path="/newsroom" component={Newsroom} />

      {/* Investors routes */}
      <Route path="/investors" component={Investors} />

      {/* Contact routes */}
      <Route path="/contact" component={Contact} />

      {/* Admin routes */}
      <ProtectedRoute path="/admin" component={Dashboard} />
      <ProtectedRoute
        path="/admin/contact-messages"
        component={ContactMessages}
      />
      <ProtectedRoute path="/admin/analytics" component={Analytics} />
      <ProtectedRoute path="/admin/users" component={Users} />

      {/* 404 fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <LoginDialog />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
