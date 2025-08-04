import { useState, useCallback, useEffect } from 'react';
import type { Comment } from '../types/ticket';
import { addComment, fetchTicketById } from '../services/api';

export const useComments = (ticketId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadComments = useCallback(async () => {
    if (!ticketId) return;
    
    try {
      setLoading(true);
      setError(null);
      const ticket = await fetchTicketById(ticketId);
      // S'assurer que les commentaires sont toujours un tableau
      setComments(Array.isArray(ticket.comments) ? ticket.comments : []);
    } catch (err) {
      setError(err as Error);
      console.error('Échec du chargement des commentaires:', err);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  // Charger les commentaires au montage et quand ticketId change
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const submitComment = useCallback(async (content: string, authorName: string) => {
    if (!content.trim() || !ticketId) return null;
    
    try {
      setLoading(true);
      const newComment = await addComment(ticketId, content, authorName);
      
      // Mettre à jour l'état local avec le nouveau commentaire
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
