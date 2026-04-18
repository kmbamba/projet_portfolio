import React, { useState } from 'react';

function EditerProjet({ projet, onValider, onAnnuler }) {
  const [champs, setChamps] = useState({
    libelle: projet.libelle || '',
    image: projet.image || '',
    description: projet.description || '',
    technologies: (projet.technologies || []).join(', '),
    lien: projet.lien || '',
  });
  const [erreurs, setErreurs] = useState({});
  const [envoi, setEnvoi] = useState(false);

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
      await onValider({
        ...projet,
        libelle: champs.libelle.trim(),
        image: champs.image.trim(),
        description: champs.description.trim(),
        technologies: champs.technologies
          ? champs.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        lien: champs.lien.trim(),
      });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="detail-wrapper">
      <button className="btn-retour" onClick={onAnnuler}>
        ← Annuler l'édition
      </button>

      <div className="ajouter-form-card editer-card">
        <div className="ajouter-form-header">
          <h2 className="ajouter-titre">Éditer : {projet.libelle}</h2>
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
            {champs.image && (
              <img
                src={champs.image}
                alt="Aperçu"
                className="image-apercu"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>

          {/* Description */}
          <div className="champ-groupe">
            <label className="champ-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="champ-input champ-textarea"
              value={champs.description}
              onChange={handleChange}
              rows={4}
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
              value={champs.lien}
              onChange={handleChange}
            />
          </div>

          {/* Boutons */}
          <div className="form-actions">
            <button type="button" className="btn btn-annuler" onClick={onAnnuler}>
              Annuler
            </button>
            <button type="submit" className="btn btn-valider" disabled={envoi}>
              {envoi ? 'Sauvegarde…' : '✓ Valider les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditerProjet;
