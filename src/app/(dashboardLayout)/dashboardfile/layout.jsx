import DashboardLayoutSidebar from "@/components/DashboardLayoutSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F8F4EE]">
      {/* SIDEBAR */}
      <DashboardLayoutSidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-7xl mx-auto ml-70 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
