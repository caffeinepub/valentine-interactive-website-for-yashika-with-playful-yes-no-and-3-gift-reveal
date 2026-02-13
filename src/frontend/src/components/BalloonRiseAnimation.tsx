import { useEffect, useState } from 'react';

interface BalloonRiseAnimationProps {
  onComplete: () => void;
}

const BALLOONS = [
  { src: '/assets/generated/balloon-01.dim_512x512.png', delay: 0 },
  { src: '/assets/generated/balloon-02.dim_512x512.png', delay: 0.3 },
  { src: '/assets/generated/balloon-03.dim_512x512.png', delay: 0.6 },
  { src: '/assets/generated/balloon-01.dim_512x512.png', delay: 0.9 },
  { src: '/assets/generated/balloon-02.dim_512x512.png', delay: 1.2 },
];

const ANIMATION_DURATION = 4000; // 4 seconds

export default function BalloonRiseAnimation({ onComplete }: BalloonRiseAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {BALLOONS.map((balloon, index) => (
          <div
            key={index}
            className="absolute bottom-0 animate-balloon-rise"
            style={{
              left: `${15 + index * 15}%`,
              animationDelay: `${balloon.delay}s`,
            }}
          >
            <img
              src={balloon.src}
              alt={`Balloon ${index + 1}`}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
