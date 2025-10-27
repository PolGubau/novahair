/**
 * Cell del calendario.
 */
export type CalendarCell = {
  /** Date a mediodía local (evita desajustes ISO), o null si celda vacía */
  date: Date | null;
  /** número de día (1..31) o null si celda vacía */
  day: number | null;
  /** true si pertenece al mes solicitado */
  inMonth: boolean;
};

/**
 * Genera la matriz (semanas x 7) para un mes dado.
 *
 * @param year - año (ej. 2025)
 * @param month - mes 0-based (0=Ene, 9=Oct)
 * @param startOnMonday - si true la semana empieza lunes, si false domingo
 * @returns matriz de semanas; cada semana es array de 7 CalendarCell
 */
export function generateCalendarMatrix(
  year: number,
  month: number,
  startOnMonday = true
): CalendarCell[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  // JS getDay(): 0=Dom ... 6=Sáb
  const firstWeekday = firstDay.getDay();

  // offset = cuántas celdas vacías al inicio de la primera semana
  const offset = startOnMonday ? (firstWeekday === 0 ? 6 : firstWeekday - 1) : firstWeekday;

  const weeks: CalendarCell[][] = [];
  let currentDay = 1 - offset;

  while (currentDay <= totalDays) {
    const week: CalendarCell[] = [];

    for (let i = 0; i < 7; i++, currentDay++) {
      if (currentDay < 1 || currentDay > totalDays) {
        week.push({ date: null, day: null, inMonth: false });
      } else {
        // Creamos la Date a mediodía para evitar que la conversión ISO muestre el día anterior
        const date = new Date(year, month, currentDay, 12, 0, 0, 0);
        week.push({ date, day: currentDay, inMonth: true });
      }
    }

    weeks.push(week);
  }

  return weeks;
}
