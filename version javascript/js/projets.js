/**
 * projets.js — Gestion des projets (CRUD)
 * =====================================================
 * Logique métier pour les projets : création, affichage, suppression.
 * =====================================================
 */

import { afficherToast, formaterDate } from './utils.js';
import { chargerProjetsAPI, ajouterProjetAPI, editerProjetAPI, supprimerProjetAPI } from './api.js';
import { naviguerVers } from './navigation.js';

let projets = []; // Tableau en mémoire

/**
 * Crée et retourne un nœud DOM représentant une carte projet.
 * @param {number|string} id - Identifiant unique du projet
 * @param {string} libelle - Nom/titre du projet
 * @param {string} image - Chemin ou URL de l'image
 * @returns {HTMLElement} La carte DOM prête à insérer
 */
export function creerProjet(id, libelle, image) {
  const carte = document.createElement('article');
  carte.classList.add('projet-card');
  carte.dataset.id = id;

  const corps = document.createElement('div');
  corps.classList.add('card-body');

  const titre = document.createElement('h3');
  titre.textContent = libelle;

  const img = document.createElement('img');
  img.src = image || 'img/placeholder.png';
  img.alt = `Image du projet ${libelle}`;
  img.loading = 'lazy';

  corps.appendChild(titre);
  corps.appendChild(img);

  const actions = document.createElement('div');
  actions.classList.add('card-actions');

  const btnDetail = document.createElement('button');
  btnDetail.classList.add('btn', 'btn-primary');
  btnDetail.innerHTML = ' Détails';
  btnDetail.addEventListener('click', () => detaillerProjet(id));

  const btnSupp = document.createElement('button');
  btnSupp.classList.add('btn', 'btn-danger');
  btnSupp.innerHTML = ' Supprimer';
  btnSupp.addEventListener('click', () => demanderSuppression(id, libelle));

  actions.appendChild(btnDetail);
  actions.appendChild(btnSupp);

  carte.appendChild(corps);
  carte.appendChild(actions);

  return carte;
}

/**
 * Affiche les caractéristiques d'un projet dans la vue détail.
 * @param {number|string} id - Identifiant du projet
 */
export function detaillerProjet(id) {
  const projet = projets.find(p => String(p.id) === String(id));
  if (!projet) {
    afficherToast('Projet introuvable.', 'error');
    return;
  }

  // Stocker l'ID du projet actuellement affiché
  projetDetailActuel = projet;

  const detailNom = document.getElementById('detail-nom');
  const detailImage = document.getElementById('detail-image');
  const detailDescription = document.getElementById('detail-description');
  const detailTechnologies = document.getElementById('detail-technologies');
  const detailDate = document.getElementById('detail-date');

  detailNom.textContent = projet.libelle;
  detailImage.src = projet.image;
  detailImage.alt = `Image du projet ${projet.libelle}`;
  detailDescription.textContent = projet.description;
  detailDate.textContent = formaterDate(projet.dateCreation);

  detailTechnologies.innerHTML = '';
  (projet.technologies || []).forEach(tech => {
    const badge = document.createElement('span');
    badge.classList.add('tech-badge');
    badge.textContent = tech;
    detailTechnologies.appendChild(badge);
  });

  naviguerVers('detail');
}

/**
 * Ouvre le formulaire pour éditer un projet existant.
 * @param {number|string} id - Identifiant du projet
 */
export function editerProjet(id) {
  console.log('[editerProjet] Début avec id:', id);
  
  const projet = projets.find(p => String(p.id) === String(id));
  if (!projet) {
    console.error('[editerProjet] Projet non trouvé avec id:', id);
    afficherToast('Projet introuvable.', 'error');
    return;
  }

  console.log('[editerProjet] Projet trouvé:', projet);

  // Stocker le projet en édition
  projetEnEdition = projet;

  try {
    // Remplir le formulaire d'édition
    console.log('[editerProjet] Remplissage du formulaire...');
    document.getElementById('input-editer-nom').value = projet.libelle;
    document.getElementById('input-editer-description').value = projet.description;
    
    // Récupérer les technologies depuis le tableau du projet
    const technologies = projet.technologies || [];
    document.getElementById('input-editer-tech1').value = technologies[0] || '';
    document.getElementById('input-editer-tech2').value = technologies[1] || '';
    document.getElementById('input-editer-tech3').value = technologies[2] || '';

    // Afficher l'image actuelle
    const imagePreview = document.getElementById('image-editer-preview');
    imagePreview.src = projet.image;
    imagePreview.style.display = 'block';

    console.log('[editerProjet] Formulaire rempli, navigation vers editer');
    // Naviguer vers la vue d'édition
    naviguerVers('editer');
    
  } catch (erreur) {
    console.error('[editerProjet] Erreur lors du remplissage:', erreur);
    afficherToast('Erreur lors de l\'ouverture du formulaire.', 'error');
  }
}

