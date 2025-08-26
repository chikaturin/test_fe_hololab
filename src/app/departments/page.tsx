"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2 } from "lucide-react";
import { DepartmentForm } from "@/components/departments/department-form";
import { DepartmentCard } from "@/components/departments/department-card";

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

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Human Resources",
      description:
        "Manages employee relations, recruitment, and organizational development",
      manager: "Sarah Johnson",
      employeeCount: 8,
      budget: 250000,
      location: "Floor 2, Building A",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Information Technology",
      description:
        "Handles software development, system maintenance, and technical support",
      manager: "Michael Chen",
      employeeCount: 15,
      budget: 500000,
      location: "Floor 3, Building B",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Finance & Accounting",
      description:
        "Manages financial planning, budgeting, and accounting operations",
      manager: "Emily Rodriguez",
      employeeCount: 6,
      budget: 180000,
      location: "Floor 1, Building A",
      createdAt: "2024-01-20",
    },
  ]);

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (formData: unknown) => {
    if (editingDepartment) {
      const deptData = formData as Partial<Department>;
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingDepartment.id
            ? {
                ...dept,
                ...deptData,
                budget: Number.parseFloat(deptData.budget?.toString() || "0"),
              }
            : dept
        )
      );
      console.log(
        "Department Updated:",
        `${deptData.name} has been successfully updated.`
      );
      setEditingDepartment(null);
    } else {
      const deptData = formData as Partial<Department>;
      const newDepartment: Department = {
        id: Date.now().toString(),
        name: deptData.name || "New Department",
        description: deptData.description || "",
        manager: deptData.manager || "",
        budget: Number.parseFloat(deptData.budget?.toString() || "0"),
        location: deptData.location || "",
        employeeCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDepartments((prev) => [...prev, newDepartment]);
      console.log(
        "Department Added:",
        `${deptData.name} has been successfully created.`
      );
    }
    setShowAddForm(false);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const department = departments.find((d) => d.id === id);
    if (
      confirm(
        `Are you sure you want to delete ${department?.name}? This action cannot be undone.`
      )
    ) {
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
      console.log(
        "Department Deleted:",
        `${department?.name} has been successfully deleted.`
      );
    }
  };

  const resetForm = () => {
    setEditingDepartment(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-8 w-8 text-primary" />
                Department Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage organizational departments and their details
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-primary/90 w-fit"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search departments or managers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Department Form */}
          {showAddForm && (
            <DepartmentForm
              department={editingDepartment}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          )}

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No departments found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Get started by adding your first department."}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
