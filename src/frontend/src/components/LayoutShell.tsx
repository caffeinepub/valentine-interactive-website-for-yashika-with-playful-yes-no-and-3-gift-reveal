import { type ReactNode } from 'react';
import { Heart } from 'lucide-react';

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-pink-950 dark:to-gray-900">
      <main className="relative z-10">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-foreground/60 bg-background/50 backdrop-blur-sm border-t border-border/50">
        <p>
          Built with <Heart className="inline w-4 h-4 text-dark-pink" fill="currentColor" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-pink hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
