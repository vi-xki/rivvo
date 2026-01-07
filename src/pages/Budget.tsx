export default function Budget() {
  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Budget</h1>
        <p className="text-muted-foreground">Set and track monthly budgets.</p>
      </header>

      <section className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Current month</h2>
            <p className="text-2xl font-bold">$1,500</p>
          </div>
          <div className="w-1/2">
            <div className="w-full h-3 bg-muted rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Using 70% of budget</p>
          </div>
        </div>
      </section>
    </div>
  );
}
