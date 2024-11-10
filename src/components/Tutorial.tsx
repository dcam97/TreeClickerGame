import React, { useState } from 'react';
import { HelpCircle, X, ArrowRight } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Tree Farm Clicker!',
    content: 'Let\'s learn how to grow your own magical forest and generate oxygen.',
    target: '.tutorial-header',
    position: 'bottom'
  },
  {
    id: 'tilling',
    title: 'Tilling the Land',
    content: 'Click on any empty plot to till it. You need to till a plot 30 times before you can plant a tree.',
    target: '.tutorial-grid',
    position: 'top'
  },
  {
    id: 'shop',
    title: 'The Mystical Shop',
    content: 'Visit the shop to buy tree seeds and magical items. You\'ll need oxygen to make purchases.',
    target: '.tutorial-shop',
    position: 'left'
  },
  {
    id: 'workshop',
    title: 'The Workshop',
    content: 'Upgrade your tools in the workshop to till land faster and automate your farm.',
    target: '.tutorial-workshop',
    position: 'left'
  }
];

interface TutorialProps {
  onComplete: () => void;
}

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const currentTutorialStep = TUTORIAL_STEPS[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Tutorial Card */}
      <div className={`fixed z-[60] bg-emerald-900/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-emerald-500/30 w-80
        ${currentTutorialStep.position === 'top' ? 'bottom-32 left-1/2 -translate-x-1/2' :
          currentTutorialStep.position === 'bottom' ? 'top-32 left-1/2 -translate-x-1/2' :
          currentTutorialStep.position === 'left' ? 'right-32 top-1/2 -translate-y-1/2' :
          'left-32 top-1/2 -translate-y-1/2'}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-100">
              {currentTutorialStep.title}
            </h3>
          </div>
          <button 
            onClick={handleSkip}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-emerald-200/90 mb-4">
          {currentTutorialStep.content}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-emerald-400/70">
            Step {currentStep + 1} of {TUTORIAL_STEPS.length}
          </span>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors"
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? 'Got it!' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Arrow pointer */}
        <div className={`absolute w-4 h-4 bg-emerald-900/95 border-t border-l border-emerald-500/30 transform rotate-45
          ${currentTutorialStep.position === 'top' ? '-bottom-2 left-1/2 -translate-x-1/2' :
            currentTutorialStep.position === 'bottom' ? '-top-2 left-1/2 -translate-x-1/2 rotate-[225deg]' :
            currentTutorialStep.position === 'left' ? '-right-2 top-1/2 -translate-y-1/2 rotate-[135deg]' :
            '-left-2 top-1/2 -translate-y-1/2 rotate-[-45deg]'}`}
        />
      </div>

      {/* Target highlight */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          mask: `radial-gradient(circle at var(--highlight-x, 50%) var(--highlight-y, 50%), transparent 20%, black 30%)`
        }}
      />
    </>
  );
}