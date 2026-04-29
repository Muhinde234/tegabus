'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const progressPercent = steps.length > 1
    ? (currentStep / (steps.length - 1)) * 100
    : 0;

  return (
    <div className="w-full mb-8 select-none">
      {/* Track + circles row */}
      <div className="relative flex items-center justify-between">
        {/* Background track */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-200 rounded-full" />
        {/* Progress fill */}
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-[#0B3B2E] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />

        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={label} className="relative flex flex-col items-center z-10">
              <div
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-semibold transition-all duration-300',
                  isCompleted &&
                    'bg-[#0B3B2E] border-[#0B3B2E] text-white',
                  isActive &&
                    'bg-white border-[#0B3B2E] text-[#0B3B2E] shadow-md shadow-green-100',
                  !isCompleted &&
                    !isActive &&
                    'bg-white border-gray-300 text-gray-400'
                )}
              >
                {isCompleted ? <Check size={16} strokeWidth={2.5} /> : index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels row */}
      <div className="flex justify-between mt-2">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <span
              key={label}
              className={cn(
                'text-[10px] sm:text-xs font-medium text-center transition-colors duration-300',
                'w-14 sm:w-20 leading-tight',
                isActive && 'text-[#0B3B2E] font-semibold',
                isCompleted && 'text-[#0B3B2E]',
                !isCompleted && !isActive && 'text-gray-400'
              )}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
