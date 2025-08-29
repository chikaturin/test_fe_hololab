"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

interface Calendar28Props {
  id: string;
  value: string;
  onChange: (date: string) => void;
  kind?: "hire" | "dob";
  defaultToNow?: boolean;
}

export function Calendar28({
  id,
  value,
  onChange,
  kind,
  defaultToNow,
}: Calendar28Props) {
  const [open, setOpen] = React.useState(false);

  const derivedDate = React.useMemo(() => parseDate(value), [value]);
  const [month, setMonth] = React.useState<Date | undefined>(derivedDate);

  React.useEffect(() => {
    if (derivedDate) setMonth(derivedDate);
  }, [derivedDate]);

  const today = React.useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const { fromDate, toDate, disabled } = React.useMemo((): {
    fromDate: Date | undefined;
    toDate: Date | undefined;
    disabled: ((date: Date) => boolean) | undefined;
  } => {
    if (kind === "hire") {
      const start = today;
      return {
        fromDate: start,
        toDate: undefined,
        disabled: (date: Date) => date < start,
      };
    }
    if (kind === "dob") {
      const maxDob = new Date(today);
      maxDob.setFullYear(maxDob.getFullYear() - 18);
      return {
        fromDate: undefined,
        toDate: maxDob,
        disabled: (date: Date) => date > maxDob,
      };
    }
    return { fromDate: undefined, toDate: undefined, disabled: undefined };
  }, [kind, today]);

  React.useEffect(() => {
    if (defaultToNow && !value) {
      onChange(formatDate(today));
      setMonth(today);
    }
    if (kind === "dob" && !value) {
      const janFirst18 = new Date(today.getFullYear() - 18, 0, 1);
      onChange(formatDate(janFirst18));
      setMonth(janFirst18);
    }
  }, [defaultToNow, today, value, onChange, kind]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const next = e.target.value;
            const maybeDate = parseDate(next);
            if (maybeDate) {
              onChange(formatDate(maybeDate));
              setMonth(maybeDate);
            } else {
              onChange(next);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 "
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={derivedDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              fromDate={fromDate}
              toDate={toDate}
              disabled={disabled}
              onSelect={(date) => {
                const formatted = formatDate(date ?? undefined);
                onChange(formatted);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
