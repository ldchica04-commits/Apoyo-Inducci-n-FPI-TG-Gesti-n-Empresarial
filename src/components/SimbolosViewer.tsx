import React, { useState } from 'react';
import { INSTITUTIONAL_INFO } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import {
  Shield,
  Flag,
  UserCheck,
  Award,
  Calendar,
  Building,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface SimbolosViewerProps {
  onLearnSymbol?: (symbolName: string) => void;
}

export const SimbolosViewer: React.FC<SimbolosViewerProps> = ({ onLearnSymbol }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<'escudo' | 'bandera' | 'logotipo' | 'valores'>('escudo');
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);
  const [exploredElements, setExploredElements] = useState<Set<number>>(new Set([0]));

  const { escudo, bandera, logotipo } = INSTITUTIONAL_INFO.simbolos;
  const { foundation, valores } = INSTITUTIONAL_INFO;

  const handleSelectElement = (idx: number) => {
    setActiveElementIndex(idx);
    setExploredElements(prev => new Set(prev).add(idx));
    if (onLearnSymbol) {
      onLearnSymbol(escudo.elements[idx].name);
    }
  };

  return (
    <div className="space-y-8">
      {/* Foundation Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#00324D] to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#39A900]/10 skew-x-12 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            Fundación: {foundation.date} ({foundation.year})
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Historia e Identidad Institucional SENA
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
            Fundado por el ilustre cartagenero <strong>{foundation.founder}</strong> mediante el {foundation.decree}.
            Desde hace más de 65 años, es la entidad orgullo de los colombianos dedicada a la formación profesional integral gratuita.
          </p>
        </div>
      </div>

      {/* Main Tabs for Symbols */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedSymbol('escudo')}
          className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedSymbol === 'escudo'
              ? 'border-[#39A900] text-[#39A900] bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          El Escudo (3 Sectores)
        </button>
        <button
          onClick={() => setSelectedSymbol('bandera')}
          className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedSymbol === 'bandera'
              ? 'border-[#39A900] text-[#39A900] bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flag className="w-4 h-4" />
          La Bandera
        </button>
        <button
          onClick={() => setSelectedSymbol('logotipo')}
          className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedSymbol === 'logotipo'
              ? 'border-[#39A900] text-[#39A900] bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          El Logotipo / Isotipo
        </button>
        <button
          onClick={() => setSelectedSymbol('valores')}
          className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
            selectedSymbol === 'valores'
              ? 'border-[#39A900] text-[#39A900] bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Valores Institucionales
        </button>
      </div>

      {/* Tab 1: Escudo Interactivo */}
      {selectedSymbol === 'escudo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Interactive Shield */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Explorador Interactivo
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{escudo.name}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Haz clic en cada componente para descubrir su sector económico y simbolismo
              </p>
            </div>

            {/* Graphic Representation with Official Escudo and Clickable Zones */}
            <div className="relative mx-auto max-w-[340px] w-full rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:from-slate-800/80 dark:to-emerald-950/40 p-6 border-2 border-emerald-200/80 dark:border-emerald-800/60 shadow-inner flex flex-col items-center justify-center">
              {/* Official SENA Escudo Graphic */}
              <div className="relative group my-2">
                <div className="w-56 h-64 sm:w-60 sm:h-68 flex items-center justify-center p-2 rounded-2xl transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo Oficial del SENA"
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Interactive Sector Selector Pills */}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 w-full">
                {escudo.elements.map((el, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectElement(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                      activeElementIndex === idx
                        ? 'bg-[#39A900] text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    <span>{idx === 0 ? '⚙' : idx === 1 ? '☤' : '🌿'}</span>
                    <span>{el.name}</span>
                  </button>
                ))}
              </div>

              {/* Exploration Indicator */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Explorados:</span>
                <span>{exploredElements.size} de {escudo.elements.length}</span>
                {exploredElements.size === escudo.elements.length && (
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                )}
              </div>
            </div>
          </div>

          {/* Detailed Info Card for the Selected Element */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 border-l-[#39A900] border-slate-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md mb-3">
                <Layers className="w-3.5 h-3.5" />
                {escudo.elements[activeElementIndex].sector}
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                {escudo.elements[activeElementIndex].name}
              </h4>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {escudo.elements[activeElementIndex].description}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  Importancia en la Formación Integral
                </h5>
                <p className="text-xs text-slate-500 mt-1">
                  El SENA no solo instruye en oficios tradicionales, sino que articula los tres sectores
                  económicos mediante programas técnicos y tecnológicos actualizados según las demandas de la industria 4.0,
                  el agro tecnificado y la economía digital.
                </p>
              </div>
            </div>

            {/* Quick selector buttons */}
            <div className="grid grid-cols-3 gap-2">
              {escudo.elements.map((el, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectElement(i)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    activeElementIndex === i
                      ? 'bg-emerald-50 border-[#39A900] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800 truncate">{el.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{el.sector}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bandera */}
      {selectedSymbol === 'bandera' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 flex flex-col items-center">
              {/* Flag Graphic Simulation with Official Escudo in center */}
              <div className="w-full max-w-md aspect-[3/2] bg-white border-4 border-slate-300 shadow-2xl rounded-lg p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/40 to-transparent pointer-events-none" />
                <div className="text-center flex flex-col items-center">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo del SENA en la Bandera"
                    className="w-36 h-36 object-contain drop-shadow-md"
                    loading="lazy"
                  />
                  <span className="text-xs font-extrabold text-[#00324D] tracking-widest mt-2 uppercase">
                    SENA
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Bandera oficial: Proporción 3:2, lienzo blanco con el escudo institucional en el centro
              </p>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                <Flag className="w-3.5 h-3.5 text-emerald-600" />
                Símbolo de Pureza y Paz
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{bandera.name}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {bandera.description}
              </p>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h4 className="text-sm font-bold text-emerald-900 mb-1">Significado Cromático</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {bandera.significado}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Logotipo */}
      {selectedSymbol === 'logotipo' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-8 text-white">
              <SenaLogo variant="white" size={110} />
              <div className="mt-4 text-center">
                <p className="text-xs font-mono text-emerald-400">Verde Institucional: #39A900</p>
                <p className="text-xs font-mono text-slate-400">Azul Corporativo: #00324D</p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                <UserCheck className="w-3.5 h-3.5" />
                El Hombre que Avanza
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{logotipo.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {logotipo.description}
              </p>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-800 mb-1">Concepto Filosófico</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {logotipo.significado}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  Liderazgo
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  Autonomía Formativa
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  Proyección al Futuro
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Valores Institucionales */}
      {selectedSymbol === 'valores' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Código de Integridad y Valores del SENA</h3>
            <p className="text-sm text-slate-600 max-w-3xl">
              Nuestros valores orientan las conductas y decisiones diarias de aprendices, instructores, directivos
              y colaboradores en todos los centros del país.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {valores.map((v, i) => (
                <div
                  key={i}
                  className="bg-slate-50 hover:bg-emerald-50/60 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm mb-3 group-hover:bg-[#39A900] group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 text-base">
                    {v.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
