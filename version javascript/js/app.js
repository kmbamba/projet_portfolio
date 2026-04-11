/**
 * app.js — Point d'entrée de l'application Portfolio SPA
 * =====================================================
 * Initialise l'application et attache les écouteurs d'événements.
 * =====================================================
 */

import { naviguerVers } from './navigation.js';
import { gererSoumissionFormulaire, gererPreviewImage, gererSoumissionContact, gererPreviewImageEdition } from './formulaires.js';
import { confirmerSuppression, chargerProjets, demanderSuppressionDetail, editerProjetActuel } from './projets.js';

// ╔══════════════════════════════════════════════════════════╗
// ║  INITIALISATION — ÉCOUTEURS D'ÉVÉNEMENTS                ║
// ╚══════════════════════════════════════════════════════════╝

/**
 * Point d'entrée de l'application.
 * Attache tous les écouteurs et charge la vue initiale.
 */
function initialiser() {
  // ── Navigation SPA (liens de la navbar) ─────────────────
  const navLinks = document.querySelectorAll('nav a[data-view]');
  navLinks.forEach(lien => {
    lien.addEventListener('click', (e) => {
      e.preventDefault();
      naviguerVers(lien.dataset.view);
      if (lien.dataset.view === 'liste') chargerProjets();
    });
  });

  // ── Formulaire d'ajout ───────────────────────────────────
  const formAjouter = document.getElementById('form-ajouter');
  const inputImage = document.getElementById('input-image');
  const btnAnnuler = document.getElementById('btn-annuler');
  const formContact = document.getElementById('form-contact');

  formAjouter.addEventListener('submit', gererSoumissionFormulaire);
  formContact.addEventListener('submit', gererSoumissionContact);
  inputImage.addEventListener('change', gererPreviewImage);

  // Bouton annuler → retour à la liste
  btnAnnuler.addEventListener('click', () => {
    formAjouter.reset();
    const imagePreview = document.getElementById('image-preview');
    imagePreview.style.display = 'none';
    naviguerVers('liste');
    chargerProjets();
  });

  // ── Boutons de navigation fixes ─────────────────────────
  const btnNouveauProjet = document.getElementById('btn-nouveau-projet');
  const btnRetourAjouter = document.getElementById('btn-retour-ajouter');
  if (btnNouveauProjet) {
    btnNouveauProjet.addEventListener('click', () => {
      naviguerVers('ajouter');
    });
  }
  if (btnRetourAjouter) {
    btnRetourAjouter.addEventListener('click', () => {
      naviguerVers('liste');
      chargerProjets();
    });
  }

  // ── Retour depuis la vue détail ──────────────────────────
  const btnRetourListe = document.getElementById('btn-retour-liste');
  btnRetourListe.addEventListener('click', () => {
    naviguerVers('liste');
    chargerProjets();
  });

  // ── Modale de suppression ────────────────────────────────
  const btnConfirmerSup = document.getElementById('btn-confirmer-suppression');
  const btnAnnulerSup = document.getElementById('btn-annuler-suppression');
  const modalOverlay = document.getElementById('modal-overlay');

  btnConfirmerSup.addEventListener('click', confirmerSuppression);
  btnAnnulerSup.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });
  // Fermer en cliquant sur l'overlay
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
  });

  // ── Formulaire d'édition ─────────────────────────────────
  const formEditer = document.getElementById('form-editer');
  const inputImageEditer = document.getElementById('input-editer-image');
  const btnAnnulerEditer = document.getElementById('btn-annuler-editer');
  const btnRetourDetail = document.getElementById('btn-retour-detail');
  const btnEditerProjet = document.getElementById('btn-editer-projet');
  const btnSupprimerDetail = document.getElementById('btn-supprimer-detail');

  console.log('[app.js] formEditer trouvé ?', formEditer);
  console.log('[app.js] inputImageEditer trouvé ?', inputImageEditer);
  console.log('[app.js] btnEditerProjet trouvé ?', btnEditerProjet);

  // Listeners pour l'édition seront attachés lors de la navigation vers la vue éditer
  
  if (inputImageEditer) inputImageEditer.addEventListener('change', gererPreviewImageEdition);

  if (btnAnnulerEditer) {
    btnAnnulerEditer.addEventListener('click', () => {
      formEditer.reset();
      const imagePreview = document.getElementById('image-editer-preview');
      imagePreview.style.display = 'none';
      naviguerVers('detail');
    });
  }

  if (btnRetourDetail) {
    btnRetourDetail.addEventListener('click', () => {
      naviguerVers('detail');
    });
  }

  if (btnSupprimerDetail) {
    btnSupprimerDetail.addEventListener('click', demanderSuppressionDetail);
  }

  if (btnEditerProjet) {
    btnEditerProjet.addEventListener('click', editerProjetActuel);
  }

  // ── Vue initiale : Accueil ───────────────────────────────
  naviguerVers('accueil');
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initialiser);
