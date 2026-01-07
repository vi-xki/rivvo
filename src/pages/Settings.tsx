export default function Settings() {
  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile, currency, and theme.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">Profile settings</div>
        <div className="bg-card border rounded-lg p-6">Theme & preferences</div>
      </section>
    </div>
  );
}
