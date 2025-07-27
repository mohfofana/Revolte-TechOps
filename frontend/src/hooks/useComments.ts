import { useState, useCallback, useEffect } from 'react';
import type { Comment } from '../types/ticket';
import { addComment, fetchTicketById } from '../services/api';

export const useComments = (ticketId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Charger les commentaires existants
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const ticket = await fetchTicketById(ticketId);
        if (ticket.comments) {
          setComments(ticket.comments);
        }
      } catch (err) {
        setError(err as Error);
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadComments();
    }
  }, [ticketId]);

  const submitComment = useCallback(async (content: string, authorName: string) => {
    try {
      setLoading(true);
      const newComment = await addComment(ticketId, content, authorName);
      setComments(prev => [...prev, newComment]);
      return newComment;
    } catch (err) {
      setError(err as Error);
      console.error('Failed to add comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  return {
    comments,
    loading,
    error,
    submitComment
  };
};
