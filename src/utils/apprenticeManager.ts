import { ApprenticeProfile } from '../types';
import { AVAILABLE_APPRENTICES } from '../data/senaData';

export function getAllApprentices(): ApprenticeProfile[] {
  const savedList = localStorage.getItem('sena_registered_apprentices_list');
  let customList: ApprenticeProfile[] = [];
  if (savedList) {
    try {
      customList = JSON.parse(savedList);
    } catch {
      customList = [];
    }
  }

  // Check single saved profile
  const singleSaved = localStorage.getItem('sena_apprentice_profile');
  if (singleSaved) {
    try {
      const parsed: ApprenticeProfile = JSON.parse(singleSaved);
      if (parsed && parsed.documentNumber && !customList.some(a => a.documentNumber === parsed.documentNumber)) {
        customList.push(parsed);
      }
    } catch {
      // ignore
    }
  }

  // Combine AVAILABLE_APPRENTICES and customList, deduplicating by documentNumber
  const mergedMap = new Map<string, ApprenticeProfile>();
  [...AVAILABLE_APPRENTICES, ...customList].forEach(app => {
    if (app && app.documentNumber) {
      mergedMap.set(app.documentNumber.trim(), app);
    }
  });

  return Array.from(mergedMap.values());
}

export function saveRegisteredApprentice(newApp: ApprenticeProfile): ApprenticeProfile[] {
  const current = getAllApprentices();
  const updated = [newApp, ...current.filter(a => a.documentNumber.trim() !== newApp.documentNumber.trim())];
  localStorage.setItem('sena_registered_apprentices_list', JSON.stringify(updated));
  localStorage.setItem('sena_apprentice_profile', JSON.stringify(newApp));
  return updated;
}
