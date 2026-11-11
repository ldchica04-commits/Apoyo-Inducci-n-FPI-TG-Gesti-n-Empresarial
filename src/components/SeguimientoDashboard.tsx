import React, { useState } from 'react';
import {
  Role,
  ApprenticeProfile,
  InductionChecklistItem,
  TrackedApprentice
} from '../types';
import { MOCK_TRACKED_APPRENTICES, DEFAULT_INSTRUCTOR } from '../data/senaData';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Search,
  Filter,
  FileText,
  Award,
  Sparkles,
  BarChart3,
  Calendar,
  Building,
  Hash,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';

interface SeguimientoDashboardProps {
  userRole: Role;
  apprentice: ApprenticeProfile;
  checklist: InductionChecklistItem[];
  onToggleChecklistItem: (id: string) => void;
  onOpenCertificate: () => void;
  overallProgress: number;
}

export const SeguimientoDashboard: React.FC<SeguimientoDashboardProps> = ({
  userRole,
  apprentice,
  checklist,
  onToggleChecklistItem,
  onOpenCertificate,
  overallProgress
}) => {
  const [trackedList, setTrackedList] = useState<TrackedApprentice[]>(() => {
    const exists = MOCK_TRACKED_APPRENTICES.some(
      s => s.documentNumber === apprentice.documentNumber || s.name.toLowerCase() === apprentice.name.toLowerCase()
    );
    if (!exists && apprentice.name) {
      const dynamicApp: TrackedApprentice = {
        id: apprentice.id || `trk-${Date.now()}`,
        name: apprentice.name,
        documentNumber: apprentice.documentNumber,
        fichaNumber: apprentice.fichaNumber,
        programName: apprentice.programName,
        progressPercent: overallProgress,
        quizScoreAverage: 90,
        inductionStatus: overallProgress === 100 ? 'Aprobada' : overallProgress > 0 ? 'En Proceso' : 'Pendiente',
        completedMilestones: Math.round((overallProgress / 100) * 10),
        totalMilestones: 10,
        lastActive: 'Hoy, Recién ingresado',
        notes: 'Perfil guardado y formalizado por el aprendiz.'
      };
      return [dynamicApp, ...MOCK_TRACKED_APPRENTICES];
    }
    return MOCK_TRACKED_APPRENTICES;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New apprentice form state
  const [newName, setNewName] = useState('');
  const [newDoc, setNewDoc] = useState('');

  // Statistics calculation for instructor
  const totalStudents = trackedList.length;
  const approvedCount = trackedList.filter(s => s.inductionStatus === 'Aprobada').length;
  const inProgressCount = trackedList.filter(s => s.inductionStatus === 'En Proceso').length;
  const inRiskCount = trackedList.filter(s => s.inductionStatus === 'En Riesgo').length;
  const avgProgress = Math.round(
    trackedList.reduce((acc, curr) => acc + curr.progressPercent, 0) / (totalStudents || 1)
  );

  const filteredTracked = trackedList.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.documentNumber.includes(searchQuery) ||
      student.fichaNumber.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'todos' || student.inductionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: 'Pendiente' | 'En Proceso' | 'Aprobada' | 'En Riesgo') => {
    setTrackedList(prev =>
      prev.map(item => (item.id === id ? { ...item, inductionStatus: newStatus } : item))
    );
    audioSynth.playClick();
  };

  const handleAddApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDoc.trim()) return;

    const newApp: TrackedApprentice = {
      id: `trk-${Date.now()}`,
      name: newName,
      documentNumber: newDoc,
      fichaNumber: apprentice.fichaNumber,
      programName: apprentice.programName,
      progressPercent: 10,
      quizScoreAverage: 0,
      inductionStatus: 'En Proceso',
      completedMilestones: 1,
      totalMilestones: 10,
      lastActive: 'Recién registrado',
      notes: 'Matrícula formalizada en inducción.'
    };

    setTrackedList([newApp, ...trackedList]);
    setNewName('');
    setNewDoc('');
    setShowAddModal(false);
    audioSynth.playSuccess();
  };

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Documento,Ficha,Programa,Progreso,PromedioQuiz,Estado,HitosCompletados,UltimaActividad\n';
    const rows = trackedList
      .map(
        s =>
          `"${s.id}","${s.name}","${s.documentNumber}","${s.fichaNumber}","${s.programName}",${s.progressPercent}%,${s.quizScoreAverage}点,"${s.inductionStatus}","${s.completedMilestones}/${s.totalMilestones}","${s.lastActive}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SENA_Seguimiento_Induccion_Ficha_${apprentice.fichaNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    audioSynth.playSuccess();
  };

  return (
    <div className="space-y-8">
      {/* Role Banner / Header */}
      <div className="bg-gradient-to-r from-[#00324D] via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#39A900]/30 text-emerald-300 rounded-full text-xs font-bold border border-[#39A900]/40 mb-2">
              <Users className="w-3.5 h-3.5" />
              {userRole === 'instructor'
                ? 'Panel de Seguimiento y Control - Vista Instructor'
                : 'Mi Hoja de Ruta y Progreso - Vista Aprendiz'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {userRole === 'instructor'
                ? `Seguimiento de Inducción Ficha ${apprentice.fichaNumber}`
                : 'Bitácora Individual de Inducción SENA'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {userRole === 'instructor'
                ? 'Supervisa en tiempo real el cumplimiento del proceso de inducción, asistencia a sesiones, evaluación de reglamento y generación de certificados.'
                : 'Monitorea el avance de tus 10 hitos obligatorios de inducción. Al alcanzar el 100% podrás generar tu Constancia Oficial con código QR.'}
            </p>
          </div>

          {/* Quick Action Button */}
          {userRole === 'instructor' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Registrar Aprendiz
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenCertificate}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transform active:scale-95 transition-all"
            >
              <Award className="w-4 h-4" />
              Ver Mi Constancia SENA
            </button>
          )}
        </div>
      </div>

      {/* VIEW A: APPRENTICE PERSONAL TRACKING */}
      {userRole === 'aprendiz' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Apprentice Card & Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <img
                  src={apprentice.avatarUrl}
                  alt={apprentice.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#39A900]"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {apprentice.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {apprentice.documentType} {apprentice.documentNumber}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold text-[10px] rounded-full">
                    Aprendiz Activo
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Programa:</span>
                  <span className="font-semibold text-slate-800">{apprentice.programName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ficha de Formación:</span>
                  <span className="font-semibold text-emerald-700">{apprentice.fichaNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Centro de Formación:</span>
                  <span className="font-semibold text-slate-700">{apprentice.centerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Regional:</span>
                  <span className="font-semibold text-slate-700">{apprentice.regional}</span>
                </div>
              </div>

              {/* Progress Ring / Gauge */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-[#39A900]">
                  {overallProgress}%
                </div>
                <p className="text-xs text-slate-500 font-medium">Progreso Global de Inducción</p>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#39A900] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Certificate Teaser Box */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Constancia de Inducción</h4>
                  <p className="text-[11px] text-emerald-800">Certificación oficial institucional</p>
                </div>
              </div>
              <p className="text-xs text-emerald-900/80 mt-3 leading-relaxed">
                Documento requerido para formalizar tu inicio en la etapa lectiva y habilitar el cargue de evidencias en Zajuna.
              </p>
              <button
                onClick={onOpenCertificate}
                className="w-full mt-4 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                Abrir Certificado Oficial
              </button>
            </div>
          </div>

          {/* Checklist of 10 Milestones */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Lista de Chequeo de Inducción (10 Hitos)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Marca o revisa cada uno de los compromisos cumplidos en tu semana de inducción.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700">
                  {checklist.filter(c => c.completed).length} de {checklist.length} completados
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleChecklistItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    item.completed
                      ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#39A900] fill-emerald-100" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-bold ${item.completed ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {item.title}
                      </span>
                      {item.required && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                          Obligatorio
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                    {item.completed && item.completedAt && (
                      <span className="text-[10px] text-emerald-700 font-semibold block pt-0.5">
                        ✓ Cumplido el {item.completedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: INSTRUCTOR FICHA TRACKING */}
      {userRole === 'instructor' && (
        <div className="space-y-6">
          {/* Instructor in charge banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={DEFAULT_INSTRUCTOR.avatarUrl}
                alt={DEFAULT_INSTRUCTOR.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Único Instructor Encargado
                  </span>
                  <span className="text-xs text-slate-400">Doc. {DEFAULT_INSTRUCTOR.documentNumber}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {DEFAULT_INSTRUCTOR.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {DEFAULT_INSTRUCTOR.roleTitle} • Ficha {DEFAULT_INSTRUCTOR.assignedFicha} • {DEFAULT_INSTRUCTOR.regional}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Rol activo: <strong>Supervisión y Control de Cohorte</strong></span>
            </div>
          </div>

          {/* Metrics KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 uppercase font-semibold">Aprendices Ficha</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudents}</div>
              <span className="text-xs text-slate-400">Matriculados activos</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-emerald-700 uppercase font-semibold">Inducción Aprobada</span>
              <div className="text-2xl font-extrabold text-[#39A900] mt-1">{approvedCount}</div>
              <span className="text-xs text-emerald-600">{Math.round((approvedCount / (totalStudents || 1)) * 100)}% del grupo</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-blue-700 uppercase font-semibold">En Proceso</span>
              <div className="text-2xl font-extrabold text-blue-600 mt-1">{inProgressCount}</div>
              <span className="text-xs text-slate-400">Completando módulos</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-rose-700 uppercase font-semibold">En Riesgo (Alerta)</span>
              <div className="text-2xl font-extrabold text-rose-600 mt-1">{inRiskCount}</div>
              <span className="text-xs text-rose-500">Inasistencia o retraso</span>
            </div>
          </div>

          {/* Table Controls (Search, Filters) */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar aprendiz por nombre, documento o ficha..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">Estado:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="Aprobada">Aprobada</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="En Riesgo">En Riesgo</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Aprendiz</th>
                    <th className="py-3 px-3">Documento</th>
                    <th className="py-3 px-3">Progreso</th>
                    <th className="py-3 px-3">Quiz Normativo</th>
                    <th className="py-3 px-3">Hitos</th>
                    <th className="py-3 px-3">Estado de Inducción</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTracked.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {student.name}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {student.programName}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">{student.documentNumber}</td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#39A900] h-2 rounded-full"
                              style={{ width: `${student.progressPercent}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{student.progressPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`font-bold ${student.quizScoreAverage >= 75 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {student.quizScoreAverage}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-medium">
                        {student.completedMilestones} / {student.totalMilestones}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={student.inductionStatus}
                          onChange={(e) => handleUpdateStatus(student.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                            student.inductionStatus === 'Aprobada'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : student.inductionStatus === 'En Riesgo'
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          <option value="Aprobada">Aprobada</option>
                          <option value="En Proceso">En Proceso</option>
                          <option value="En Riesgo">En Riesgo</option>
                          <option value="Pendiente">Pendiente</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={onOpenCertificate}
                          title="Ver certificado del aprendiz"
                          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md transition-colors"
                        >
                          Constancia
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Apprentice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Registrar Aprendiz a la Ficha {apprentice.fichaNumber}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ingresa los datos para realizar seguimiento a su proceso de inducción.
            </p>

            <form onSubmit={handleAddApprentice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Daniel Fernando Castro"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de Documento (Cédula o TI)
                </label>
                <input
                  type="text"
                  required
                  value={newDoc}
                  onChange={(e) => setNewDoc(e.target.value)}
                  placeholder="Ej: 1098765432"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#329600] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Guardar y Habilitar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
