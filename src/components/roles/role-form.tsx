"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { type Role, type updateRole } from "@/services/role.service";
import { useGetAllPermissions } from "@/hooks/use-permission";
import { Permission } from "@/services/permission.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateRole } from "@/hooks/use-roles";
import Link from "next/link";

interface RoleFormProps {
  role?: Role | null;
  onCancel: () => void;
}

export function RoleForm({ role, onCancel }: RoleFormProps) {
  const { data: availablePermissions } = useGetAllPermissions();
  const { mutate: updateRole } = useUpdateRole(role?._id || "");
  const [formData, setFormData] = useState<updateRole>({
    name: role?.name || "",
    level: role?.level || ("low" as "low" | "medium" | "high"),
    permissions: role?.keyPermissions || [],
  });

  useEffect(() => {
    if (role && availablePermissions) {
      const permissionIds =
        role.keyPermissions
          ?.map((permissionName) => {
            // Tách permissionName thành name và module
            const [name, module] = permissionName.split(".");

            const permission = availablePermissions.find(
              (p: Permission) => p.name === name && p.module === module
            );
            return permission?._id || permissionName;
          })
          .filter(Boolean) || [];

      setFormData({
        name: role.name || "",
        level: role.level || "low",
        permissions: permissionIds,
      });
    }
  }, [role, availablePermissions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRole(formData);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...new Set([...prev.permissions, permissionId])] // Remove duplicates
        : prev.permissions.filter((p) => p !== permissionId),
    }));
  };

  const groupedPermissions =
    availablePermissions?.reduce(
      (
        acc: Record<string, typeof availablePermissions>,
        permission: Permission
      ) => {
        if (!acc[permission.module]) {
          acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
      },
      {} as Record<string, typeof availablePermissions>
    ) || {};

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{role ? "Edit Role" : "Add New Role"}</CardTitle>
        <CardDescription>
          {role
            ? "Update role information and permissions"
            : "Define a new role with specific permissions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={role?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Access Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: value as "low" | "medium" | "high",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Access</SelectItem>
                  <SelectItem value="medium">Medium Access</SelectItem>
                  <SelectItem value="high">High Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="space-y-4">
              {Object.entries(groupedPermissions).map(
                ([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                      {(permissions as Permission[]).map(
                        (permission: Permission) => (
                          <div
                            key={permission._id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission._id}
                              checked={formData.permissions.includes(
                                permission._id
                              )}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(
                                  permission._id,
                                  checked as boolean
                                )
                              }
                              className=" border-1 border-primary"
                            />
                            <Label
                              htmlFor={permission._id}
                              className="text-sm font-normal"
                            >
                              {permission.name}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {role ? "Update Role" : "Add Role"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <Link href="/roles">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
