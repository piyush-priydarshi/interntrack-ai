import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events: Record<string, { title: string; color: string }[]> = {
  "2026-03-20": [{ title: "Apply – Amazon SDE Intern", color: "bg-red-500" }],
  "2026-03-24": [{ title: "Apply – GitHub Security Intern", color: "bg-amber-500" }],
  "2026-03-28": [{ title: "Apply – Figma Design Engineer", color: "bg-cyan-500" }],
  "2026-04-02": [{ title: "Interview – OpenAI Research", color: "bg-violet-500" }],
  "2026-04-05": [{ title: "Apply – Stripe Product Design", color: "bg-emerald-500" }],
  "2026-04-10": [{ title: "Apply – Swiggy Data Analyst", color: "bg-amber-500" }],
  "2026-04-15": [{ title: "Apply – Linear Software Intern", color: "bg-cyan-500" }],
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2)); // March 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const prev = () => setCurrentDate(new Date(year, month - 1));
  const next = () => setCurrentDate(new Date(year, month + 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Calendar</h2>
        <div className="flex items-center gap-4">
          <button onClick={prev} className="p-2 hover:bg-white/[0.05] rounded-xl transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground min-w-[140px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button onClick={next} className="p-2 hover:bg-white/[0.05] rounded-xl transition-colors">
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="glass-surface rounded-2xl overflow-hidden">
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div key={d} className="px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-white/[0.04]">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
            const dayEvents = day ? events[dateStr] || [] : [];
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <div
                key={i}
                className={`min-h-[100px] p-2 border-b border-r border-white/[0.02] transition-colors ${
                  day ? "hover:bg-white/[0.02]" : ""
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                        isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((ev, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.04] cursor-pointer hover:bg-white/[0.06] transition-colors"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${ev.color} shrink-0 animate-glow-pulse`} />
                          <span className="text-[10px] text-zinc-300 truncate">{ev.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
