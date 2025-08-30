import { Loader2Icon } from "lucide-react";
import React from "react";
import { Button } from "./button";

export default function ButtonLoading() {
  return (
    <Button variant="outline" disabled>
      <Loader2Icon className="animate-spin" />
    </Button>
  );
}
