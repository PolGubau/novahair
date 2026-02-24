import { useState, useCallback, useRef, useEffect } from "react";

// Type for browser speech recognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface VoiceBookingState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
}

export const useVoiceBooking = (language: string = "es-ES") => {
  const [state, setState] = useState<VoiceBookingState>({
    isListening: false,
    transcript: "",
    interimTranscript: "",
    error: null,
    isSupported: typeof window !== "undefined" && 
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window),
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: "Speech recognition not supported" }));
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log("🎤 Voice recognition started");
        setState(prev => ({
          ...prev,
          isListening: true,
          error: null,
          transcript: "",
          interimTranscript: "",
        }));
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("🎤 Got result event:", event.results.length, "results");
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;

          if (result.isFinal) {
            console.log("✅ Final transcript:", transcript);
            finalTranscript += transcript + " ";
          } else {
            console.log("⏳ Interim transcript:", transcript);
            interimTranscript += transcript;
          }
        }

        console.log("📝 Setting state - Final:", finalTranscript, "Interim:", interimTranscript);
        setState(prev => ({
          ...prev,
          transcript: finalTranscript.trim() || prev.transcript,
          interimTranscript: interimTranscript,
        }));
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("❌ Voice recognition error:", event.error, event.message);
        setState(prev => ({
          ...prev,
          isListening: false,
          error: event.error,
        }));
      };

      recognition.onend = () => {
        console.log("🛑 Voice recognition ended");
        setState(prev => ({
          ...prev,
          isListening: false,
          interimTranscript: "",
        }));
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [language, state.isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      transcript: "", 
      interimTranscript: "",
      error: null,
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
  };
};

