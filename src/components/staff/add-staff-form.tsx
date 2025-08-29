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
import { User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetAllDepartment } from "@/hooks/use-departments";
import { useCreateStaff } from "@/hooks/use-staffs";
import { Department } from "@/services/department.service";
import { Calendar28 } from "@/components/ui/picker-date";
import { formatSalary } from "@/hooks/use-format-salary";
import { useRouter } from "next/navigation";

export function AddStaffForm() {
  const router = useRouter();
  const JOB_TITLES = [
    "Manager",
    "Team Lead",
    "Senior Engineer",
    "Software Engineer",
    "Intern",
    "HR",
    "IT Support",
  ];
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

  useEffect(() => {
    if (!formData.departmentId && departmentList?.[0]?._id) {
      setFormData((prev) => ({ ...prev, departmentId: departmentList[0]._id }));
    }
  }, [departmentList, formData.departmentId]);

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
        departmentId: departmentList?.[0]?._id ?? "",
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
                className="pl-10 bg-white  border-border focus:ring-2 focus:ring-ring"
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
                className="pl-10 bg-white  border-border focus:ring-2 focus:ring-ring"
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
                className="pl-10 bg-white  border-border focus:ring-2 focus:ring-ring"
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
                className="pl-10 bg-white  border-border focus:ring-2 focus:ring-ring"
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
              className="pl-10 bg-white  border-border focus:ring-2 focus:ring-ring min-h-[80px]"
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
              kind="dob"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hireDate" className="text-sm font-medium">
              Hire Date
            </Label>
            <div className="relative">
              <Calendar28
                id="hireDate"
                value={formData.hireDate}
                onChange={(value) => handleInputChange("hireDate", value)}
                kind="hire"
                defaultToNow
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </Label>
            <Select
              value={formData.jobTitle}
              onValueChange={(value) => handleInputChange("jobTitle", value)}
              required
            >
              <SelectTrigger className="bg-white border-border w-full focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TITLES.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <SelectTrigger className=" w-full border-border focus:ring-2 focus:ring-ring bg-white">
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
            value={formatSalary(formData.salary)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                salary: Number(e.target.value || 0),
              }))
            }
            className="bg-white"
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
          onClick={() => router.push("/staffs")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
