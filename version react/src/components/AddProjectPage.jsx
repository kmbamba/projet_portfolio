import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addProjet } from '../services/api';
import AjouterProjet from './AjouterProjet';

function AddProjectPage() {
  const navigate = useNavigate();

  const handleAjouter = async (nouveauProjet) => {
    try {
      await addProjet({
        ...nouveauProjet,
        dateCreation: new Date().toISOString().split('T')[0],
      });
      navigate('/projets');
    } catch (err) {
      alert("Erreur lors de l'ajout du projet");
    }
  };

  return (
    <div className="add-project-page">
      <AjouterProjet onAjouter={handleAjouter} openAdd={true} />
    </div>
  );
}

export default AddProjectPage;