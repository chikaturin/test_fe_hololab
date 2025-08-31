"use client";

import { RoleForm } from "@/components/roles/role-form";
import React from "react";
import { useParams } from "next/navigation";
import { useGetRoleById } from "@/hooks/use-roles";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleBasedRoute } from "@/components/auth/role-based-route";

export default function EditRole() {
  const { id } = useParams();
  const { data: role } = useGetRoleById(id as string);

  return (
    <ProtectedRoute>
      <RoleBasedRoute requiredPermission="staff-management">
        <div className="min-h-screen px-20 mt-10 bg-gradient-to-br from-background via-card to-muted">
          <RoleForm role={role} onCancel={() => {}} />
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
