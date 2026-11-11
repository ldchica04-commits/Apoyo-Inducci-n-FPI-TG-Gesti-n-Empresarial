import React from 'react';
import { ApprenticeProfile } from '../types';
import { SenaLogo } from './SenaLogo';
import { Printer, Download, X, Award, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface CertificadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: ApprenticeProfile;
  overallProgress: number;
}

export const CertificadoModal: React.FC<CertificadoModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  overallProgress
}) => {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl border border-slate-300 my-8">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#39A900]" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Constancia de Aprobación del Proceso de Inducción SENA
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              Imprimir / Guardar PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official SENA Certificate Frame */}
        <div
          id="sena-certificate-frame"
          className="bg-[#fafbf9] border-8 border-double border-[#00324D] rounded-2xl p-6 sm:p-12 relative overflow-hidden text-center shadow-inner"
        >
          {/* Subtle Watermark Logo in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <SenaLogo variant="symbol" size={480} />
          </div>

          {/* Ornamental Inner Border */}
          <div className="border border-[#39A900]/40 rounded-xl p-4 sm:p-8 space-y-6">
            {/* Header: Republic and SENA */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-4">
                <img
                  src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                  alt="Escudo Oficial SENA"
                  className="w-14 h-14 object-contain"
                />
                <SenaLogo size={54} />
              </div>
              <p className="text-[10px] tracking-widest uppercase font-extrabold text-[#00324D] mt-3">
                REPÚBLICA DE COLOMBIA
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#00324D] tracking-wide mt-0.5">
                SERVICIO NACIONAL DE APRENDIZAJE - SENA
              </h2>
              <p className="text-xs font-semibold text-emerald-800">
                {apprentice.regional} | {apprentice.centerName}
              </p>
            </div>

            {/* Certificate Proclamation */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
                EL SUBDIRECTOR DE CENTRO Y EL EQUIPO DE INDUCCIÓN INTEGRAL
              </p>
              <p className="text-sm font-serif italic text-slate-600 mt-1">
                Hacen constar que:
              </p>

              {/* Apprentice Full Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight mt-3 mb-1 uppercase font-serif">
                {apprentice.name}
              </h1>
              <p className="text-xs font-medium text-slate-600">
                Identificado(a) con {apprentice.documentType} No. <strong>{apprentice.documentNumber}</strong>
              </p>
            </div>

            {/* Achievement text */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Cumplió y aprobó satisfactoriamente la totalidad de los módulos correspondientes a la
              <strong> Inducción a la Formación Profesional Integral</strong>, acreditando el conocimiento
              y apropiación de la <strong>Imagen Institucional, Misión, Símbolos Patrios del SENA</strong> y el
              <strong> Nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 y Acuerdo 002 de 2026)</strong>.
            </p>

            {/* Program and Ficha details */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 max-w-lg mx-auto text-xs text-slate-800">
              <div className="font-bold text-[#00324D] text-sm">
                Programa: {apprentice.programName}
              </div>
              <div className="text-slate-600 mt-0.5">
                Ficha de Caracterización: <strong>{apprentice.fichaNumber}</strong>
              </div>
            </div>

            {/* Signatures & Security Validation */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              {/* Signature 1 */}
              <div className="flex flex-col items-center">
                <div className="w-40 border-b-2 border-slate-600 pb-1 font-serif italic text-xs text-slate-500">
                  Firma Electrónica Válida
                </div>
                <p className="text-[11px] font-bold text-slate-800 mt-1 uppercase">Subdirección de Centro</p>
                <p className="text-[9px] text-slate-500">SENA Regional</p>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white p-1.5 rounded-lg border-2 border-slate-300 shadow-xs flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#00324D]" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">
                  Verificación: {apprentice.fichaNumber}-IND
                </span>
              </div>

              {/* Signature 2 */}
              <div className="flex flex-col items-center">
                <div className="w-40 border-b-2 border-slate-600 pb-1 font-serif italic text-xs text-slate-500">
                  Coordinación Académica
                </div>
                <p className="text-[11px] font-bold text-slate-800 mt-1 uppercase">Coordinación de Formación</p>
                <p className="text-[9px] text-slate-500">Gestión de Inducción</p>
              </div>
            </div>

            {/* Issue date and integrity footer */}
            <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-200 flex items-center justify-between">
              <span>Expedido el {currentDate}</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Validez Académica Institucional SENA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
