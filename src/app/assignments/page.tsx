"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck } from "lucide-react";
import { BulkAssignment } from "@/components/assignments/bulk-assignment";
import { IndividualAssignment } from "@/components/assignments/individual-assignment";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  departmentName: string;
  role: string;
  roleName: string;
  selected?: boolean;
}

interface Department {
  id: string;
  name: string;
  value: string;
}

interface Role {
  id: string;
  name: string;
  value: string;
  level: string;
}

export default function AssignmentsPage() {
  const departments: Department[] = [
    { id: "1", name: "Human Resources", value: "hr" },
    { id: "2", name: "Information Technology", value: "it" },
    { id: "3", name: "Finance & Accounting", value: "finance" },
    { id: "4", name: "Marketing", value: "marketing" },
    { id: "5", name: "Sales", value: "sales" },
    { id: "6", name: "Operations", value: "operations" },
  ];

  const roles: Role[] = [
    { id: "1", name: "Administrator", value: "admin", level: "high" },
    { id: "2", name: "Manager", value: "manager", level: "medium" },
    { id: "3", name: "HR Staff", value: "hr_staff", level: "medium" },
    { id: "4", name: "Employee", value: "employee", level: "low" },
    { id: "5", name: "Team Lead", value: "team_lead", level: "medium" },
    { id: "6", name: "Senior Staff", value: "senior_staff", level: "medium" },
  ];

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      position: "Software Engineer",
      department: "it",
      departmentName: "Information Technology",
      role: "employee",
      roleName: "Employee",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      position: "HR Manager",
      department: "hr",
      departmentName: "Human Resources",
      role: "manager",
      roleName: "Manager",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      position: "Marketing Specialist",
      department: "marketing",
      departmentName: "Marketing",
      role: "employee",
      roleName: "Employee",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      position: "Financial Analyst",
      department: "finance",
      departmentName: "Finance & Accounting",
      role: "senior_staff",
      roleName: "Senior Staff",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@company.com",
      position: "Sales Representative",
      department: "sales",
      departmentName: "Sales",
      role: "employee",
      roleName: "Employee",
    },
    {
      id: "6",
      name: "Lisa Garcia",
      email: "lisa.garcia@company.com",
      position: "Operations Manager",
      department: "operations",
      departmentName: "Operations",
      role: "manager",
      roleName: "Manager",
    },
  ]);

  const selectedEmployees = employees.filter((emp) => emp.selected);

  const handleSelectEmployee = (employeeId: string, selected: boolean) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employeeId ? { ...emp, selected } : emp))
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setEmployees((prev) => prev.map((emp) => ({ ...emp, selected })));
  };

  const handleBulkDepartmentAssign = (bulkDepartment: string) => {
    if (!bulkDepartment || selectedEmployees.length === 0) {
      console.log(
        "Invalid Selection: Please select employees and a department."
      );
      return;
    }

    const departmentName =
      departments.find((d) => d.value === bulkDepartment)?.name || "";

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.selected
          ? {
              ...emp,
              department: bulkDepartment,
              departmentName,
              selected: false,
            }
          : emp
      )
    );

    console.log(
      "Department Assignment Complete:",
      `${selectedEmployees.length} employees assigned to ${departmentName}.`
    );
  };

  const handleBulkRoleAssign = (bulkRole: string) => {
    if (!bulkRole || selectedEmployees.length === 0) {
      console.log("Invalid Selection: Please select employees and a role.");
      return;
    }

    const roleName = roles.find((r) => r.value === bulkRole)?.name || "";

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.selected
          ? {
              ...emp,
              role: bulkRole,
              roleName,
              selected: false,
            }
          : emp
      )
    );

    console.log(
      "Role Assignment Complete:",
      `${selectedEmployees.length} employees assigned ${roleName} role.`
    );
  };

  const handleIndividualAssignment = (
    employeeId: string,
    type: "department" | "role",
    value: string
  ) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          if (type === "department") {
            const departmentName =
              departments.find((d) => d.value === value)?.name || "";
            return { ...emp, department: value, departmentName };
          } else {
            const roleName = roles.find((r) => r.value === value)?.name || "";
            return { ...emp, role: value, roleName };
          }
        }
        return emp;
      })
    );

    const employee = employees.find((e) => e.id === employeeId);
    const assignmentName =
      type === "department"
        ? departments.find((d) => d.value === value)?.name
        : roles.find((r) => r.value === value)?.name;

    console.log(
      "Assignment Updated:",
      `${employee?.name} ${
        type === "department" ? "moved to" : "assigned"
      } ${assignmentName}.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <UserCheck className="h-8 w-8 text-primary" />
                Assignment Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Assign and manage employee departments and roles
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {employees.length} Total Employees
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <UserCheck className="h-3 w-3" />
                {selectedEmployees.length} Selected
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="bulk" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bulk">Bulk Assignment</TabsTrigger>
              <TabsTrigger value="individual">
                Individual Assignment
              </TabsTrigger>
            </TabsList>

            {/* Bulk Assignment Tab */}
            <TabsContent value="bulk">
              <BulkAssignment
                employees={employees}
                departments={departments}
                roles={roles}
                onEmployeeSelect={handleSelectEmployee}
                onSelectAll={handleSelectAll}
                onBulkDepartmentAssign={handleBulkDepartmentAssign}
                onBulkRoleAssign={handleBulkRoleAssign}
              />
            </TabsContent>

            {/* Individual Assignment Tab */}
            <TabsContent value="individual">
              <IndividualAssignment
                employees={employees}
                departments={departments}
                roles={roles}
                onIndividualAssignment={handleIndividualAssignment}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
