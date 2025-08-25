"use client";

import type React from "react";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
  location: string;
  createdAt: string;
}

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
    manager: department?.manager || "",
    budget: department?.budget?.toString() || "",
    location: department?.location || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>
          {department ? "Edit Department" : "Add New Department"}
        </CardTitle>
        <CardDescription>
          {department
            ? "Update department information"
            : "Enter department details to create a new department"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="manager">Department Manager</Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, manager: e.target.value }))
                }
                placeholder="e.g., John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Annual Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, budget: e.target.value }))
                }
                placeholder="e.g., 250000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Floor 2, Building A"
                required
              />
            </div>
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
          <div className="flex gap-2">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {department ? "Update Department" : "Add Department"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
