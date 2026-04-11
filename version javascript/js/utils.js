/**
 * utils.js — Utilitaires généraux
 * =====================================================
 * Fonctions utilitaires partagées dans l'application.
 * =====================================================
 */

/**
 * Affiche une notification toast temporaire.
 * @param {string} message - Texte à afficher
 * @param {'success'|'error'} type - Type de notification
 */
export function afficherToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = type === 'success' ? ' ' + message : ' ' + message;
  toast.className = `show ${type}`;
  setTimeout(() => { toast.className = ''; }, 3000);
}

/**
 * Génère un ID unique basé sur le timestamp.
 * (Utilisé uniquement en mode dégradé sans json-server)
 * @returns {number}
 */
export function genererIdUnique() {
  return Date.now();
}

/**
 * Formate une date ISO en date lisible (fr-FR).
 * @param {string} dateISO
 * @returns {string}
 */
export function formaterDate(dateISO) {
  if (!dateISO) return 'N/A';
  return new Date(dateISO).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}