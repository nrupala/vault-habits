import { useMemo } from 'react';
import { useItems, type DecryptedItem } from '@vault/core';
import { BarChart3, Flame, Award, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function AnalyticsApp({ vaultId, encryptionKey }: { vaultId: string, encryptionKey: CryptoKey }) {
  const { items } = useItems(vaultId, encryptionKey);

  const stats = useMemo(() => {
    const habits = items.filter((i: DecryptedItem) => i.type === 'habit');

    const totalStreaks = habits.reduce((acc: number, h: DecryptedItem) => acc + ((h.payload as any).streak || 0), 0);
    const avgStreak = habits.length > 0 ? Math.round(totalStreaks / habits.length) : 0;
    const maxStreak = habits.length > 0 ? Math.max(...habits.map((h: DecryptedItem) => (h.payload as any).streak || 0)) : 0;

    return {
      habitStats: { total: habits.length, avgStreak, maxStreak },
    };
  }, [items]);

  const cards = [
    { 
      label: 'Habit Consistency', 
      value: stats.habitStats.maxStreak.toString(), 
      sub: `Max day streak`,
      icon: Flame,
      color: 'bg-orange-500/10 text-orange-500'
    },
    { 
      label: 'Average Momentum', 
      value: stats.habitStats.avgStreak.toString(), 
      sub: `Mean streak across all`,
      icon: Zap,
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      label: 'Total Habits', 
      value: stats.habitStats.total.toString(), 
      sub: `Active disciplines`,
      icon: Award,
      color: 'bg-green-500/10 text-green-500'
    },
    { 
      label: 'Privacy Locked', 
      value: '100%', 
      sub: `Zero-knowledge tracking`,
      icon: Shield,
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-xl">
            <BarChart3 className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Consistency Engine</h2>
          <p className="text-sm text-muted-foreground">Deep insights into your personal discipline.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`p-2 rounded-lg w-fit mb-4 transition-transform group-hover:scale-110 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
            <h3 className="text-3xl font-bold mt-1 tracking-tight">{card.value}</h3>
            <p className="text-xs text-muted-foreground/60 mt-1 font-medium italic">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card border border-border p-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Private Progress
            </h3>
            <p className="text-sm text-muted-foreground">
              Your habit data never leaves your device. Streaks and consistency metrics are calculated entirely locally, ensuring your personal growth journey is for your eyes only.
            </p>
          </div>
          <div className="bg-primary/10 px-6 py-4 rounded-2xl border border-primary/20">
            <p className="text-[10px] uppercase font-bold text-primary mb-1">Consistency Score</p>
            <p className="text-3xl font-black text-primary">{Math.min(100, stats.habitStats.maxStreak * 5)}%</p>
          </div>
      </div>
    </div>
  );
}
