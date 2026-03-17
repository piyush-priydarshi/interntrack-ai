import { motion } from "framer-motion";
import { Target, Clock, Send, Bookmark, ChevronRight, Sparkles, MapPin } from "lucide-react";
import StatCard from "@/components/StatCard";

const deadlines = [
  { co: "Google Interview", role: "Technical Round", date: "22 March", urgency: "high" },
  { co: "Amazon OA", role: "Online Assessment", date: "25 March", urgency: "medium" },
  { co: "Microsoft Webinar", role: "Career Seminar", date: "28 March", urgency: "low" },
];

const opportunities = [
  { co: "Flipkart", role: "SDE Intern", loc: "Bangalore", match: "92%" },
  { co: "Razorpay", role: "Backend Intern", loc: "Bangalore", match: "89%" },
  { co: "Swiggy", role: "Data Intern", loc: "Remote", match: "86%" },
];

const urgencyColor = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

export default function DashboardView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="AI Alerts Today" value="5" trend="2 urgent" delay={0} />
        <StatCard icon={Clock} label="Upcoming Interviews" value="3" trend="Next in 2 days" delay={0.05} />
        <StatCard icon={Send} label="New Hiring Found" value="7" trend="+3 nearby" delay={0.1} />
        <StatCard icon={Bookmark} label="Tracked Applications" value="12" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deadlines */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Clock size={15} className="text-primary" />
            AI Scheduled Events
          </h3>
          <div className="space-y-2">
            {deadlines.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-surface glass-surface-hover rounded-xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-8 rounded-full ${urgencyColor[job.urgency]}`} />
                  <div>
                    <div className="text-foreground font-medium text-sm">{job.co}</div>
                    <div className="text-xs text-muted-foreground">{job.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{job.date}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles size={15} className="text-primary" />
            AI Recommended Hiring
          </h3>
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="glass-surface glass-surface-hover rounded-xl p-4 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-foreground font-medium text-sm">{opp.co}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{opp.role}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
                      <MapPin size={11} />
                      {opp.loc}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    {opp.match} match
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
