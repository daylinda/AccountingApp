import { useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router";
import { Calculator, Home, Users, ClipboardList, FileText, MessageSquare, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AccounTech Pro</h1>
                <p className="text-xs text-gray-500">Professional Accounting Solutions</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="ghost" className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Pills */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button 
                variant={isActive("/portfolio") ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Client Portfolio</span>
              </Button>
            </Link>
            <Link to="/checklist">
              <Button 
                variant={isActive("/checklist") ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Checklist</span>
              </Button>
            </Link>
            <Link to="/reports">
              <Button 
                variant={isActive("/reports") ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </Button>
            </Link>
            <Link to="/chat">
              <Button 
                variant={isActive("/chat") ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Bot</span>
              </Button>
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}
