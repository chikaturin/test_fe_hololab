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
import { type Role } from "@/services/role.service";

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
              size="sm"
              onClick={() => onEdit(role)}
              className="h-8 w-8 p-0 "
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(role._id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              disabled={role.usersCount > 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm">{role.roleType}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Users:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {role.usersCount}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Permissions:</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            {role.permissionsCount}
          </Badge>
        </div>
        <div className="pt-2">
          <span className="text-xs text-muted-foreground">
            Key Permissions:
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {role.keyPermissions.slice(0, 5).map((permId) => {
              return <Badge key={permId}>{permId}</Badge>;
            })}
            {role.keyPermissions.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{role.keyPermissions.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
