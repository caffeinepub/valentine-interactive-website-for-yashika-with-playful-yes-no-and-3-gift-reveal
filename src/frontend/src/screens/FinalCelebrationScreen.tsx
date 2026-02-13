import { Heart } from 'lucide-react';
import SafeGeneratedImage from '../components/SafeGeneratedImage';
import { FINAL_COUPLE_PHOTO } from '../config/valentineContent';

export default function FinalCelebrationScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <SafeGeneratedImage
              filename={FINAL_COUPLE_PHOTO}
              alt="Our special moment"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-dark-pink flex items-center justify-center gap-4 flex-wrap">
              I got my valentine
              <Heart className="w-16 h-16 text-dark-pink animate-pulse" fill="currentColor" />
            </h1>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-8 h-8 text-light-pink animate-bounce"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
