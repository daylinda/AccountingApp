import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Plus, Calendar, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  category: string;
  completed: boolean;
}

export function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Q1 Tax Filing - Acme Corp",
      description: "Complete and file quarterly tax returns",
      dueDate: "Mar 20, 2026",
      priority: "high",
      category: "Tax Filing",
      completed: false,
    },
    {
      id: 2,
      title: "Financial Audit - Tech Solutions",
      description: "Conduct annual financial audit",
      dueDate: "Mar 25, 2026",
      priority: "high",
      category: "Audit",
      completed: false,
    },
    {
      id: 3,
      title: "Payroll Processing - Global Enterprises",
      description: "Process bi-weekly payroll",
      dueDate: "Mar 19, 2026",
      priority: "medium",
      category: "Payroll",
      completed: false,
    },
    {
      id: 4,
      title: "Monthly Report - Innovation Labs",
      description: "Generate monthly financial report",
      dueDate: "Mar 31, 2026",
      priority: "medium",
      category: "Reporting",
      completed: false,
    },
    {
      id: 5,
      title: "Budget Review - Retail Plus",
      description: "Review and update quarterly budget",
      dueDate: "Mar 22, 2026",
      priority: "low",
      category: "Planning",
      completed: false,
    },
    {
      id: 6,
      title: "Invoice Review - Consulting Pro",
      description: "Review outstanding invoices",
      dueDate: "Mar 18, 2026",
      priority: "high",
      category: "Billing",
      completed: true,
    },
    {
      id: 7,
      title: "Expense Report - Acme Corp",
      description: "Categorize and process expense reports",
      dueDate: "Mar 15, 2026",
      priority: "low",
      category: "Expenses",
      completed: true,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Task Checklist</h2>
          <p className="text-gray-600">Track and manage your accounting tasks</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-semibold text-gray-900">{tasks.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900">{activeTasks.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{completedTasks.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Tasks ({activeTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-3">
            {activeTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No active tasks. Great job!</p>
                </CardContent>
              </Card>
            ) : (
              activeTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {task.dueDate}
                          </div>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-3">
            {completedTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No completed tasks yet.</p>
                </CardContent>
              </Card>
            ) : (
              completedTasks.map((task) => (
                <Card key={task.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-500 line-through">{task.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {task.dueDate}
                          </div>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
