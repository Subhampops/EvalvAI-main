"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  FileText,
  Activity,
  TrendingUp,
  Settings,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Database,
  Cpu,
  HardDrive,
  Zap,
  Eye,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Mock Tests Taken",
      value: "8,492",
      change: "+23.1%",
      trend: "up",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      avatar: "/placeholder.svg",
      status: "active",
      joinDate: "2024-12-15",
      testsCompleted: 12,
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      avatar: "/placeholder.svg",
      status: "active",
      joinDate: "2024-12-14",
      testsCompleted: 8,
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      avatar: "/placeholder.svg",
      status: "inactive",
      joinDate: "2024-12-13",
      testsCompleted: 5,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      avatar: "/placeholder.svg",
      status: "active",
      joinDate: "2024-12-12",
      testsCompleted: 15,
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      avatar: "/placeholder.svg",
      status: "pending",
      joinDate: "2024-12-11",
      testsCompleted: 3,
    },
  ]

  const systemMetrics = [
    { name: "CPU Usage", value: 45, icon: Cpu, color: "bg-blue-500" },
    { name: "Memory", value: 68, icon: HardDrive, color: "bg-purple-500" },
    { name: "Database", value: 32, icon: Database, color: "bg-green-500" },
    { name: "API Load", value: 78, icon: Zap, color: "bg-orange-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      user: "Rahul Sharma",
      action: "Completed Mock Interview",
      time: "5 minutes ago",
      type: "success",
    },
    {
      id: 2,
      user: "Priya Patel",
      action: "Uploaded Resume",
      time: "12 minutes ago",
      type: "info",
    },
    {
      id: 3,
      user: "System",
      action: "Database Backup Completed",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 4,
      user: "Amit Kumar",
      action: "Failed Login Attempt",
      time: "2 hours ago",
      type: "warning",
    },
    {
      id: 5,
      user: "Sneha Reddy",
      action: "Generated 20 Questions",
      time: "3 hours ago",
      type: "info",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your EvalvAI platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users, tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white dark:bg-slate-800"
                />
              </div>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${stat.trend === "up" ? "bg-green-500" : "bg-red-500"
                  }`}
              />
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-900 p-1 shadow-md">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Activity className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Clock className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage and monitor all platform users</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Users className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Tests Completed</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "inactive"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              user.status === "active"
                                ? "bg-green-500 hover:bg-green-600"
                                : ""
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {user.joinDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {user.testsCompleted}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="h-4 w-4 mr-2" />
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Test Performance</CardTitle>
                  <CardDescription>Average scores by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["DSA", "Quant", "Reasoning", "Behavioral", "System Design"].map(
                      (category, index) => (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{category}</span>
                            <span className="text-muted-foreground">
                              {75 + index * 5}%
                            </span>
                          </div>
                          <Progress value={75 + index * 5} className="h-2" />
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systemMetrics.map((metric) => (
                <Card key={metric.name} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                      <metric.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold">{metric.value}%</span>
                        <span className="text-sm text-muted-foreground mb-1">utilization</span>
                      </div>
                      <Progress value={metric.value} className={`h-3 ${metric.color}`} />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Operating normally
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={`p-2 rounded-full ${activity.type === "success"
                              ? "bg-green-100 dark:bg-green-950"
                              : activity.type === "warning"
                                ? "bg-orange-100 dark:bg-orange-950"
                                : "bg-blue-100 dark:bg-blue-950"
                            }`}
                        >
                          {activity.type === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : activity.type === "warning" ? (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          ) : (
                            <Activity className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.user}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
