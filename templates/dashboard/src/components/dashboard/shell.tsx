"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";

type DashboardShellProps = {
  user: { name: string; email: string };
  children: React.ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "◆" },
  { href: "/billing", label: "Billing", icon: "◈" },
  { href: "/email", label: "Email", icon: "◇" },
  { href: "/settings", label: "Settings", icon: "◎" },
];

export function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();

  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          launch<span>frame</span>
        </div>

        <div className="sidebar-section">Navigation</div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link${pathname === item.href ? " active" : ""}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="sidebar-spacer" />

        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.name || "User"}</div>
            <div className="sidebar-user-email">{user.email}</div>
          </div>
        </div>
        <SignOutButton />
      </aside>

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
