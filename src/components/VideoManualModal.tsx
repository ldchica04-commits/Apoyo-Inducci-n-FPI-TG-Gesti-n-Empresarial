import React, { useState, useRef, useEffect } from 'react';
import { SenaLogo } from './SenaLogo';
import { audioSynth } from '../utils/audioSynth';
import {
  Play,
  Pause,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Video,
  Sparkles,
  Film,
  ExternalLink
} from 'lucide-react';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoManualModal: React.FC<VideoManualModalProps> = ({
  isOpen,
  onClose,
  videoUrl = '/assets/aistudio/2026__17_17_dcf19e79.mp4'
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policies if un-muted
        setIsPlaying(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // FLOATING MINIMIZED WIDGET (Bottom Right corner)
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-slate-900 text-white shadow-2xl border-2 border-[#39A900] overflow-hidden animate-in fade-in slide-in-from-bottom-5">
        {/* Floating Header */}
        <div className="bg-[#00324D] px-3.5 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2 truncate">
            <Video className="w-4 h-4 text-[#39A900] shrink-0" />
            <span className="text-xs font-bold text-white truncate">Video Manual SENA</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setIsMinimized(false);
                audioSynth.playClick();
              }}
              className="p-1 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Expandir a pantalla centrada"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onClose();
                audioSynth.playClick();
              }}
              className="p-1 hover:bg-rose-900/80 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Cerrar video"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black group">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Banner */}
        <div className="px-3 py-1.5 bg-slate-950 flex items-center justify-between text-[10px] text-slate-400">
          <span className="text-emerald-400 font-bold">Ficha 2834912 ADSO</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="hover:text-white underline font-semibold"
          >
            Maximizar ventana
          </button>
        </div>
      </div>
    );
  }

  // FULL FLOATING OVERLAY MODAL
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-slate-900 rounded-3xl max-w-4xl w-full border-2 border-emerald-500/40 shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Control Bar */}
        <div className="bg-[#00324D] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <SenaLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/40">
                  Manual de Prototipo Interactivo
                </span>
              </div>
              <h3 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
                <Film className="w-4 h-4 text-[#39A900]" />
                <span>Video Explicativo de la Plataforma SENA</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Minimize to PiP Floating Widget */}
            <button
              onClick={() => {
                setIsMinimized(true);
                audioSynth.playClick();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5"
              title="Minimizar a ventana flotante inferior para seguir navegando"
            >
              <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Minimizar Flotante</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                onClose();
                audioSynth.playClick();
              }}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Video Viewport */}
        <div className="relative bg-black aspect-video flex items-center justify-center cursor-pointer" onClick={handleTogglePlay}>
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
          >
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>
              <strong>Manual en Video</strong> • Inducción Institucional y Reglamento del Aprendiz SENA (Ficha 2834912)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-emerald-400 hover:underline font-bold text-xs flex items-center gap-1"
            >
              <span>Seguir navegando en ventana flotante</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              Cerrar Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
