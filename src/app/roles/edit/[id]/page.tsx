"use client";

import { RoleForm } from "@/components/roles/role-form";
import React from "react";
import { useParams } from "next/navigation";
import { useGetRoleById } from "@/hooks/use-roles";

export default function EditRole() {
  const { id } = useParams();
  const { data: role } = useGetRoleById(id as string);
  return (
    <div className="min-h-screen px-20 mt-10 bg-gradient-to-br from-background via-card to-muted">
      <RoleForm role={role} onCancel={() => {}} />
    </div>
  );
}
