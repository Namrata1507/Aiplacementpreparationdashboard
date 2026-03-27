import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import RoadmapPage from "./pages/RoadmapPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CompanyPrepPage from "./pages/CompanyPrepPage";
import ResourcesPage from "./pages/ResourcesPage";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "roadmap", Component: RoadmapPage },
      { path: "task/:taskId", Component: TaskDetailPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "companies", Component: CompanyPrepPage },
      { path: "resources", Component: ResourcesPage },
    ],
  },
]);