/**
 * Confirme et enregistre l'édition d'un projet.
 * @param {Object} donneesEdition - Données du formulaire d'édition
 */
export async function confirmerEdition(donneesEdition) {
  if (!projetEnEdition) {
    afficherToast('Erreur : aucun projet en édition.', 'error');
    return;
  }

  console.log('[confirmerEdition] Début');

  try {
    // Mettre à jour sur le serveur
    console.log('[confirmerEdition] Appel API editerProjetAPI...');
    await editerProjetAPI(projetEnEdition.id, donneesEdition);
    console.log('[confirmerEdition] API OK');

    // Mettre à jour en mémoire
    const index = projets.findIndex(p => String(p.id) === String(projetEnEdition.id));
    if (index !== -1) {
      projets[index] = { ...projetEnEdition, ...donneesEdition };
    }

    afficherToast('Projet mis à jour avec succès ! ', 'success');

    // Réinitialiser et quitter
    projetEnEdition = null;
    
    console.log('[confirmerEdition] Chargement des projets...');
    await chargerProjets();
    console.log('[confirmerEdition] Projets chargés, navigation vers liste');
    
    console.log('[confirmerEdition] Appel naviguerVers("liste")...');
    naviguerVers('liste');
    console.log('[confirmerEdition] Navigation terminée, vérification vue active...');
    
    // Vérifier que la vue est bien changée
    const vueListe = document.getElementById('view-liste');
    const vueEditer = document.getElementById('view-editer');
    console.log('[confirmerEdition] view-liste active ?', vueListe?.classList.contains('active'));
    console.log('[confirmerEdition] view-editer active ?', vueEditer?.classList.contains('active'));

  } catch (erreur) {
    console.error('Erreur lors de l\'édition :', erreur);
    afficherToast('Impossible de mettre à jour le projet.', 'error');
  }
}

/**
 * Ouvre la modale de confirmation avant suppression.
 * @param {number|string} id - ID du projet
 * @param {string} libelle - Nom du projet
 */
export function demanderSuppression(id, libelle) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalMessage = document.getElementById('modal-message');
  projetASupprimer = id;
  modalMessage.textContent = `Voulez-vous vraiment supprimer le projet "${libelle}" ? Cette action est irréversible.`;
  modalOverlay.classList.add('open');
}

/**
 * Demande la confirmation avant suppression (depuis la vue détail).
 */
export function demanderSuppressionDetail() {
  if (!projetDetailActuel) {
    afficherToast('Erreur : projet introuvable.', 'error');
    return;
  }

  const modalOverlay = document.getElementById('modal-overlay');
  const modalMessage = document.getElementById('modal-message');
  projetASupprimer = projetDetailActuel.id;
  modalMessage.textContent = `Voulez-vous vraiment supprimer le projet "${projetDetailActuel.libelle}" ? Cette action est irréversible.`;
  modalOverlay.classList.add('open');
}

/**
 * Confirme et exécute la suppression.
 */
export async function confirmerSuppression() {
  if (projetASupprimer == null) return;
  const idASupprimer = projetASupprimer;
  fermerModal();
  await supprimerProjet(idASupprimer);
}

/**
 * Supprime définitivement un projet.
 * @param {number|string} id - Identifiant du projet
 */
