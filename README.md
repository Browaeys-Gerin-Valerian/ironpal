## Configuration Docker

Pour lancer tout les containers: `docker compose up`

ou

Pour lancer tout les containers sans log: `docker compose up`

Pour arreter tout les containers: `docker compose down`

Le fichier docker-compose.yml contient les configurations pour les services suivants :

- backend : Le serveur principal de l'application
- database : La base de données PostgreSQL
- adminer : L'interface web Adminer pour gérer la base de données

### Connexion à Adminer

Ouvrez un navigateur et accédez à l'URL : http://localhost:8080
Vous verrez une interface Adminer. Remplissez les champs avec les informations suivantes :

- Système : PostgreSQL
- Serveur : database
- Utilisateur : le nom d'utilisateur que vous aurez spécifié dans docker.env
- Mot de passe : le mot de passeque vous aurez spécifié dans docker.env
- Base de données : la valeur spécifiée dans docker.env

Cliquez sur "Connecter"
Accès aux données
Une fois connecté via Adminer, vous pouvez :

- Explorer les tables et leurs données
- Exécuter des requêtes SQL
- Créer, modifier ou supprimer des tables et des données

## Naming Conventions

### Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/). Each commit message must be formatted with the following convention:

```md
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Examples:

- feat: add contact form
- fix(lang): fix language typos
- chore(templating): add pull request template

### Branches

We use something similar to our commit naming convention :

```md
<type>/<description>
```

Examples:

- feat/contact-form
- fix/language-typos
- chore/pr-template
