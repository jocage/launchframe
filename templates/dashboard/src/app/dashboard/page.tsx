import Link from "next/link";

import { getSession } from "@/lib/auth-session";

export default async function DashboardPage() {
  const session = await getSession();
  const name = session?.user.name?.split(" ")[0] || "there";

  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, {name}</h1>
          <p className="lede" style={{ marginTop: 4, fontSize: "0.9375rem" }}>
            Here&apos;s what&apos;s happening with your project.
          </p>
        </div>
        <div className="dashboard-header-actions">
          <Link href="/settings" className="btn-ghost">Settings</Link>
          <Link href="/billing" className="btn-primary">Upgrade plan</Link>
        </div>
      </header>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total users</span>
          <span className="stat-value">1</span>
          <span className="stat-change up">↑ That&apos;s you</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">API requests</span>
          <span className="stat-value">—</span>
          <span className="stat-change">Connect your API</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Revenue</span>
          <span className="stat-value">$0</span>
          <span className="stat-change">Wire billing to track</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Uptime</span>
          <span className="stat-value">100%</span>
          <span className="stat-change up">↑ Looking good</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>
            Activity
            <span className="badge badge-accent">Live</span>
          </h3>
          <div className="chart-placeholder">
            {[65, 40, 80, 55, 90, 45, 70, 60, 85, 50, 75, 95].map((h, i) => (
              <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Recent events</h3>
          <div className="activity-feed">
            <div className="activity-item">
              <div className="activity-dot green" />
              <div>
                <p className="activity-text">
                  <strong>{session?.user.name || "User"}</strong> created an account
                </p>
                <p className="activity-time">Just now</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot blue" />
              <div>
                <p className="activity-text">
                  <strong>Database</strong> connected and schema pushed
                </p>
                <p className="activity-time">On setup</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot amber" />
              <div>
                <p className="activity-text">
                  <strong>Billing</strong> provider configured
                </p>
                <p className="activity-time">On setup</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot green" />
              <div>
                <p className="activity-text">
                  <strong>Project</strong> generated with Launchframe
                </p>
                <p className="activity-time">On creation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
