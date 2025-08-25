"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Edit, Trash2, Users, Settings } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: "low" | "medium" | "high";
  createdAt: string;
}

const availablePermissions = [
  {
    id: "view_employees",
    label: "View Employees",
    category: "Employee Management",
  },
  {
    id: "add_employees",
    label: "Add Employees",
    category: "Employee Management",
  },
  {
    id: "edit_employees",
    label: "Edit Employees",
    category: "Employee Management",
  },
  {
    id: "delete_employees",
    label: "Delete Employees",
    category: "Employee Management",
  },
  {
    id: "view_departments",
    label: "View Departments",
    category: "Department Management",
  },
  {
    id: "manage_departments",
    label: "Manage Departments",
    category: "Department Management",
  },
  { id: "view_roles", label: "View Roles", category: "Role Management" },
  { id: "manage_roles", label: "Manage Roles", category: "Role Management" },
  { id: "view_reports", label: "View Reports", category: "Reporting" },
  { id: "generate_reports", label: "Generate Reports", category: "Reporting" },
  {
    id: "system_settings",
    label: "System Settings",
    category: "Administration",
  },
  {
    id: "user_management",
    label: "User Management",
    category: "Administration",
  },
];

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

export function RoleCard({ role, onEdit, onDelete }: RoleCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {role.name}
            </CardTitle>
            <Badge className={`text-xs ${getLevelColor(role.level)}`}>
              {role.level.charAt(0).toUpperCase() + role.level.slice(1)} Access
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(role)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(role.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              disabled={role.userCount > 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm">
          {role.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Users:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {role.userCount}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Permissions:</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            {role.permissions.length}
          </Badge>
        </div>
        <div className="pt-2">
          <span className="text-xs text-muted-foreground">
            Key Permissions:
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {role.permissions.slice(0, 3).map((permId) => {
              const perm = availablePermissions.find((p) => p.id === permId);
              return perm ? (
                <Badge key={permId} variant="secondary" className="text-xs">
                  {perm.label}
                </Badge>
              ) : null;
            })}
            {role.permissions.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{role.permissions.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
