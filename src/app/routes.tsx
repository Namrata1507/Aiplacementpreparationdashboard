import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import SignInPage from "./pages/SignInPage";
import OnboardingPage from "./pages/OnboardingPage";
import AssessmentPage from "./pages/AssessmentPage";
import AssessmentResultsPage from "./pages/AssessmentResultsPage";
import DashboardPage from "./pages/DashboardPage";
import RoadmapPage from "./pages/RoadmapPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CompanyPrepPage from "./pages/CompanyPrepPage";
import ResourcesPage from "./pages/ResourcesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SignInPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/assessment",
    Component: AssessmentPage,
  },
  {
    path: "/assessment-results",
    Component: AssessmentResultsPage,
  },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { path: "dashboard", Component: DashboardPage },
      { path: "roadmap", Component: RoadmapPage },
      { path: "task/:taskId", Component: TaskDetailPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "companies", Component: CompanyPrepPage },
      { path: "resources", Component: ResourcesPage },
    ],
  },
]);