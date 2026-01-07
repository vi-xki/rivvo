import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SavingsCard from '@/components/SavingsCard';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Rivvo</h1>
        <nav className="space-x-4">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          <Link to="/signup"><Button variant="primary">Get started</Button></Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <section>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Track spending. Stay calm.</h2>
          <p className="text-muted-foreground mb-6">Rivvo helps you track everyday expenses, understand spending habits, and keep your monthly budgets on track — with a minimal, fast interface.</p>

          <div className="flex gap-4">
            <Link to="/signup"><Button variant="primary">Create account</Button></Link>
            <Link to="/login" className="inline-block"><Button variant="ghost">Sign in</Button></Link>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li>• Fast expense entry (5s)</li>
            <li>• Category insights & monthly trends</li>
            <li>• Set budgets & get visual warnings</li>
            <li>• Export & manage your data</li>
          </ul>
        </section>

        <aside className="space-y-4">
          <SavingsCard goal={1200} saved={720} onCelebrate={() => { /* demo – will wire confetti in Dashboard */ }} />
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold mb-3">Monthly Overview (Preview)</h3>
              <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-highlight text-white font-medium">New</span>
            </div>
            <div className="w-full h-40 bg-muted/40 rounded-lg flex items-center justify-center text-muted-foreground">Charts & stats preview</div>
            <p className="text-sm text-muted-foreground mt-4">A calm dashboard designed for quick decisions and focused tracking.</p>
          </div>
        </aside>
      </main>

      <footer className="w-full max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Rivvo — Minimal finance tracking
      </footer>
    </div>
  );
}
