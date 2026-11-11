import React, { useState } from 'react';
import { INSTITUTIONAL_INFO } from '../data/senaData';
import { audioSynth } from '../utils/audioSynth';
import {
  Play,
  Square,
  Music,
  Sparkles,
  BookOpen,
  Disc,
  ExternalLink,
  Tv,
  FileText,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface HimnoPlayerProps {
  onCompleted?: () => void;
}

export const HimnoPlayer: React.FC<HimnoPlayerProps> = ({ onCompleted }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'letra'>('video');
  const [activeStanzaIndex, setActiveStanzaIndex] = useState<number>(0);
  const [hasWatched, setHasWatched] = useState<boolean>(false);

  const himno = INSTITUTIONAL_INFO.simbolos.himno;
  const youtubeUrl = 'https://youtu.be/PvwEJWhSjYE';
  const youtubeEmbedUrl = 'https://www.youtube-nocookie.com/embed/PvwEJWhSjYE?autoplay=0&rel=0';

  const handleVideoInteract = () => {
    if (!hasWatched) {
      setHasWatched(true);
      audioSynth.playSuccess();
      if (onCompleted) {
        onCompleted();
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#00324D] via-[#022030] to-[#01141e] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/60 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#39A900]/20 border border-[#39A900]/40 flex items-center justify-center text-[#39A900] shadow-inner">
            <Music className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <Sparkles className="w-3 h-3" />
              SÍMBOLO INSTITUCIONAL AUDIOVISUAL
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white mt-1">
              Himno Oficial del SENA
            </h3>
            <p className="text-xs text-slate-300">
              Letra: <span className="text-white font-medium">{himno.autores.letra}</span> | Música: <span className="text-white font-medium">{himno.autores.musica}</span>
            </p>
          </div>
        </div>

        {/* View Mode Switcher & YouTube External Link */}
        <div className="flex items-center gap-2">
          <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Video Oficial</span>
            </button>
            <button
              onClick={() => setActiveTab('letra')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'letra'
                  ? 'bg-[#39A900] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Letra y Estrofas</span>
            </button>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleVideoInteract}
            className="p-2 bg-slate-800/80 hover:bg-rose-900/60 hover:text-rose-200 text-slate-300 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Abrir video en YouTube"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Ver en YouTube</span>
          </a>
        </div>
      </div>

      {/* Main Content Area: Video or Stanzas */}
      <div className="relative z-10 mt-6">
        {activeTab === 'video' ? (
          /* Video Tab with embedded official YouTube player */
          <div className="space-y-4">
            <div
              onClick={handleVideoInteract}
              className="relative w-full aspect-video sm:aspect-[21/9] max-h-[460px] bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl"
            >
              <iframe
                src={youtubeEmbedUrl}
                title="Himno Oficial del SENA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video description bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-slate-300">
                  Video oficial del Himno del SENA en alta definición con orquesta marcial y coro institucional.
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasWatched ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Hito acreditado en la inducción
                  </span>
                ) : (
                  <button
                    onClick={handleVideoInteract}
                    className="px-3 py-1 bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Marcar como visto ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Lyrics & Karaoke Stanzas Tab */
          <div className="space-y-4">
            {/* Stanza Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {himno.estrofas.map((estrofa, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStanzaIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    activeStanzaIndex === idx
                      ? 'bg-[#39A900] text-white shadow-md'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {estrofa.tipo}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lyrics Card */}
              <div className="lg:col-span-8 bg-slate-900/70 backdrop-blur-md rounded-2xl p-6 border border-slate-800 flex flex-col justify-center min-h-[220px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Disc className="w-3.5 h-3.5" />
                    {himno.estrofas[activeStanzaIndex].tipo}
                  </span>
                  <span className="text-xs text-slate-400">
                    Parte {activeStanzaIndex + 1} de {himno.estrofas.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {himno.estrofas[activeStanzaIndex].lineas.map((linea, lineIdx) => (
                    <p
                      key={lineIdx}
                      className={`text-lg sm:text-xl font-medium tracking-wide ${
                        activeStanzaIndex === 0
                          ? 'font-bold text-emerald-300'
                          : 'text-slate-100'
                      }`}
                    >
                      {linea}
                    </p>
                  ))}
                </div>
              </div>

              {/* Pedagogical Meaning Card */}
              <div className="lg:col-span-4 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-2">
                    <BookOpen className="w-4 h-4" />
                    Mensaje Formativo
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    El himno convoca a todos los aprendices colombianos a ser protagonistas del cambio noble,
                    proclamando que el <strong>trabajo y la ciencia</strong> son el camino que forja la libertad,
                    la productividad y la paz nacional.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60">
                  <button
                    onClick={() => setActiveTab('video')}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    Ver Video Oficial en YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
