import { Loader2Icon } from "lucide-react";
import React from "react";
import { Button } from "./button";

export default function ButtonLoading() {
  return (
    <Button variant="outline" className="w-full" disabled>
      <Loader2Icon className="animate-spin w-full" />
    </Button>
  );
}
