import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/senaData';
import { QuizQuestion } from '../types';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Trophy,
  BrainCircuit,
  Flame
} from 'lucide-react';

interface TriviaRetoProps {
  onQuizCompleted?: (scorePercent: number) => void;
}

export const TriviaReto: React.FC<TriviaRetoProps> = ({ onQuizCompleted }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    audioSynth.playClick();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      audioSynth.playSuccess();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      audioSynth.playError();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setShowHint(false);
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      const finalScorePercent = Math.round(((score + (selectedOption === currentQ.correctIndex ? 0 : 0)) / QUIZ_QUESTIONS.length) * 100);
      if (finalScorePercent >= 75) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      if (onQuizCompleted) {
        onQuizCompleted(finalScorePercent);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
    setShowHint(false);
  };

  const scorePercent = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00324D] via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30 mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              Evaluación de Conocimiento Formativo
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Reto de Inducción SENA
            </h2>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">
              Pon a prueba lo aprendido sobre símbolos patrios institucionales, historia de Rodolfo Martínez Tono,
              y los artículos clave del <strong>Nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 y modif. Acuerdo 002 de 2026)</strong>.
            </p>
          </div>

          {/* Gamified Streak & Score */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-lg">
                <Flame className="w-5 h-5 fill-amber-400 animate-bounce" />
                <span>{streak}</span>
              </div>
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Racha</span>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-emerald-400 font-extrabold text-lg">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <span className="text-[10px] text-emerald-200 uppercase font-semibold">Aciertos</span>
            </div>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
          {/* Question Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Pregunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-700 font-bold">
                Módulo: {currentQ.moduleId === 'institucional' ? 'Identidad y Símbolos' : 'Reglamento y Normativa'}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#39A900] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (isSelected) {
                btnClass = 'bg-emerald-50 border-[#39A900] text-emerald-950 ring-1 ring-[#39A900]';
              }

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500';
                } else if (isSelected && idx !== currentQ.correctIndex) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${btnClass}`}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'bg-[#39A900] text-white border-[#39A900]' : 'border-slate-300 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm sm:text-base leading-normal flex-1">
                    {option}
                  </span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    ¡Respuesta Correcta!
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Fundamentación Normativa:
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Hint Drawer */}
          {showHint && currentQ.hint && !isAnswered && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Pista: {currentQ.hint}</span>
            </div>
          )}

          {/* Actions Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!isAnswered && currentQ.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-500 hover:text-emerald-700 font-semibold underline"
              >
                {showHint ? 'Ocultar pista' : 'Ver pista de ayuda'}
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              {!isAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 bg-[#39A900] hover:bg-[#329600] disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
                >
                  Verificar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-[#00324D] hover:bg-[#032335] text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Reto'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary Card */
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {scorePercent >= 75 ? '¡Felicitaciones, Has Aprobado!' : 'Buen Intento, Sigue Repasando'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Completaste las {QUIZ_QUESTIONS.length} preguntas de la evaluación institucional.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-xs mx-auto">
            <div className="text-4xl font-extrabold text-[#39A900]">
              {scorePercent}%
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase mt-1">
              Puntaje Obtenido ({score} de {QUIZ_QUESTIONS.length})
            </p>
          </div>

          <p className="text-xs text-slate-500">
            {scorePercent >= 75
              ? 'Has acreditado el hito evaluativo de la inducción con éxito. Tu progreso ha sido registrado.'
              : 'Se requiere un mínimo de 75% para la aprobación de la inducción. Te recomendamos repasar los símbolos y el reglamento.'}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar Evaluación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
