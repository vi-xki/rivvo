export default function History() {
  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-muted-foreground">Your recent expenses and transactions.</p>
      </header>

      <section className="bg-card border rounded-lg p-6">
        <div className="text-muted-foreground">No expenses yet — add your first expense to see it here.</div>
      </section>
    </div>
  );
}
