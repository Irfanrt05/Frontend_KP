import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserHeader from "../components/user/UserHeader";
import { useState } from "react";

export default function UserLayout() {
  // collapsed: sidebar icon-only di desktop (lg+)
  const [collapsed, setCollapsed] = useState(true);
  // mobileOpen: sidebar overlay tampil di HP/tablet (< lg)
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="user-layout min-h-screen bg-[#f4f4f4]">
      {/* OVERLAY untuk mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR — fixed, overlay di mobile; always visible di desktop */}
      <UserSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/*
        KONTEN UTAMA
        Sidebar bersifat "fixed", sehingga kita perlu offset (margin/padding kiri)
        agar konten tidak tertimpa sidebar di desktop.

        Di mobile (< lg): tidak ada offset — sidebar overlay
        Di desktop (lg+): offset sesuai lebar sidebar
          - collapsed = true  → sidebar 90px  → pl-[90px]
          - collapsed = false → sidebar 240px → pl-[240px]

        Tailwind tidak mendukung conditional breakpoint prefix di runtime,
        maka kita gunakan kedua class sekaligus dan kondisikan tanpa lg prefix.
        Solusi: gunakan CSS var via style, atau gunakan pendekatan ini:
      */}
      <div
        className={[
          "user-layout__content min-h-screen flex flex-col transition-all duration-300",
          // Offset hanya di desktop (lg+):
          collapsed
            ? "lg:ml-[90px]"
            : "lg:ml-[240px]",
        ].join(" ")}
      >
        <UserHeader onMenuToggle={() => setMobileOpen((prev) => !prev)} />
        <main className="user-layout__main px-4 sm:px-9 pb-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}