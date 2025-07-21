import { useState } from 'react';
import { 
  Container, 
  Box, 
  useTheme,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  ArrowBack,
  MoreVert,
  Edit,
  Archive,
  Delete,
  Flag,
  Person,
  Attachment,
  Send,
  Reply,
  Forward,
  BookmarkBorder,
  Share,
  Print,
  Timeline,
  Comment,
  Visibility,
  Update
} from '@mui/icons-material';

// Import des composants personnalisés
import { HeaderCard, ActivityCard } from '../components/dashboard';

// Interface pour le ticket
interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: {
    name: string;
    avatar: string;
    email: string;
  };
  reporter: {
    name: string;
    avatar: string;
    email: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  attachments: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
  watchers: number;
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    type: 'comment' | 'status_change' | 'assignment';
  }>;
}

const TicketDetails = () => {
  const theme = useTheme();
  
  // Données mockées du ticket
  const [ticket] = useState<Ticket>({
    id: 'TKT-2024-001',
    title: 'Problème de connexion à la base de données en production',
    description: `Depuis ce matin, nous rencontrons des problèmes intermittents de connexion à la base de données principale. 
    
Les symptômes observés :
- Timeouts de connexion aléatoires
- Erreurs 500 sur certaines pages
- Logs indiquant des problèmes de pool de connexions

Étapes pour reproduire :
1. Accéder à l'application en production
2. Naviguer vers les sections nécessitant des requêtes lourdes
3. Observer les erreurs intermittentes

Impact : Utilisateurs affectés, perte de performance significative.`,
    status: 'in_progress',
    priority: 'urgent',
    category: 'Bug Report',
    assignee: {
      name: 'Marie Martin',
      avatar: 'MM',
      email: 'marie.martin@company.com'
    },
    reporter: {
      name: 'Jean Dupont',
      avatar: 'JD',
      email: 'jean.dupont@company.com'
    },
    tags: ['production', 'database', 'urgent', 'performance'],
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    dueDate: '2024-01-16T18:00:00Z',
    attachments: [
      { name: 'error-logs.txt', size: '2.3 MB', type: 'text', url: '#' },
      { name: 'database-metrics.png', size: '456 KB', type: 'image', url: '#' },
      { name: 'performance-report.pdf', size: '1.2 MB', type: 'pdf', url: '#' }
    ],
    watchers: 5,
    comments: [
      {
        id: '1',
        author: { name: 'Jean Dupont', avatar: 'JD' },
        content: 'Ticket créé suite aux incidents observés ce matin.',
        timestamp: '2024-01-15T09:30:00Z',
        type: 'comment'
      },
      {
        id: '2',
        author: { name: 'System', avatar: 'S' },
        content: 'Ticket assigné à Marie Martin',
        timestamp: '2024-01-15T10:15:00Z',
        type: 'assignment'
      },
      {
        id: '3',
        author: { name: 'Marie Martin', avatar: 'MM' },
        content: 'Je commence l\'investigation. J\'ai identifié quelques pistes dans les logs de la base de données.',
        timestamp: '2024-01-15T14:20:00Z',
        type: 'comment'
      }
    ]
  });

  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Configuration des statuts, priorités, etc.
  const statuses = [
    { value: 'open', label: 'Ouvert', color: theme.palette.info.main },
    { value: 'in_progress', label: 'En cours', color: theme.palette.warning.main },
    { value: 'resolved', label: 'Résolu', color: theme.palette.success.main },
    { value: 'closed', label: 'Fermé', color: theme.palette.grey[600] }
  ];

  const priorities = [
    { value: 'low', label: 'Faible', color: theme.palette.success.main },
    { value: 'medium', label: 'Moyen', color: theme.palette.warning.main },
    { value: 'high', label: 'Élevé', color: theme.palette.error.main },
    { value: 'urgent', label: 'Urgent', color: theme.palette.error.dark }
  ];

  const getStatusInfo = (status: string) => {
    return statuses.find(s => s.value === status) || statuses[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setLoading(true);
    // Simulation d'ajout de commentaire
    await new Promise(resolve => setTimeout(resolve, 500));
    setNewComment('');
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'1h';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)} jour(s)`;
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* En-tête */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
          <HeaderCard
            title={`Ticket ${ticket.id}`}
            subtitle={ticket.title}
            chips={[
              { 
                label: getStatusInfo(ticket.status).label, 
                color: ticket.status === 'resolved' ? 'success' : ticket.status === 'in_progress' ? 'warning' : 'info',
                variant: 'filled' 
              },
              { 
                label: getPriorityInfo(ticket.priority).label, 
                color: ticket.priority === 'urgent' ? 'error' : ticket.priority === 'high' ? 'warning' : 'default',
                variant: 'outlined' 
              },
              { label: ticket.category, variant: 'outlined' }
            ]}
            addButtonText="Retour à la liste"
            addButtonIcon={<ArrowBack />}
          />
          <IconButton onClick={handleMenuClick} size="large">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Menu contextuel */}
        <Menu
          anchorEl={actionsMenuAnchor}
          open={Boolean(actionsMenuAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
            <ListItemText>Modifier</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><BookmarkBorder fontSize="small" /></ListItemIcon>
            <ListItemText>Suivre</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><Share fontSize="small" /></ListItemIcon>
            <ListItemText>Partager</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><Print fontSize="small" /></ListItemIcon>
            <ListItemText>Imprimer</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><Archive fontSize="small" /></ListItemIcon>
            <ListItemText>Archiver</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Supprimer</ListItemText>
          </MenuItem>
        </Menu>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '2fr 1fr'
            },
            gap: 3
          }}
        >
          {/* Contenu principal */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Description */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Comment color="primary" />
                Description
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-line', 
                  lineHeight: 1.6,
                  color: 'text.primary'
                }}
              >
                {ticket.description}
              </Typography>

              {/* Tags */}
              {ticket.tags.length > 0 && (
                <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {ticket.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Pièces jointes */}
              {ticket.attachments.length > 0 && (
                <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Attachment fontSize="small" />
                    Pièces jointes ({ticket.attachments.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {ticket.attachments.map((attachment, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                          <Attachment fontSize="small" />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {attachment.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {attachment.size}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Historique et commentaires */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timeline color="primary" />
                Historique et commentaires
                <Chip label={ticket.comments.length} size="small" color="primary" />
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {/* Liste des commentaires */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {ticket.comments.map((comment) => (
                  <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                      {comment.author.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {comment.author.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getTimeAgo(comment.timestamp)}
                        </Typography>
                        {comment.type === 'assignment' && (
                          <Chip label="Assignation" size="small" color="info" variant="outlined" />
                        )}
                      </Box>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: comment.type === 'assignment' 
                            ? alpha(theme.palette.info.main, 0.05)
                            : alpha(theme.palette.grey[500], 0.05),
                          border: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`,
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="body2">
                          {comment.content}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Nouveau commentaire */}
              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ajouter un commentaire
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                    JD
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Écrivez votre commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        startIcon={<Send />}
                        onClick={handleAddComment}
                        disabled={loading || !newComment.trim()}
                        sx={{ borderRadius: 2 }}
                      >
                        {loading ? 'Envoi...' : 'Commenter'}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Reply />}
                        sx={{ borderRadius: 2 }}
                      >
                        Répondre par email
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Panneau latéral */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Informations du ticket */}
            <ActivityCard
              title="Informations"
              icon={<Flag sx={{ color: 'white' }} />}
              iconBackground={getPriorityInfo(ticket.priority).color}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Statut */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Statut
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getStatusInfo(ticket.status).color
                      }}
                    />
                    <Typography variant="body2">
                      {getStatusInfo(ticket.status).label}
                    </Typography>
                  </Box>
                </Box>

                {/* Priorité */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Priorité
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Flag sx={{ color: getPriorityInfo(ticket.priority).color, fontSize: 16 }} />
                    <Typography variant="body2">
                      {getPriorityInfo(ticket.priority).label}
                    </Typography>
                  </Box>
                </Box>

                {/* Assigné */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Assigné à
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: theme.palette.primary.main }}>
                      {ticket.assignee.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        {ticket.assignee.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.assignee.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Rapporteur */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Rapporteur
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: theme.palette.secondary.main }}>
                      {ticket.reporter.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        {ticket.reporter.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.reporter.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Dates */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Créé le
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(ticket.createdAt)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Dernière mise à jour
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(ticket.updatedAt)}
                  </Typography>
                </Box>

                {ticket.dueDate && (
                  <Box>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      Échéance
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                      {formatDate(ticket.dueDate)}
                    </Typography>
                  </Box>
                )}

                {/* Observateurs */}
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Observateurs
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {ticket.watchers} personne(s)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ActivityCard>

            {/* Actions rapides */}
            <ActivityCard
              title="Actions"
              icon={<Update sx={{ color: 'white' }} />}
              iconBackground={theme.palette.success.main}
            >
              {[
                { 
                  title: 'Changer le statut', 
                  icon: <Flag />, 
                  color: theme.palette.warning.main,
                  description: 'Modifier l\'état du ticket'
                },
                { 
                  title: 'Réassigner', 
                  icon: <Person />, 
                  color: theme.palette.info.main,
                  description: 'Assigner à une autre personne'
                },
                { 
                  title: 'Modifier la priorité', 
                  icon: <Flag />, 
                  color: theme.palette.error.main,
                  description: 'Changer le niveau de priorité'
                },
                { 
                  title: 'Dupliquer', 
                  icon: <Forward />, 
                  color: theme.palette.primary.main,
                  description: 'Créer un ticket similaire'
                }
              ].map((action, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: alpha(action.color, 0.08),
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: `${action.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: action.color,
                        flexShrink: 0
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {action.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </ActivityCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TicketDetails;