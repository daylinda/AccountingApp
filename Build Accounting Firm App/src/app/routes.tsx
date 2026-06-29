import { createHashRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { HomePage } from "./pages/HomePage";
import { ClientPortfolioPage } from "./pages/ClientPortfolioPage";
import { ChecklistPage } from "./pages/ChecklistPage";
import { ReportsPage } from "./pages/ReportsPage";
import { ChatPage } from "./pages/ChatPage";

export const router = createHashRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "portfolio", Component: ClientPortfolioPage },
      { path: "checklist", Component: ChecklistPage },
      { path: "reports", Component: ReportsPage },
      { path: "chat", Component: ChatPage },
    ],
  },
]);
