import { useState } from 'react';
import { 
  Container, 
  Box, 
  useTheme,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  Add,
  ArrowBack,
  Save,
  Send,
  Attachment,
  Person,
  Category,
  Flag,
  Schedule,
  Help
} from '@mui/icons-material';

// Import des composants personnalisés
import { HeaderCard, ActivityCard } from '../components/dashboard';

// Interface pour le formulaire du ticket
interface TicketForm {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: string;
  tags: string[];
}

const NewTicket = () => {
  const theme = useTheme();
 
  const [form, setForm] = useState<TicketForm>({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    assignee: '',
    tags: [],
  });
  
  const [newTag, setNewTag] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Options pour les selects
  const priorities = [
    { value: 'low', label: 'Faible', color: theme.palette.success.main },
    { value: 'medium', label: 'Moyen', color: theme.palette.warning.main },
    { value: 'high', label: 'Élevé', color: theme.palette.error.main },
    { value: 'urgent', label: 'Urgent', color: theme.palette.error.dark }
  ];

  const categories = [
    'Bug Report',
    'Feature Request',
    'Support',
    'Documentation',
    'Performance',
    'Security'
  ];

  const assignees = [
    'Jean Dupont',
    'Marie Martin',
    'Pierre Durand',
    'Sophie Lemoine',
    'Non assigné'
  ];

  const handleInputChange = (
    field: keyof TicketForm, 
    value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string[]
  ) => {
    // Si c'est un événement de changement (comme pour les champs de texte)
    if (typeof value !== 'string' && !Array.isArray(value) && value?.target) {
      const target = value.target as HTMLInputElement | HTMLTextAreaElement;
      value = target.value;
    }
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setLoading(true);
    try {
      // Simulation d'une requête
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Ticket créé:', { ...form, isDraft });
      setSuccess(true);
      
      // Reset form après succès
      setTimeout(() => {
        setForm({
          title: '',
          description: '',
          priority: 'medium',
          category: '',
          assignee: '',
          tags: [],
        });
        setSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || theme.palette.grey[500];
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* En-tête */}
        <HeaderCard
          title="Nouveau ticket"
          subtitle="Créez un nouveau ticket pour signaler un problème ou demander une fonctionnalité"
          chips={[
            { label: "Brouillon auto-sauvé", color: 'info', variant: 'outlined' },
            { label: `${form.tags.length} tags`, variant: 'outlined' },
            { 
              label: priorities.find(p => p.value === form.priority)?.label || 'Moyen', 
              color: form.priority === 'urgent' ? 'error' : form.priority === 'high' ? 'warning' : 'default',
              variant: 'outlined' 
            }
          ]}
          addButtonText="Retour au dashboard"
          addButtonIcon={<ArrowBack />}
        />

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Ticket créé avec succès ! Vous allez être redirigé vers la liste des tickets.
          </Alert>
        )}

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
          {/* Formulaire principal */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Add color="primary" />
              Informations du ticket
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Titre */}
              <TextField
                fullWidth
                label="Titre du ticket"
                value={form.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Décrivez brièvement le problème ou la demande..."
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Description détaillée"
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez en détail le problème, les étapes pour le reproduire, le comportement attendu..."
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              {/* Ligne avec Priorité et Catégorie */}
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    value={form.priority}
                    label="Priorité"
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Flag sx={{ color: priority.color, fontSize: 16 }} />
                          {priority.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={form.category}
                    label="Catégorie"
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Category sx={{ fontSize: 16 }} />
                          {category}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Assigné */}
              <FormControl fullWidth>
                <InputLabel>Assigné à</InputLabel>
                <Select
                  value={form.assignee}
                  label="Assigné à"
                  onChange={(e) => handleInputChange('assignee', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {assignees.map((assignee) => (
                    <MenuItem key={assignee} value={assignee}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ fontSize: 16 }} />
                        {assignee}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Tags */}
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tags (optionnel)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {form.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Ajouter un tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    sx={{ 
                      flexGrow: 1,
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    sx={{ borderRadius: 2, minWidth: 'auto', px: 2 }}
                  >
                    <Add />
                  </Button>
                </Box>
              </Box>

              {/* Boutons d'action */}
              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={() => handleSubmit(false)}
                  disabled={loading || !form.title.trim() || !form.description.trim()}
                  sx={{ borderRadius: 2 }}
                >
                  {loading ? 'Création...' : 'Créer le ticket'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={() => handleSubmit(true)}
                  disabled={loading}
                  sx={{ borderRadius: 2 }}
                >
                  Sauvegarder en brouillon
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Panneau latéral */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Actions rapides */}
            <ActivityCard
              title="Actions rapides"
              icon={<Help sx={{ color: 'white' }} />}
              iconBackground={theme.palette.info.main}
            >
              {[
                { 
                  title: 'Joindre un fichier', 
                  icon: <Attachment />, 
                  color: theme.palette.primary.main,
                  description: 'Images, logs, captures d\'écran'
                },
                { 
                  title: 'Modèles de ticket', 
                  icon: <Category />, 
                  color: theme.palette.success.main,
                  description: 'Utiliser un modèle pré-défini'
                },
                { 
                  title: 'Programmer l\'envoi', 
                  icon: <Schedule />, 
                  color: theme.palette.warning.main,
                  description: 'Envoyer le ticket plus tard'
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

            {/* Aperçu du ticket */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Aperçu
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Titre
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {form.title || 'Titre du ticket...'}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Priorité
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Flag sx={{ color: getPriorityColor(form.priority), fontSize: 16 }} />
                    <Typography variant="body2">
                      {priorities.find(p => p.value === form.priority)?.label}
                    </Typography>
                  </Box>
                </Box>

                {form.category && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Catégorie
                    </Typography>
                    <Typography variant="body2">
                      {form.category}
                    </Typography>
                  </Box>
                )}

                {form.tags.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                      {form.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NewTicket;