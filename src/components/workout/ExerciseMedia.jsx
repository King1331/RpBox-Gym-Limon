import { useRef, useState } from "react";
import { Play, Dumbbell, Pause } from "lucide-react";

export default function ExerciseMedia({ exercise, compact = false, showPlay = true }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink-soft border border-ink-line w-full max-w-full ${compact ? "aspect-[1/0.72]" : "aspect-[1/0.9]"}`}>
      {/* Video o thumbnail */}
      {exercise.videoUrl ? (
        <video
          ref={videoRef}
          src={exercise.videoUrl}
          poster={exercise.thumbnail}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      ) : exercise.thumbnail ? (
        <img
          src={exercise.thumbnail}
          alt={exercise.nombre}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/30">
          <Dumbbell size={32} />
        </div>
      )}

      {/* Botón de play/pause overlay */}
      {showPlay && exercise.videoUrl && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/10 active:bg-black/20 transition-colors"
          aria-label={isPlaying ? "Pausar ejercicio" : "Reproducir ejercicio"}
        >
          <div className="w-12 h-12 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center">
            {isPlaying ? (
              <Pause size={20} className="text-paper fill-paper" />
            ) : (
              <Play size={20} className="text-paper fill-paper ml-0.5" />
            )}
          </div>
        </button>
      )}
    </div>
  );
}