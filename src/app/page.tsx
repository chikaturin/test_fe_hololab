import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Shield, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Streamline Your Human Resource Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower your HR team with modern tools for employee management,
            recruitment, and organizational growth.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <a href="/register">Start Free Trial</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/employees">View Employees</a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>
                Comprehensive employee profiles, attendance tracking, and
                performance management.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Secure & Compliant</CardTitle>
              <CardDescription>
                Enterprise-grade security with GDPR compliance and role-based
                access control.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-secondary mb-2" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Powerful insights and customizable reports to drive data-driven
                HR decisions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
