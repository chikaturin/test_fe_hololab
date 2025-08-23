import { ChartContextProps } from "@/types/ui/chart"
import * as React from "react"

export const ChartContext = React.createContext<ChartContextProps | null>(null)
