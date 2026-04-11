# 📋 Références HTML — Interactions avec le JavaScript

Ce document mappe tous les éléments HTML avec les interactions JavaScript correspondantes.

---

## 🧭 Navigation & Affichage des Vues

| HTML ID / Sélecteur | Type | Interaction | Fonction/Fichier |
|---|---|---|---|
| `nav a[data-view]` | Liens de navigation | Au clic : navigue vers la vue correspondante | `naviguerVers()` (navigation.js) / app.js:L19 |
| `.view` (sections) | Conteneurs de vue | Classe `.active` ajoutée/supprimée | `naviguerVers()` (navigation.js) |
| `#view-accueil` | Section | Affichage initial | navigation.js |
| `#view-liste` | Section | Affiche tous les projets | projets.js:chargerProjets() |
| `#view-ajouter` | Section | Contient le formulaire d'ajout | index.html:L115 |
| `#view-detail` | Section | Affiche les détails d'un projet | projets.js:detaillerProjet() |
| `#view-editer` | Section | Contient le formulaire d'édition | index.html:L195 |
| `#view-contact` | Section | Contient le formulaire de contact | index.html:L240 |

---

## ➕ Formulaire d'Ajout de Projet

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#form-ajouter` | Formulaire | Soumission | formulaires.js:gererSoumissionFormulaire() / app.js:L33 |
| `#input-nom` | Input texte | Nom du projet | formulaires.js:L44 |
| `#input-description` | Textarea | Description | formulaires.js:L45 |
| `#input-tech1` | Input texte | Technologie 1 (obligatoire) | formulaires.js:L46-48 |
| `#input-tech2` | Input texte | Technologie 2 (optionnelle) | formulaires.js:L47 |
| `#input-tech3` | Input texte | Technologie 3 (optionnelle) | formulaires.js:L47 |
| `#input-image` | Input file | Sélection image | formulaires.js:gererPreviewImage() / app.js:L34 |
| `#image-preview` | Balise img | Aperçu de l'image | formulaires.js:gererPreviewImage():L22 |
| `#btn-submit-ajouter` | Bouton submit | Soumission du formulaire | formulaires.js:gererSoumissionFormulaire() / app.js:L33 |
| `#btn-annuler` | Bouton | Réinitialise le formulaire, retour liste | app.js:L37 |
| `#btn-retour-ajouter` | Bouton | Retour à la liste | app.js:L49 |

---

## ✏️ Formulaire d'Édition (NOUVEAU)

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#form-editer` | Formulaire | Soumission d'édition | formulaires.js:gererSoumissionEdition() / app.js:L87 |
| `#input-editer-nom` | Input texte | Nom du projet (édition) | formulaires.js:gererSoumissionEdition():L103 / projets.js:editerProjet():L120 |
| `#input-editer-description` | Textarea | Description (édition) | formulaires.js:gererSoumissionEdition():L104 / projets.js:editerProjet():L121 |
| `#input-editer-tech1` | Input texte | Technologie 1 (édition) | formulaires.js:gererSoumissionEdition():L105 / projets.js:editerProjet():L122 |
| `#input-editer-tech2` | Input texte | Technologie 2 (édition) | formulaires.js:gererSoumissionEdition():L106 / projets.js:editerProjet():L123 |
| `#input-editer-tech3` | Input texte | Technologie 3 (édition) | formulaires.js:gererSoumissionEdition():L107 / projets.js:editerProjet():L124 |
| `#input-editer-image` | Input file | Sélection nouvelle image | formulaires.js:gererPreviewImageEdition() / app.js:L88 |
| `#image-editer-preview` | Balise img | Aperçu de l'image (édition) | formulaires.js:gererPreviewImageEdition():L93 / projets.js:editerProjet():L128 |
| `#btn-submit-editer` | Bouton submit | Sauvegarde l'édition | formulaires.js:gererSoumissionEdition() / app.js:L87 |
| `#btn-annuler-editer` | Bouton | Annule l'édition, retour détail | app.js:L90 |
| `#btn-retour-detail` | Bouton | Retour à la vue détail | app.js:L97 |

---

## 🔍 Vue Détail d'un Projet

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#detail-nom` | Heading h1 | Titre du projet | projets.js:detaillerProjet():L81 |
| `#detail-image` | Balise img | Image du projet | projets.js:detaillerProjet():L82 |
| `#detail-description` | Paragraphe p | Description complète | projets.js:detaillerProjet():L85 |
| `#detail-technologies` | Conteneur div | Liste des technologies (badges) | projets.js:detaillerProjet():L91-96 |
| `#detail-date` | Span | Date de création formatée | projets.js:detaillerProjet():L86 |
| `#btn-retour-liste` | Bouton | Retour à la liste | app.js:L62 |
| `#btn-editer-projet` | Bouton | Ouvrir le formulaire d'édition | projets.js:editerProjet() |
| `#btn-supprimer-detail` | Bouton | Supprimer le projet affiché | projets.js:demanderSuppressionDetail() / app.js:L99 |

---

