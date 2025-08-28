import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, Settings, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-destructive-foreground text-sm font-bold">
                    !
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              404 - Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We&apos;re sorry, but the page you are looking for does not exist
              or has been moved.
            </p>
          </div>

          {/* Navigation Suggestions */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Where would you like to go?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild className="h-auto p-4 flex-col space-y-2">
                  <a href="/management">
                    <Settings className="h-6 w-6" />
                    <span className="font-medium">Management Dashboard</span>
                    <span className="text-xs opacity-80">
                      Access all HRM features
                    </span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex-col space-y-2 bg-transparent"
                >
                  <a href="/staffs">
                    <Users className="h-6 w-6" />
                    <span className="font-medium">View staffs</span>
                    <span className="text-xs opacity-80">
                      Manage employee records
                    </span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex-col space-y-2 bg-transparent"
                >
                  <a href="/departments">
                    <Building2 className="h-6 w-6" />
                    <span className="font-medium">Departments</span>
                    <span className="text-xs opacity-80">
                      Organize by department
                    </span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
