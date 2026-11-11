import React, { useState } from 'react';
import { Role, ApprenticeProfile } from '../types';
import { SenaLogo } from './SenaLogo';
import { DEFAULT_INSTRUCTOR } from '../data/senaData';
import {
  BookOpen,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  FileText,
  Volume2,
  VolumeX,
  Compass,
  GraduationCap,
  Sun,
  Moon,
  Home,
  UserCheck,
  ChevronDown,
  Search,
  Video
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: Role;
  setUserRole: (role: Role) => void;
  apprentice: ApprenticeProfile;
  setApprentice?: (apprentice: ApprenticeProfile) => void;
  availableApprentices?: ApprenticeProfile[];
  onBackToLanding: () => void;
  onOpenConsultaFicha?: () => void;
  onOpenManual?: () => void;
  onOpenVideoManual?: () => void;
  overallProgress: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenCertificate: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isBlurring: boolean;
}
export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  apprentice,
  setApprentice,
  availableApprentices = [],
  onBackToLanding,
  onOpenConsultaFicha,
  onOpenManual,
  onOpenVideoManual,
  overallProgress,
  soundEnabled,
  setSoundEnabled,
  onOpenCertificate,
  darkMode,
  onToggleDarkMode,
  isBlurring
}) => {
  const [showApprenticeDropdown, setShowApprenticeDropdown] = useState(false);

  const tabs = [
    { id: 'induccion', label: 'Ruta de Inducción', icon: Compass },
    { id: 'institucional', label: 'Identidad y Símbolos', icon: Sparkles },
    { id: 'normativa', label: 'Reglamento y Normas', icon: BookOpen },
    { id: 'simulador', label: 'Simulador de Casos', icon: GraduationCap },
    { id: 'evaluacion', label: 'Quizzes y Trivia', icon: Award },
    { id: 'seguimiento', label: 'Seguimiento Ficha', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#002538]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Institutional Top Bar */}
      <div className="bg-[#00324D] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Back to Landing Page button */}
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-semibold transition-all"
            title="Volver a la portada de selección de rol"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio / Portada</span>
          </button>

          {onOpenConsultaFicha && (
            <button
              onClick={onOpenConsultaFicha}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/40 font-semibold transition-all"
              title="Consultar aprendices por Ficha de formación"
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span>Consultar por Ficha</span>
            </button>
          )}

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#39A900]/20 hover:bg-[#39A900]/40 text-emerald-300 border border-emerald-400/40 font-semibold transition-all"
              title="Ver el Manual de Manejo del Prototipo"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>Manual de Uso</span>
            </button>
          )}

          {onOpenVideoManual && (
            <a
              href="https://docs.google.com/videos/d/1M3dVM_7MiYxOeYnnaWdBJBDZEfOqSLOw22w9R9LHtSs/edit?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                onOpenVideoManual();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 border border-purple-400/50 font-bold transition-all shadow-xs animate-pulse cursor-pointer"
              title="Reproducir Video Explicativo (Modal) o abrir enlace externo"
            >
              <Video className="w-3.5 h-3.5 text-purple-300" />
              <span>Video Manual</span>
            </a>
          )}

          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden md:inline font-semibold tracking-wide text-emerald-400">
            SISTEMA DE GESTIÓN Y FORMACIÓN SENA
          </span>
          <span className="hidden lg:inline text-slate-400">|</span>
          <span className="hidden lg:inline text-slate-300">
            Ficha: <strong className="text-emerald-300">{apprentice.fichaNumber}</strong>
          </span>
        </div>

        {/* Top Right Actions: Role Switcher & Dark Mode Button */}
        <div className="flex items-center gap-3">
          {/* Active Profile Indicator / Quick Switcher */}
          {userRole === 'aprendiz' ? (
            <div className="relative">
              <button
                onClick={() => setShowApprenticeDropdown(!showApprenticeDropdown)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-[11px] font-semibold transition-all"
                title="Cambiar entre los múltiples aprendices de la ficha"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[130px] truncate">{apprentice.name.split(' ')[0]} {apprentice.name.split(' ')[1] || ''}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {showApprenticeDropdown && availableApprentices.length > 0 && (
                <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    Cambiar de Aprendiz:
                  </div>
                  {availableApprentices.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        if (setApprentice) setApprentice(app);
                        setShowApprenticeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        app.id === apprentice.id ? 'text-[#39A900] font-bold bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{app.name}</span>
                      <span className="text-[10px] text-slate-400">{app.documentNumber}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-semibold">
              <Users className="w-3 h-3" />
              <span>{DEFAULT_INSTRUCTOR.name} (Único encargado)</span>
            </div>
          )}

          {/* Quick Role Toggle */}
          <div className="inline-flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => {
                setUserRole('aprendiz');
                setShowApprenticeDropdown(false);
              }}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                userRole === 'aprendiz'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Aprendiz
            </button>
            <button
              onClick={() => {
                setUserRole('instructor');
                setCurrentTab('seguimiento');
                setShowApprenticeDropdown(false);
              }}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                userRole === 'instructor'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Instructor
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setCurrentTab('admin');
                setShowApprenticeDropdown(false);
              }}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                userRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

          <span className="text-slate-500">|</span>

          {/* Dark Mode Button in Top Right Corner */}
          <button
            onClick={onToggleDarkMode}
            disabled={isBlurring}
            aria-label={darkMode ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border shadow-sm select-none ${
              darkMode
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/50'
                : 'bg-slate-850 hover:bg-slate-750 text-slate-100 border-slate-700 hover:border-slate-500'
            }`}
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300/30" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentTab('induccion')}>
            <SenaLogo size={42} />
            <div className="hidden lg:block border-l border-slate-200 dark:border-slate-700 pl-4">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                Inducción a la Formación Profesional
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {apprentice.programName}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-[#39A900] border-b-2 border-[#39A900]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#39A900]' : 'text-slate-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* User Status, Progress and Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Icon Toggle */}
            <button
              onClick={onToggleDarkMode}
              disabled={isBlurring}
              title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>

            {/* Overall Progress Indicator */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                  <span>{overallProgress}%</span>
                  <span className="text-[10px] text-slate-500 font-normal">avance</span>
                </div>
              </div>
            </div>

            {/* Certificado Button */}
            <button
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-lg shadow-sm transition-all transform active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Constancia SENA</span>
            </button>
          </div>
        </div>

        {/* Mobile / Compact Navigation Bar */}
        <div className="xl:hidden flex overflow-x-auto py-2 gap-1 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#39A900] text-white'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
