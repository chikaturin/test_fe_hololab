"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
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
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetAllDepartment } from "@/hooks/use-departments";
import { useCreateStaff } from "@/hooks/use-staffs";
import { Department } from "@/services/department.service";
import { Calendar28 } from "@/components/ui/picker-date";

export function AddStaffForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    address: "",
    departmentId: "",
    jobTitle: "",
    hireDate: "",
    email: "",
    password: "staff@123",
    salary: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: departments } = useGetAllDepartment();
  const { mutate: createStaff } = useCreateStaff();
  const departmentList = useMemo(() => {
    if (!departments) return [] as Department[];
    const payload = departments as Department[] | { data: Department[] };
    return Array.isArray(payload) ? payload : payload.data;
  }, [departments]);

  useEffect(() => {
    console.log(departments);
  }, [departments]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    createStaff(formData);

    setTimeout(() => {
      setIsLoading(false);
      toast(
        `${formData.firstName} ${formData.lastName} has been added to the system.`
      );
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
        departmentId: "",
        jobTitle: "",
        hireDate: "",
        password: "staff@123",
        salary: 0,
      });
    }, 1500);
  };

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
          Employment Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium">
              Date of Birth
            </Label>
            <Calendar28
              id="dob"
              value={formData.dob}
              onChange={(value) => handleInputChange("dob", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="jobTitle"
                type="text"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hireDate" className="text-sm font-medium">
              Hire Date
            </Label>
            <div className="relative">
              <Calendar28
                id="hireDate"
                value={formData.hireDate}
                onChange={(value) => handleInputChange("hireDate", value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department
            </Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("departmentId", value)
              }
              required
            >
              <SelectTrigger className="bg-input w-full border-border focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentList?.map((department: Department) => (
                  <SelectItem
                    key={department._id}
                    value={String(department._id)}
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Additional Information
        </h3>
        <div className="space-y-2">
          <Label htmlFor="salary" className="text-sm font-medium">
            Salary
          </Label>
          <Input
            id="salary"
            type="number"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                salary: Number(e.target.value || 0),
              }))
            }
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
          disabled={isLoading}
        >
          {isLoading ? "Adding Employee..." : "Add Employee"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
