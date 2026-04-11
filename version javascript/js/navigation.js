/**
 * navigation.js — Gestion de la navigation SPA
 * =====================================================
 * Routage côté client pour les vues de l'application.
 * =====================================================
 */

import { gererSoumissionEdition } from './formulaires.js';

let editListenersAttached = false;

/**
 * Navigue vers une vue donnée (routing SPA côté client).
 * @param {string} viewId - ID de la vue à afficher (ex: 'liste')
 */
export function naviguerVers(viewId) {
  console.log('[naviguerVers] Navigation vers:', viewId);
  console.trace(); // Affiche la pile d'appels
  
  // Masquer toutes les vues
  const views = document.querySelectorAll('.view');
  console.log('[naviguerVers] Nombre de vues trouvées:', views.length);
  views.forEach(v => v.classList.remove('active'));

  // Afficher la vue cible
  const cibleId = `view-${viewId}`;
  console.log('[naviguerVers] Recherche élément avec ID:', cibleId);
  const cible = document.getElementById(cibleId);
  console.log('[naviguerVers] Élément trouvé ?', cible);
  
  if (cible) {
    console.log('[naviguerVers] Activation de la vue:', cibleId);
    cible.classList.add('active');
  } else {
    console.error('[naviguerVers] VUE NON TROUVÉE:', cibleId);
  }

  // Attacher les listeners pour la vue éditer si nécessaire
  if (viewId === 'editer' && !editListenersAttached) {
    console.log('[naviguerVers] Attachement des listeners pour la vue éditer');
    const formEditer = document.getElementById('form-editer');
    if (formEditer) {
      formEditer.addEventListener('submit', gererSoumissionEdition);
      console.log('[naviguerVers] Listener submit attaché sur form-editer');
    }
    const btnSubmitEditer = document.getElementById('btn-submit-editer');
    if (btnSubmitEditer) {
      btnSubmitEditer.addEventListener('click', (e) => {
        console.log('[naviguerVers] Bouton Enregistrer cliqué');
        e.preventDefault();
        gererSoumissionEdition(e);
      });
      console.log('[naviguerVers] Listener click attaché sur btn-submit-editer');
    }
    editListenersAttached = true;
  }

  // Mettre à jour l'état actif dans la nav
  const navLinks = document.querySelectorAll('nav a[data-view]');
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.view === viewId);
  });
}