import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building2, Shield } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ManagementPage() {
  return (
    <ProtectedRoute>
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

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <Link href="/staffs" className="group">
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">staff Management</CardTitle>
                  <CardDescription className="text-center">
                    Add, edit, and manage staff profiles, personal information,
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
                  <CardTitle className="text-xl">
                    Department Management
                  </CardTitle>
                  <CardDescription className="text-center">
                    Create and manage organizational departments, set budgets,
                    and assign managers.
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
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
