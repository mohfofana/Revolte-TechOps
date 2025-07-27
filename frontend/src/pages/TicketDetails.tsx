import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ListItemText,
  CircularProgress
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  ArrowBack,
  MoreVert,
  Edit,
  Archive,
  Delete,
  Flag,
  Send,
  Reply,
  BookmarkBorder,
  Share,
  Print,
  Timeline,
  Comment,
  Warning
} from '@mui/icons-material';

// Import des composants personnalisés et services
import { HeaderCard, ActivityCard } from '../components/dashboard';
import { 
  fetchTicketById, 
  addComment, 
  updateTicketStatus, 
  deleteTicket,
  updateTicket 
} from '../services/api';
import type { Ticket } from '../types/ticket';

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  
  // TOUS les états déclarés au début du composant
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Ticket>>({});
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null);
  const [priorityMenuAnchor, setPriorityMenuAnchor] = useState<null | HTMLElement>(null);
  
  // Configuration des statuts, priorités, etc.
  const statuses = [
    { value: 'open', label: 'Ouvert', color: theme.palette.info.main },
    { value: 'pending', label: 'En attente', color: theme.palette.warning.main },
    { value: 'closed', label: 'Fermé', color: theme.palette.success.main }
  ];

  const priorities = [
    { value: 'low', label: 'Faible', color: theme.palette.success.main },
    { value: 'medium', label: 'Moyen', color: theme.palette.warning.main },
    { value: 'high', label: 'Élevé', color: theme.palette.error.main },
    { value: 'critical', label: 'Critique', color: theme.palette.error.dark }
  ];

  const getStatusInfo = (status: string) => {
    return statuses.find(s => s.value === status) || statuses[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };
  
  // Fonction utilitaire pour charger un ticket
  const loadTicket = async (ticketId: string) => {
    try {
      setLoading(true);
      const ticketData = await fetchTicketById(ticketId);
      setTicket(ticketData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement du ticket:', err);
      setError('Impossible de charger le ticket. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };
  
  // Chargement initial du ticket
  useEffect(() => {
    if (!id) {
      setError('ID du ticket manquant');
      setLoading(false);
      return;
    }
    
    loadTicket(id);
  }, [id]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };
  
  const handleEditClick = () => {
    if (ticket) {
      setEditData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        assignee: ticket.assignee,
        category: ticket.category
      });
      setIsEditing(true);
    }
    handleMenuClose();
  };
  
  const handleSaveEdit = async () => {
    if (!ticket) return;
    
    try {
      setLoading(true);
      const updatedTicket = await updateTicket(ticket.id, editData);
      setTicket(updatedTicket);
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du ticket:', err);
      setError('Erreur lors de la mise à jour du ticket');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (newStatus: 'open' | 'pending' | 'closed') => {
    if (!ticket) return;
    
    try {
      setLoading(true);
      const updatedTicket = await updateTicketStatus(ticket.id, newStatus);
      setTicket(updatedTicket);
      // Mettre à jour aussi l'état d'édition si on est en mode édition
      if (isEditing) {
        setEditData(prev => ({ ...prev, status: newStatus } as Partial<Ticket>));
      }
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
      setError('Erreur lors du changement de statut');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePriorityChange = async (newPriority: 'low' | 'medium' | 'high' | 'critical') => {
    if (!ticket) return;
    
    try {
      setLoading(true);
      const updatedTicket = await updateTicket(ticket.id, { priority: newPriority });
      setTicket(updatedTicket);
      if (isEditing) {
        setEditData(prev => ({ ...prev, priority: newPriority } as Partial<Ticket>));
      }
    } catch (err) {
      console.error('Erreur lors du changement de priorité:', err);
      setError('Erreur lors du changement de priorité');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteTicket = async () => {
    if (!ticket || !window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) return;
    
    try {
      setLoading(true);
      await deleteTicket(ticket.id);
      navigate('/tickets');
    } catch (err) {
      console.error('Erreur lors de la suppression du ticket:', err);
      setError('Erreur lors de la suppression du ticket');
      setLoading(false);
    }
  };

  const handleMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !ticket || !id) return;
    
    setCommentLoading(true);
    try {
      await addComment(Number(id), newComment, 'Utilisateur actuel'); // À adapter selon votre système d'auth
      setNewComment('');
      // Recharger le ticket pour voir le nouveau commentaire
      const updatedTicket = await fetchTicketById(id);
      setTicket(updatedTicket);
    } catch (err) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
    } finally {
      setCommentLoading(false);
    }
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

  // Gestion des actions rapides
  const quickActions = [
    { 
      title: 'Changer le statut', 
      icon: <Flag />, 
      color: theme.palette.warning.main,
      description: 'Modifier l\'état du ticket',
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setStatusMenuAnchor(e.currentTarget);
      }
    },
    { 
      title: 'Modifier la priorité', 
      icon: <Flag />, 
      color: theme.palette.error.main,
      description: 'Changer le niveau de priorité',
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setPriorityMenuAnchor(e.currentTarget);
      }
    },
    { 
      title: 'Éditer le ticket', 
      icon: <Edit />, 
      color: theme.palette.primary.main,
      description: 'Modifier les détails',
      onClick: () => handleEditClick()
    }
  ];

  // États de chargement et d'erreur
  if (loading) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="xl" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Box textAlign="center">
            <CircularProgress size={60} thickness={3} />
            <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
              Chargement du ticket...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !ticket) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box textAlign="center" py={8}>
            <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="error">
              {error || 'Ticket non trouvé'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<ArrowBack />} 
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Retour à la liste
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* En-tête */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
          <HeaderCard
            title={`Ticket #${ticket.id}`}
            subtitle={ticket.title}
            chips={[
              { 
                label: getStatusInfo(ticket.status).label, 
                color: ticket.status === 'closed' ? 'success' : ticket.status === 'pending' ? 'warning' : 'info',
                variant: 'filled' 
              },
              { 
                label: getPriorityInfo(ticket.priority).label, 
                color: ticket.priority === 'critical' ? 'error' : ticket.priority === 'high' ? 'warning' : 'default',
                variant: 'outlined' 
              },
              { label: ticket.category || 'Sans catégorie', variant: 'outlined' }
            ]}
            addButtonText="Retour à la liste"
            addButtonIcon={<ArrowBack />}
            onAddClick={() => navigate('/')} 
          />
          <IconButton onClick={handleMenuClick} size="large">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Menu contextuel principal */}
        <Menu
          anchorEl={actionsMenuAnchor}
          open={Boolean(actionsMenuAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleEditClick}>
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
          <MenuItem 
            onClick={() => {
              handleMenuClose();
              handleDeleteTicket();
            }} 
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Supprimer</ListItemText>
          </MenuItem>
        </Menu>

        {/* Menu de changement de statut */}
        <Menu
          anchorEl={statusMenuAnchor}
          open={Boolean(statusMenuAnchor)}
          onClose={() => setStatusMenuAnchor(null)}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {statuses.map((status) => (
            <MenuItem 
              key={status.value}
              onClick={() => {
                handleStatusChange(status.value as 'open' | 'pending' | 'closed');
                setStatusMenuAnchor(null);
              }}
              selected={ticket?.status === status.value}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: status.color
                  }}
                />
              </ListItemIcon>
              <ListItemText>{status.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        {/* Menu de changement de priorité */}
        <Menu
          anchorEl={priorityMenuAnchor}
          open={Boolean(priorityMenuAnchor)}
          onClose={() => setPriorityMenuAnchor(null)}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {priorities.map((priority) => (
            <MenuItem 
              key={priority.value}
              onClick={() => {
                handlePriorityChange(priority.value as 'low' | 'medium' | 'high' | 'critical');
                setPriorityMenuAnchor(null);
              }}
              selected={ticket?.priority === priority.value}
            >
              <ListItemIcon>
                <Flag sx={{ color: priority.color, fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText>{priority.label}</ListItemText>
            </MenuItem>
          ))}
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
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={editData.description || ''}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                  />
                ) : (
                  ticket.description || 'Aucune description disponible'
                )}
              </Typography>
            </Paper>

            {/* Historique et commentaires */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timeline color="primary" />
                Historique et commentaires
                <Chip label={ticket.comments?.length || 0} size="small" color="primary" />
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {/* Liste des commentaires */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {ticket.comments && ticket.comments.length > 0 ? (
                  ticket.comments.map((comment) => (
                    <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                        {comment.authorName?.substring(0, 2).toUpperCase() || 'U'}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {comment.authorName || 'Utilisateur'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTimeAgo(comment.createdAt)}
                          </Typography>
                        </Box>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.grey[500], 0.05),
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
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                    Aucun commentaire pour le moment
                  </Typography>
                )}
              </Box>

              {/* Nouveau commentaire */}
              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ajouter un commentaire
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                    U
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
                        disabled={commentLoading || !newComment.trim()}
                        sx={{ borderRadius: 2 }}
                      >
                        {commentLoading ? 'Envoi...' : 'Commenter'}
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
              </Box>
            </ActivityCard>

            {/* Actions rapides */}
            <ActivityCard
              title="Actions rapides"
              icon={<Flag color="primary" />}
              iconBackground={theme.palette.primary.main}
            >
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleSaveEdit}
                    fullWidth
                    disabled={!editData.title || !editData.description}
                  >
                    Enregistrer
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setIsEditing(false)}
                    fullWidth
                  >
                    Annuler
                  </Button>
                </Box>
              ) : (
                quickActions.map((action, index) => (
                  <Box
                    key={index}
                    onClick={action.onClick}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        background: alpha(action.color, 0.08),
                        transform: 'translateX(4px)',
                      },
                      mb: 2
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
                ))
              )}
            </ActivityCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TicketDetails;