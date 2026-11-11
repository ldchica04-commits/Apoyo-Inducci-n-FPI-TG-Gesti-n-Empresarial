import React, { useState } from 'react';
import { HelpCircle, ChevronRight, MessageSquare, BookOpen, ShieldAlert, Sparkles, Send } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  articleRef: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cuántos días tengo para radicar una incapacidad médica?',
    answer: 'El aprendiz debe presentar la certificación médica transcrita por su EPS dentro de los tres (3) días hábiles siguientes al inicio de la inasistencia. No se aceptan notas simples de farmacias.',
    articleRef: 'Acuerdo 009 de 2024 - Deberes del Aprendiz',
    category: 'Salud y Asistencia'
  },
  {
    id: 'faq-2',
    question: '¿Qué garantías del Debido Proceso introdujo el Acuerdo 002 de 2026?',
    answer: 'El Acuerdo 002 de 2026 reformó el Artículo 48 del Acuerdo 009 de 2024: garantiza citación formal al correo institucional @sena.edu.co, término perentorio de 3 días hábiles para presentar descargos y aportar pruebas ante el Comité de Evaluación y Seguimiento, derecho a la contradicción y recurso de reposición.',
    articleRef: 'Acuerdo 009 de 2024 modif. Acuerdo 002 de 2026 - Art. 48',
    category: 'Debido Proceso'
  },
  {
    id: 'faq-3',
    question: '¿Cuáles son las alternativas autorizadas para la Etapa Productiva?',
    answer: 'El SENA autoriza: 1) Contrato de Aprendizaje, 2) Vínculo Laboral afín al programa, 3) Proyecto Productivo, 4) Pasantía (en pymes, ONG o entidades públicas), y 5) Monitoría institucional.',
    articleRef: 'Acuerdo 009 de 2024 - Alternativas Etapa Productiva',
    category: 'Etapa Productiva'
  },
  {
    id: 'faq-4',
    question: '¿Qué es el plan de mejoramiento académico o disciplinario?',
    answer: 'Es una medida pedagógica formativa pactada entre el instructor y el aprendiz, con fechas y evidencias concretas para nivelar competencias no alcanzadas o corregir conductas que afectan la convivencia.',
    articleRef: 'Acuerdo 009 de 2024 - Medidas Formativas',
    category: 'Medidas Formativas'
  },
  {
    id: 'faq-5',
    question: '¿Cuánto tiempo dura una sanción de cancelación de matrícula?',
    answer: 'La cancelación de matrícula implica el retiro definitivo del aprendiz y acarrea una sanción e inhabilidad en el sistema SOFIA Plus / Zajuna de seis (6) meses a dos (2) años para inscribirse en nuevos programas de formación.',
    articleRef: 'Acuerdo 009 de 2024 - Sanciones',
    category: 'Sanciones'
  },
  {
    id: 'faq-6',
    question: '¿Cómo solicito un aplazamiento de mi proceso formativo?',
    answer: 'El aplazamiento es la solicitud formal motivada por enfermedad debidamente certificada, servicio militar o fuerza mayor. Se solicita por escrito al Subdirector de Centro y puede autorizarse hasta por seis (6) meses, prorrogables por otros seis (6) meses en casos excepcionales.',
    articleRef: 'Acuerdo 009 de 2024 - Novedades de Registro',
    category: 'Novedades'
  }
];

export const TutorNormativo: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = useState<FaqItem>(FAQ_DATA[0]);
  const [userQuery, setUserQuery] = useState('');
  const [customReply, setCustomReply] = useState<string | null>(null);

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery.toLowerCase();
    if (q.includes('desercion') || q.includes('inasistencia') || q.includes('faltar')) {
      setCustomReply('Según el nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024), la inasistencia injustificada durante tres (3) días hábiles continuos es causal de deserción. Toda actuación disciplinaria garantiza el debido proceso del Art. 48 reformado por el Acuerdo 002 de 2026.');
    } else if (q.includes('contrato') || q.includes('productiva') || q.includes('pasantia') || q.includes('empresa')) {
      setCustomReply('La etapa productiva permite aplicar tus competencias en el sector real. Conforme al Acuerdo 009 de 2024, puedes optar por Contrato de Aprendizaje (con patrocinio económico y afiliación a ARL/EPS), Proyecto Productivo, Pasantía o Vínculo Laboral afín.');
    } else if (q.includes('carne') || q.includes('carnet') || q.includes('entrada') || q.includes('acceso')) {
      setCustomReply('El carné institucional del SENA (físico o credencial digital) es personal e intransferible. Es deber del aprendiz portarlo en lugar visible. Prestarlo o suplantar a otro aprendiz es una falta grave sancionable por el Comité de Evaluación.');
    } else if (q.includes('himno') || q.includes('simbolo') || q.includes('escudo') || q.includes('bandera')) {
      setCustomReply('Los símbolos institucionales son el Escudo (tres sectores: rueda dentada, caduceo y rama de café), la Bandera (blanca con escudo en verde esperanza), el Logotipo (el hombre que avanza firme hacia el futuro) y el Himno oficial escrito por Jesús Briceño y Luis Alfredo Sarmiento.');
    } else if (q.includes('descargo') || q.includes('comite') || q.includes('debido proceso') || q.includes('002') || q.includes('48')) {
      setCustomReply('El Acuerdo 002 de 2026 reformó el Artículo 48 del Acuerdo 009 de 2024 para blindar las garantías procesales: cuentas con 3 días hábiles improrrogables a partir de la notificación oficial digital para rendir descargos y solicitar o controvertir pruebas ante el Comité de Evaluación y Seguimiento.');
    } else {
      setCustomReply(`Para resolver tu consulta "${userQuery}": Recuerda que todos los trámites, deberes y derechos están respaldados por el nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 y modif. Acuerdo 002 de 2026). Te sugerimos consultar la sección "Reglamento y Normas" o radicar tu inquietud ante la Coordinación Académica de tu Centro.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#39A900] flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">
            Consultor Normativo e Institucional SENA
          </h3>
          <p className="text-xs text-slate-500">
            Preguntas frecuentes del aprendiz y asesor de inducción rápida
          </p>
        </div>
      </div>

      {/* Grid: Common Questions list & Active Answer card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Quick FAQs */}
        <div className="md:col-span-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Preguntas Más Frecuentes:
          </span>
          {FAQ_DATA.map((faq) => (
            <button
              key={faq.id}
              onClick={() => {
                setSelectedFaq(faq);
                setCustomReply(null);
              }}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                selectedFaq.id === faq.id && !customReply
                  ? 'bg-emerald-50 border-[#39A900] text-emerald-950 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className="pr-2">{faq.question}</span>
              <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Right: Answer Display */}
        <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {customReply ? 'Orientación Inmediata' : selectedFaq.category}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {customReply ? 'Consulta Rápida' : selectedFaq.articleRef}
              </span>
            </div>

            <h4 className="font-bold text-slate-900 text-base mb-2">
              {customReply ? userQuery : selectedFaq.question}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {customReply ? customReply : selectedFaq.answer}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-emerald-800 flex items-center gap-1.5 font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Fuente: Nuevo Reglamento del Aprendiz SENA - Acuerdo 009 de 2024 y Acuerdo 002 de 2026
          </div>
        </div>
      </div>

      {/* Interactive Question Input */}
      <div className="pt-2">
        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Escribe otra duda (ej: ¿Cómo funciona el contrato de aprendizaje? o ¿Qué pasa si pierdo el carné?)..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#00324D] hover:bg-[#042436] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Consultar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
