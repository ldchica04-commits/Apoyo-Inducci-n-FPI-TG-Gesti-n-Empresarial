import React, { useState, useMemo } from 'react';
import { NORMATIVE_ARTICLES } from '../data/senaData';
import { NormativeArticle } from '../types';
import {
  BookOpen,
  Search,
  Scale,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Tag
} from 'lucide-react';

interface ReglamentoExplorerProps {
  onArticleRead?: (articleId: string) => void;
}

export const ReglamentoExplorer: React.FC<ReglamentoExplorerProps> = ({ onArticleRead }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [expandedId, setExpandedId] = useState<string | null>('norm-1');

  const categories = [
    { id: 'todos', label: 'Todo el Reglamento' },
    { id: 'derechos', label: 'Derechos del Aprendiz' },
    { id: 'deberes', label: 'Deberes Institucionales' },
    { id: 'prohibiciones', label: 'Prohibiciones y Ética' },
    { id: 'medidas', label: 'Medidas y Art. 48' },
    { id: 'sanciones', label: 'Régimen Sancionatorio' },
    { id: 'novedades', label: 'Deserción e Incumplimientos' },
  ];

  const filteredArticles = useMemo(() => {
    return NORMATIVE_ARTICLES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.articleRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    if (next && onArticleRead) {
      onArticleRead(next);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'derechos':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Derecho</span>;
      case 'deberes':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Deber</span>;
      case 'prohibiciones':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">Prohibición</span>;
      case 'sanciones':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">Sanción</span>;
      case 'medidas':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Medida Formativa</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">Trámite</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                <Scale className="w-3.5 h-3.5" />
                Acuerdo 009 de 2024 (Estatuto Vigente)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200">
                <FileCheck className="w-3.5 h-3.5" />
                Reforma Art. 48 - Acuerdo 002 de 2026
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Nuevo Reglamento del Aprendiz SENA
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Normativa adoptada mediante el <strong>Acuerdo 009 de 2024</strong> (que derogó el Acuerdo 007 de 2012) y ajustada en sus garantías procesales mediante el <strong>Acuerdo 002 de 2026</strong>.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-sm">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Incumplimiento vs Deserción
            </h4>
            <p className="text-xs text-amber-800 mt-1">
              El Acuerdo 009 diferencia el incumplimiento de la deserción. Inasistencia injustificada de <strong>3 días hábiles continuos</strong> configura causal taxativa.
            </p>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por artículo, término (ej: carné, plagio, faltas, descargos, deserción)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Mostrando <strong>{filteredArticles.length}</strong> artículos normativos</span>
        <span>Haz clic sobre cada artículo para ver el caso práctico</span>
      </div>

      {/* Articles Accordion List */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-700">No se encontraron artículos</h4>
            <p className="text-xs text-slate-400 mt-1">
              Prueba buscando con palabras como "carné", "inasistencia", "plagio" o "derecho".
            </p>
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isExpanded = expandedId === art.id;
            return (
              <div
                key={art.id}
                className={`bg-white rounded-xl border transition-all ${
                  isExpanded
                    ? 'border-[#39A900] shadow-md ring-1 ring-[#39A900]/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div
                  onClick={() => toggleExpand(art.id)}
                  className="p-5 flex items-start justify-between cursor-pointer gap-4 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getCategoryBadge(art.category)}
                      <span className="text-xs font-mono font-medium text-slate-500">
                        {art.articleRef}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {art.summary}
                    </p>
                  </div>

                  <div className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#39A900]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Content with details and practical example */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Contenido Detallado de la Norma
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {art.details}
                      </p>
                    </div>

                    {art.practicalExample && (
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-emerald-900 uppercase">
                            Ejemplo en la Vida Real del Aprendiz
                          </h5>
                          <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                            {art.practicalExample}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      {art.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
