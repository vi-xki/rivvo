import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, Wallet, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddExpense from '@/components/AddExpense';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SidebarSavings from '@/components/SidebarSavings';
import MarketBackground from '@/components/MarketBackground';
import { useAuth } from '@/store/useAuth';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Expenses', href: '/expenses', icon: Wallet },
        { name: 'Insights', href: '/insights', icon: PieChart },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card sidebar-gradient hidden md:flex flex-col fixed inset-y-0 left-0 z-50 shadow-card rounded-r-lg">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-primary tracking-tight">Rivvo</h1>
                        <div className="flex items-center gap-2">
                          <ThemeToggle />
                        </div>
                    </div>

                    <SidebarSavings />
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/5 hover:text-foreground"
                                )}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen bg-gradient-to-b from-background/90 to-white relative overflow-hidden">
                {/* decorative market background */}
                <MarketBackground />

                {children}

                {/* Add Expense Floating Button */}
                <AddExpenseButton />

            </main>
        </div>
    );
}

function LogoutButton(){
    const logout = useAuth((s) => s.logout);
    return (
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
        </button>
    )
}

function AddExpenseButton(){
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div className="fixed bottom-6 right-6 z-40">
                <button onClick={() => setOpen(true)} className="rounded-full bg-primary text-primary-foreground p-4 shadow-lg">+ Add Expense</button>
            </div>
            <AddExpense open={open} onClose={() => setOpen(false)} />
        </>
    )
}
