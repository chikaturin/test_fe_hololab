"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Briefcase, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetStaffById, useUpdateStaff } from "@/hooks/use-staffs";
import { SendDepartment } from "@/services/department.service";

interface EditEmployeeFormProps {
  employeeId: string;
}

export function EditEmployeeForm({ employeeId }: EditEmployeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    department: "",
    salary: "",
    startDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data, isLoading } = useGetStaffById(employeeId);
  const { mutate: updateStaff } = useUpdateStaff();

  useEffect(() => {
    const s = data;
    if (!s) return;
    setFormData({
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      email: s.email ?? "",
      phone: s.phone ?? "",
      address: s.address ?? "",
      position: s.jobTitle ?? "",
      department:
        typeof s.departmentId === "string"
          ? (s.departmentId as unknown as string)
          : (s.departmentId as SendDepartment)?._id ?? "",
      salary: String(s.salary ?? ""),
      startDate: s.hireDate ?? "",
      notes: "",
    });
  }, [data]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateStaff(
      {
        id: employeeId,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: "", // not present in form
          phone: formData.phone,
          address: formData.address,
          departmentId: formData.department,
          jobTitle: formData.position,
          hireDate: formData.startDate,
          email: formData.email,
          password: "", // not edited here
          salary: Number(formData.salary || 0),
        },
      },
      {
        onSuccess: () => {
          toast.success("Employee updated successfully");
        },
        onError: () => {
          toast.error("Failed to update employee");
        },
        onSettled: () => setIsSubmitting(false),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="firstName"
                type="text"
                placeholder={data?.firstName}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="lastName"
                type="text"
                placeholder={data?.lastName}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={data?.email}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder={data?.phone}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="address"
              placeholder={data?.address}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring min-h-[80px]"
              required
            />
          </div>
        </div>
      </div>

      {/* Employment Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Employment Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-sm font-medium">
              Position
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="position"
                type="text"
                placeholder={data?.jobTitle}
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange("department", value)}
              required
            >
              <SelectTrigger className="bg-input border-border focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-sm font-medium">
              Salary
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="salary"
                type="number"
                placeholder={String(data?.salary)}
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Additional Information
        </h3>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating Employee..." : "Update Employee"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => (window.location.href = "/staffs")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
