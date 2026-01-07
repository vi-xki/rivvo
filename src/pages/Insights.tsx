import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#60a5fa', '#f97316', '#34d399', '#f43f5e', '#a78bfa'];

const samplePie = [
  { name: 'Food', value: 420 },
  { name: 'Transport', value: 220 },
  { name: 'Entertainment', value: 150 },
  { name: 'Bills', value: 80 },
  { name: 'Others', value: 60 },
];

const sampleBars = [
  { month: 'Jan', spent: 1200 },
  { month: 'Feb', spent: 980 },
  { month: 'Mar', spent: 1100 },
  { month: 'Apr', spent: 900 },
  { month: 'May', spent: 1300 },
];

export default function Insights() {
  // simple insight: compare last two months
  const compare = (arr: any[]) => {
    if (arr.length < 2) return null;
    const last = arr[arr.length - 1].spent;
    const prev = arr[arr.length - 2].spent;
    const pct = ((last - prev) / prev) * 100;
    return Math.round(pct);
  };

  const pct = compare(sampleBars);

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-muted-foreground">Visualize spending trends and category breakdowns.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6 h-80">
          <h3 className="mb-4 font-medium">Category breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={samplePie} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                {samplePie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border rounded-lg p-6 h-80">
          <h3 className="mb-4 font-medium">Monthly trend</h3>
          {pct !== null && <div className="text-sm text-muted-foreground mb-2">Spending {pct >= 0 ? 'increased' : 'decreased'} by {Math.abs(pct)}% compared to last month</div>}
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={sampleBars}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spent" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
