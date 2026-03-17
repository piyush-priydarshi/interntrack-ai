import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
  delay?: number;
}

export default function StatCard({ label, value, trend, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0, 0, 1] }}
      whileHover={{ y: -2 }}
      className="glass-surface glass-surface-hover rounded-2xl p-5 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon size={16} className="text-primary/60" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
        {trend && <span className="text-xs font-mono text-emerald-400">{trend}</span>}
      </div>
    </motion.div>
  );
}
