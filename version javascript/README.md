# 📁 Portfolio SPA — Vanilla JS + json-server

Application Web **SPA (Single Page Application)** de gestion de portfolio développée en Vanilla JavaScript, avec persistance des données via un serveur REST factice (json-server).

---

## 🚀 Installation & Lancement

### Prérequis
- [Node.js](https://nodejs.org/) installé (v14+)

### Étapes

```bash
# 1. Cloner / extraire le projet
cd portfolio-spa

# 2. Installer json-server globalement (ou en local)
npm install -g json-server
# ou localement :
npm install --save-dev json-server

# 3. Lancer le serveur REST factice
npx json-server --watch db.json --port 3000

# 4. Ouvrir index.html dans un navigateur
#    (avec Live Server de VS Code, ou un serveur local)
#    NE PAS ouvrir directement en file:// à cause des requêtes fetch
```

> ⚠️ **Important** : json-server doit être lancé **avant** d'ouvrir l'application, sinon les projets ne se chargeront pas.

---

## 🏗️ Architecture du projet

```
portfolio-spa/
│
├── index.html          ← Page unique de la SPA (toutes les vues)
├── db.json             ← Base de données JSON (json-server)
│
├── css/
│   └── styles.css      ← Styles CSS (variables, layout, composants)
│
├── js/
│   └── app.js          ← Logique JavaScript principale
│
└── img/
    ├── logo.jpeg
    ├── image1.png
    ├── image2.jpg
    └── image3.jpg
```

---

## ⚙️ API REST (json-server)

| Méthode | Endpoint           | Action                    |
|---------|--------------------|---------------------------|
| GET     | `/projets`         | Récupérer tous les projets|
| GET     | `/projets/:id`     | Récupérer un projet       |
| POST    | `/projets`         | Créer un nouveau projet   |
| PUT     | `/projets/:id`     | Modifier un projet        |
| DELETE  | `/projets/:id`     | Supprimer un projet       |

---

## 📋 Fonctions JavaScript principales

### `creerProjet(id, libelle, image)`
Crée et retourne un **nœud DOM** (carte projet) sans l'insérer dans le DOM.
Le nœud est ensuite inséré comme **premier élément** du conteneur flexbox via `insertBefore`.

### `ajouterProjet(donnees)`
- Envoie une requête **POST** à json-server
- Stocke le projet dans le tableau `projets[]` en mémoire
- Insère la carte en **tête** du conteneur avec `insertBefore(noeud, firstChild)`

### `detaillerProjet(id)`
- Recherche le projet dans `projets[]` (mémoire)
- Peuple la vue détail avec les caractéristiques du projet
- Navigue vers la vue détail

### `supprimerProjet(id)`
- Envoie une requête **DELETE** à json-server
- Retire le projet de `projets[]`
- Retire la carte du DOM avec animation de sortie

---

## 💬 Messages de commit Git recommandés

```bash
# Initialisation
git init
git add .
git commit -m "feat: initialisation du projet Portfolio SPA"

# Structure HTML SPA
git add index.html
git commit -m "feat(html): mise en place du squelette SPA avec les 5 vues (accueil, liste, ajouter, detail, contact)"

# Styles CSS
git add css/styles.css
git commit -m "style(css): ajout de la feuille de styles principale — variables CSS, layout flexbox, composants carte et formulaire"

# Base de données json-server
git add db.json
git commit -m "feat(data): ajout de db.json avec 3 projets de départ pour json-server"

# Tableau mémoire et références DOM
git commit -m "feat(js): déclaration du tableau projets[] et référencement de tous les éléments HTML dans l'objet DOM"

# Fonction creerProjet
git commit -m "feat(js): implémentation de creerProjet() — création du nœud DOM carte projet inséré en 1er dans le conteneur flexbox"

# Fonction ajouterProjet
git commit -m "feat(js): implémentation de ajouterProjet() — requête POST json-server + stockage mémoire + insertion DOM en tête"

# Fonction detaillerProjet
git commit -m "feat(js): implémentation de detaillerProjet() — affichage des caractéristiques d'un projet dans la vue détail"

# Fonction supprimerProjet
git commit -m "feat(js): implémentation de supprimerProjet() — requête DELETE json-server + suppression mémoire + retrait DOM animé"

# Chargement initial API
git commit -m "feat(js): ajout de chargerProjets() — chargement GET depuis json-server au démarrage et reconstruction du DOM"

# Routeur SPA
git commit -m "feat(js): ajout du routeur SPA naviguerVers() — gestion des vues et de l'état actif de la navigation"

# Formulaire et validation
git commit -m "feat(js): gestion du formulaire d'ajout — validation, prévisualisation image, soumission asynchrone"

# Modal de confirmation
git commit -m "feat(js): ajout de la modale de confirmation avant suppression d'un projet"

# Toast notifications
git commit -m "feat(js): ajout du système de notifications toast (succès/erreur)"

# Initialisation et écouteurs
git commit -m "feat(js): fonction initialiser() — attachement de tous les écouteurs d'événements et démarrage de l'app"

# Finalisation
git add .
git commit -m "chore: finalisation du portfolio SPA — styles responsive, états vides, spinner de chargement"
```

---

## 🛠️ Technologies utilisées

- **HTML5** — Structure sémantique SPA
- **CSS3** — Variables CSS, Flexbox, animations, responsive
- **JavaScript ES6+** — Async/Await, Fetch API, DOM manipulation
- **json-server** — Serveur REST factice pour la persistance

---

*© 2026 G4 Fullstack Portfolio*
