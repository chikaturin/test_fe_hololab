"use client";

import { useEffect, useState } from "react";
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
import { useGetAllStaff, useDeleteStaff } from "@/hooks/use-staffs";
import Spinner from "../layout/spinner";
import { Staff } from "@/services/staff.service";

export function StaffList() {
  const { data: staffData, isLoading } = useGetAllStaff();
  const [staffs, setStaff] = useState<Staff[]>([]);
  const { toast } = useToast();
  const { mutate: deleteStaff } = useDeleteStaff();
  useEffect(() => {
    if (!staffData) return;
    type StaffPayload = Staff[] | { data: Staff[] };
    const payload = staffData as unknown as StaffPayload;
    const list = Array.isArray(payload) ? payload : payload.data;
    setStaff(list);
  }, [staffData]);

  const handleEdit = (staffId: string) => {
    window.location.href = `/staffs/edit/${staffId}`;
  };

  const handleDelete = (staffId: string, staffName: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${staffName}? This action cannot be undone.`
      )
    ) {
      deleteStaff(staffId);
      setStaff((prev) => prev?.filter((emp) => emp._id !== staffId));
      toast(`${staffName} has been removed from the system.`);
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

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Employee Directory</span>
          <Badge variant="secondary" className="text-sm">
            {staffs?.length} Total Employees
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {staffs?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No staff found</p>
              <p className="text-sm">
                Start by adding your first staff to the system.
              </p>
            </div>
            <Button asChild className="mt-4">
              <a href="/staffs/add">Add First Employee</a>
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
                {staffs?.map((staff) => (
                  <TableRow key={staff._id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">
                          {staff.firstName} {staff.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {staff._id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {staff.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {staff.phone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{staff.jobTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{staff.departmentId.name}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatSalary(staff.salary)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(staff.hireDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge("Active")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(staff._id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              staff._id,
                              `${staff.firstName} ${staff.lastName}`
                            )
                          }
                          className="h-8 w-8 hover:bg-red-500 p-0 text-destructive hover:text-white"
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
