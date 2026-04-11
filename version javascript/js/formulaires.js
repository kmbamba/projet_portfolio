/**
 * formulaires.js — Gestion des formulaires
 * =====================================================
 * Logique pour les formulaires d'ajout et de contact.
 * =====================================================
 */

import { afficherToast } from './utils.js';
import { ajouterProjet, chargerProjets, confirmerEdition } from './projets.js';
import { naviguerVers } from './navigation.js';

/**
 * Gère la prévisualisation de l'image sélectionnée dans le formulaire.
 * @param {Event} event
 */
export function gererPreviewImage(event) {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const lecteur = new FileReader();
  lecteur.onload = (e) => {
    const imagePreview = document.getElementById('image-preview');
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
  };
  lecteur.readAsDataURL(fichier);
}

/**
 * Gère la soumission du formulaire d'ajout de projet.
 * @param {Event} event
 */
export async function gererSoumissionFormulaire(event) {
  event.preventDefault();

  const inputNom = document.getElementById('input-nom');
  const inputDescription = document.getElementById('input-description');
  const inputTech1 = document.getElementById('input-tech1');
  const inputTech2 = document.getElementById('input-tech2');
  const inputTech3 = document.getElementById('input-tech3');
  const inputImage = document.getElementById('input-image');
  const imagePreview = document.getElementById('image-preview');
  const btnAjouter = document.getElementById('btn-submit-ajouter');

  const libelle = inputNom.value.trim();
  const description = inputDescription.value.trim();
  const tech1 = inputTech1.value.trim();

  if (!libelle || !description || !tech1) {
    afficherToast('Veuillez remplir les champs obligatoires (*).', 'error');
    return;
  }

  const imageSrc = imagePreview.src && imagePreview.style.display !== 'none'
    ? imagePreview.src
    : 'img/placeholder.png';

  btnAjouter.disabled = true;
  btnAjouter.textContent = 'Ajout en cours...';

  try {
    await ajouterProjet({
      libelle,
      image: imageSrc,
      description,
      technologies: [tech1, inputTech2.value.trim(), inputTech3.value.trim()],
    });

    const formAjouter = document.getElementById('form-ajouter');
    formAjouter.reset();
    imagePreview.style.display = 'none';
    imagePreview.src = '';

    // Naviguer vers la liste après succès
    naviguerVers('liste');
    chargerProjets();

  } finally {
    btnAjouter.disabled = false;
    btnAjouter.textContent = 'Ajouter le projet';
  }
}

/**
 * Gère la prévisualisation de l'image pour le formulaire d'édition.
 * @param {Event} event
 */
export function gererPreviewImageEdition(event) {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const lecteur = new FileReader();
  lecteur.onload = (e) => {
    const imagePreview = document.getElementById('image-editer-preview');
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
  };
  lecteur.readAsDataURL(fichier);
}

/**
 * Gère la soumission du formulaire d'édition de projet.
 * @param {Event} event
 */
export async function gererSoumissionEdition(event) {
  console.log('[gererSoumissionEdition] Début');
  event.preventDefault();

  const inputNom = document.getElementById('input-editer-nom');
  const inputDescription = document.getElementById('input-editer-description');
  const inputTech1 = document.getElementById('input-editer-tech1');
  const inputTech2 = document.getElementById('input-editer-tech2');
  const inputTech3 = document.getElementById('input-editer-tech3');
  const inputImage = document.getElementById('input-editer-image');
  const imagePreview = document.getElementById('image-editer-preview');
  const btnSubmit = document.getElementById('btn-submit-editer');

  console.log('[gererSoumissionEdition] Inputs trouvés ?', {inputNom, inputDescription, inputTech1});

  const libelle = inputNom.value.trim();
  const description = inputDescription.value.trim();
  const tech1 = inputTech1.value.trim();

  if (!libelle || !description || !tech1) {
    console.error('[gererSoumissionEdition] Champs vides!', {libelle, description, tech1});
    afficherToast('Veuillez remplir les champs obligatoires (*).', 'error');
    return;
  }

  const imageSrc = imagePreview.src && imagePreview.style.display !== 'none'
    ? imagePreview.src
    : 'img/placeholder.png';

  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Sauvegarde en cours...';

  try {
    console.log('[gererSoumissionEdition] Appel confirmerEdition...');
    await confirmerEdition({
      libelle,
      image: imageSrc,
      description,
      technologies: [tech1, inputTech2.value.trim(), inputTech3.value.trim()],
    });
    console.log('[gererSoumissionEdition] confirmerEdition OK');

  } catch (e) {
    console.error('[gererSoumissionEdition] Erreur:', e);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Enregistrer';
  }
}

/**
 * Gère la soumission du formulaire de contact.
 * @param {Event} event
 */
export function gererSoumissionContact(event) {
  event.preventDefault();

  const inputContactNom = document.getElementById('input-contact-nom');
  const inputContactEmail = document.getElementById('input-contact-email');
  const inputContactMessage = document.getElementById('input-contact-message');
  const btnContactEnvoyer = document.getElementById('btn-contact-envoyer');
  const formContact = document.getElementById('form-contact');

  const nom = inputContactNom.value.trim();
  const email = inputContactEmail.value.trim();
  const message = inputContactMessage.value.trim();

  if (!nom || !email || !message) {
    afficherToast('Veuillez remplir tous les champs du formulaire.', 'error');
    return;
  }

  btnContactEnvoyer.disabled = true;
  btnContactEnvoyer.textContent = 'Envoi...';

  setTimeout(() => {
    btnContactEnvoyer.disabled = false;
    btnContactEnvoyer.textContent = ' Envoyer';
    formContact.reset();
    afficherToast('Merci ! Votre message a bien été pris en compte.');
  }, 600);
}