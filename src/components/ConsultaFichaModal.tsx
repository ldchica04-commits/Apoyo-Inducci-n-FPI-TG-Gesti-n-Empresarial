import React, { useState, useMemo } from 'react';
import { ApprenticeProfile } from '../types';
import { getAllApprentices } from '../utils/apprenticeManager';
import { SenaLogo } from './SenaLogo';
import { audioSynth } from '../utils/audioSynth';
import {
  Search,
  Users,
  X,
  Hash,
  GraduationCap,
  Mail,
  IdCard,
  Building2,
  CheckCircle2,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ConsultaFichaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApprentice?: (apprentice: ApprenticeProfile) => void;
}

export const ConsultaFichaModal: React.FC<ConsultaFichaModalProps> = ({
  isOpen,
  onClose,
  onSelectApprentice
}) => {
  const [selectedFichaFilter, setSelectedFichaFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const apprentices = useMemo(() => getAllApprentices(), [isOpen]);

  // Extract unique Ficha numbers
  const availableFichas = useMemo(() => {
    const set = new Set<string>();
    apprentices.forEach(a => {
      if (a.fichaNumber) set.add(a.fichaNumber.trim());
    });
    return Array.from(set).sort();
  }, [apprentices]);

  // Filtered apprentices list
  const filteredApprentices = useMemo(() => {
    return apprentices.filter(app => {
      const matchFicha = selectedFichaFilter === 'all' || app.fichaNumber.trim() === selectedFichaFilter;
      const matchSearch = searchTerm.trim() === '' ||
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.documentNumber.includes(searchTerm) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.programName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFicha && matchSearch;
    });
  }, [apprentices, selectedFichaFilter, searchTerm]);

  if (!isOpen) return null;

  const handleSelect = (app: ApprenticeProfile) => {
    audioSynth.playSuccess();
    if (onSelectApprentice) {
      onSelectApprentice(app);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <SenaLogo size={38} />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  Consulta Institucional SENA
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-[#39A900]" />
                <span>Consulta de Aprendices por Ficha de Formación</span>
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shrink-0">
          {/* Ficha Selector Dropdown */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Filtrar por Ficha de Formación:</span>
            </label>
            <select
              value={selectedFichaFilter}
              onChange={(e) => {
                setSelectedFichaFilter(e.target.value);
                audioSynth.playClick();
              }}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
            >
              <option value="all">Todas las Fichas ({apprentices.length} aprendices)</option>
              {availableFichas.map(ficha => {
                const count = apprentices.filter(a => a.fichaNumber.trim() === ficha).length;
                return (
                  <option key={ficha} value={ficha}>
                    Ficha {ficha} ({count} aprendices)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Text Search Input */}
          <div className="sm:col-span-7 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Buscar por Nombre, Documento o Programa:</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Escribe para buscar..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between px-2 mb-4 shrink-0 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-semibold">
            Resultados encontrados: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredApprentices.length}</strong> aprendices
          </span>
          {selectedFichaFilter !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800">
              Ficha {selectedFichaFilter}
            </span>
          )}
        </div>

        {/* Apprentices Grid List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3">
          {filteredApprentices.length === 0 ? (
            <div className="p-10 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                No se encontraron aprendices registrados para este filtro.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verifica el número de ficha o borra el término de búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredApprentices.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 hover:border-[#39A900] transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={app.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                      alt={app.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#39A900] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm truncate group-hover:text-[#39A900] transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                        {app.programName}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-mono font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                          {app.documentType} {app.documentNumber}
                        </span>
                        <span>•</span>
                        <span className="font-mono font-bold text-[#39A900]">
                          Ficha {app.fichaNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="truncate max-w-[200px]">{app.email}</span>

                    {onSelectApprentice && (
                      <button
                        onClick={() => handleSelect(app)}
                        className="px-3 py-1.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <span>Seleccionar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Servicio Nacional de Aprendizaje SENA • Sistema de Información de Fichas</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-all"
          >
            Cerrar Consulta
          </button>
        </div>
      </div>
    </div>
  );
};
