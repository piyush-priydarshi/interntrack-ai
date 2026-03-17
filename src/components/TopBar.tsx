import { Search, Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 border-b border-white/[0.04] flex items-center justify-between px-6 bg-black/20 backdrop-blur-md sticky top-0 z-10">
      <div className="relative w-80 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={15} />
        <input
          type="text"
          placeholder="Search opportunities… ⌘K"
          className="input-field pl-10 py-2 text-xs"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-white/[0.05] rounded-xl transition-colors relative">
          <Bell size={17} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-800 border border-white/[0.1]" />
      </div>
    </header>
  );
}
