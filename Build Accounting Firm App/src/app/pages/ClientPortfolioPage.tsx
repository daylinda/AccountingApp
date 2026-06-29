import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Mail, Phone, Building, TrendingUp } from "lucide-react";

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  revenue: string;
  lastContact: string;
}

export function ClientPortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const clients: Client[] = [
    {
      id: 1,
      name: "John Anderson",
      company: "Acme Corp",
      email: "john@acmecorp.com",
      phone: "(555) 123-4567",
      status: "active",
      revenue: "$125,000",
      lastContact: "Mar 15, 2026",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      company: "Tech Solutions Inc",
      email: "sarah@techsol.com",
      phone: "(555) 234-5678",
      status: "active",
      revenue: "$98,500",
      lastContact: "Mar 14, 2026",
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Global Enterprises",
      email: "mchen@globalent.com",
      phone: "(555) 345-6789",
      status: "pending",
      revenue: "$75,000",
      lastContact: "Mar 12, 2026",
    },
    {
      id: 4,
      name: "Emily Thompson",
      company: "Innovation Labs",
      email: "emily@innovlabs.com",
      phone: "(555) 456-7890",
      status: "active",
      revenue: "$156,000",
      lastContact: "Mar 16, 2026",
    },
    {
      id: 5,
      name: "David Wilson",
      company: "Retail Plus",
      email: "david@retailplus.com",
      phone: "(555) 567-8901",
      status: "inactive",
      revenue: "$42,000",
      lastContact: "Feb 28, 2026",
    },
    {
      id: 6,
      name: "Lisa Brown",
      company: "Consulting Pro",
      email: "lisa@consultpro.com",
      phone: "(555) 678-9012",
      status: "active",
      revenue: "$189,000",
      lastContact: "Mar 17, 2026",
    },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Client Portfolio</h2>
          <p className="text-gray-600">Manage and view all your clients</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search clients by name, company, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-semibold text-gray-900">{clients.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {clients.filter(c => c.status === "active").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$685.5K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="w-3 h-3 mr-1" />
                    {client.company}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {client.phone}
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold text-gray-900">{client.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Last Contact</span>
                    <span className="text-sm text-gray-900">{client.lastContact}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
