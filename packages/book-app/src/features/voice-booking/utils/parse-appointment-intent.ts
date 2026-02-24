import type { Service } from "@novahair/client";
import { addDays, nextDay, startOfDay } from "date-fns";

export interface AppointmentIntent {
  service: string | null;
  serviceId: string | null;
  date: Date | null;
  time: string | null; // HH:mm format
  staffName: string | null;
  confidence: number;
  rawText: string;
}

/**
 * Parse natural language text to extract appointment booking intent
 */
export function parseAppointmentIntent(
  text: string,
  availableServices: Service[]
): AppointmentIntent {
  const lowerText = text.toLowerCase().trim();
  
  const intent: AppointmentIntent = {
    service: null,
    serviceId: null,
    date: null,
    time: null,
    staffName: null,
    confidence: 0,
    rawText: text,
  };

  // Parse service
  const serviceResult = detectService(lowerText, availableServices);
  if (serviceResult) {
    intent.service = serviceResult.name;
    intent.serviceId = serviceResult.id;
    intent.confidence += 0.4;
  }

  // Parse date
  const dateResult = detectDate(lowerText);
  if (dateResult) {
    intent.date = dateResult;
    intent.confidence += 0.3;
  }

  // Parse time
  const timeResult = detectTime(lowerText);
  if (timeResult) {
    intent.time = timeResult;
    intent.confidence += 0.2;
  }

  // Parse staff name (optional)
  const staffResult = detectStaff(lowerText);
  if (staffResult) {
    intent.staffName = staffResult;
    intent.confidence += 0.1;
  }

  return intent;
}

/**
 * Detect service from text using fuzzy matching
 */
function detectService(text: string, services: Service[]): { id: string; name: string } | null {
  // Service keywords mapping
  const serviceKeywords: Record<string, string[]> = {
    corte: ["corte", "cortar", "peluquería", "pelo", "cabello"],
    tinte: ["tinte", "teñir", "color", "coloración", "tintura"],
    mechas: ["mechas", "reflejos", "highlights", "luces"],
    peinado: ["peinado", "peinar", "brushing"],
    barba: ["barba", "afeitar", "afeitado"],
    manicura: ["manicura", "uñas", "manos"],
    pedicura: ["pedicura", "pies"],
    depilación: ["depilación", "depilar", "cera"],
    tratamiento: ["tratamiento", "mascarilla", "hidratación"],
  };

  // Try exact match first
  for (const service of services) {
    const serviceName = service.name.toLowerCase();
    if (text.includes(serviceName)) {
      return { id: service.id, name: service.name };
    }
  }

  // Try keyword matching
  for (const service of services) {
    const serviceName = service.name.toLowerCase();
    
    // Check if any keyword matches
    for (const [category, keywords] of Object.entries(serviceKeywords)) {
      if (serviceName.includes(category)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            return { id: service.id, name: service.name };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Detect date from natural language
 */
function detectDate(text: string): Date | null {
  const today = startOfDay(new Date());

  // Relative dates
  if (text.includes("hoy")) {
    return today;
  }
  if (text.includes("mañana")) {
    return addDays(today, 1);
  }
  if (text.includes("pasado mañana") || text.includes("pasadomañana")) {
    return addDays(today, 2);
  }
    type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;


  // Weekdays
  const weekdays: Record<string, Day> = {
    lunes: 1,
    martes: 2,
    miércoles: 3,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
    sabado: 6,
    domingo: 0,
  };

  for (const [day, dayNumber] of Object.entries(weekdays)) {
    if (text.includes(day)) {
      return nextDay(today, dayNumber);
    }
  }

  // Specific date patterns (e.g., "el 15", "día 20")
  const dateMatch = text.match(/(?:el|día)\s*(\d{1,2})/);
  if (dateMatch) {
    const day = parseInt(dateMatch[1], 10);
    const targetDate = new Date(today);
    targetDate.setDate(day);
    
    // If the day has passed this month, assume next month
    if (targetDate < today) {
      targetDate.setMonth(targetDate.getMonth() + 1);
    }
    
    return targetDate;
  }

  return null;
}

/**
 * Detect time from natural language
 */
function detectTime(text: string): string | null {
  // Pattern: "a las 3", "a las 15:30", "3 de la tarde"
  const timePatterns = [
    /a\s*las\s*(\d{1,2})(?::(\d{2}))?/,
    /(\d{1,2})(?::(\d{2}))?\s*(?:de\s*la\s*)?(mañana|tarde|noche)/,
    /(\d{1,2})(?::(\d{2}))?/,
  ];

  for (const pattern of timePatterns) {
    const match = text.match(pattern);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      const period = match[3];

      // Adjust for AM/PM
      if (period === "tarde" && hours < 12) {
        hours += 12;
      } else if (period === "noche" && hours < 12) {
        hours += 12;
      } else if (period === "mañana" && hours === 12) {
        hours = 0;
      }

      // Validate hours and minutes
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      }
    }
  }

  return null;
}

/**
 * Detect staff name from text
 */
function detectStaff(text: string): string | null {
  // Pattern: "con María", "con el peluquero Juan"
  const staffPattern = /con\s+(?:el\s+peluquero\s+|la\s+peluquera\s+)?([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/;
  const match = text.match(staffPattern);
  
  if (match) {
    return match[1];
  }

  return null;
}

