"use client";

import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavigationProps {
  variant?: "default" | "minimal";
}

export function Navigation({ variant = "default" }: NavigationProps) {
  const pathname = usePathname();

  if (variant === "minimal") {
    return (
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                HRM System
              </Link>
            </h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary rounded-lg">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              HRM System
            </Link>
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button
            variant={pathname === "/employees" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href="/employees">Employees</Link>
          </Button>
          <Button
            variant={pathname === "/login" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            variant={pathname === "/register" ? "default" : "outline"}
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
