import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div>
          <p className="brand">Launchframe</p>
          <h1 className="workspace-title">Settings</h1>
          <p className="workspace-subtitle">
            Manage your account, notifications, and workspace preferences.
          </p>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Signed in as</p>
          <div className="pill">
            <span className="status-dot" />
            {session.user.email}
          </div>
        </div>

        <div className="sidebar-spacer" />
      </aside>

      <section className="content">
        <div className="settings-grid">
          <article className="settings-card">
            <p className="eyebrow">Profile</p>
            <h2>Identity and session</h2>
            <p>
              Better Auth is wired in. Add avatar upload, password rotation, and audit
              log surfaces here without changing the route structure later.
            </p>
          </article>

          <article className="settings-card">
            <p className="eyebrow">Billing</p>
            <h2>Plan and seat management</h2>
            <p>
              This is the natural place for subscription state, invoices, and workspace
              access management once billing moves past the starter baseline.
            </p>
          </article>

          <article className="settings-card settings-card-wide">
            <p className="eyebrow">Ops note</p>
            <h2>Keep settings boring and reliable</h2>
            <p>
              The page is intentionally structured as stable product infrastructure rather
              than visual filler. Add account, organization, and compliance controls here
              as real features land.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
