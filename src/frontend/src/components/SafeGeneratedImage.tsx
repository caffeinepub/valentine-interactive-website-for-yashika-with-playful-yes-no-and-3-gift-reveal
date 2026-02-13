import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeGeneratedImageProps {
  filename: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function SafeGeneratedImage({
  filename,
  alt,
  className = '',
  aspectRatio = 'auto',
}: SafeGeneratedImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-light-pink/20 border-2 border-light-pink rounded-lg p-8 ${className}`}
        style={{ aspectRatio }}
      >
        <ImageOff className="w-12 h-12 text-dark-pink mb-4" />
        <p className="text-dark-pink font-semibold text-center">
          Image not found
        </p>
        <p className="text-foreground/60 text-sm text-center mt-2">
          {filename}
        </p>
      </div>
    );
  }

  return (
    <img
      src={`/assets/generated/${filename}`}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
