import { getSession } from "@/lib/auth-session";

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p className="lede" style={{ marginTop: 4, fontSize: "0.9375rem" }}>
            Manage your account and preferences.
          </p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="settings-section">
          <h3>Profile</h3>
          <p>Update your personal information.</p>
          <div className="settings-fields">
            <div className="settings-row">
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  defaultValue={session?.user.name || ""}
                  placeholder="Your name"
                />
              </label>
            </div>
            <div className="settings-row">
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  defaultValue={session?.user.email || ""}
                  placeholder="you@example.com"
                  disabled
                />
              </label>
            </div>
            <div className="settings-actions">
              <button className="btn-primary" disabled>Save changes</button>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>Notifications</h3>
          <p>Choose what you want to be notified about.</p>
          <div className="toggle-row">
            <div className="toggle-label">
              <strong>Product updates</strong>
              <p>Get notified about new features and improvements.</p>
            </div>
            <div className="toggle-switch on" />
          </div>
          <div className="toggle-row">
            <div className="toggle-label">
              <strong>Billing alerts</strong>
              <p>Receive alerts about billing events and invoices.</p>
            </div>
            <div className="toggle-switch on" />
          </div>
          <div className="toggle-row">
            <div className="toggle-label">
              <strong>Marketing emails</strong>
              <p>Occasional updates about tips and best practices.</p>
            </div>
            <div className="toggle-switch" />
          </div>
        </section>

        <section className="settings-section danger-zone">
          <h3>Danger zone</h3>
          <p>Irreversible actions for your account.</p>
          <button className="btn-ghost" style={{ color: "var(--color-danger)" }}>
            Delete account
          </button>
        </section>
      </div>
    </>
  );
}
