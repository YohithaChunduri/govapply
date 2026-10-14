import React from "react";
import { Check } from "lucide-react";

interface ApplicationStepperProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

export const ApplicationStepper: React.FC<ApplicationStepperProps> = ({
  currentStep,
  totalSteps = 5,
  onStepClick,
}) => {
  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Education" },
    { number: 3, title: "Category & Quota" },
    { number: 4, title: "Documents" },
    { number: 5, title: "Review & Confirm" },
  ];

  return (
    <nav aria-label="Application Progress" className="w-full bg-white border border-slate-200 rounded-md p-3 sm:p-4 mb-6 shadow-xs">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {steps.map((step) => {
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <li
              key={step.number}
              aria-current={isCurrent ? "step" : undefined}
              className="flex-1 flex items-center"
            >
              <button
                type="button"
                disabled={!isDone && !isCurrent}
                onClick={() => isDone && onStepClick && onStepClick(step.number)}
                className={`flex items-center gap-2 sm:gap-2.5 text-left w-full group ${
                  isDone ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isDone
                      ? "bg-emerald-700 text-white"
                      : isCurrent
                      ? "bg-[#0B2546] text-white ring-2 ring-blue-200"
                      : "bg-slate-100 text-slate-500 border border-slate-300"
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : step.number}
                </div>

                {/* Step Label */}
                <div className="hidden md:block">
                  <p
                    className={`text-[10px] uppercase font-semibold leading-none ${
                      isCurrent ? "text-blue-900" : "text-slate-400"
                    }`}
                  >
                    Step 0{step.number}
                  </p>
                  <p
                    className={`text-xs font-semibold leading-tight truncate max-w-[110px] ${
                      isCurrent ? "text-slate-900 font-bold" : isDone ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </button>

              {/* Connecting Line */}
              {step.number < totalSteps && (
                <div
                  className={`hidden sm:block flex-1 h-[2px] mx-2 ${
                    step.number < currentStep ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
