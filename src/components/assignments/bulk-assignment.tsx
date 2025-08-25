"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Building2, Shield } from "lucide-react";

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

interface BulkAssignmentProps {
  employees: Employee[];
  departments: Department[];
  roles: Role[];
  onEmployeeSelect: (employeeId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onBulkDepartmentAssign: (departmentValue: string) => void;
  onBulkRoleAssign: (roleValue: string) => void;
}

export function BulkAssignment({
  employees,
  departments,
  roles,
  onEmployeeSelect,
  onSelectAll,
  onBulkDepartmentAssign,
  onBulkRoleAssign,
}: BulkAssignmentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [bulkDepartment, setBulkDepartment] = useState("");
  const [bulkRole, setBulkRole] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || emp.department === selectedDepartment;
    const matchesRole = !selectedRole || emp.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const selectedEmployees = employees.filter((emp) => emp.selected);

  const getRoleLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Bulk Department Assignment
            </CardTitle>
            <CardDescription>
              Assign multiple employees to a department
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Department</Label>
              <Select value={bulkDepartment} onValueChange={setBulkDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.value}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => onBulkDepartmentAssign(bulkDepartment)}
              className="w-full"
              disabled={!bulkDepartment || selectedEmployees.length === 0}
            >
              Assign {selectedEmployees.length} Employee
              {selectedEmployees.length !== 1 ? "s" : ""}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Bulk Role Assignment
            </CardTitle>
            <CardDescription>
              Assign roles to multiple employees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Role</Label>
              <Select value={bulkRole} onValueChange={setBulkRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{role.name}</span>
                        <Badge
                          className={`text-xs ml-2 ${getRoleLevelColor(
                            role.level
                          )}`}
                        >
                          {role.level}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => onBulkRoleAssign(bulkRole)}
              className="w-full"
              disabled={!bulkRole || selectedEmployees.length === 0}
            >
              Assign {selectedEmployees.length} Employee
              {selectedEmployees.length !== 1 ? "s" : ""}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedDepartment || "all"}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.value}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedRole || "all"}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.value}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectAll(true)}
                className="flex-1"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectAll(false)}
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List for Bulk Selection */}
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Select Employees</CardTitle>
          <CardDescription>
            Choose employees for bulk assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50"
              >
                <Checkbox
                  checked={employee.selected || false}
                  onCheckedChange={(checked) =>
                    onEmployeeSelect(employee.id, checked as boolean)
                  }
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {employee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {employee.position}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{employee.departmentName}</Badge>
                      <Badge
                        className={getRoleLevelColor(
                          roles.find((r) => r.value === employee.role)?.level ||
                            "low"
                        )}
                      >
                        {employee.roleName}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
