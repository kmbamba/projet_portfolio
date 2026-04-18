import React, { useState } from 'react';
import Dossier from './Dossier';

function Projects() {
  const [vue, setVue] = useState('liste'); // 'liste' | 'detail' | 'editer'
  const [projetSelectionne, setProjetSelectionne] = useState(null);

  const afficherDetail = (projet) => {
    setProjetSelectionne(projet);
    setVue('detail');
  };

  const afficherEdition = (projet) => {
    setProjetSelectionne(projet);
    setVue('editer');
  };

  const retourListe = () => {
    setProjetSelectionne(null);
    setVue('liste');
  };

  return (
    <main className="app-main">
      <Dossier
        vue={vue}
        projetSelectionne={projetSelectionne}
        onAfficherDetail={afficherDetail}
        onAfficherEdition={afficherEdition}
        onRetourListe={retourListe}
      />
    </main>
  );
}

export default Projects;