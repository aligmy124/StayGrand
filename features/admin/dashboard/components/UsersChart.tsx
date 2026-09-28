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
import { Users } from "lucide-react";
import type { IDashboardData } from "../types/type.dashboard";
import ChartCard from "./ChartCard";

interface UsersChartProps {
  data: IDashboardData["users"];
}

const COLORS = {
  user: "#4E604F",
  admin: "#8B5CF6",
};

export default function UsersChart({ data }: UsersChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const chartData = [
    { name: "Users", value: data.user, key: "user" },
    { name: "Admins", value: data.admin, key: "admin" },
  ].filter((d) => d.value > 0);

  const total = data.user + data.admin;

  return (
    <ChartCard
      title="Users Distribution"
      description={`${total.toLocaleString()} total accounts`}
      icon={Users}
    >
      <figure
        role="img"
        aria-label={`Users distribution chart: ${data.user} users, ${data.admin} admins`}
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

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#1B1C1C]">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#8A9189]">
              Total
            </span>
          </div>
        </div>

        <figcaption className="mt-4 grid grid-cols-2 gap-3">
          <LegendItem
            label="Users"
            value={data.user}
            color={COLORS.user}
          />
          <LegendItem
            label="Admins"
            value={data.admin}
            color={COLORS.admin}
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