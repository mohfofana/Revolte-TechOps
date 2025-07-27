// Importer les types partagés
import type { Ticket, TicketFilters } from '../types/ticket';
import type { Stats } from '../types/stats';

const API_BASE_URL = 'http://localhost:3001/api';

// Types d'API
export interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface Attachment {
  id: number;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
}

// Le type Stats est maintenant importé depuis '../types/stats'

// Tickets
export const fetchTickets = async (filters: TicketFilters = {}): Promise<Ticket[]> => {
  // Convertir l'objet de filtres en paramètres d'URL valides
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  
  const url = `${API_BASE_URL}/tickets${queryParams.toString() ? `?${queryParams}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des tickets: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchTicketById = async (id: number | string): Promise<Ticket> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du ticket: ${response.statusText}`);
  }
  
  return response.json();
};

export const updateTicketStatus = async (id: number | string, status: string): Promise<Ticket> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour du statut: ${response.statusText}`);
  }
  
  return response.json();
};

export const deleteTicket = async (id: number | string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression du ticket: ${response.statusText}`);
  }
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  return response.json();
};

export const updateTicket = async (id: number, ticketData: Partial<Ticket>): Promise<Ticket> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  return response.json();
};

// Users
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'agent' | 'user';
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

// Stats
export const fetchStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};

// Comments
export const addComment = async (
  ticketId: number, 
  content: string, 
  authorName: string
): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, authorName })
  });
  return response.json();
};

// Attachments
export const uploadAttachment = async (ticketId: number, file: File): Promise<Attachment> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/attachments`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Erreur lors du téléversement de la pièce jointe: ${response.statusText}`);
  }
  
  return response.json();
};

export const downloadAttachment = async (attachmentId: number): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/attachments/${attachmentId}/download`);
  
  if (!response.ok) {
    throw new Error(`Erreur lors du téléchargement de la pièce jointe: ${response.statusText}`);
  }
  
  return response.blob();
};

export const deleteAttachment = async (attachmentId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/attachments/${attachmentId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression de la pièce jointe: ${response.statusText}`);
  }
};
