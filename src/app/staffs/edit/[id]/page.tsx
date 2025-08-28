import { EditEmployeeForm } from "@/components/staff/edit-staff-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EditEmployeePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEmployeePage({
  params,
}: EditEmployeePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="/staff"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Employees</span>
            </a>
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Edit Employee
            </h2>
            <p className="text-muted-foreground">
              Update employee information and save changes
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                Employee Information
              </CardTitle>
              <CardDescription>
                Modify the details below to update the employee profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditEmployeeForm employeeId={id} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
