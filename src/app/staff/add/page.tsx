import { AddEmployeeForm } from "@/components/staff/add-staff-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddEmployeePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="/employees"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Employees</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Add New Employee
            </h2>
            <p className="text-muted-foreground">
              Enter employee information to create a new profile
            </p>
          </div>

          {/* Add Employee Card */}
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                Employee Information
              </CardTitle>
              <CardDescription>
                Fill in the details below to add a new employee to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddEmployeeForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
