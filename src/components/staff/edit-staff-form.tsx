"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
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
import { User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetStaffById, useUpdateStaff } from "@/hooks/use-staffs";
import { useGetAllDepartment } from "@/hooks/use-departments";
import { Department, SendDepartment } from "@/services/department.service";
import { formatSalary } from "@/hooks/use-format-salary";
import { useRouter } from "next/navigation";

interface EditStaffFormProps {
  staffId: string;
}

export function EditStaffForm({ staffId }: EditStaffFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    salary: "",
    jobTitle: "",
  });
  const [, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data, isLoading, error, isError } = useGetStaffById(staffId);
  const { mutate: updateStaff } = useUpdateStaff();
  const { data: departments } = useGetAllDepartment();
  const departmentList = useMemo(() => {
    if (!departments) return [] as Department[];
    const payload = departments as Department[] | { data: Department[] };
    return Array.isArray(payload) ? payload : payload.data;
  }, [departments]);

  useEffect(() => {
    const s = data;
    if (!s) return;
    setFormData({
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      email: s.email ?? "",
      phone: s.phone ?? "",
      address: s.address ?? "",
      department:
        (typeof (s as unknown as { department?: { _id?: string } }).department
          ?._id === "string"
          ? (s as unknown as { department?: { _id?: string } }).department?._id
          : undefined) ??
        (typeof s.departmentId === "string"
          ? (s.departmentId as unknown as string)
          : (s.departmentId as SendDepartment)?._id ?? ""),
      salary: String(s.salary ?? ""),
      jobTitle: s.jobTitle ?? "",
    });
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.department) {
      setIsSubmitting(false);
      toast.error("Vui lòng chọn phòng ban.");
      return;
    }

    updateStaff(
      {
        id: staffId,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          departmentId: formData.department,
          email: formData.email,
          salary: Number(formData.salary || 0),
        },
      },
      {
        onError: () => {
          toast.error("Failed to update staff");
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
          <p className="text-muted-foreground mt-4">Loading staff data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to Load staff Data
          </h3>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error
              ? error.message
              : "An error occurred while loading staff data"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter first name"
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
                placeholder="Enter last name"
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
                placeholder="Enter email address"
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
                placeholder="Enter phone number"
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
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring min-h-[80px]"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Staff Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange("department", value)}
              required
            >
              <SelectTrigger className="bg-input border-border w-full focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentList?.map((department) => (
                  <SelectItem key={department._id} value={department._id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-sm font-medium">
              Salary
            </Label>
            <div className="relative">
              <Input
                id="salary"
                type="number"
                placeholder={String(formatSalary(data?.salary ?? 0))}
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className=" bg-input border-border w-full focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
          disabled={isLoading}
        >
          {isLoading ? "Editing staff..." : "Edit staff"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => router.push("/staffs")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
