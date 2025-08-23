import React from "react";

export default function PWarning({ Context }: { Context: string }) {
  return <p className="text-sm text-red-500 w-full text-center">{Context}</p>;
}
