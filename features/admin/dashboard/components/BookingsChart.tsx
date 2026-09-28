"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import { CalendarCheck } from "lucide-react";
import type { IDashboardData } from "../types/type.dashboard";
import ChartCard from "./ChartCard";

interface BookingsChartProps {
  data: IDashboardData["bookings"];
}

const COLORS = {
  pending: "#F59E0B",
  completed: "#10B981",
};

export default function BookingsChart({ data }: BookingsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const chartData = [
    { name: "Pending", value: data.pending, key: "pending" },
    { name: "Completed", value: data.completed, key: "completed" },
  ].filter((d) => d.value > 0);

  const total = data.pending + data.completed;
  const completionRate =
    total > 0 ? Math.round((data.completed / total) * 100) : 0;

  return (
    <ChartCard
      title="Bookings Status"
      description={`${completionRate}% completion rate`}
      icon={CalendarCheck}
    >
      <figure
        role="img"
        aria-label={`Booking status chart: ${data.pending} pending, ${data.completed} completed`}
        className="relative"
      >
        <div className="relative h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                activeIndex={activeIndex}
                activeShape={(props: any) => (
                  <Sector {...props} outerRadius={props.outerRadius + 8} />
                )}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[entry.key as keyof typeof COLORS]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E4E7E2",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#1B1C1C]">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#8A9189]">
              Total
            </span>
          </div>
        </div>

        {/* Legend with values */}
        <figcaption className="mt-4 grid grid-cols-2 gap-3">
          <LegendItem
            label="Pending"
            value={data.pending}
            color={COLORS.pending}
          />
          <LegendItem
            label="Completed"
            value={data.completed}
            color={COLORS.completed}
          />
        </figcaption>
      </figure>
    </ChartCard>
  );
}

function LegendItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#F0F2EE] bg-[#FAFBF9] px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-[#666B65]">{label}</span>
      </div>
      <span className="text-sm font-bold text-[#1B1C1C]">
        {value.toLocaleString()}
      </span>
    </div>
  );
}