export async function supprimerProjet(id) {
  try {
    await supprimerProjetAPI(id);

    const index = projets.findIndex(p => String(p.id) === String(id));
    const nomProjet = index !== -1 ? projets[index].libelle : 'Projet';
    if (index !== -1) projets.splice(index, 1);

    const carte = document.querySelector(`[data-id="${id}"]`);
    if (carte) {
      carte.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      carte.style.opacity = '0';
      carte.style.transform = 'scale(0.9)';
      setTimeout(() => carte.remove(), 300);
    }

    if (projets.length === 0) {
      setTimeout(() => afficherEtatVide(), 350);
    }

    afficherToast(`Projet "${nomProjet}" supprimé.`);
    chargerProjets();

  } catch (erreur) {
    console.error('[supprimerProjet] Erreur :', erreur);
    afficherToast('Impossible de supprimer le projet.', 'error');
    throw erreur;
  }
}

/**
 * Ajoute un nouveau projet.
 * @param {Object} donnees - Données du projet
 */
export async function ajouterProjet(donnees) {
  try {
    const nouveauProjet = {
      libelle: donnees.libelle.trim(),
      image: donnees.image || 'img/placeholder.png',
      description: donnees.description.trim(),
      technologies: donnees.technologies.filter(t => t.trim() !== ''),
      dateCreation: new Date().toISOString().split('T')[0],
    };

    const projetCree = await ajouterProjetAPI(nouveauProjet);

    projets.unshift(projetCree);

    const noeud = creerProjet(projetCree.id, projetCree.libelle, projetCree.image);
    const projetsContainer = document.getElementById('projets-container');
    projetsContainer.insertBefore(noeud, projetsContainer.firstChild);

    const etatVide = projetsContainer.querySelector('.empty-state');
    if (etatVide) etatVide.remove();

    afficherToast(`Projet "${projetCree.libelle}" ajouté avec succès !`);
    chargerProjets();
    return projetCree;

  } catch (erreur) {
    console.error('[ajouterProjet] Erreur :', erreur);
    afficherToast('Impossible d\'ajouter le projet. Vérifiez que json-server est lancé.', 'error');
    throw erreur;
  }
}

/**
 * Charge et affiche tous les projets.
 */
export async function chargerProjets() {
  const projetsContainer = document.getElementById('projets-container');
  projetsContainer.innerHTML = '<div class="loading-wrapper"><div class="spinner"></div></div>';

  try {
    const donnees = await chargerProjetsAPI();
    projets = donnees;

    projetsContainer.innerHTML = '';

    if (projets.length === 0) {
      afficherEtatVide();
      return;
    }

    [...projets].reverse().forEach(projet => {
      const noeud = creerProjet(projet.id, projet.libelle, projet.image);
      projetsContainer.appendChild(noeud);
    });

  } catch (erreur) {
    console.error('[chargerProjets] Erreur :', erreur);
    projetsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"></div>
        <p><strong>Impossible de contacter le serveur.</strong></p>
        <p style="margin-top:0.5rem;font-size:0.85rem;">
          Lancez json-server avec la commande :<br>
          <code style="background:#f1f5f9;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.85rem;">
            npx json-server --watch db.json --port 3000
          </code>
        </p>
      </div>`;
  }
}

/**
 * Affiche un message d'état vide.
 */
function afficherEtatVide() {
  const projetsContainer = document.getElementById('projets-container');
  projetsContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon"></div>
      <p>Aucun projet pour l'instant.</p>
      <p style="margin-top:0.5rem;">
        <button id="btn-premier-projet" class="btn btn-success">
          Ajouter votre premier projet
        </button>
      </p>
    </div>`;

  const btnPremierProjet = document.getElementById('btn-premier-projet');
  if (btnPremierProjet) {
    btnPremierProjet.addEventListener('click', () => {
      naviguerVers('ajouter');
    });
  }
}

// Variables pour la modale et édition
let projetASupprimer = null;
let projetEnEdition = null;
let projetDetailActuel = null;

/**
 * Retourne le projet actuellement affiché dans la vue détail.
 */
export function getProjetDetailActuel() {
  return projetDetailActuel;
}

/**
 * Édite le projet actuellement affiché.
 */
export function editerProjetActuel() {
  console.log('[editerProjetActuel] Début', projetDetailActuel);
  
  if (!projetDetailActuel) {
    afficherToast('Erreur : aucun projet affiché.', 'error');
    return;
  }
  
  console.log('[editerProjetActuel] Appel editerProjet avec id:', projetDetailActuel.id);
  editerProjet(projetDetailActuel.id);
}

/**
 * Ferme la modale sans supprimer.
 */
function fermerModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.classList.remove('open');
  projetASupprimer = null;
}