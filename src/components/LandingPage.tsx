import React, { useState } from 'react';
import { ApprenticeProfile, InstructorProfile, Role } from '../types';
import { DEFAULT_INSTRUCTOR, AVAILABLE_APPRENTICES } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { audioSynth } from '../utils/audioSynth';
import { validateInstructorLogin } from '../utils/instructorManager';
import { saveRegisteredApprentice } from '../utils/apprenticeManager';
import { ConsultaFichaModal } from './ConsultaFichaModal';
import {
  GraduationCap,
  Users,
  Compass,
  BookOpen,
  Award,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Sparkles,
  UserCheck,
  ChevronRight,
  Clock,
  FileCheck,
  Info,
  Scale,
  Save,
  User,
  Mail,
  Phone,
  Building2,
  Hash,
  IdCard,
  Check,
  UserPlus,
  LogIn,
  Key,
  Lock,
  ShieldCheck,
  Settings,
  ShieldAlert,
  Search,
  Video
} from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: Role, selectedApprentice?: ApprenticeProfile, instructorProfile?: InstructorProfile) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isBlurring: boolean;
  currentApprentice: ApprenticeProfile;
  onOpenVideoManual?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  darkMode,
  onToggleDarkMode,
  isBlurring,
  currentApprentice,
  onOpenVideoManual
}) => {
  // Flow step for apprentice role:
  // 'select_role': Show the 2 main buttons (Registrar Nuevo Aprendiz vs Iniciar Sesión)
  // 'register': Registration form asking all required apprentice fields
  // 'login': Login form asking for Document number and password
  // 'saving': Transitioning state
  const [apprenticeStep, setApprenticeStep] = useState<'select_role' | 'register' | 'login' | 'saving'>('select_role');

  // Initial empty registration form template
  const EMPTY_REGISTER_FORM: ApprenticeProfile = {
    id: `app-custom-${Date.now()}`,
    name: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    fichaNumber: '',
    programName: '',
    centerName: 'Centro de Biotecnología Industrial',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  };

  // Form state for apprentice profile (Registration) - Empty fields with indications
  const [formData, setFormData] = useState<ApprenticeProfile>(EMPTY_REGISTER_FORM);
  const [formError, setFormError] = useState<string>('');

  // Login form state (Empty initial values to avoid pre-filling passwords)
  const [loginDoc, setLoginDoc] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Instructor login form state
  const [showInstructorLogin, setShowInstructorLogin] = useState<boolean>(false);
  const [instructorDoc, setInstructorDoc] = useState<string>('');
  const [instructorPassword, setInstructorPassword] = useState<string>('');
  const [instructorError, setInstructorError] = useState<string>('');

  // Admin login form state
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');

  const instructor: InstructorProfile = DEFAULT_INSTRUCTOR;

  // Instructor authentication handler using individual assigned key
  const handleInstructorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructorError('');

    const res = validateInstructorLogin(instructorDoc, instructorPassword);
    if (!res.success) {
      setInstructorError(res.error || 'Credenciales de instructor incorrectas.');
      audioSynth.playError();
      return;
    }

    audioSynth.playSuccess();
    onSelectRole('instructor', undefined, res.instructor);
  };

  // Admin authentication handler requiring admon1234
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!adminPassword.trim()) {
      setAdminError('Por favor ingresa la contraseña de Administrador.');
      audioSynth.playError();
      return;
    }

    if (adminPassword.trim() !== 'admon1234') {
      setAdminError('Contraseña de Administrador incorrecta. Verifique sus credenciales de acceso.');
      audioSynth.playError();
      return;
    }

    audioSynth.playSuccess();
    onSelectRole('admin');
  };

  // Open clean registration form
  const handleOpenRegistration = () => {
    setFormData({
      ...EMPTY_REGISTER_FORM,
      id: `app-custom-${Date.now()}`
    });
    setFormError('');
    setApprenticeStep('register');
    audioSynth.playClick();
  };

  // Handle selecting a preloaded student in Login Form
  const handleLoginPresetSelect = (presetId: string) => {
    const found = AVAILABLE_APPRENTICES.find(a => a.id === presetId);
    if (found) {
      setLoginDoc(found.documentNumber);
      setLoginPassword(''); // Do not prefill password
      setLoginError('');
    }
    audioSynth.playClick();
  };

  // Modal state for consulting registered apprentices by Ficha
  const [isConsultaFichaOpen, setIsConsultaFichaOpen] = useState<boolean>(false);

  // Submission for Registration Form
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Por favor ingresa los Nombres y Apellidos completos.');
      audioSynth.playError();
      return;
    }

    if (!formData.documentNumber.trim()) {
      setFormError('Por favor ingresa el Número de Documento.');
      audioSynth.playError();
      return;
    }

    if (!formData.email.trim()) {
      setFormError('Por favor ingresa un Correo Electrónico válido.');
      audioSynth.playError();
      return;
    }

    // Save profile to persistent list
    saveRegisteredApprentice(formData);

    setApprenticeStep('saving');
    audioSynth.playSuccess();

    setTimeout(() => {
      onSelectRole('aprendiz', formData);
    }, 450);
  };

  // Submission for Apprentice Login Form
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanDoc = loginDoc.trim();
    const cleanPass = loginPassword.trim();

    if (!cleanDoc) {
      setLoginError('Ingresa tu Número de Documento de Identidad.');
      audioSynth.playError();
      return;
    }

    if (!cleanPass) {
      setLoginError('Ingresa tu contraseña de acceso.');
      audioSynth.playError();
      return;
    }

    const expectedPass = cleanDoc.length >= 4 ? cleanDoc.slice(-4) : cleanDoc;
    if (cleanPass !== expectedPass && cleanPass !== '1234') {
      setLoginError('Contraseña incorrecta. Verifica tus datos e intentalo nuevamente.');
      audioSynth.playError();
      return;
    }

    // Find if apprentice exists in preloaded cohort or construct profile
    const existing = AVAILABLE_APPRENTICES.find(a => a.documentNumber === cleanDoc) || {
      ...formData,
      id: `app-logged-${cleanDoc}`,
      documentNumber: cleanDoc,
      name: formData.name || 'Aprendiz Registrado',
    };

    localStorage.setItem('sena_apprentice_profile', JSON.stringify(existing));

    setApprenticeStep('saving');
    audioSynth.playSuccess();

    setTimeout(() => {
      onSelectRole('aprendiz', existing);
    }, 450);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#080e1a] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Top Institutional Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#00324D]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="bg-[#00324D] text-white text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-emerald-400">
              SERVICIO NACIONAL DE APRENDIZAJE - SENA
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Regional Valle del Cauca • Ficha 2834912
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-300 hidden sm:inline">
              Vigencia Normativa: <strong className="text-emerald-300">Acuerdos 009/2024 y 002/2026</strong>
            </span>
            <button
              onClick={onToggleDarkMode}
              disabled={isBlurring}
              aria-label={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                darkMode
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
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

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SenaLogo size={44} />
            <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
              <h1 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Portal de Inducción a la Formación Profesional
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Centro de Biotecnología Industrial • Ficha 2834912 ADSO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenVideoManual && (
              <a
                href="https://docs.google.com/videos/d/1M3dVM_7MiYxOeYnnaWdBJBDZEfOqSLOw22w9R9LHtSs/edit?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenVideoManual();
                  audioSynth.playClick();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md hover:shadow-purple-500/20 transition-all flex items-center gap-2 cursor-pointer"
                title="Reproducir Video Explicativo (Modal) o abrir enlace externo"
              >
                <Video className="w-4 h-4 text-purple-200 animate-pulse" />
                <span>Ver Video Manual</span>
              </a>
            )}

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[#39A900] dark:text-emerald-400 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>Reglamento Actualizado 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Bienvenido a tu Formación Profesional Integral</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Inducción Institucional y <span className="text-[#39A900]">Normativa SENA</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Plataforma interactiva para la apropiación del <strong>Reglamento del Aprendiz (Acuerdo 009 de 2024 y Acuerdo 002 de 2026)</strong> y seguimiento de la Ficha 2834912.
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Selecciona tu perfil institucional de acceso:
          </p>
        </div>

        {/* Roles Selection Grid - 3 Column Layout */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          
          {/* CARD 1: ROL DE APRENDIZ */}
          <div className="relative group rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 border-emerald-500/50 hover:border-emerald-500 dark:border-emerald-700/60 dark:hover:border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                {apprenticeStep === 'select_role'
                  ? 'Portal Aprendices'
                  : apprenticeStep === 'register'
                  ? 'Registro'
                  : 'Inicio Sesión'}
              </span>

              {apprenticeStep !== 'select_role' && (
                <button
                  type="button"
                  onClick={() => {
                    setApprenticeStep('select_role');
                    setFormError('');
                    setLoginError('');
                    audioSynth.playClick();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver</span>
                </button>
              )}
            </div>

            {/* VISTA 1: OPCIONES DE APRENDIZ */}
            {apprenticeStep === 'select_role' && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#39A900] shadow-inner">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Rol de Aprendiz
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mt-0.5">
                      Ingreso Estudiantil
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Si eres un nuevo aprendiz, completa tu registro personal. Si ya estás registrado, ingresa con tu documento y clave.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4">
                  <button
                    type="button"
                    onClick={handleOpenRegistration}
                    className="w-full py-3 px-4 rounded-2xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Registro de Nuevo Aprendiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setApprenticeStep('login');
                      audioSynth.playClick();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-xs border border-slate-300 dark:border-slate-600 shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4 text-[#39A900]" />
                    <span>Iniciar Sesión (Aprendiz Registrado)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsConsultaFichaOpen(true);
                      audioSynth.playClick();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-[#39A900] dark:text-emerald-300 font-extrabold text-xs border border-emerald-300 dark:border-emerald-800 shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4 text-[#39A900]" />
                    <span>Consultar Aprendices por Ficha</span>
                  </button>
                </div>
              </div>
            )}

            {/* VISTA 2: REGISTRO DE APRENDIZ */}
            {(apprenticeStep === 'register' || (apprenticeStep === 'saving' && formData.name)) && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#39A900]" />
                    <span>Registro de Aprendiz</span>
                  </h3>
                </div>

                {/* Validation Error Banner */}
                {formError && (
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-300 text-rose-700 dark:text-rose-300 text-[11px] font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                      Nombres y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Carlos Pérez Morales"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Tipo</label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                        className="w-full px-2 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="CE">CE</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Documento *</label>
                      <input
                        type="text"
                        required
                        value={formData.documentNumber}
                        onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                        placeholder="Ej. 1098765432"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Correo Institucional *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ej. jcperez.aprendiz@sena.edu.co"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Ficha *</label>
                      <input
                        type="text"
                        required
                        value={formData.fichaNumber}
                        onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                        placeholder="2834912"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Programa *</label>
                      <input
                        type="text"
                        required
                        value={formData.programName}
                        onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                        placeholder="ADSO"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={apprenticeStep === 'saving'}
                  className="w-full py-3 px-4 rounded-2xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Perfil y Continuar</span>
                </button>
              </form>
            )}

            {/* VISTA 3: LOGIN APRENDIZ */}
            {(apprenticeStep === 'login' || (apprenticeStep === 'saving' && !formData.name)) && (
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-[#39A900]" />
                    <span>Iniciar Sesión Aprendiz</span>
                  </h3>
                </div>



                {loginError && (
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-300 text-rose-700 dark:text-rose-300 text-[11px] font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                      Documento de Identidad *
                    </label>
                    <input
                      type="text"
                      required
                      value={loginDoc}
                      onChange={(e) => setLoginDoc(e.target.value)}
                      placeholder="Ej. 1023847562"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                      Contraseña de Acceso *
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Si requieres asistencia con tu cuenta, contacta con tu Instructor.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar al Portal</span>
                </button>
              </form>
            )}
          </div>

          {/* CARD 2: ROL DE INSTRUCTOR */}
          <div className="relative group rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 border-amber-500/40 hover:border-amber-500 dark:border-amber-600/50 dark:hover:border-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-300 dark:border-amber-700">
                    Docente de Ficha
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 shadow-inner">
                  <Users className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  Rol de Instructor
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Panel de supervisión y trazabilidad de los aprendices. Ingresa con tu documento y tu clave asignada.
                </p>

                {/* Profile Leader Info */}
                <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-xs space-y-2 mb-3">
                  <p className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Líder a Cargo: {instructor.name}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ficha {instructor.assignedFicha} • {instructor.email}
                  </p>
                </div>
              </div>

              {!showInstructorLogin ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowInstructorLogin(true);
                    setInstructorError('');
                    audioSynth.playClick();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Acceder como Instructor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleInstructorLoginSubmit} className="space-y-3 pt-2 border-t border-amber-200 dark:border-amber-800/60">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      <span>Ingreso Instructor</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInstructorLogin(false);
                        setInstructorError('');
                        audioSynth.playClick();
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  {instructorError && (
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-semibold flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{instructorError}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                        Documento de Identidad *
                      </label>
                      <input
                        type="text"
                        required
                        value={instructorDoc}
                        onChange={(e) => setInstructorDoc(e.target.value)}
                        placeholder="Ej. 14892301"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                        Contraseña de Instructor *
                      </label>
                      <input
                        type="password"
                        required
                        value={instructorPassword}
                        onChange={(e) => setInstructorPassword(e.target.value)}
                        placeholder="Ingresa tu clave asignada"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Validar e Ingresar</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* CARD 3: ROL DE ADMINISTRADOR (NUEVO REQUERIMIENTO) */}
          <div className="relative group rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 border-indigo-500/40 hover:border-indigo-500 dark:border-indigo-600/50 dark:hover:border-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-300 dark:border-indigo-700">
                    Alta Dirección
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner">
                  <Settings className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  Rol de Administrador
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Módulo exclusivo de gestión e inscripción de instructores. Permite crear docentes y asignar claves institucionales.
                </p>

                <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-1.5 mb-3">
                  <p className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Control y Registro de Docentes</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Permite la creación de usuarios instructores con clave institucional.
                  </p>
                </div>
              </div>

              {!showAdminLogin ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(true);
                    setAdminError('');
                    audioSynth.playClick();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Acceder como Administrador</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleAdminLoginSubmit} className="space-y-3 pt-2 border-t border-indigo-200 dark:border-indigo-800/60">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      <span>Autenticación Administrador</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setAdminError('');
                        audioSynth.playClick();
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  {adminError && (
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-semibold flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                      Contraseña de Administrador *
                    </label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Ingresa la clave de administrador"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Entrar al Panel Admin</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Feature Highlights Section */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Ejes Fundamentales del Proceso de Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Contenido interactivo para la formación integral del aprendiz SENA
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[#39A900]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Identidad y Símbolos</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Aprende la historia, el Escudo, la Bandera, el Logotipo oficial y la letra del Himno del SENA.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Acuerdos 2024 y 2026</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Reglamento actualizado: Acuerdo 009 de 2024 y Acuerdo 002 de 2026. Derechos, deberes y debido proceso.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Simulador de Casos</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Toma de decisiones éticas y formativas como miembro del Comité de Evaluación.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600">
                <FileCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Constancia Oficial</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Al culminar los 10 hitos, genera la constancia de inducción descargable con verificación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="mt-auto bg-[#00324D] text-slate-300 py-6 px-4 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SenaLogo size={32} />
            <div>
              <p className="font-bold text-white">Servicio Nacional de Aprendizaje SENA</p>
              <p className="text-[11px] text-slate-400">Dirección General • Calle 57 No. 8 - 69, Bogotá D.C.</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            Ficha 2834912 ADSO • Sistema de Formación Profesional Integral
          </p>
        </div>
      </footer>

      {/* Consulta de Aprendices por Ficha Modal */}
      <ConsultaFichaModal
        isOpen={isConsultaFichaOpen}
        onClose={() => setIsConsultaFichaOpen(false)}
        onSelectApprentice={(app) => onSelectRole('aprendiz', app)}
      />
    </div>
  );
};
