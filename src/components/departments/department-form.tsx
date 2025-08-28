"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Department } from "@/services/department.service";

interface DepartmentFormProps {
  department?: Department | null;
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
}

export function DepartmentForm({
  department,
  onSubmit,
  onCancel,
}: DepartmentFormProps) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && !e.shiftKey && target.tagName !== "TEXTAREA") {
      e.preventDefault();
      onSubmit(formData);
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
          <DialogDescription>
            {department
              ? "Update department information"
              : "Enter department details to create a new department"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Human Resources"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief description of department responsibilities..."
              rows={3}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {department ? "Update Department" : "Add Department"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
