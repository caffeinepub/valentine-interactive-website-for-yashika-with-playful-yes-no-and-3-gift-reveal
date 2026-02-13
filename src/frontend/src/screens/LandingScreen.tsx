import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { GIRLFRIEND_NAME } from '../config/valentineContent';
import { getRandomPosition } from '../utils/randomPosition';

interface LandingScreenProps {
  onYesClick: () => void;
}

export default function LandingScreen({ onYesClick }: LandingScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const buttonWidth = 120;
      const buttonHeight = 48;
      const newPosition = getRandomPosition(
        container.width,
        container.height,
        buttonWidth,
        buttonHeight
      );
      setNoButtonPosition(newPosition);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-2xl w-full">
        <div className="space-y-6 animate-fade-in">
          <Heart className="w-24 h-24 mx-auto text-dark-pink animate-pulse" fill="currentColor" />
          <h1 className="text-5xl md:text-7xl font-bold text-dark-pink leading-tight">
            Will you be my Valentine, {GIRLFRIEND_NAME}?
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80">
            I have something special for you...
          </p>
        </div>

        <div ref={containerRef} className="relative h-64 flex items-center justify-center">
          <div className="flex gap-8">
            <Button
              onClick={onYesClick}
              size="lg"
              className="bg-dark-pink hover:bg-dark-pink/90 text-white text-2xl px-12 py-8 h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Yes! ♥
            </Button>

            <Button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onPointerMove={handleNoHover}
              onClick={(e) => e.preventDefault()}
              size="lg"
              style={{
                position: noButtonPosition.top === 0 ? 'relative' : 'absolute',
                top: noButtonPosition.top === 0 ? 'auto' : `${noButtonPosition.top}px`,
                left: noButtonPosition.left === 0 ? 'auto' : `${noButtonPosition.left}px`,
              }}
              className="bg-light-pink hover:bg-light-pink text-dark-pink text-2xl px-12 py-8 h-auto rounded-2xl shadow-xl transition-all duration-200"
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
