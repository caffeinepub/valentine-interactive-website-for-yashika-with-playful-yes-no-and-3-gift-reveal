import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import GiftCard from '../components/GiftCard';
import BalloonRiseAnimation from '../components/BalloonRiseAnimation';
import SafeGeneratedImage from '../components/SafeGeneratedImage';
import { LOVE_NOTE, HER_PHOTOS, COUPLE_PHOTOS } from '../config/valentineContent';
import { Gift, HelpCircle } from 'lucide-react';

interface GiftsScreenProps {
  onDoneClick: () => void;
}

export default function GiftsScreen({ onDoneClick }: GiftsScreenProps) {
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());
  const [gift3ShowingBalloons, setGift3ShowingBalloons] = useState(false);
  const [gift3ShowingPhotos, setGift3ShowingPhotos] = useState(false);

  const handleOpenGift = (giftNumber: number) => {
    if (giftNumber === 3) {
      setGift3ShowingBalloons(true);
    }
    setOpenedGifts((prev) => new Set(prev).add(giftNumber));
  };

  const handleBalloonsComplete = () => {
    setGift3ShowingBalloons(false);
    setGift3ShowingPhotos(true);
  };

  const isGiftLocked = (giftNumber: number) => {
    if (giftNumber === 1) return false;
    return !openedGifts.has(giftNumber - 1);
  };

  const isGiftOpened = (giftNumber: number) => openedGifts.has(giftNumber);

  const showDoneButton = openedGifts.has(3) && gift3ShowingPhotos && !gift3ShowingBalloons;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <Gift className="w-16 h-16 mx-auto text-dark-pink" />
          <h1 className="text-4xl md:text-6xl font-bold text-dark-pink">
            Your Special Gifts
          </h1>
          <p className="text-xl text-foreground/80">
            Open each gift to discover what I have for you...
          </p>
          
          {/* Help Dialog */}
          <div className="pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-light-pink text-dark-pink hover:bg-light-pink/10"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  How to add photos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-dark-pink">
                    How to Replace Photos
                  </DialogTitle>
                  <DialogDescription className="text-left space-y-4 pt-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-lg">
                        Step 1: Add Your Images
                      </h3>
                      <p className="text-foreground/80">
                        Place your photo files in the following folder:
                      </p>
                      <code className="block bg-light-pink/20 text-dark-pink px-4 py-2 rounded-lg font-mono text-sm">
                        frontend/public/assets/generated/
                      </code>
                      <p className="text-foreground/80 text-sm">
                        Make sure to use exact filenames including the file extension (e.g., .png, .jpg).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-lg">
                        Step 2: Update the Configuration
                      </h3>
                      <p className="text-foreground/80">
                        Open the configuration file:
                      </p>
                      <code className="block bg-light-pink/20 text-dark-pink px-4 py-2 rounded-lg font-mono text-sm">
                        frontend/src/config/valentineContent.ts
                      </code>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-lg">
                        Step 3: Edit the Photo Arrays
                      </h3>
                      <p className="text-foreground/80">
                        Update the following fields with your exact filenames:
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-foreground">
                            For Gift 2 (Her Photos):
                          </p>
                          <code className="block bg-light-pink/20 text-dark-pink px-4 py-2 rounded-lg font-mono text-sm mt-1">
                            HER_PHOTOS = [<br />
                            &nbsp;&nbsp;'your-photo-1.png',<br />
                            &nbsp;&nbsp;'your-photo-2.jpg',<br />
                            &nbsp;&nbsp;'your-photo-3.png',<br />
                            ]
                          </code>
                        </div>

                        <div>
                          <p className="font-medium text-foreground">
                            For Gift 3 (Couple Photos):
                          </p>
                          <code className="block bg-light-pink/20 text-dark-pink px-4 py-2 rounded-lg font-mono text-sm mt-1">
                            COUPLE_PHOTOS = [<br />
                            &nbsp;&nbsp;'couple-photo-1.jpg',<br />
                            &nbsp;&nbsp;'couple-photo-2.png',<br />
                            ]
                          </code>
                        </div>

                        <div>
                          <p className="font-medium text-foreground">
                            For Final Celebration Photo:
                          </p>
                          <code className="block bg-light-pink/20 text-dark-pink px-4 py-2 rounded-lg font-mono text-sm mt-1">
                            FINAL_COUPLE_PHOTO = 'final-photo.jpg'
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="bg-dark-pink/10 border-l-4 border-dark-pink p-4 rounded">
                      <p className="text-foreground font-medium">
                        💡 Important Notes:
                      </p>
                      <ul className="list-disc list-inside text-foreground/80 text-sm space-y-1 mt-2">
                        <li>Use the exact filename including the extension</li>
                        <li>The app reads images from /assets/generated/&lt;filename&gt;</li>
                        <li>Supported formats: .png, .jpg, .jpeg, .gif, .webp</li>
                        <li>If an image is missing, a placeholder will be shown</li>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Gift 1 - Love Letter */}
          <GiftCard
            giftNumber={1}
            title="A Letter for You"
            isLocked={isGiftLocked(1)}
            isOpened={isGiftOpened(1)}
            onOpen={() => handleOpenGift(1)}
          >
            <div className="space-y-4 animate-reveal">
              <div className="bg-light-pink/20 rounded-lg p-6 border-2 border-light-pink">
                <p className="text-lg leading-relaxed whitespace-pre-line text-foreground">
                  {LOVE_NOTE}
                </p>
              </div>
            </div>
          </GiftCard>

          {/* Gift 2 - Her Photos */}
          <GiftCard
            giftNumber={2}
            title="Beautiful You"
            isLocked={isGiftLocked(2)}
            isOpened={isGiftOpened(2)}
            onOpen={() => handleOpenGift(2)}
          >
            <div className="space-y-4 animate-reveal">
              <div className="grid grid-cols-1 gap-4">
                {HER_PHOTOS.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <SafeGeneratedImage
                      filename={photo}
                      alt={`Beautiful moment ${index + 1}`}
                      className="w-full h-full object-cover"
                      aspectRatio="4/5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </GiftCard>

          {/* Gift 3 - Couple Photos with Balloon Animation */}
          <GiftCard
            giftNumber={3}
            title="Us Together"
            isLocked={isGiftLocked(3)}
            isOpened={isGiftOpened(3)}
            onOpen={() => handleOpenGift(3)}
          >
            {gift3ShowingBalloons && (
              <BalloonRiseAnimation onComplete={handleBalloonsComplete} />
            )}
            {gift3ShowingPhotos && (
              <div className="space-y-4 animate-reveal">
                <div className="grid grid-cols-1 gap-4">
                  {COUPLE_PHOTOS.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <SafeGeneratedImage
                        filename={photo}
                        alt={`Our moment ${index + 1}`}
                        className="w-full h-full object-cover"
                        aspectRatio="3/2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GiftCard>
        </div>

        {showDoneButton && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={onDoneClick}
              size="lg"
              className="bg-dark-pink hover:bg-dark-pink/90 text-white text-2xl px-16 py-8 h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Click to Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
