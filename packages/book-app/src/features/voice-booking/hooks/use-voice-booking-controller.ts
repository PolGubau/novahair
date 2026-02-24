import { useServices } from "@novahair/client";
import { useEffect, useState } from "react";
import { useTenantId } from "../../../shared/tenant";
import type { AppointmentIntent } from "../utils/parse-appointment-intent";
import { parseAppointmentIntent } from "../utils/parse-appointment-intent";
import { useVoiceBooking } from "./use-voice-booking";

/**
 * Main controller hook for voice booking feature
 * Combines voice recognition with appointment intent parsing
 */
export const useVoiceBookingController = (language: string = "es-ES") => {
  const tenantId = useTenantId();
  const { services } = useServices(tenantId);
  const voiceBooking = useVoiceBooking(language);
  const [parsedIntent, setParsedIntent] = useState<AppointmentIntent | null>(null);

  // Parse transcript when it changes and is final
  useEffect(() => {
    if (voiceBooking.transcript && !voiceBooking.isListening) {
      const intent = parseAppointmentIntent(voiceBooking.transcript, services);
      setParsedIntent(intent);
    }
  }, [voiceBooking.transcript, voiceBooking.isListening, services]);

  const reset = () => {
    voiceBooking.resetTranscript();
    setParsedIntent(null);
  };

  return {
    ...voiceBooking,
    parsedIntent,
    reset,
  };
};

