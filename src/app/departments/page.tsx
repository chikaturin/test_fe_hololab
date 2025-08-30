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
  useUpdateDepartment,
} from "@/hooks/use-departments";
import {
  type Department,
  type SendDepartment,
} from "@/services/department.service";
import Spinner from "@/components/layout/spinner";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DepartmentsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([]);

  const { data: departmentsData, isLoading } = useGetAllDepartment();
  const { mutate: createDepartment } = useCreateDepartment();
  const { mutate: updateDepartment } = useUpdateDepartment();

  const handleSubmit = (formData: SendDepartment) => {
    if (editingDepartment) {
      updateDepartment({ id: editingDepartment._id, data: formData });
    } else {
      createDepartment(formData);
    }
  };

  useEffect(() => {
    if (!departmentsData) return;
    type DeptPayload = Department[] | { data: Department[] };
    const payload = departmentsData as DeptPayload;
    const list = Array.isArray(payload) ? payload : payload.data;
    setDepartments(list);
  }, [departmentsData]);

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
    <ProtectedRoute>
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

            {showAddForm && (
              <DepartmentForm
                department={editingDepartment}
                onCancel={resetForm}
                onSubmit={handleSubmit}
              />
            )}

            <div className="gr_id gr_id-cols-1 md:gr_id-cols-2 lg:gr_id-cols-2">
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
    </ProtectedRoute>
  );
}
