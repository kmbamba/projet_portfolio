/**
 * api.js — Gestion de l'API json-server
 * =====================================================
 * Toutes les requêtes HTTP vers json-server.
 * =====================================================
 */

const API_URL = 'http://localhost:3001/projets';

/**
 * Charge tous les projets depuis json-server.
 * @returns {Promise<Array>} Liste des projets
 */
export async function chargerProjetsAPI() {
  const reponse = await fetch(API_URL);
  if (!reponse.ok) throw new Error(`Erreur serveur : ${reponse.status}`);
  return await reponse.json();
}

/**
 * Ajoute un nouveau projet via POST.
 * @param {Object} projet - Données du projet
 * @returns {Promise<Object>} Projet créé avec ID
 */
export async function ajouterProjetAPI(projet) {
  const reponse = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projet),
  });
  if (!reponse.ok) throw new Error(`Erreur serveur : ${reponse.status}`);
  return await reponse.json();
}

/**
 * Édite un projet existant via PUT.
 * @param {number|string} id - ID du projet
 * @param {Object} projet - Données mise à jour
 * @returns {Promise<Object>} Projet modifié
 */
export async function editerProjetAPI(id, projet) {
  const reponse = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projet),
  });
  if (!reponse.ok) throw new Error(`Erreur serveur : ${reponse.status}`);
  return await reponse.json();
}

/**
 * Supprime un projet via DELETE.
 * @param {number|string} id - ID du projet
 * @returns {Promise<void>}
 */
export async function supprimerProjetAPI(id) {
  const reponse = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!reponse.ok) throw new Error(`Erreur serveur : ${reponse.status}`);
}