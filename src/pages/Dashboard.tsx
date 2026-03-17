import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import DashboardView from "@/pages/DashboardView";
import JobBoardView from "@/pages/JobBoardView";
import CalendarView from "@/pages/CalendarView";
import AIAssistantView from "@/pages/AIAssistantView";
import AddJobView from "@/pages/AddJobView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "Dashboard" && <DashboardView key="dash" />}
            {activeTab === "Jobs" && <JobBoardView key="jobs" />}
            {activeTab === "Calendar" && <CalendarView key="cal" />}
            {activeTab === "AI" && <AIAssistantView key="ai" />}
            {activeTab === "Add" && <AddJobView key="add" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
