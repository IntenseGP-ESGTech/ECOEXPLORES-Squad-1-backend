import React, { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Trilhas.module.css';
import { trailService } from '../services/api';

const emptyForm = {
  id: null,
  codigoTrilha: '',
  nomeTrilha: '',
  descricaoTrilha: '',
  publicoAlvo: '',
  status: 'rascunho',
  nomeCriador: '',
  conteudo: [],
};

const emptyModule = {
  titulo: '',
  descricao: '',
  atividades: '',
  recursos: '',
  recompensas: '',
};

export function Trilhas() {
  const [trails, setTrails] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [moduleDraft, setModuleDraft] = useState(emptyModule);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const isEditing = useMemo(() => Boolean(formData.id), [formData.id]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  const loadTrails = async () => {
    setLoading(true);
    try {
      const data = await trailService.list();
      setTrails(data.items || []);

      if (selectedTrail) {
        const updated = data.items?.find((trail) => trail.id === selectedTrail.id);
        setSelectedTrail(updated || null);
      }
    } catch (error) {
      showFeedback('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrails();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setModuleDraft(emptyModule);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleDraftChange = (event) => {
    const { name, value } = event.target;
    setModuleDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddModule = () => {
    if (!moduleDraft.titulo?.trim()) {
      return showFeedback('error', 'Informe ao menos o título do módulo.');
    }

    setFormData((prev) => ({
      ...prev,
      conteudo: [...prev.conteudo, moduleDraft],
    }));
    setModuleDraft(emptyModule);
  };

  const handleRemoveModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      conteudo: prev.conteudo.filter((_, idx) => idx !== index),
    }));
  };

  const mapFormToPayload = () => ({
    codigoTrilha: formData.codigoTrilha,
    nomeTrilha: formData.nomeTrilha,
    descricaoTrilha: formData.descricaoTrilha,
    publicoAlvo: formData.publicoAlvo,
    status: formData.status,
    nomeCriador: formData.nomeCriador,
    conteudo: formData.conteudo,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        await trailService.update(formData.id, mapFormToPayload());
        showFeedback('success', 'Trilha atualizada com sucesso!');
      } else {
        await trailService.create(mapFormToPayload());
        showFeedback('success', 'Trilha criada com sucesso!');
      }

      resetForm();
      await loadTrails();
    } catch (error) {
      showFeedback('error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (trail) => {
    setFormData({
      ...trail,
      status: trail.status || 'rascunho',
      conteudo: trail.conteudo || [],
    });
    setSelectedTrail(trail);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelect = (trail) => {
    setSelectedTrail(trail);
  };

  const handleDelete = async (trail) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a trilha "${trail.nomeTrilha}"?`
    );
    if (!confirmDelete) return;

    try {
      await trailService.remove(trail.id);
      showFeedback('success', 'Trilha removida!');
      if (selectedTrail?.id === trail.id) {
        setSelectedTrail(null);
      }
      if (formData.id === trail.id) {
        resetForm();
      }
      await loadTrails();
    } catch (error) {
      showFeedback('error', error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>Conteúdo central</p>
          <h1>Trilhas de Aprendizado</h1>
        </div>
        {feedback.message && (
          <div
            className={`${styles.feedback} ${
              feedback.type === 'error' ? styles.error : styles.success
            }`}
          >
            {feedback.message}
          </div>
        )}
      </header>

      <main className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Listagem</h2>
            <button type="button" className={styles.outlineButton} onClick={loadTrails}>
              {loading ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>

          <div className={styles.list}>
            {trails.length === 0 && !loading && (
              <p className={styles.emptyState}>
                Nenhuma trilha cadastrada ainda. Crie a primeira usando o formulário ao lado.
              </p>
            )}

            {trails.map((trail) => (
              <article
                key={trail.id}
                className={`${styles.trailCard} ${
                  selectedTrail?.id === trail.id ? styles.trailCardActive : ''
                }`}
              >
                <div>
                  <p className={styles.trailCode}>{trail.codigoTrilha}</p>
                  <h3>{trail.nomeTrilha}</h3>
                  <p className={styles.trailMeta}>
                    Público: <strong>{trail.publicoAlvo}</strong> • Status:{' '}
                    <strong>{trail.status}</strong>
                  </p>
                </div>
                <div className={styles.trailActions}>
                  <button type="button" onClick={() => handleSelect(trail)}>
                    Detalhes
                  </button>
                  <button type="button" onClick={() => handleEdit(trail)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => handleDelete(trail)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>{isEditing ? 'Editar trilha' : 'Criar nova trilha'}</h2>
            {isEditing && (
              <button type="button" className={styles.outlineButton} onClick={resetForm}>
                Cancelar edição
              </button>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Código da trilha
              <input
                name="codigoTrilha"
                value={formData.codigoTrilha}
                onChange={handleInputChange}
                placeholder="Ex: TRL-E01"
                required
              />
            </label>

            <label>
              Nome da trilha
              <input
                name="nomeTrilha"
                value={formData.nomeTrilha}
                onChange={handleInputChange}
                placeholder="Aventura Sustentável I"
                required
              />
            </label>

            <label>
              Descrição
              <textarea
                name="descricaoTrilha"
                value={formData.descricaoTrilha}
                onChange={handleInputChange}
                rows={4}
                placeholder="Explique objetivo, nível e ganhos da trilha."
                required
              />
            </label>

            <div className={styles.row}>
              <label>
                Público-alvo
                <input
                  name="publicoAlvo"
                  value={formData.publicoAlvo}
                  onChange={handleInputChange}
                  placeholder="Fundamental II"
                  required
                />
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="rascunho">Rascunho</option>
                  <option value="publicada">Publicada</option>
                </select>
              </label>
            </div>

            <label>
              Nome do criador
              <input
                name="nomeCriador"
                value={formData.nomeCriador}
                onChange={handleInputChange}
                placeholder="professor-123"
                required
              />
            </label>

            <fieldset className={styles.modules}>
              <legend>Conteúdo (módulos)</legend>
              <div className={styles.moduleDraft}>
                <input
                  name="titulo"
                  value={moduleDraft.titulo}
                  onChange={handleModuleDraftChange}
                  placeholder="Título do módulo"
                />
                <input
                  name="descricao"
                  value={moduleDraft.descricao}
                  onChange={handleModuleDraftChange}
                  placeholder="Descrição"
                />
                <input
                  name="atividades"
                  value={moduleDraft.atividades}
                  onChange={handleModuleDraftChange}
                  placeholder="Atividades"
                />
                <input
                  name="recursos"
                  value={moduleDraft.recursos}
                  onChange={handleModuleDraftChange}
                  placeholder="Recursos"
                />
                <input
                  name="recompensas"
                  value={moduleDraft.recompensas}
                  onChange={handleModuleDraftChange}
                  placeholder="Recompensas"
                />
                <button type="button" onClick={handleAddModule}>
                  Adicionar módulo
                </button>
              </div>

              {formData.conteudo.length > 0 && (
                <ul className={styles.moduleList}>
                  {formData.conteudo.map((module, index) => (
                    <li key={`${module.titulo}-${index}`}>
                      <div>
                        <strong>{module.titulo}</strong>
                        <p>{module.descricao}</p>
                      </div>
                      <button type="button" onClick={() => handleRemoveModule(index)}>
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            <button type="submit" disabled={saving} className={styles.primary}>
              {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar trilha'}
            </button>
          </form>
        </section>

        <section className={`${styles.panel} ${styles.detailPanel}`}>
          <div className={styles.panelHeader}>
            <h2>Detalhes</h2>
            {selectedTrail && <span className={styles.badge}>{selectedTrail.status}</span>}
          </div>

          {!selectedTrail ? (
            <p className={styles.emptyState}>
              Selecione uma trilha na lista para visualizar seus detalhes.
            </p>
          ) : (
            <div className={styles.detail}>
              <h3>{selectedTrail.nomeTrilha}</h3>
              <p className={styles.trailCode}>{selectedTrail.codigoTrilha}</p>
              <p>{selectedTrail.descricaoTrilha}</p>

              <dl>
                <div>
                  <dt>Público-alvo</dt>
                  <dd>{selectedTrail.publicoAlvo}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{selectedTrail.status}</dd>
                </div>
                <div>
                  <dt>Criador</dt>
                  <dd>{selectedTrail.nomeCriador}</dd>
                </div>
              </dl>

              <h4>Conteúdo</h4>
              <ul className={styles.detailModules}>
                {(selectedTrail.conteudo || []).map((module, index) => (
                  <li key={`${module.titulo}-${index}`}>
                    <strong>{module.titulo}</strong>
                    <p>{module.descricao}</p>
                    {module.atividades && (
                      <p>
                        <span>Atividades:</span> {module.atividades}
                      </p>
                    )}
                    {module.recursos && (
                      <p>
                        <span>Recursos:</span> {module.recursos}
                      </p>
                    )}
                    {module.recompensas && (
                      <p>
                        <span>Recompensas:</span> {module.recompensas}
                      </p>
                    )}
                  </li>
                ))}
                {(!selectedTrail.conteudo || selectedTrail.conteudo.length === 0) && (
                  <li>Sem módulos cadastrados.</li>
                )}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

