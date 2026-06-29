import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users, ClipboardList, FileText, MessageSquare, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  const quickStats = [
    { label: "Active Clients", value: "48", icon: Users, color: "text-blue-600" },
    { label: "Pending Tasks", value: "12", icon: Clock, color: "text-orange-600" },
    { label: "Reports Due", value: "5", icon: FileText, color: "text-purple-600" },
    { label: "Completed Today", value: "8", icon: CheckCircle, color: "text-green-600" },
  ];

  const quickActions = [
    {
      title: "Client Portfolio",
      description: "View and manage all your clients",
      icon: Users,
      path: "/portfolio",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Checklist",
      description: "Track tasks and deadlines",
      icon: ClipboardList,
      path: "/checklist",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    {
      title: "Reports",
      description: "Generate and view financial reports",
      icon: FileText,
      path: "/reports",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
    {
      title: "Chat with Bot",
      description: "Get instant assistance and answers",
      icon: MessageSquare,
      path: "/chat",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Here's what's happening with your accounting firm today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(action.path)}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New client added", client: "Acme Corp", time: "2 hours ago", icon: Users },
              { action: "Report generated", client: "Tech Solutions Inc", time: "5 hours ago", icon: FileText },
              { action: "Checklist completed", client: "Q1 Tax Filing", time: "1 day ago", icon: CheckCircle },
              { action: "Payment received", client: "Global Enterprises", time: "2 days ago", icon: DollarSign },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="bg-gray-100 p-2 rounded-full">
                  <activity.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.client}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
