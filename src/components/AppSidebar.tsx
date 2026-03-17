import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  MessageSquare,
  PlusCircle,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick, collapsed = false }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
      ${active ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"}`}
    title={collapsed ? label : undefined}
  >
    <Icon
      size={18}
      className={`shrink-0 transition-colors ${active ? "text-primary" : "group-hover:text-zinc-300"}`}
    />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {active && (
      <motion.div
        layoutId="activeNav"
        className="absolute right-2 w-1 h-4 bg-primary rounded-full"
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    )}
  </button>
);

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } border-r border-white/[0.04] p-4 flex flex-col gap-6 transition-all duration-300 shrink-0 bg-[hsl(240,5%,5%)]`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-foreground font-bold tracking-tight text-lg whitespace-nowrap">
            InternTrack<span className="text-primary">AI</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => onTabChange("Dashboard")} collapsed={collapsed} />
        <SidebarItem icon={Briefcase} label="Job Opportunities" active={activeTab === "Jobs"} onClick={() => onTabChange("Jobs")} collapsed={collapsed} />
        <SidebarItem icon={Calendar} label="Calendar" active={activeTab === "Calendar"} onClick={() => onTabChange("Calendar")} collapsed={collapsed} />
        <SidebarItem icon={MessageSquare} label="AI Assistant" active={activeTab === "AI"} onClick={() => onTabChange("AI")} collapsed={collapsed} />
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-1">
        <SidebarItem icon={PlusCircle} label="Add Job" active={activeTab === "Add"} onClick={() => onTabChange("Add")} collapsed={collapsed} />
        <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-all duration-200 mt-2"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
