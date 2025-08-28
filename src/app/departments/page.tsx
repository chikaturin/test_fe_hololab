"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Building2 } from "lucide-react";
import { DepartmentForm } from "@/components/departments/department-form";
import { DepartmentCard } from "@/components/departments/department-card";
import {
  useGetAllDepartment,
  useCreateDepartment,
} from "@/hooks/use-departments";
import {
  type Department,
  type SendDepartment,
} from "@/services/department.service";
import Spinner from "@/components/layout/spinner";

export default function DepartmentsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([]);

  const { data: departmentsData, isLoading } = useGetAllDepartment();
  const { mutate: createDepartment } = useCreateDepartment();

  useEffect(() => {
    if (!departmentsData) return;
    type DeptPayload = Department[] | { data: Department[] };
    const payload = departmentsData as DeptPayload;
    const list = Array.isArray(payload) ? payload : payload.data;
    setDepartments(list);
  }, [departmentsData]);

  const handleSubmit = (formData: unknown) => {
    if (editingDepartment) {
      const deptData = formData as Partial<SendDepartment>;
      setDepartments((prev) =>
        prev.map((dept) =>
          dept._id === editingDepartment._id
            ? {
                ...dept,
                ...deptData,
              }
            : dept
        )
      );
      setEditingDepartment(null);
    } else {
      const deptData = formData as Partial<SendDepartment>;
      const newDepartment: SendDepartment = {
        name: deptData.name || "New Department",
        description: deptData.description || "",
      };
      createDepartment(newDepartment);
    }
    setShowAddForm(false);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setEditingDepartment(null);
    setShowAddForm(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
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

          {/* Add/Edit Department Form */}
          {showAddForm && (
            <DepartmentForm
              department={editingDepartment}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          )}

          {/* Departments Gr_id */}
          <div className="gr_id gr_id-cols-1 md:gr_id-cols-2 lg:gr_id-cols-3 gap-6">
            {departments.map((department, _idx) => (
              <DepartmentCard
                key={`${department._id ?? "dept"}-${_idx}`}
                department={department}
                onEdit={handleEdit}
              />
            ))}
          </div>

          {departments.length === 0 && (
            <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No departments found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get started by adding your first department.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary hover:bg-primary/90 w-fit"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
