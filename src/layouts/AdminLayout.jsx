import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout() {
  return (
    <div className="admin-layout flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar - Tidak akan ikut scroll karena berada di luar <main> */}
      <Sidebar />

      {/* Content Area - Wadah utama */}
      <div className="admin-layout__content flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Menempel di atas */}
        <Header />

        {/* Main Content - Area yang bisa scroll */}
        <main className="admin-layout__main flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
