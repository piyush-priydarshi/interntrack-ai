import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, MoreHorizontal, X, MapPin, Clock, ExternalLink, Bookmark, CheckCircle2, StickyNote } from "lucide-react";

const allJobs = [
  { co: "Amazon", role: "SDE Intern", loc: "Seattle", date: "Mar 20", status: "Applied", skills: ["Python", "AWS", "DSA"] },
  { co: "GitHub", role: "Security Intern", loc: "Remote", date: "Mar 24", status: "Saved", skills: ["Security", "Go", "Linux"] },
  { co: "Figma", role: "Design Engineer", loc: "San Francisco", date: "Mar 28", status: "Applied", skills: ["React", "CSS", "Figma"] },
  { co: "OpenAI", role: "Research Intern", loc: "San Francisco", date: "Apr 02", status: "Interview", skills: ["ML", "Python", "LLMs"] },
  { co: "Stripe", role: "Product Design Intern", loc: "Remote", date: "Apr 05", status: "Saved", skills: ["UI/UX", "Prototyping"] },
  { co: "Swiggy", role: "Data Analyst Intern", loc: "Bangalore", date: "Apr 10", status: "Expired", skills: ["SQL", "Python", "Tableau"] },
  { co: "Linear", role: "Software Intern", loc: "Remote", date: "Apr 15", status: "Saved", skills: ["TypeScript", "React"] },
  { co: "Vercel", role: "Frontend Engineer", loc: "Remote", date: "Apr 18", status: "Applied", skills: ["Next.js", "React", "Vercel"] },
];

const filters = ["All", "Applied", "Saved", "Interview", "Expired"];

const statusClass: Record<string, string> = {
  Applied: "status-applied",
  Saved: "status-saved",
  Interview: "status-interview",
  Expired: "status-expired",
};

interface JobDetailProps {
  job: typeof allJobs[0];
  onClose: () => void;
}

function JobDetail({ job, onClose }: JobDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-surface rounded-2xl p-8 max-w-lg w-full space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">{job.co}</h2>
            <p className="text-muted-foreground text-sm mt-1">{job.role}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} /> {job.loc}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} /> Deadline: {job.date}
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Required Skills</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((s) => (
                <span key={s} className="text-xs bg-white/[0.05] border border-white/[0.06] text-zinc-300 px-2.5 py-1 rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button className="btn-primary text-sm py-2.5 flex items-center gap-2">
            <ExternalLink size={14} /> Apply Now
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <CheckCircle2 size={14} /> Mark Applied
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Bookmark size={14} /> Save
          </button>
          <button className="btn-ghost flex items-center gap-2">
            <StickyNote size={14} /> Notes
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function JobBoardView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof allJobs[0] | null>(null);

  const filtered = allJobs.filter((j) => {
    const matchFilter = activeFilter === "All" || j.status === activeFilter;
    const matchSearch = j.co.toLowerCase().includes(search.toLowerCase()) || j.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold text-foreground">Job Opportunities</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-1.5 text-xs w-56"
            />
          </div>
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-surface rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
              {["Company", "Role", "Location", "Deadline", "Status", ""].map((h) => (
                <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {filtered.map((job, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedJob(job)}
                className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">{job.co}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.role}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.loc}</td>
                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{job.date}</td>
                <td className="px-6 py-4">
                  <span className={`status-badge ${statusClass[job.status]}`}>{job.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <MoreHorizontal size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
