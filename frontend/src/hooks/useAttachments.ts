import { useState, useCallback, useEffect } from 'react';
import type { Attachment } from '../types/ticket';
import { 
  uploadAttachment, 
  downloadAttachment as downloadAttachmentApi, 
  deleteAttachment as deleteAttachmentApi,
  fetchTicketById 
} from '../services/api';

export const useAttachments = (ticketId: number) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Charger les pièces jointes existantes
  useEffect(() => {
    const loadAttachments = async () => {
      try {
        setLoading(true);
        const ticket = await fetchTicketById(ticketId);
        if (ticket.attachments) {
          setAttachments(ticket.attachments);
        }
      } catch (err) {
        setError(err as Error);
        console.error('Failed to load attachments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadAttachments();
    }
  }, [ticketId]);

  const handleUpload = useCallback(async (file: File): Promise<Attachment> => {
    try {
      setUploading(true);
      setError(null);
      const newAttachment = await uploadAttachment(ticketId, file);
      setAttachments(prev => [...prev, newAttachment]);
      return newAttachment;
    } catch (err) {
      const error = err as Error;
      console.error('Upload failed:', error);
      setError(error);
      throw error;
    } finally {
      setUploading(false);
    }
  }, [ticketId]);

  const downloadAttachment = useCallback(async (attachmentId: number, filename?: string) => {
    try {
      setLoading(true);
      const blob = await downloadAttachmentApi(attachmentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `piece-jointe-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    } catch (err) {
      const error = err as Error;
      console.error('Download failed:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAttachment = useCallback(async (attachmentId: number) => {
    try {
      setLoading(true);
      await deleteAttachmentApi(attachmentId);
      setAttachments(prev => prev.filter(a => a.id !== attachmentId));
      return true;
    } catch (err) {
      const error = err as Error;
      console.error('Delete failed:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    attachments,
    loading,
    uploading,
    error,
    uploadAttachment: handleUpload,
    downloadAttachment,
    deleteAttachment,
    setAttachments // Permet de définir les pièces jointes depuis l'extérieur (ex: depuis les données du ticket)
  };
};
