import { type ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Lock } from 'lucide-react';

interface GiftCardProps {
  giftNumber: number;
  title: string;
  isLocked: boolean;
  isOpened: boolean;
  onOpen: () => void;
  children: ReactNode;
}

export default function GiftCard({
  giftNumber,
  title,
  isLocked,
  isOpened,
  onOpen,
  children,
}: GiftCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isLocked || isOpened) return;
    setIsAnimating(true);
    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        isLocked
          ? 'opacity-50 cursor-not-allowed'
          : isOpened
          ? 'border-dark-pink border-2 shadow-xl'
          : 'hover:shadow-xl cursor-pointer hover:scale-105'
      } ${isAnimating ? 'animate-wiggle' : ''}`}
    >
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          {isLocked ? (
            <Lock className="w-12 h-12 text-muted-foreground" />
          ) : (
            <img
              src="/assets/generated/gift-box.dim_512x512.png"
              alt="Gift"
              className="w-16 h-16"
            />
          )}
        </div>
        <CardTitle className="text-2xl text-dark-pink">
          Gift {giftNumber}: {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isOpened ? (
          <div className="text-center py-8">
            <Button
              onClick={handleOpen}
              disabled={isLocked}
              className={`${
                isLocked
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-light-pink hover:bg-light-pink/90 text-dark-pink'
              } text-lg px-8 py-6 h-auto rounded-xl shadow-lg transition-all duration-300`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Locked
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 mr-2" />
                  Open Gift
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="py-4">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
