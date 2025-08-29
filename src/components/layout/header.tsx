import { Building2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useGetCurrentUser } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header() {
  const { data: authData } = useGetCurrentUser();

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
          <div className="space-x-4 flex w-full items-center justify-end">
            {!authData ? (
              <Button size="lg" className="w-fit" asChild>
                <a href="/login">Login</a>
              </Button>
            ) : (
              <Avatar className="border">
                <AvatarFallback className="bg-primary text-white">
                  {authData?.email.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <Button size="lg" variant="outline" className="bg-white" asChild>
              <Link href="/">Start</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
