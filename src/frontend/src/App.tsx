import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import GiftsScreen from './screens/GiftsScreen';
import FinalCelebrationScreen from './screens/FinalCelebrationScreen';
import LayoutShell from './components/LayoutShell';

type Step = 'landing' | 'gifts' | 'final';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');

  const handleYesClick = () => {
    setCurrentStep('gifts');
  };

  const handleDoneClick = () => {
    setCurrentStep('final');
  };

  return (
    <LayoutShell>
      {currentStep === 'landing' && <LandingScreen onYesClick={handleYesClick} />}
      {currentStep === 'gifts' && <GiftsScreen onDoneClick={handleDoneClick} />}
      {currentStep === 'final' && <FinalCelebrationScreen />}
    </LayoutShell>
  );
}

export default App;
