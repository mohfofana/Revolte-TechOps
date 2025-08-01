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
cd Revolte-TechOps/frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du dossier frontend :

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

### 5. Accéder à l'application

Ouvrez votre navigateur à l'adresse : http://localhost:5173

## 🔌 Configuration du Backend

Pour faire fonctionner l'application complète, vous devez également configurer le backend :

1. Suivez les instructions du dépôt backend : [https://github.com/mohfofana/backend_revolt](https://github.com/mohfofana/backend_revolt)
2. Assurez-vous que le serveur backend tourne sur http://localhost:3001

### 2. Configuration du Backend

```bash
# Se déplacer dans le dossier backend
cd ../backend

# Installer les dépendances
npm install

# Créer un fichier .env à la racine du backend avec les variables suivantes :
cp .env.example .env

# Puis éditez le fichier .env avec vos paramètres
```

### 3. Configuration de la Base de Données

1. Créez une base de données PostgreSQL
2. Mettez à jour les informations de connexion dans le fichier `.env` du backend
3. Exécutez les migrations :

```bash
# Dans le dossier backend
npm run typeorm migration:run
```

### 4. Configuration du Frontend

```bash
# Retourner dans le dossier frontend
cd ../frontend

# Installer les dépendances
npm install

# Créer un fichier .env à la racine du frontend
cp .env.example .env

# Mettre à jour les variables d'environnement si nécessaire
```

## 🚀 Lancement de l'Application

### Développement

```bash
# Démarrer le serveur de développement frontend (port 5173 par défaut)
npm run dev

# Dans un autre terminal, démarrer le serveur backend (port 3001 par défaut)
cd ../backend
npm run start:dev
```

### Production

```bash
# Construire l'application frontend
npm run build

# Démarrer le serveur de production frontend
npm run preview

# Pour le backend
cd ../backend
npm run build
npm run start:prod
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

Pour toute question ou suggestion, n'hésitez pas à me contacter à [votre@email.com](mailto:votre@email.com).
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
