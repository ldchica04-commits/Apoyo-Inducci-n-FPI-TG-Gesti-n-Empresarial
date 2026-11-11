import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/senaData';
import { CaseStudy } from '../types';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import {
  Gavel,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  User,
  ShieldCheck
} from 'lucide-react';

interface SimuladorCasosProps {
  onCaseSolved?: (caseId: string) => void;
}

export const SimuladorCasos: React.FC<SimuladorCasosProps> = ({ onCaseSolved }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [completedCases, setCompletedCases] = useState<Set<string>>(new Set());

  const currentCase: CaseStudy = CASE_STUDIES[currentCaseIndex];

  const handleSelectOption = (idx: number) => {
    if (hasEvaluated) return;
    setSelectedOption(idx);
    audioSynth.playClick();
  };

  const handleEvaluate = () => {
    if (selectedOption === null) return;
    setHasEvaluated(true);

    const isCorrect = currentCase.options[selectedOption].isCorrect;
    if (isCorrect) {
      audioSynth.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      setCompletedCases(prev => new Set(prev).add(currentCase.id));
      if (onCaseSolved) {
        onCaseSolved(currentCase.id);
      }
    } else {
      audioSynth.playError();
    }
  };

  const handleNextCase = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    if (currentCaseIndex < CASE_STUDIES.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
    } else {
      setCurrentCaseIndex(0);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#00324D] to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30 mb-3">
            <Gavel className="w-3.5 h-3.5" />
            Simulador de Comité de Evaluación y Seguimiento
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Resuelve Dilemas Normativos como Miembro del Comité
          </h2>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed">
            Asume el rol del Comité de Evaluación del SENA (Art. 48). Analiza la situación expuesta por instructores y aprendices,
            califica la falta según el <strong>Acuerdo 009 de 2024</strong> y determina la medida con estricto apego a las garantías del debido proceso reformadas por el <strong>Acuerdo 002 de 2026</strong>.
          </p>
        </div>
      </div>

      {/* Case Navigator Stepper */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2">
          {CASE_STUDIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setCurrentCaseIndex(i);
                setSelectedOption(null);
                setHasEvaluated(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentCaseIndex === i
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : completedCases.has(c.id)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Caso {i + 1}</span>
              {completedCases.has(c.id) && <CheckCircle className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Resueltos: <strong>{completedCases.size}</strong> de {CASE_STUDIES.length}
        </span>
      </div>

      {/* Current Case Presentation */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
        {/* Case Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {currentCase.category === 'academica' ? 'Falta Académica' : currentCase.category === 'disciplinaria' ? 'Falta Disciplinaria' : 'Trámite de Deserción'}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-mono text-emerald-700">
                {currentCase.regulationRef}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {currentCase.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Aprendiz implicado: <strong>{currentCase.protagonist}</strong></span>
          </div>
        </div>

        {/* Scenario Narrative */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Hechos reportados ante el Comité:
          </h4>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
            "{currentCase.scenario}"
          </p>
        </div>

        {/* Options to Choose */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            ¿Cuál es el dictamen y procedimiento reglamentario correcto?
          </h4>

          {currentCase.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let containerStyle = 'bg-white border-slate-200 hover:border-slate-300';

            if (isSelected) {
              containerStyle = 'bg-emerald-50/60 border-[#39A900] ring-1 ring-[#39A900]';
            }

            if (hasEvaluated) {
              if (opt.isCorrect) {
                containerStyle = 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-500';
              } else if (isSelected && !opt.isCorrect) {
                containerStyle = 'bg-rose-50 border-rose-400 ring-2 ring-rose-400';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${containerStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'border-[#39A900] bg-[#39A900] text-white' : 'border-slate-300 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs sm:text-sm text-slate-800 leading-normal">
                      {opt.text}
                    </p>

                    {/* Reveal feedback after evaluation */}
                    {hasEvaluated && (isSelected || opt.isCorrect) && (
                      <div className={`mt-2 p-3 rounded-lg text-xs leading-relaxed ${
                        opt.isCorrect
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        <div className="font-bold flex items-center gap-1.5 mb-1">
                          {opt.isCorrect ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-emerald-700" />
                              Dictamen Correcto
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-700" />
                              Dictamen Erróneo
                            </>
                          )}
                        </div>
                        {opt.feedback}
                        {opt.severity && (
                          <div className="mt-1 font-semibold text-emerald-800">
                            Calificación: Falta {opt.severity} | Medida: {opt.measure}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {selectedOption === null ? (
              <span>Selecciona una opción para emitir tu concepto.</span>
            ) : !hasEvaluated ? (
              <span className="text-slate-800 font-semibold">Opción elegida. Haz clic en "Emitir Dictamen".</span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {!hasEvaluated ? (
              <button
                disabled={selectedOption === null}
                onClick={handleEvaluate}
                className="px-5 py-2.5 bg-[#39A900] hover:bg-[#329600] disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Gavel className="w-4 h-4" />
                Emitir Dictamen
              </button>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reintentar
                </button>
                <button
                  onClick={handleNextCase}
                  className="px-5 py-2.5 bg-[#00324D] hover:bg-[#042436] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Siguiente Caso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Lesson Learned Card */}
        {hasEvaluated && currentCase.lessonLearned && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mt-4">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-amber-900 uppercase">
                Lección Formativa para tu Inducción
              </h5>
              <p className="text-xs text-amber-800 mt-1">
                {currentCase.lessonLearned}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
