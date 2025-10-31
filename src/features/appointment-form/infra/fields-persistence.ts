

const FIELDS_PERSISTENCE_KEY = "appointment-form-fields";

export function saveAppointmentFormFields(fields: Record<string, string>) {
  try {
    const stringified = JSON.stringify(fields);
    localStorage.setItem(FIELDS_PERSISTENCE_KEY, stringified);
  } catch {
// Ignore storage errors (private mode, quota, etc.)
  }
}
export function getAppointmentFormFields<T = Record<string, string>>(): T {
  try {
    const raw = localStorage.getItem(FIELDS_PERSISTENCE_KEY);
    return raw ? (JSON.parse(raw) as T) : {} as T;
  } catch {
    return {} as T;
  }
}
