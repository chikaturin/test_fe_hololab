"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Mail, Phone, Briefcase, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock employee data
const mockEmployees = [
  {
    id: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    department: "Information Technology",
    salary: 75000,
    startDate: "2023-01-15",
    status: "Active",
  },
  {
    id: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    phone: "+1 (555) 234-5678",
    position: "HR Manager",
    department: "Human Resources",
    salary: 85000,
    startDate: "2022-08-20",
    status: "Active",
  },
  {
    id: "EMP003",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 65000,
    startDate: "2023-03-10",
    status: "Active",
  },
  {
    id: "EMP004",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    position: "Financial Analyst",
    department: "Finance",
    salary: 70000,
    startDate: "2022-11-05",
    status: "On Leave",
  },
];

export function EmployeeList() {
  const [employees, setEmployees] = useState(mockEmployees);
  const { toast } = useToast();

  const handleEdit = (employeeId: string) => {
    // Navigate to edit page (will be implemented in next task)
    window.location.href = `/employees/edit/${employeeId}`;
  };

  const handleDelete = (employeeId: string, employeeName: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${employeeName}? This action cannot be undone.`
      )
    ) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
      toast(`${employeeName} has been removed from the system.`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "On Leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            On Leave
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Employee Directory</span>
          <Badge variant="secondary" className="text-sm">
            {employees.length} Total Employees
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No employees found</p>
              <p className="text-sm">
                Start by adding your first employee to the system.
              </p>
            </div>
            <Button asChild className="mt-4">
              <a href="/employees/add">Add First Employee</a>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {employee.id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {employee.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {employee.phone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{employee.position}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatSalary(employee.salary)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(employee.startDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(employee.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              employee.id,
                              `${employee.firstName} ${employee.lastName}`
                            )
                          }
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
