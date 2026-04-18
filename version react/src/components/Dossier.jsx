import React, { useState, useEffect } from 'react';
import { getProjets, addProjet, deleteProjet, updateProjet } from '../services/api';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet';
import DetaillerProjet from './DetaillerProjet';
import EditerProjet from './EditerProjet';

function Dossier({ vue, projetSelectionne, onAfficherDetail, onAfficherEdition, onRetourListe }) {
  const [projets, setProjets] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [notification, setNotification] = useState(null);

  // Chargement initial des projets
  useEffect(() => {
    chargerProjets();
  }, []);

  const chargerProjets = async () => {
    try {
      setChargement(true);
      setErreur(null);
      const data = await getProjets();
      setProjets(data);
    } catch (err) {
      setErreur('Impossible de charger les projets. Vérifiez que json-server est lancé (npm run server).');
    } finally {
      setChargement(false);
    }
  };

  const afficherNotification = (message, type = 'succes') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Ajouter un projet
  const handleAjouter = async (nouveauProjet) => {
    try {
      const projetCree = await addProjet({
        ...nouveauProjet,
        dateCreation: new Date().toISOString().split('T')[0],
      });
      setProjets((prev) => [...prev, projetCree]);
      afficherNotification(`✓ Projet "${projetCree.libelle}" ajouté avec succès`);
    } catch (err) {
      afficherNotification("✗ Erreur lors de l'ajout du projet", 'erreur');
    }
  };

  // Supprimer un projet
  const handleSupprimer = async (id) => {
    const projet = projets.find((p) => p.id === id);
    if (!window.confirm(`Supprimer le projet "${projet?.libelle}" ?`)) return;
    try {
      await deleteProjet(id);
      setProjets((prev) => prev.filter((p) => p.id !== id));
      afficherNotification(`✓ Projet supprimé`);
      if (projetSelectionne?.id === id) onRetourListe();
    } catch (err) {
      afficherNotification('✗ Erreur lors de la suppression', 'erreur');
    }
  };

  // Modifier un projet
  const handleModifier = async (id, donneesModifiees) => {
    try {
      const projetMaj = await updateProjet(id, donneesModifiees);
      setProjets((prev) => prev.map((p) => (p.id === id ? projetMaj : p)));
      afficherNotification(`✓ Projet "${projetMaj.libelle}" modifié avec succès`);
      onRetourListe();
    } catch (err) {
      afficherNotification('✗ Erreur lors de la modification', 'erreur');
    }
  };

  // Filtrage par recherche
  const projetsFiltres = projets.filter((p) =>
    p.libelle.toLowerCase().includes(recherche.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(recherche.toLowerCase()))
  );

  // Affichage détail
  if (vue === 'detail' && projetSelectionne) {
    return (
      <DetaillerProjet
        projet={projetSelectionne}
        onAnnuler={onRetourListe}
        onEditer={() => onAfficherEdition(projetSelectionne)}
        onSupprimer={handleSupprimer}
      />
    );
  }

  // Affichage édition
  if (vue === 'editer' && projetSelectionne) {
    return (
      <EditerProjet
        projet={projetSelectionne}
        onValider={(donnees) => handleModifier(projetSelectionne.id, donnees)}
        onAnnuler={onRetourListe}
      />
    );
  }

  // Vue liste principale
  return (
    <div className="dossier">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* En-tête dossier */}
      <div className="dossier-header">
        <div className="dossier-title-group">
          <h1 className="dossier-title">Mes Projets</h1>
          <span className="dossier-count">{projets.length} projet{projets.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Barre de recherche */}
        <div className="recherche-wrapper">
          <span className="recherche-icon">⌕</span>
          <input
            type="text"
            className="recherche-input"
            placeholder="Rechercher un projet..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          {recherche && (
            <button className="recherche-clear" onClick={() => setRecherche('')}>✕</button>
          )}
        </div>
      </div>

      {/* Formulaire ajout */}
      <AjouterProjet onAjouter={handleAjouter} />

      {/* Erreur */}
      {erreur && (
        <div className="erreur-banner">
          <span>{erreur}</span>
          <button onClick={chargerProjets} className="btn-retry">Réessayer</button>
        </div>
      )}

      {/* Chargement */}
      {chargement ? (
        <div className="chargement">
          <div className="spinner" />
          <p>Chargement des projets…</p>
        </div>
      ) : projetsFiltres.length === 0 ? (
        <div className="liste-vide">
          {recherche
            ? `Aucun projet ne correspond à "${recherche}"`
            : 'Aucun projet pour l\'instant. Ajoutez votre premier projet !'}
        </div>
      ) : (
        <div className="projets-grille">
          {projetsFiltres.map((projet) => (
            <Projet
              key={projet.id}
              projet={projet}
              onSupprimer={handleSupprimer}
              onAfficherDetail={onAfficherDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dossier;
