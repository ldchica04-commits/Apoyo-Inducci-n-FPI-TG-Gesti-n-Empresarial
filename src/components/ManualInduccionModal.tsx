import React from 'react';
import { SenaLogo } from './SenaLogo';
import { audioSynth } from '../utils/audioSynth';
import {
  BookOpen,
  X,
  Printer,
  Shield,
  GraduationCap,
  Users,
  Settings,
  CheckCircle2,
  FileText,
  Key,
  HelpCircle,
  Sparkles,
  Video
} from 'lucide-react';

interface ManualInduccionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideoManual?: () => void;
}

export const ManualInduccionModal: React.FC<ManualInduccionModalProps> = ({
  isOpen,
  onClose,
  onOpenVideoManual
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <SenaLogo size={38} />
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                Documentación Institucional SENA
              </span>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#39A900]" />
                <span>Manual de Manejo del Prototipo de Inducción</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Reproducir Video Explicativo (Modal) o abrir enlace externo"
              >
                <Video className="w-4 h-4 text-purple-200 animate-pulse" />
                <span>Ver Video Manual</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={() => {
                audioSynth.playClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 pr-2 space-y-6 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
          {/* Cover Badge */}
          <div className="bg-gradient-to-r from-[#00324D] to-slate-900 p-6 rounded-2xl text-white space-y-2 border border-emerald-500/30">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guía Oficial de Usuario del Prototipo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Manual de Uso del Portal de Inducción SENA
            </h2>
            <p className="text-xs text-slate-300">
              Centro de Biotecnología Industrial • Ficha 2834912 ADSO • Vigencia Normativa: Acuerdos 009 de 2024 y 002 de 2026
            </p>
          </div>

          {/* Section 1: Propósito */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              <Shield className="w-4 h-4 text-[#39A900]" />
              <span>1. Introducción y Propósito</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Esta plataforma web interactiva facilita el proceso de Inducción a la Formación Profesional Integral del SENA. Permite la apropiación del <strong>Reglamento del Aprendiz (Acuerdo 009 de 2024 y Acuerdo 002 de 2026)</strong>, la evaluación mediante quizzes, la resolución de dilemas éticos en simuladores de comité y el seguimiento administrativo de la Ficha 2834912.
            </p>
          </div>

          {/* Section 2: Roles */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              <Users className="w-4 h-4 text-[#39A900]" />
              <span>2. Roles de Usuario y Claves de Acceso</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Aprendiz */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-emerald-900 dark:text-emerald-300">
                  <GraduationCap className="w-4 h-4 text-[#39A900]" />
                  <span>Rol Aprendiz</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  - <strong>Registro</strong>: Formulario limpio con datos requeridos.<br />
                  - <strong>Clave</strong>: 4 últimos dígitos de su documento de identidad.
                </p>
              </div>

              {/* Instructor */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-amber-900 dark:text-amber-300">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Rol Instructor</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  - <strong>Usuario</strong>: Número de Documento.<br />
                  - <strong>Clave</strong>: 3 primeras letras del nombre + 4 últimos dígitos del documento (ej. <strong className="text-amber-700 dark:text-amber-300">car2301</strong>).
                </p>
              </div>

              {/* Administrador */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-indigo-900 dark:text-indigo-300">
                  <Settings className="w-4 h-4 text-indigo-600" />
                  <span>Rol Administrador</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  - <strong>Clave Exclusiva</strong>: <strong className="text-indigo-700 dark:text-indigo-300">admon1234</strong>.<br />
                  - <strong>Acciones</strong>: Inscripción de nuevos instructores y asignación de credenciales.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Módulos */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              <FileText className="w-4 h-4 text-[#39A900]" />
              <span>3. Módulos de la Plataforma</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Ruta de Inducción</strong>: Panorama general, hitos completados y reproductor interactivo del Himno SENA con letra sincronizada.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Identidad y Símbolos</strong>: Significado detallado del Escudo (3 sectores), la Bandera, el Logotipo y Flashcards educativas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Reglamento y Normas</strong>: Artículos completos de los Acuerdos 009 de 2024 y 002 de 2026 con Tutor Normativo inteligente.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Simulador de Casos</strong>: Análisis de dilemas éticos y faltas académicas/disciplinarias como miembro del Comité de Evaluación.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Quizzes y Trivia</strong>: Reto contrarreloj para medir conocimientos normativos y acreditar la inducción.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <span><strong>Constancia Oficial SENA</strong>: Certificado formal descargable en PDF con código QR de verificación institucional.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500 shrink-0 print:hidden">
          <span>Manual almacenado en la raíz del proyecto (`manual_de_induccion.md`)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-all"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
