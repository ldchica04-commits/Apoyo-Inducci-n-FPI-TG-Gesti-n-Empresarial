import React, { useState } from 'react';
import { InstructorProfile, Role } from '../types';
import { getStoredInstructors, saveInstructor, generateInstructorKey } from '../utils/instructorManager';
import { SenaLogo } from './SenaLogo';
import { audioSynth } from '../utils/audioSynth';
import {
  ShieldCheck,
  UserPlus,
  Users,
  Key,
  IdCard,
  Mail,
  Phone,
  Building2,
  Hash,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Info,
  Search,
  Lock,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToLanding: () => void;
  onSelectRole: (role: Role, selectedApprentice?: any, instructorProfile?: InstructorProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToLanding,
  onSelectRole
}) => {
  const [instructors, setInstructors] = useState<InstructorProfile[]>(() => getStoredInstructors());
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Form State for New Instructor
  const [name, setName] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [roleTitle, setRoleTitle] = useState<string>('Instructor Técnico ADSO');
  const [assignedFicha, setAssignedFicha] = useState<string>('2834912');
  const [programName, setProgramName] = useState<string>('Análisis y Desarrollo de Software (ADSO)');
  const [centerName, setCenterName] = useState<string>('Centro de Biotecnología Industrial');
  const [regional, setRegional] = useState<string>('Regional Valle del Cauca');

  const [formError, setFormError] = useState<string>('');
  const [createdSuccess, setCreatedSuccess] = useState<InstructorProfile | null>(null);

  // Live key preview based on rule: 3 first letters of name + 4 last digits of document
  const previewKey = name.trim().length >= 3 && documentNumber.trim().length >= 4
    ? generateInstructorKey(name, documentNumber)
    : '---';

  const handleCreateInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setCreatedSuccess(null);

    if (!name.trim()) {
      setFormError('Por favor ingresa los Nombres y Apellidos del instructor.');
      audioSynth.playError();
      return;
    }

    if (!documentNumber.trim() || documentNumber.trim().length < 5) {
      setFormError('Por favor ingresa un Número de Documento válido.');
      audioSynth.playError();
      return;
    }

    if (!email.trim()) {
      setFormError('Por favor ingresa un Correo Electrónico Institucional.');
      audioSynth.playError();
      return;
    }

    const newInst = saveInstructor({
      name: name.trim(),
      roleTitle: roleTitle.trim() || 'Instructor Técnico',
      documentNumber: documentNumber.trim(),
      email: email.trim(),
      phone: phone.trim() || '300 000 0000',
      assignedFicha: assignedFicha.trim() || '2834912',
      programName: programName.trim() || 'Análisis y Desarrollo de Software',
      centerName: centerName.trim() || 'Centro de Biotecnología Industrial',
      regional: regional.trim() || 'Regional Valle del Cauca'
    });

    setInstructors(getStoredInstructors());
    setCreatedSuccess(newInst);
    audioSynth.playSuccess();

    // Reset Form
    setName('');
    setDocumentNumber('');
    setEmail('');
    setPhone('');
  };

  const filteredInstructors = instructors.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.documentNumber.includes(searchTerm) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#00324D] border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SenaLogo size={40} />
            <div className="border-l border-slate-700 pl-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider border border-emerald-500/40">
                  Módulo Administrador
                </span>
              </div>
              <h1 className="text-base font-extrabold text-white tracking-tight">
                Gestión e Inscripción de Instructores SENA
              </h1>
            </div>
          </div>

          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold border border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#00324D] via-slate-800 to-slate-900 rounded-3xl p-6 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Acceso de Alta Dirección Institucional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Panel de Control de Administrador
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Registra y administra las credenciales de acceso de los instructores a la plataforma.
              Las claves se generan automáticamente combinando las <strong>3 primeras letras del nombre</strong> y los <strong>4 últimos dígitos del documento de identidad</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'create'
                  ? 'bg-[#39A900] text-white shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Nuevo Instructor</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'list'
                  ? 'bg-[#39A900] text-white shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Instructores Activos ({instructors.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CREAR NUEVO INSTRUCTOR */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form Column */}
            <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-[#39A900]" />
                  <span>Registro de Nuevo Instructor</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ingresa la información institucional del docente. El sistema asignará su clave de acceso.
                </p>
              </div>

              {/* Form Error */}
              {formError && (
                <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs font-semibold flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Success Alert Banner */}
              {createdSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>¡Instructor registrado con éxito!</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-800/80 text-xs space-y-1.5 font-mono">
                    <p><strong className="text-slate-300 font-sans">Instructor:</strong> {createdSuccess.name}</p>
                    <p><strong className="text-slate-300 font-sans">Usuario / Doc:</strong> {createdSuccess.documentNumber}</p>
                    <p><strong className="text-slate-300 font-sans">Clave Generada:</strong> <span className="text-emerald-400 font-black text-sm">{createdSuccess.accessKey}</span></p>
                  </div>
                  <p className="text-[11px] text-emerald-300/80">
                    Suministre estas credenciales al instructor para que inicie sesión en la plataforma.
                  </p>
                </div>
              )}

              <form onSubmit={handleCreateInstructor} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nombres y Apellidos Completos *
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Lucía Fernanda Gómez Ramírez"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Document Number & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Número de Documento *
                    </label>
                    <div className="relative">
                      <IdCard className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="Ej. 1098234567"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Cargo / Especialidad
                    </label>
                    <input
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      placeholder="Ej. Instructor Técnico ADSO"
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Correo Institucional *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej. lgomez@sena.edu.co"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Teléfono Móvil
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. 318 923 4102"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Ficha & Program */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Ficha Asignada *
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={assignedFicha}
                        onChange={(e) => setAssignedFicha(e.target.value)}
                        placeholder="Ej. 2834912"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Programa de Formación
                    </label>
                    <input
                      type="text"
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#39A900] hover:bg-[#2e8800] text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Guardar y Registrar Instructor</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Card: Credential Formula Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-emerald-500/40 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#39A900] flex items-center justify-center border border-emerald-500/40">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      Previsualización de Credenciales
                    </h4>
                    <p className="text-xs text-slate-400">
                      Cálculo en tiempo real según norma SENA
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Usuario de Acceso:
                    </span>
                    <p className="text-sm font-mono font-bold text-slate-200">
                      {documentNumber.trim() || 'Número de Documento'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Contraseña Asignada Automáticamente:
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-mono font-black text-emerald-400 tracking-wider">
                        {previewKey}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                        3 letras + 4 dígitos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Regla de Asignación de Clave:
                  </p>
                  <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                    <li>3 primeras letras del nombre (minúsculas)</li>
                    <li>4 últimos dígitos del documento de identidad</li>
                    <li>
                      Ejemplo: <strong className="text-slate-200">Lucía Gómez</strong> (Doc. 109823<strong>4567</strong>) → <strong className="text-emerald-400">luc4567</strong>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Instructor List Summary */}
              <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 shadow-lg space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Instructores Registrados</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    {instructors.length}
                  </span>
                </h4>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {instructors.map((inst) => (
                    <div key={inst.id} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <p className="font-extrabold text-white truncate">{inst.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">Doc. {inst.documentNumber} • Ficha {inst.assignedFicha}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-mono font-bold text-xs shrink-0">
                        {inst.accessKey || generateInstructorKey(inst.name, inst.documentNumber)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LISTA DE INSTRUCTORES */}
        {activeTab === 'list' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#39A900]" />
                  <span>Directorio de Instructores Registrados</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Visualiza los instructores autorizados y sus claves de acceso asociadas.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o documento..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInstructors.map((inst) => {
                const key = inst.accessKey || generateInstructorKey(inst.name, inst.documentNumber);
                return (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={inst.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'}
                        alt={inst.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#39A900] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-white text-sm truncate">{inst.name}</h4>
                        <p className="text-xs text-emerald-400 font-semibold truncate">{inst.roleTitle}</p>
                        <p className="text-[11px] text-slate-400">Doc. {inst.documentNumber}</p>
                      </div>
                    </div>

                    <div className="space-y-2 p-3 bg-slate-950/80 rounded-xl text-xs border border-slate-800">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-[11px] text-slate-400">Ficha:</span>
                        <strong className="font-mono text-emerald-300">{inst.assignedFicha}</strong>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-[11px] text-slate-400">Correo:</span>
                        <span className="truncate max-w-[170px] text-slate-200">{inst.email}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                          <Key className="w-3.5 h-3.5 text-[#39A900]" />
                          Clave Asignada:
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-mono font-black text-xs border border-emerald-800">
                          {key}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectRole('instructor', inst)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Ingresar a Vista de este Instructor</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
