// "use client";

// import * as React from "react";
// import { addDays, format } from "date-fns";
// import { type DateRange } from "react-day-picker";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface CalendarRangeProps {
//   dateRange?: DateRange;
//   setDateRange: (range: DateRange | undefined) => void;
//   onApply?: () => void;
// }

// export function CalendarRange({ dateRange, setDateRange, onApply }: CalendarRangeProps) {
//   return (
//     <Card className="w-full max-w-md border-0 shadow-none">
//       <CardContent className="p-0">
//         <div className="flex items-center gap-2 mb-4">
//           <CalendarIcon className="h-5 w-5 text-primary" />
//           <div className="flex items-center gap-2 text-sm">
//             <span className="font-medium text-primary">
//               {dateRange?.from ? format(dateRange.from, "MMM dd, yyyy") : "Start Date"}
//             </span>
//             <span className="text-gray-400">—</span>
//             <span className="font-medium text-primary">
//               {dateRange?.to ? format(dateRange.to, "MMM dd, yyyy") : "End Date"}
//             </span>
//           </div>
//         </div>
//         <Calendar
//           mode="range"
//           defaultMonth={dateRange?.from}
//           selected={dateRange}
//           onSelect={setDateRange}
//           className="rounded-lg border"
//         />
//         <div className="flex gap-2 mt-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               setDateRange({
//                 from: new Date(2026, 7, 9),
//                 to: new Date(2026, 7, 10),
//               })
//             }
//             className="text-xs"
//           >
//             Reset
//           </Button>
//           <Button
//             size="sm"
//             className="bg-primary hover:bg-secondary text-white text-xs"
//             onClick={onApply}
//           >
//             Apply Dates
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }