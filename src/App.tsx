import React, { useState, useEffect } from 'react';
import { Role, ApprenticeProfile, InstructorProfile, InductionChecklistItem } from './types';
import { INITIAL_APPRENTICE, INITIAL_CHECKLIST, AVAILABLE_APPRENTICES } from './data/senaData';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { SenaLogo } from './components/SenaLogo';
import { HimnoPlayer } from './components/HimnoPlayer';
import { SimbolosViewer } from './components/SimbolosViewer';
import { ReglamentoExplorer } from './components/ReglamentoExplorer';
import { SimuladorCasos } from './components/SimuladorCasos';
import { TriviaReto } from './components/TriviaReto';
import { FlashcardsViewer } from './components/FlashcardsViewer';
import { SeguimientoDashboard } from './components/SeguimientoDashboard';
import { CertificadoModal } from './components/CertificadoModal';
import { TutorNormativo } from './components/TutorNormativo';
import { AdminDashboard } from './components/AdminDashboard';
import { ConsultaFichaModal } from './components/ConsultaFichaModal';
import { ManualInduccionModal } from './components/ManualInduccionModal';
import { VideoManualModal } from './components/VideoManualModal';
import { audioSynth } from './utils/audioSynth';
import confetti from 'canvas-confetti';
import {
  Compass,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  HelpCircle,
  FileCheck,
  Building2,
  ExternalLink,
  Flame,
  Clock,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<string>('induccion');
  const [userRole, setUserRole] = useState<Role>('aprendiz');
  const [apprentice, setApprentice] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem('sena_apprentice_profile');
    return saved ? JSON.parse(saved) : INITIAL_APPRENTICE;
  });

  const handleRoleSelect = (role: Role, selectedApp?: ApprenticeProfile, selectedInst?: InstructorProfile) => {
    setUserRole(role);
    if (selectedApp) {
      setApprentice(selectedApp);
    }
    if (role === 'instructor') {
      setCurrentTab('seguimiento');
    } else if (role === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('induccion');
    }
    setViewMode('app');
    if (soundEnabled) {
      audioSynth.playSuccess();
    }
  };

  const [checklist, setChecklist] = useState<InductionChecklistItem[]>(() => {
    const saved = localStorage.getItem('sena_induction_checklist');
    if (saved) {
      try {
        const parsed: InductionChecklistItem[] = JSON.parse(saved);
        return INITIAL_CHECKLIST.map((initItem) => {
          const found = parsed.find((p) => p.id === initItem.id);
          return found
            ? { ...initItem, completed: found.completed, completedAt: found.completedAt }
            : initItem;
        });
      } catch {
        return INITIAL_CHECKLIST;
      }
    }
    return INITIAL_CHECKLIST;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [isConsultaFichaOpen, setIsConsultaFichaOpen] = useState<boolean>(false);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);
  const [isVideoManualOpen, setIsVideoManualOpen] = useState<boolean>(false);

  // Dark mode state and smooth blur transition
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
  });

  const [isBlurring, setIsBlurring] = useState<boolean>(false);
  const [blurPhase, setBlurPhase] = useState<'idle' | 'blurring' | 'clearing'>('idle');

  // Maintain .dark class on <html> document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sena_dark_mode', String(darkMode));
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    if (isBlurring) return;
    setIsBlurring(true);
    setBlurPhase('blurring');
    if (soundEnabled) {
      audioSynth.playClick();
    }

    // Screen blurs smoothly, then midway changes the theme color, and unblurs
    setTimeout(() => {
      setDarkMode((prev) => !prev);
      setBlurPhase('clearing');

      setTimeout(() => {
        setIsBlurring(false);
        setBlurPhase('idle');
      }, 380);
    }, 280);
  };

  // Sync to local storage for realistic persistence
  useEffect(() => {
    localStorage.setItem('sena_induction_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(apprentice));
  }, [apprentice]);

  // Overall progress percentage based on 10 milestones
  const completedCount = checklist.filter((item) => item.completed).length;
  const overallProgress = Math.round((completedCount / checklist.length) * 100);

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) {
            audioSynth.playSuccess();
          } else {
            audioSynth.playClick();
          }
          return {
            ...item,
            completed: nextCompleted,
            completedAt: nextCompleted
              ? new Date().toISOString().split('T')[0]
              : undefined,
          };
        }
        return item;
      })
    );
  };

  // Mark symbol learned or module completed
  const handleMarkModuleComplete = (checkId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === checkId
          ? {
              ...item,
              completed: true,
              completedAt: new Date().toISOString().split('T')[0],
            }
          : item
      )
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 selection:bg-emerald-200 selection:text-emerald-900 ${
        darkMode ? 'dark bg-[#0b1120] text-slate-100' : 'bg-slate-50 text-slate-800'
      } ${
        blurPhase === 'blurring'
          ? 'screen-blur-active'
          : blurPhase === 'clearing'
          ? 'screen-blur-clearing'
          : ''
      }`}
    >
      {/* Fullscreen Blur Transition Overlay with feedback badge */}
      {isBlurring && (
        <div className="theme-blur-backdrop bg-slate-900/20">
          <div className="px-6 py-3.5 rounded-2xl bg-slate-900/90 text-white backdrop-blur-xl border border-slate-700/80 shadow-2xl flex items-center gap-3 animate-pulse">
            {darkMode ? (
              <>
                <Sun className="w-5 h-5 text-amber-400 animate-spin" />
                <span className="text-sm font-bold tracking-wide">
                  Cambiando a Modo Claro...
                </span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-indigo-300 animate-pulse" />
                <span className="text-sm font-bold tracking-wide">
                  Activando Modo Oscuro Institucional...
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {viewMode === 'landing' ? (
        <LandingPage
          onSelectRole={handleRoleSelect}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          isBlurring={isBlurring}
          currentApprentice={apprentice}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
        />
      ) : userRole === 'admin' ? (
        <AdminDashboard
          onBackToLanding={() => setViewMode('landing')}
          onSelectRole={handleRoleSelect}
        />
      ) : (
        <>
          {/* Top Navbar */}
          <Navbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            userRole={userRole}
            setUserRole={setUserRole}
            apprentice={apprentice}
            setApprentice={setApprentice}
            availableApprentices={AVAILABLE_APPRENTICES}
            onBackToLanding={() => setViewMode('landing')}
            onOpenConsultaFicha={() => setIsConsultaFichaOpen(true)}
            onOpenManual={() => setIsManualOpen(true)}
            onOpenVideoManual={() => setIsVideoManualOpen(true)}
            overallProgress={overallProgress}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            onOpenCertificate={() => setIsCertModalOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            isBlurring={isBlurring}
          />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: RUTA DE INDUCCIÓN (HOME & ROADMAP) */}
        {currentTab === 'induccion' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-[#00324D] via-[#022437] to-[#01141e] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#39A900]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#39A900]/30 border border-[#39A900]/50 text-emerald-300 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bienvenido a la Familia SENA • Convocatoria 2026
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Inducción a la Formación Profesional Integral
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  ¡Hola, <strong className="text-white">{apprentice.name}</strong>! Inicia tu recorrido formativo en el{' '}
                  <strong>{apprentice.programName}</strong>. Aquí aprenderás la identidad, la normativa, los símbolos y el
                  Reglamento del Aprendiz mediante actividades interactivas, quizzes y simuladores de casos.
                </p>

                {/* Progress Quick Banner */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-extrabold text-sm">
                      {overallProgress}%
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Progreso de Inducción</p>
                      <p className="text-[11px] text-emerald-400">
                        {completedCount} de {checklist.length} compromisos completados
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTab('institucional')}
                    className="px-6 py-3 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
                  >
                    <span>Comenzar con Símbolos e Identidad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCurrentTab('seguimiento')}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-2xl border border-slate-700 transition-all"
                  >
                    Ver Hoja de Ruta
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setCurrentTab('institucional')}
                className="bg-white hover:bg-emerald-50/40 p-6 rounded-2xl border border-slate-200 hover:border-[#39A900] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-[#39A900] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-1.5 border border-emerald-200">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo SENA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 text-lg">
                  1. Identidad y Símbolos
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Escudo (los 3 sectores), Bandera, Logotipo, Misión, Visión e Himno oficial del SENA.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-[#39A900] group-hover:translate-x-1 transition-transform">
                  Explorar símbolos →
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('normativa')}
                className="bg-white hover:bg-emerald-50/40 p-6 rounded-2xl border border-slate-200 hover:border-[#39A900] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-800 text-lg">
                  2. Reglamento del Aprendiz
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Acuerdo 009 de 2024 y modif. Acuerdo 002 de 2026: Derechos, deberes, prohibiciones, deserción y debido proceso.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                  Consultar normas →
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('simulador')}
                className="bg-white hover:bg-emerald-50/40 p-6 rounded-2xl border border-slate-200 hover:border-[#39A900] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-800 text-lg">
                  3. Simulador de Comité
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Resuelve casos de dilemas éticos y disciplinarios reales como miembro del comité evaluador.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
                  Resolver casos →
                </div>
              </div>

              <div
                onClick={() => setCurrentTab('evaluacion')}
                className="bg-white hover:bg-emerald-50/40 p-6 rounded-2xl border border-slate-200 hover:border-[#39A900] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-800 text-lg">
                  4. Quizzes y Trivia
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Evaluación interactiva contrarreloj con retroalimentación inmediata para acreditar tu inducción.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  Presentar reto →
                </div>
              </div>
            </div>

            {/* Himno Player in Hero Page */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Himno Institucional del SENA
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aprende la letra, reproduce la melodía y canta con la letra sincronizada.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('institucional')}
                  className="text-xs font-bold text-[#39A900] hover:underline"
                >
                  Ver todos los símbolos
                </button>
              </div>
              <HimnoPlayer onCompleted={() => handleMarkModuleComplete('chk-2')} />
            </div>

            {/* Quick Checklist Teaser & Advisor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 text-base">
                    Hitos Principales de la Semana de Inducción
                  </h4>
                  <button
                    onClick={() => setCurrentTab('seguimiento')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Ver los 10 hitos
                  </button>
                </div>

                <div className="space-y-2.5">
                  {checklist.slice(0, 5).map((chk) => (
                    <div
                      key={chk.id}
                      onClick={() => handleToggleChecklistItem(chk.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        chk.completed
                          ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            chk.completed ? 'text-[#39A900]' : 'text-slate-300'
                          }`}
                        />
                        <span className="text-xs font-semibold">{chk.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">
                        {chk.completed ? '✓ Completado' : 'Pendiente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast FAQ Advisor */}
              <div className="lg:col-span-5 space-y-4">
                <TutorNormativo />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IDENTIDAD Y SÍMBOLOS */}
        {currentTab === 'institucional' && (
          <div className="space-y-8">
            <SimbolosViewer
              onLearnSymbol={() => handleMarkModuleComplete('chk-2')}
            />
            <div className="pt-4">
              <HimnoPlayer onCompleted={() => handleMarkModuleComplete('chk-2')} />
            </div>
            <div className="pt-4">
              <FlashcardsViewer />
            </div>
          </div>
        )}

        {/* TAB 3: REGLAMENTO Y NORMAS */}
        {currentTab === 'normativa' && (
          <div className="space-y-8">
            <ReglamentoExplorer
              onArticleRead={() => handleMarkModuleComplete('chk-3')}
            />
            <TutorNormativo />
          </div>
        )}

        {/* TAB 4: SIMULADOR DE CASOS */}
        {currentTab === 'simulador' && (
          <div className="space-y-8">
            <SimuladorCasos
              onCaseSolved={() => handleMarkModuleComplete('chk-6')}
            />
          </div>
        )}

        {/* TAB 5: EVALUACIÓN Y TRIVIA */}
        {currentTab === 'evaluacion' && (
          <div className="space-y-8">
            <TriviaReto
              onQuizCompleted={(score) => {
                if (score >= 70) {
                  handleMarkModuleComplete('chk-5');
                }
              }}
            />
            <FlashcardsViewer />
          </div>
        )}

        {/* TAB 6: SEGUIMIENTO Y GESTIÓN FICHA */}
        {currentTab === 'seguimiento' && (
          <SeguimientoDashboard
            userRole={userRole}
            apprentice={apprentice}
            checklist={checklist}
            onToggleChecklistItem={handleToggleChecklistItem}
            onOpenCertificate={() => setIsCertModalOpen(true)}
            overallProgress={overallProgress}
          />
        )}
      </main>

      {/* Official SENA Certificate Modal */}
      <CertificadoModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        apprentice={apprentice}
        overallProgress={overallProgress}
      />

      {/* Consulta por Ficha Modal */}
      <ConsultaFichaModal
        isOpen={isConsultaFichaOpen}
        onClose={() => setIsConsultaFichaOpen(false)}
        onSelectApprentice={(app) => setApprentice(app)}
      />

      {/* Manual de Inducción Modal */}
      <ManualInduccionModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        onOpenVideoManual={() => setIsVideoManualOpen(true)}
      />

      {/* Video Manual Flotante Modal */}
      <VideoManualModal
        isOpen={isVideoManualOpen}
        onClose={() => setIsVideoManualOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="bg-[#00324D] text-slate-300 text-xs py-8 border-t-4 border-[#39A900] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <SenaLogo variant="white" size={38} />
              <div>
                <p className="font-extrabold text-white text-sm">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </p>
                <p className="text-[11px] text-emerald-400">
                  Ministerio del Trabajo • República de Colombia
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://oferta.senasofiaplus.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                SOFIA Plus <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://zajuna.sena.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                Zajuna LMS <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://www.sena.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                Portal SENA <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <p>
              Plataforma de Inducción Formativa SENA. Basado en el Nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 y modif. Acuerdo 002 de 2026) y el Decreto Ley 118 de 1957.
            </p>
            <p>
              © 2026 Servicio Nacional de Aprendizaje. Formación profesional integral para el trabajo y el desarrollo humano.
            </p>
          </div>
        </div>
      </footer>
    </>
  )}
</div>
);
}
