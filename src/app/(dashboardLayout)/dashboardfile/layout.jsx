import DashboardLayoutSidebar from "@/components/DashboardLayoutSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <DashboardLayoutSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
