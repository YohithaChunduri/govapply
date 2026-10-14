import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { JobsPage } from "./pages/JobsPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { ApplicationBuilderPage } from "./pages/ApplicationBuilderPage";
import { ApplicationStatusPage } from "./pages/ApplicationStatusPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { HelpPage } from "./pages/HelpPage";

const MainRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Initialize path from window.location
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Protected Route Guards
  const protectedPaths = ["/dashboard", "/documents", "/profile", "/onboarding"];
  const isProtected = protectedPaths.some((p) => currentPath.startsWith(p)) || currentPath.startsWith("/apply");

  const renderPage = () => {
    if (isProtected && !isAuthenticated) {
      return <LoginPage onNavigate={navigate} />;
    }

    if (currentPath === "/" || currentPath === "") {
      return <LandingPage onNavigate={navigate} />;
    }
    if (currentPath === "/jobs") {
      return <JobsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/jobs/")) {
      const jobId = currentPath.replace("/jobs/", "");
      return <JobDetailPage jobId={jobId} onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/apply/")) {
      const jobId = currentPath.replace("/apply/", "");
      return <ApplicationBuilderPage jobId={jobId} onNavigate={navigate} />;
    }
    if (currentPath === "/applications") {
      return <ApplicationStatusPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/applications/")) {
      const appId = currentPath.replace("/applications/", "");
      return <ApplicationStatusPage applicationId={appId} onNavigate={navigate} />;
    }
    if (currentPath === "/documents") {
      return <DocumentsPage onNavigate={navigate} />;
    }
    if (currentPath === "/dashboard") {
      return <DashboardPage onNavigate={navigate} />;
    }
    if (currentPath === "/profile") {
      return <ProfilePage onNavigate={navigate} />;
    }
    if (currentPath === "/onboarding") {
      return <OnboardingPage onNavigate={navigate} />;
    }
    if (currentPath === "/login") {
      return <LoginPage onNavigate={navigate} />;
    }
    if (currentPath === "/signup") {
      return <RegisterPage onNavigate={navigate} />;
    }
    if (currentPath === "/forgot-password") {
      return <ForgotPasswordPage onNavigate={navigate} />;
    }
    if (currentPath === "/help") {
      return <HelpPage />;
    }

    // Default Fallback
    return <LandingPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <ApplicationProvider>
          <MainRouter />
        </ApplicationProvider>
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
