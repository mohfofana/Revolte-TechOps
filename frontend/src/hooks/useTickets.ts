import { useState, useEffect, useCallback } from 'react';
import { fetchTickets, fetchTicketById, createTicket, updateTicket } from '../services/api';
import type { Ticket } from '../types/ticket';

export const useTickets = (initialFilters = {}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTickets(filters);
      setTickets(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getTicket = useCallback(async (id: number | string) => {
    try {
      setLoading(true);
      return await fetchTicketById(id);
    } catch (err) {
      console.error('Failed to load ticket:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTicket = useCallback(async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const newTicket = await createTicket(ticketData);
      await loadTickets();
      return newTicket;
    } catch (err) {
      console.error('Failed to create ticket:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadTickets]);

  const updateTicketStatus = useCallback(async (id: number, status: 'open' | 'pending' | 'closed') => {
    try {
      setLoading(true);
      const updated = await updateTicket(id, { status });
      await loadTickets();
      return updated;
    } catch (err) {
      console.error('Failed to update ticket:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadTickets]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return {
    tickets,
    loading,
    error,
    filters,
    setFilters,
    getTicket,
    addTicket,
    updateTicketStatus,
    refreshTickets: loadTickets
  };
};
