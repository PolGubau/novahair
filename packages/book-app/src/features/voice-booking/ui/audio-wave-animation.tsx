import { cn } from "@novahair/utils/lib/cn";

/**
 * Animated audio wave visualization for voice recording
 */
export const AudioWaveAnimation = () => {
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-white/60 rounded-full",
            "animate-wave"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
};

