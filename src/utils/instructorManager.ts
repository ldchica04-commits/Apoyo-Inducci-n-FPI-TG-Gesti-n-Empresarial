import { InstructorProfile } from '../types';
import { DEFAULT_INSTRUCTOR } from '../data/senaData';

/**
 * Generates an instructor access key following SENA policy:
 * First 3 letters of the name (lowercase) + Last 4 digits of document ID
 * Example: Name "Carlos Eduardo", Doc "14892301" -> "car2301"
 */
export function generateInstructorKey(name: string, documentNumber: string): string {
  // Strip common title prefixes if present
  const cleanName = name.replace(/^(Ing\.|Lic\.|Dr\.|Dra\.|Prof\.)\s*/i, '').trim();
  const letters = cleanName.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '').slice(0, 3).toLowerCase() || 'ins';
  const digits = documentNumber.replace(/\D/g, '').slice(-4) || '1234';
  return `${letters}${digits}`;
}

export const INITIAL_INSTRUCTORS: InstructorProfile[] = [
  {
    ...DEFAULT_INSTRUCTOR,
    accessKey: generateInstructorKey(DEFAULT_INSTRUCTOR.name, DEFAULT_INSTRUCTOR.documentNumber) // 'car2301'
  }
];

export function getStoredInstructors(): InstructorProfile[] {
  const saved = localStorage.getItem('sena_instructors_list');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fallback to initial
    }
  }
  return INITIAL_INSTRUCTORS;
}

export function saveInstructor(instructorData: Omit<InstructorProfile, 'id' | 'accessKey'>): InstructorProfile {
  const key = generateInstructorKey(instructorData.name, instructorData.documentNumber);
  const newInst: InstructorProfile = {
    ...instructorData,
    id: `inst-${Date.now()}`,
    accessKey: key,
    avatarUrl: instructorData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
  };

  const current = getStoredInstructors();
  const updated = [newInst, ...current.filter(i => i.documentNumber !== newInst.documentNumber)];
  localStorage.setItem('sena_instructors_list', JSON.stringify(updated));
  return newInst;
}

export function validateInstructorLogin(doc: string, pass: string): { success: boolean; instructor?: InstructorProfile; error?: string } {
  const cleanDoc = doc.trim();
  const cleanPass = pass.trim().toLowerCase();

  if (!cleanDoc) {
    return { success: false, error: 'Por favor ingresa tu Número de Documento.' };
  }

  if (!cleanPass) {
    return { success: false, error: 'Por favor ingresa tu clave de acceso de instructor.' };
  }

  // Check if trying to use admin password as instructor
  if (cleanPass === 'admon1234') {
    return {
      success: false,
      error: 'La clave "admon1234" es exclusiva para el Rol de Administrador. Para acceder como Instructor, ingresa tu clave personal (3 primeras letras de tu nombre + 4 últimos dígitos de tu documento).'
    };
  }

  const instructors = getStoredInstructors();
  const found = instructors.find(i => i.documentNumber.trim() === cleanDoc);

  if (!found) {
    return {
      success: false,
      error: 'No se encontró un instructor registrado con este documento de identidad.'
    };
  }

  // Calculate expected key or check stored accessKey
  const expectedKey = (found.accessKey || generateInstructorKey(found.name, found.documentNumber)).toLowerCase();
  
  // Allow matching expectedKey, last 4 digits, or legacy match
  const docLast4 = cleanDoc.slice(-4);
  if (cleanPass === expectedKey || cleanPass === docLast4) {
    return { success: true, instructor: found };
  }

  return {
    success: false,
    error: 'Contraseña de instructor incorrecta. Verifica tus credenciales de acceso.'
  };
}
