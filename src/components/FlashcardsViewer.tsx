import React, { useState } from 'react';
import { FLASHCARDS } from '../data/senaData';
import { Flashcard } from '../types';
import { audioSynth } from '../utils/audioSynth';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

export const FlashcardsViewer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredCards = FLASHCARDS.filter(
    (fc) => selectedCategory === 'todos' || fc.category === selectedCategory
  );

  const currentCard: Flashcard = filteredCards[currentIndex] || FLASHCARDS[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    audioSynth.playClick();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#39A900] text-xs font-bold rounded-md mb-2">
            <Layers className="w-3.5 h-3.5" />
            Tarjetas de Estudio Rápido (Flashcards)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Memorización Activa de Conceptos SENA
          </h3>
          <p className="text-xs text-slate-500">
            Haz clic en la tarjeta para voltearla y descubrir la respuesta.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {['todos', 'simbolos', 'historia', 'normativa', 'etapas'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="max-w-xl mx-auto perspective-1000 my-4">
        <div
          onClick={handleFlip}
          className={`w-full min-h-[260px] sm:min-h-[280px] p-8 rounded-2xl cursor-pointer transition-all duration-500 shadow-md border-2 relative flex flex-col justify-between select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-emerald-800 to-[#00324D] text-white border-emerald-500 transform rotate-y-180'
              : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300'
          }`}
        >
          {/* Card Top Label */}
          <div className="flex items-center justify-between text-xs">
            <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
              isFlipped ? 'bg-emerald-600/40 text-emerald-200' : 'bg-slate-100 text-slate-700'
            }`}>
              {currentCard.category}
            </span>
            <span className={`flex items-center gap-1 font-semibold ${
              isFlipped ? 'text-emerald-300' : 'text-slate-400'
            }`}>
              <RotateCw className="w-3.5 h-3.5" />
              {isFlipped ? 'Respuesta' : 'Haz clic para voltear'}
            </span>
          </div>

          {/* Card Center Content */}
          <div className="my-auto py-4 text-center">
            {!isFlipped ? (
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentCard.question}
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-lg sm:text-xl font-semibold text-emerald-100 leading-snug">
                  {currentCard.answer}
                </p>
                {currentCard.extraInfo && (
                  <p className="text-xs text-slate-300 max-w-md mx-auto pt-2 border-t border-slate-700">
                    {currentCard.extraInfo}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Card Bottom Progress */}
          <div className="text-center text-xs opacity-70">
            Tarjeta {currentIndex + 1} de {filteredCards.length}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
          title="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleFlip}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Voltear Tarjeta
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
          title="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
