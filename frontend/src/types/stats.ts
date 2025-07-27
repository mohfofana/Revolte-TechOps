export interface Stats {
  openTickets: number;
  inProgressTickets: number;
  pendingTickets?: number; // Pour la rétrocompatibilité
  closedTickets: number;
  totalTickets?: number;   // Peut être calculé côté frontend si nécessaire
}
