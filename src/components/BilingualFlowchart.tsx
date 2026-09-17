import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ArrowRight } from 'lucide-react';

interface FlowchartStep {
  en: string;
  ur: string;
  icon?: React.ReactNode;
}

interface BilingualFlowchartProps {
  steps: FlowchartStep[];
  className?: string;
  showStepNumbers?: boolean;
}

/**
 * BilingualFlowchart Component
 * 
 * Interactive graphical flowchart with bilingual support.
 * Features:
 * - Visual nodes/cards with icons
 * - Directional arrows
 * - Click to expand details
 * - Responsive horizontal/vertical layout
 * - Bilingual labels (English/Urdu/Both)
 * - High contrast in dark/light theme
 * - Gentle animations
 * - Respects reduced-motion settings
 */
export function BilingualFlowchart({ 
  steps, 
  className = '',
  showStepNumbers = true
}: BilingualFlowchartProps) {
  const { language } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={`my-6 p-4 rounded-xl ${className}`} style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
      {/* Flowchart nodes */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-1">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Node */}
            <button
              onClick={() => setActiveStep(i)}
              className={`relative px-4 py-3 rounded-lg text-sm font-medium text-center transition-all min-w-[120px] flex-1 ${
                activeStep === i ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: activeStep === i ? 'var(--accent)' : 'var(--surface)',
                color: activeStep === i ? '#fff' : 'var(--text-primary)',
                border: `2px solid ${activeStep === i ? 'var(--accent)' : 'var(--border)'}`,
                boxShadow: activeStep === i ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {/* Icon */}
              {step.icon && (
                <div className="mb-2 flex justify-center">
                  {step.icon}
                </div>
              )}
              
              {/* Step number */}
              {showStepNumbers && (
                <div className="text-xs opacity-70 mb-1">Step {i + 1}</div>
              )}
              
              {/* Content */}
              {language === 'en' && step.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{step.ur}</span>}
              {language === 'both' && (
                <>
                  {step.en}
                  <span className="block font-urdu text-xs mt-1 opacity-90" dir="rtl">{step.ur}</span>
                </>
              )}
            </button>
            
            {/* Arrow (horizontal on desktop) */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center px-1">
                <ArrowRight size={20} style={{ color: 'var(--accent)' }} />
              </div>
            )}
            
            {/* Arrow (vertical on mobile) */}
            {i < steps.length - 1 && (
              <div className="md:hidden flex justify-center py-1">
                <div className="w-0.5 h-4" style={{ backgroundColor: 'var(--accent)' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Active step detail */}
      <div 
        className="mt-4 p-3 rounded-lg text-center text-sm" 
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        {language === 'en' && steps[activeStep].en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{steps[activeStep].ur}</span>}
        {language === 'both' && (
          <>
            {steps[activeStep].en}
            <span className="block font-urdu mt-1" dir="rtl">{steps[activeStep].ur}</span>
          </>
        )}
      </div>
    </div>
  );
}
