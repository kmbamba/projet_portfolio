import React, { useState, useEffect } from 'react';

const CHAMPS_VIDES = {
  libelle: '',
  image: '',
  description: '',
  technologies: '',
  lien: '',
};

function AjouterProjet({ onAjouter, openAdd }) {
  const [ouvert, setOuvert] = useState(false);
  const [champs, setChamps] = useState(CHAMPS_VIDES);
  const [erreurs, setErreurs] = useState({});
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    if (openAdd) {
      setOuvert(true);
    }
  }, [openAdd]);

  const valider = () => {
    const e = {};
    if (!champs.libelle.trim()) e.libelle = 'Le libellé est obligatoire';
    if (champs.libelle.trim().length > 80) e.libelle = 'Maximum 80 caractères';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamps((prev) => ({ ...prev, [name]: value }));
    if (erreurs[name]) setErreurs((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChamps((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = valider();
    if (Object.keys(e2).length > 0) { setErreurs(e2); return; }

    setEnvoi(true);
    try {
      await onAjouter({
        libelle: champs.libelle.trim(),
        image: champs.image.trim() || '',
        description: champs.description.trim(),
        technologies: champs.technologies
          ? champs.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        lien: champs.lien.trim(),
      });
      setChamps(CHAMPS_VIDES);
      setOuvert(false);
    } finally {
      setEnvoi(false);
    }
  };

  const handleAnnuler = () => {
    setChamps(CHAMPS_VIDES);
    setErreurs({});
    setOuvert(false);
  };

  return (
    <div className="ajouter-wrapper">
      {!ouvert ? (
        <button className="btn btn-ajouter-toggle" onClick={() => setOuvert(true)}>
          <span className="btn-plus">+</span> Nouveau projet
        </button>
      ) : (
        <div className="ajouter-form-card">
          <div className="ajouter-form-header">
            <h2 className="ajouter-titre">Ajouter un projet</h2>
            <button className="btn-fermer" onClick={handleAnnuler} title="Fermer">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="ajouter-form" noValidate>
            {/* Libellé */}
            <div className="champ-groupe">
              <label className="champ-label" htmlFor="libelle">
                Libellé <span className="champ-requis">*</span>
              </label>
              <input
                id="libelle"
                name="libelle"
                type="text"
                className={`champ-input${erreurs.libelle ? ' champ-erreur' : ''}`}
                placeholder="Nom du projet"
                value={champs.libelle}
                onChange={handleChange}
                maxLength={80}
                autoFocus
              />
              {erreurs.libelle && <span className="erreur-msg">{erreurs.libelle}</span>}
            </div>

            {/* Image */}
            <div className="champ-groupe">
              <label className="champ-label" htmlFor="image">Image du projet</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="champ-input"
                onChange={handleFileChange}
              />
            </div>

            {/* Description */}
            <div className="champ-groupe">
              <label className="champ-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="champ-input champ-textarea"
                placeholder="Décrivez votre projet…"
                value={champs.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {/* Technologies */}
            <div className="champ-groupe">
              <label className="champ-label" htmlFor="technologies">
                Technologies <span className="champ-hint">(séparées par des virgules)</span>
              </label>
              <input
                id="technologies"
                name="technologies"
                type="text"
                className="champ-input"
                placeholder="React, Node.js, MongoDB"
                value={champs.technologies}
                onChange={handleChange}
              />
            </div>

            {/* Lien */}
            <div className="champ-groupe">
              <label className="champ-label" htmlFor="lien">Lien du projet</label>
              <input
                id="lien"
                name="lien"
                type="url"
                className="champ-input"
                placeholder="https://github.com/..."
                value={champs.lien}
                onChange={handleChange}
              />
            </div>

            {/* Boutons */}
            <div className="form-actions">
              <button type="button" className="btn btn-annuler" onClick={handleAnnuler}>
                Annuler
              </button>
              <button type="submit" className="btn btn-valider" disabled={envoi}>
                {envoi ? 'Ajout en cours…' : 'Ajouter le projet'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AjouterProjet;
