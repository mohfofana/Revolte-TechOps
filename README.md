# Revolte-TechOps - Application de Gestion de Tickets (Frontend)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-9.0.0-e0234e.svg)](https://nestjs.com/)

Application web de gestion de tickets développée avec React, TypeScript, NestJS et PostgreSQL.

## 🚀 Fonctionnalités

- 📝 Création et gestion des tickets
- 🔍 Filtrage et recherche avancée
- 💬 Système de commentaires
- 📎 Gestion des pièces jointes
- 📊 Tableau de bord avec statistiques
- 🌓 Mode clair/sombre
- 📱 Interface responsive

## 🛠 Prérequis

- Node.js (v16+)
- npm ou yarn
- PostgreSQL (v13+)
- Git

## 🏗 Structure du Projet

Ce dépôt contient uniquement le frontend de l'application Revolte-TechOps. Le backend se trouve dans un dépôt séparé :

- **Frontend** (ce dépôt) : https://github.com/mohfofana/Revolte-TechOps
- **Backend** : https://github.com/mohfofana/backend_revolt

## 🚀 Installation

### 1. Cloner le dépôt frontend

```bash
git clone https://github.com/mohfofana/Revolte-TechOps.git
cd Revolte-TechOps
```

### 2. Installer le frontend

```bash
# Se déplacer dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Revenir au dossier parent
cd ..

# Supprimer le dossier backend vide (s'il existe)
rm -r -force backend

# Cloner le dépôt backend
git clone https://github.com/mohfofana/backend_revolt.git

# Votre structure de dossiers devrait maintenant être :
# Revolte-TechOps/
#   ├── frontend/    # Dossier du frontend
#   └── backend_revolt/  # Dossier du backend

# Suivez les instructions d'installation du backend
cd backend_revolt
npm install
```

### 4. Démarrer les serveurs

#### Dans un premier terminal (backend) :
```bash
cd backend_revolt
npm run start:dev
```

#### Dans un deuxième terminal (frontend) :
```bash
cd frontend
npm run dev
```

### 5. Accéder aux applications

- **Frontend** : http://localhost:5173
- **Documentation API (Swagger)** : http://localhost:3001/api/docs



## 🚀 Lancement de l'Application

### Développement

```bash
# Démarrer le serveur de développement frontend (port 5173 par défaut)
npm run dev

# Dans un autre terminal, démarrer le serveur backend (port 3001 par défaut)
cd ../backend
npm run start:dev
```

## 📂 Structure du Projet

```
revolte-techops/
├── frontend/               # Application React/TypeScript
│   ├── public/            # Fichiers statiques
│   ├── src/               # Code source du frontend
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services API
│   │   ├── styles/        # Fichiers de style
│   │   └── types/         # Définitions de types TypeScript
│   └── ...
└── backend/               # API NestJS
    ├── src/
    │   ├── modules/      # Modules de l'application
    │   │   ├── tickets/  # Gestion des tickets
    │   │   ├── users/    # Gestion des utilisateurs
    │   │   └── ...
    │   └── ...
    └── ...
```

## 🛠 Technologies Utilisées

### Frontend
- React 18
- TypeScript
- Material-UI
- React Query
- React Router
- Vite
- Axios

### Backend
- NestJS
- TypeORM
- PostgreSQL
- JWT (Authentification)
- Class-validator
- Swagger (Documentation API)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [TypeORM](https://typeorm.io/)

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter à [mohamedaboubakar.fofana@gmail.com](mailto:mohamedaboubakar.fofana@gmail.com).
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
