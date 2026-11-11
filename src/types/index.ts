export type Role = 'aprendiz' | 'instructor' | 'admin';

export interface ApprenticeProfile {
  id: string;
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  email: string;
  phone: string;
  fichaNumber: string;
  programName: string;
  centerName: string;
  regional: string;
  avatarUrl?: string;
  enrollmentDate: string;
}

export interface InstructorProfile {
  id: string;
  name: string;
  roleTitle: string;
  documentNumber: string;
  email: string;
  phone: string;
  assignedFicha: string;
  programName: string;
  centerName: string;
  regional: string;
  avatarUrl?: string;
  accessKey?: string;
}

export interface InductionChecklistItem {
  id: string;
  category: 'institucional' | 'normativa' | 'plataformas' | 'bienestar';
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  completedAt?: string;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score?: number;
  lastVisited?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface NormativeArticle {
  id: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'novedades' | 'sanciones' | 'medidas';
  title: string;
  articleRef: string;
  summary: string;
  details: string;
  tags: string[];
  practicalExample?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  protagonist: string;
  category: 'academica' | 'disciplinaria' | 'tramite';
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    severity?: 'Leve' | 'Grave' | 'Gravísima';
    measure?: string;
  }[];
  regulationRef: string;
  lessonLearned: string;
}

export interface Flashcard {
  id: string;
  category: 'simbolos' | 'historia' | 'normativa' | 'etapas';
  question: string;
  answer: string;
  extraInfo?: string;
}

export interface TrackedApprentice {
  id: string;
  name: string;
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  progressPercent: number;
  quizScoreAverage: number;
  inductionStatus: 'Pendiente' | 'En Proceso' | 'Aprobada' | 'En Riesgo';
  completedMilestones: number;
  totalMilestones: number;
  lastActive: string;
  notes?: string;
}
