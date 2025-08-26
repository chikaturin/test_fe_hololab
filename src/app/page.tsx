import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building2, Shield, UserCheck } from "lucide-react";
import Link from "next/link";

export default function ManagementPage() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl font-bold text-foreground">
            HRM Management Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access all your human resource management tools from one central
            location.
          </p>
        </div>

        {/* Management Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/employees" className="group">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Employee Management</CardTitle>
                <CardDescription className="text-center">
                  Add, edit, and manage employee profiles, personal information,
                  and employment details.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/departments" className="group">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Department Management</CardTitle>
                <CardDescription className="text-center">
                  Create and manage organizational departments, set budgets, and
                  assign managers.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/roles" className="group">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Role Management</CardTitle>
                <CardDescription className="text-center">
                  Define user roles, set permissions, and manage access levels
                  across the system.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/assignments" className="group">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                  <UserCheck className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Assignment Management</CardTitle>
                <CardDescription className="text-center">
                  Assign employees to departments and roles, manage bulk
                  assignments and transfers.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-sm text-muted-foreground">Departments</div>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-secondary">5</div>
            <div className="text-sm text-muted-foreground">Active Roles</div>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">12</div>
            <div className="text-sm text-muted-foreground">
              Recent Assignments
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
