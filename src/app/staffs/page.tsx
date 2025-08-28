import { StaffList } from "@/components/staff/staff-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function StaffsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Staff Management
              </h2>
              <p className="text-muted-foreground">
                Manage your organization&apos;s staff profiles and information
              </p>
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit"
            >
              <a href="/staffs/add" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Staff</span>
              </a>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staffs by name, email, or position..."
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <StaffList />
        </div>
      </main>
    </div>
  );
}
