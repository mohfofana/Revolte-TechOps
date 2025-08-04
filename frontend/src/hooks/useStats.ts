import { useState, useEffect, useCallback } from 'react';
import { fetchStats } from '../services/api';

export const useStats = () => {
  const [stats, setStats] = useState({
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchStats();
      setStats({
        openTickets: data.openTickets,
        inProgressTickets: data.pendingTickets || 0,
        closedTickets: data.closedTickets,
        totalTickets: data.openTickets + (data.pendingTickets || 0) + data.closedTickets,
      });
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refresh: loadStats,
  };
};
