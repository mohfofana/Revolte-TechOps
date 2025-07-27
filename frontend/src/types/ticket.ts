export interface Ticket {
  assignee: string;
  id: number;
  title: string;
  description: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  assignedTo?: number;
  category?: string;
  dueDate?: string;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface TicketFilters {
  status?: 'open' | 'pending' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: number;
  category?: string;
  search?: string;
}

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: string;
  ticketId?: number;
  userId?: number;
}

export interface Attachment {
  id: number;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
  ticketId?: number;
  url?: string;
}
