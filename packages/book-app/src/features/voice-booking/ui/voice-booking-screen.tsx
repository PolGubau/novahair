import { Button } from "@novahair/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@novahair/ui/card";
import { cn } from "@novahair/utils/lib/cn";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { t } from "i18next";
import { Calendar, Mic, Scissors, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppointmentIntent } from "../utils/parse-appointment-intent";
import { AudioWaveAnimation } from "./audio-wave-animation";
 
interface VoiceBookingScreenProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (intent: AppointmentIntent) => void;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  parsedIntent: AppointmentIntent | null;
  onStartListening: () => void;
  error: string | null;
}

export const VoiceBookingScreen = ({
  open,
  onClose,
  onConfirm,
  isListening,
  transcript,
  interimTranscript,
  parsedIntent,
  onStartListening,
  error,
}: VoiceBookingScreenProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Show confirmation when we have a parsed intent with good confidence
  useEffect(() => {
    if (parsedIntent && parsedIntent.confidence > 0.5 && !isListening) {
      setShowConfirmation(true);
    }
  }, [parsedIntent, isListening]);

  const handleConfirm = () => {
    if (parsedIntent) {
      onConfirm(parsedIntent);
      setShowConfirmation(false);
    }
  };

  const handleCorrect = () => {
    setShowConfirmation(false);
    onStartListening();
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const displayText = transcript || t("voice_booking_listening");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Listening Phase */}
      {!showConfirmation && (
        <div className="bg-linear-to-br from-primary via-primary-dark to-primary h-full flex flex-col items-center justify-center p-8 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            aria-label={t("close")}
          >
            <X className="size-8" />
          </button>

            {/* Microphone icon */}
            <div className="mb-8">
              <div className={cn(
                "size-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center",
                isListening && "animate-pulse ring-4 ring-white/30"
              )}>
                <Mic className="size-12 text-white" />
              </div>
              {isListening && (
                <p className="text-white/80 text-sm mt-4 text-center">
                  🎤 Escuchando...
                </p>
              )}
            </div>

            {/* Audio wave animation */}
            {isListening && (
              <div className="mt-4">
                <AudioWaveAnimation />
              </div>
            )}

            {/* Transcript display */}
            <div className="mt-8 max-w-2xl w-full">
              <p className="text-white text-3xl md:text-4xl font-light text-center min-h-30 leading-relaxed">
                {displayText}
                {interimTranscript && (
                  <span className="text-white/60"> {interimTranscript}</span>
                )}
              </p>

              {error && (
                <p className="text-red-200 text-center mt-4">
                  {t("voice_booking_error")}: {error}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-12 flex gap-4">
              {!isListening && !transcript && (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={onStartListening}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Mic className="mr-2" />
                  {t("voice_booking_start")}
                </Button>
              )}
              
              {transcript && !isListening && (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={onStartListening}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  {t("try_again")}
                </Button>
              )}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-0 right-0 px-8">
              <p className="text-white/70 text-center text-sm max-w-md mx-auto">
                {t("voice_booking_instructions")}
              </p>
            </div>
          </div>
        )}

        {/* Confirmation Phase */}
        {showConfirmation && parsedIntent && (
          <div className="bg-background h-full flex items-center justify-center p-8">
            <Card className="max-w-md w-full shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">{t("confirm_booking")}</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">
                  {t("confirm_booking_subtitle")}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Service */}
                {parsedIntent.service && (
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Scissors className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{t("service")}</p>
                      <p className="font-medium text-lg">{parsedIntent.service}</p>
                    </div>
                  </div>
                )}

                {/* Date and Time */}
                {(parsedIntent.date || parsedIntent.time) && (
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{t("date_and_time")}</p>
                      <p className="font-medium text-lg">
                        {parsedIntent.date && format(parsedIntent.date, "EEEE, d 'de' MMMM", { locale: es })}
                        {parsedIntent.time && ` ${t("at")} ${parsedIntent.time}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Original transcript */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">{t("voice_booking_you_said")}:</p>
                  <p className="text-sm italic text-foreground/70">"{parsedIntent.rawText}"</p>
                </div>

                {/* Confidence indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${parsedIntent.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(parsedIntent.confidence * 100)}%
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCorrect}
                  className="flex-1"
                >
                  {t("voice_booking_correct")}
                </Button>
                <Button 
                  onClick={handleConfirm}
                  className="flex-1"
                  disabled={!parsedIntent.serviceId || !parsedIntent.date}
                >
                  {t("confirm")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
    </div>
  );
};