## 📦 Liste des Projets

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#projets-container` | Div (flexbox) | Conteneur des cartes projet | projets.js:chargerProjets():L172 |
| `.projet-card` | Article (carte) | Conteneur d'un projet | projets.js:creerProjet():L22-60 |
| `[data-id]` | Attribut data | Stocke l'ID du projet | projets.js:creerProjet():L26 / projets.js:supprimerProjet():L206 |
| `.projet-card h3` | Heading h3 | Titre du projet dans la carte | projets.js:creerProjet():L30 |
| `.projet-card img` | Balise img | Image miniature | projets.js:creerProjet():L34 |
| `.card-actions` | Div | Conteneur des boutons d'action | projets.js:creerProjet():L42 |
| `.btn-primary` (Détails) | Bouton | Affiche les détails | projets.js:creerProjet():L45-48 → detaillerProjet() |
| `.btn-primary` (Éditer) | Bouton | Ouvre le formulaire d'édition | projets.js:creerProjet():L50-53 → editerProjet() |
| `.btn-danger` (Supprimer) | Bouton | Demande confirmation suppression | projets.js:creerProjet():L55-58 → demanderSuppression() |
| `#btn-nouveau-projet` | Bouton (+ nav fixes) | Crée un nouveau projet | app.js:L51 → naviguerVers('ajouter') |

---

## 📧 Formulaire de Contact

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#form-contact` | Formulaire | Soumission | formulaires.js:gererSoumissionContact() / app.js:L35 |
| `#input-contact-nom` | Input texte | Nom (contact) | formulaires.js:gererSoumissionContact():L119 |
| `#input-contact-email` | Input email | Email (contact) | formulaires.js:gererSoumissionContact():L120 |
| `#input-contact-message` | Textarea | Message | formulaires.js:gererSoumissionContact():L121 |
| `#btn-contact-envoyer` | Bouton submit | Soumet le message | formulaires.js:gererSoumissionContact() / app.js:L35 |

---

## 🗑️ Modale de Suppression

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#modal-overlay` | Div | Fond sombre de la modale | projets.js:demanderSuppression():L176 / projets.js:confirmerSuppression() |
| `#modal-message` | Texte dans modale | Message de confirmation | projets.js:demanderSuppression():L177 |
| `#btn-confirmer-suppression` | Bouton | Confirme la suppression | projets.js:confirmerSuppression() / app.js:L74 |
| `#btn-annuler-suppression` | Bouton | Annule la suppression | app.js:L75 |

---

## 🔔 Notifications & Feedback

| HTML ID | Type | Utilisation | Fichier |
|---|---|---|---|
| `#toast` | Div | Conteneur des notifications Toast | utils.js:afficherToast():L14-26 |

---

## 📊 API & État Global

| Variable JS | Fichier | Utilisation |
|---|---|---|
| `projets[]` | projets.js:L12 | Tableau en mémoire de tous les projets |
| `projetASupprimer` | projets.js:L256 | ID du projet en attente de suppression |
| `projetEnEdition` | projets.js:L257 | Objet projet actuellement en édition |
| `projetDetailActuel` | projets.js:L258 | Objet projet actuellement affiché en détail |

---

## 🔗 Flux d'Interactions Principales

### Cycle Complet : Ajouter un Projet
1. Clic sur `#btn-nouveau-projet` → `naviguerVers('ajouter')`
2. Saisie dans `#input-nom`, `#input-description`, `#input-tech1-3`, `#input-image`
3. Preview image : `#input-image` change → `gererPreviewImage()` → `#image-preview` affichée
4. Submit `#form-ajouter` → `gererSoumissionFormulaire()` → `ajouterProjet()` → `editerProjetAPI(POST)` → db.json
5. Retour `naviguerVers('liste')` → `chargerProjets()` → affiche `#projets-container`

### Cycle Complet : Éditer un Projet
1. Clic sur `.btn-primary` (Éditer dans carte) → `editerProjet(id)`
2. Remplissage : `projetDetailActuel = projet` + valeurs dans `#input-editer-*`
3. `naviguerVers('editer')`
4. Submit `#form-editer` → `gererSoumissionEdition()` → `confirmerEdition()` → `editerProjetAPI(PUT)` → db.json
5. `chargerProjets()` tout recharger → `naviguerVers('liste')`

### Cycle Complet : Voir Détails
1. Clic sur `.btn-primary` (Détails) dans carte → `detaillerProjet(id)`
2. `projetDetailActuel = projet` + remplissage `#detail-nom`, `#detail-image`, etc.
3. `naviguerVers('detail')`
4. Options : Éditer (`#btn-editer-projet`), Supprimer (`#btn-supprimer-detail`), ou Retour (`#btn-retour-liste`)

### Cycle Complet : Supprimer
1. **Depuis liste** : Clic `.btn-danger` dans carte → `demanderSuppression(id, libelle)`
2. **Depuis détail** : Clic `#btn-supprimer-detail` → `demanderSuppressionDetail()`
3. Modale affichée avec `#modal-overlay.open`
4. Clic `#btn-confirmer-suppression` → `confirmerSuppression()` → `supprimerProjetAPI(DELETE)` → db.json
5. DOM mis à jour : animation puis `.remove()`

---

## 📝 Notes Techniques

- **Validation** : Champs obligatoires en front (`required` HTML5)
- **Images** : Conversion en base64 par FileReader avant stockage
- **Transitions** : Animations CSS pour les suppressions (`opacity` + `transform`)
- **État Local** : Variables globales pour modale + édition + détail (pas de framework)
- **API REST** : json-server (GET, POST, PUT, DELETE sur http://localhost:3000/projets)
- **Persistance** : Synchronisation double (API + mémoire locale `projets[]`)

---

**Dernier mise à jour** : Après implémentation de l'édition (✏️ Éditer)
