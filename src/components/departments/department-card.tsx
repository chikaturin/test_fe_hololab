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
import { Edit, Users } from "lucide-react";
import { Department } from "@/services/department.service";

interface DepartmentCardProps {
  department: Department;
  onEdit: (department: Department) => void;
}

export function DepartmentCard({ department, onEdit }: DepartmentCardProps) {
  return (
    <Card className="shadow-lg border-1 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow mb-3">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">
            {department.name}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(department)}
              className="h-8 w-8 p-0 hover:bg-primary"
            >
              <Edit className="h-4 w-4 " />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(department._id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
        <CardDescription className="text-sm">
          {department.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Manager:</span>
            <span className="text-sm font-medium">{department.manager}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Employees:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {department.staffCount}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
