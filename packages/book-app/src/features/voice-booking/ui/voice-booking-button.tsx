import { Button, ButtonProps } from "@novahair/ui/button";
import { t } from "i18next";
import { Mic } from "lucide-react";
import { useState } from "react";
import { useVoiceBookingController } from "../hooks/use-voice-booking-controller";
import type { AppointmentIntent } from "../utils/parse-appointment-intent";
import { VoiceBookingScreen } from "./voice-booking-screen";

interface VoiceBookingButtonProps {
  onConfirm: (intent: AppointmentIntent) => void;
  language?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * Button that opens the voice booking interface
 */
export const VoiceBookingButton = ({
  onConfirm,
  language = "es-ES",
  variant = "outline",
  size = "md",
  className,
}: VoiceBookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const voiceController = useVoiceBookingController(language);

  const handleOpen = () => {
    setIsOpen(true);
    // Auto-start listening when opening
    setTimeout(() => {
      voiceController.startListening();
    }, 300);
  };

  const handleClose = () => {
    setIsOpen(false);
    voiceController.stopListening();
    voiceController.reset();
  };

  const handleConfirm = (intent: AppointmentIntent) => {
    onConfirm(intent);
    handleClose();
  };

  // Don't show button if speech recognition is not supported
  if (!voiceController.isSupported) {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleOpen}
        className={className}
        aria-label={t("voice_booking_button_label")}
        title={t("voice_booking_button_label")}
      >
        <Mic className="size-4" />
      </Button>

      <VoiceBookingScreen
        open={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isListening={voiceController.isListening}
        transcript={voiceController.transcript}
        interimTranscript={voiceController.interimTranscript}
        parsedIntent={voiceController.parsedIntent}
        onStartListening={voiceController.startListening}
        error={voiceController.error}
      />
    </>
  );
};

