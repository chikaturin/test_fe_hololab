import { Building2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">HRM System</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <a href="/login">Sign In</a>
            </Button>
            <Button asChild>
              <a href="/register">Get Started</a>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
