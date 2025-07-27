import { useState, useEffect } from 'react';
import { fetchStats } from '../services/api';

export const useStats = () => {
  const [stats, setStats] = useState({
    openTickets: 0,
    inProgressTickets: 0, // Ce champ est utilisé dans le frontend
    closedTickets: 0,
    totalTickets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchStats();
      // Mapper les données du backend vers le format attendu par le frontend
      setStats({
        openTickets: data.openTickets,
        inProgressTickets: data.pendingTickets || 0, // Utiliser pendingTickets du backend
        closedTickets: data.closedTickets,
        totalTickets: data.openTickets + (data.pendingTickets || 0) + data.closedTickets,
      });
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: loadStats,
  };
};
