import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserHeader from "../components/user/UserHeader";
import { useState } from "react";

export default function UserLayout() {
  const [collapsed,setCollapsed] = useState(true);
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <UserSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`
          min-h-screen
          transition-all duration-300
          ${collapsed ? "ml-[90px]" : "ml-[260px]"}
        `}
      >
        <UserHeader />
        <main className="px-9 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}