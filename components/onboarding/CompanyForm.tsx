'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Loader2, Send, CheckCircle2, Building2 } from 'lucide-react';
import Link from 'next/link';

import {
  onboardingSchema,
  STEP_FIELDS,
  type OnboardingFormData,
  type UploadedFiles,
} from './schema';
import { Stepper } from './Stepper';
import { Step1Company } from './steps/Step1Company';
import { Step2Business } from './steps/Step2Business';
import { Step3Admin } from './steps/Step3Admin';
import { Step4Documents } from './steps/Step4Documents';
import { Step5Agreement } from './steps/Step5Agreement';
import { Step6Review } from './steps/Step6Review';

const DEFAULT_FILES: UploadedFiles = {
  businessCertificate: null,
  transportLicense: null,
  companyLogo: null,
};

const TOTAL_STEPS = 6;

function SuccessCard({ companyName, locale }: { companyName: string; locale: string }) {
  const t = useTranslations('onboarding');
  return (
    <div className="flex flex-col items-center text-center py-10 px-6 animate-in fade-in-0 zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-full bg-[#0B3B2E]/10 flex items-center justify-center mb-5">
        <CheckCircle2 size={44} className="text-[#0B3B2E]" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('success.title')}</h2>
      <p className="text-gray-500 text-sm max-w-sm mb-2">
        {t('success.description', { companyName })}
      </p>
      <p className="text-xs text-gray-400 mb-8">{t('success.emailNote')}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/${locale}`}>
          <Button variant="default" className="bg-[#0B3B2E] hover:bg-[#0a3327] text-white px-6">
            {t('success.returnHome')}
          </Button>
        </Link>
        <Link href={`/${locale}/about`}>
          <Button variant="outline" className="px-6">
            {t('success.learnMore')}
          </Button>
        </Link>
      </div>

      <div className="mt-10 flex items-center gap-2 text-xs text-gray-400">
        <Building2 size={14} />
        <span>{t('success.contact')}</span>
      </div>
    </div>
  );
}

export function CompanyForm() {
  const t = useTranslations('onboarding');
  const locale = useLocale();

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState<UploadedFiles>(DEFAULT_FILES);

  const stepLabels = [
    t('stepLabels.companyInfo'),
    t('stepLabels.businessDetails'),
    t('stepLabels.adminAccount'),
    t('stepLabels.documents'),
    t('stepLabels.agreement'),
    t('stepLabels.review'),
  ];

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      companyName: '',
      registrationNumber: '',
      companyEmail: '',
      phone: '',
      address: '',
      transportType: '',
      numberOfBuses: undefined,
      routes: [''],
      yearsOfOperation: undefined,
      adminFullName: '',
      adminEmail: '',
      adminPassword: '',
      adminConfirmPassword: '',
      acceptTerms: false,
      acceptCommission: false,
    },
  });

  const handleFileChange = (key: keyof UploadedFiles, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    const isValid =
      fields.length > 0
        ? await form.trigger(fields as Parameters<typeof form.trigger>[0], { shouldFocus: true })
        : true;
    if (!isValid) return;
    setDirection('forward');
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setDirection('backward');
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStep = (step: number) => {
    setDirection('backward');
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    console.log('TegaBus Partner Application:', {
      ...data,
      files: {
        businessCertificate: files.businessCertificate?.name ?? null,
        transportLicense: files.transportLicense?.name ?? null,
        companyLogo: files.companyLogo?.name ?? null,
      },
    });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <SuccessCard companyName={form.getValues('companyName')} locale={locale} />;
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  const stepAnimation = cn(
    'duration-300 ease-out',
    direction === 'forward'
      ? 'animate-in fade-in-0 slide-in-from-right-4'
      : 'animate-in fade-in-0 slide-in-from-left-4'
  );

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stepper steps={stepLabels} currentStep={currentStep} />

        <div key={currentStep} className={stepAnimation}>
          {currentStep === 0 && <Step1Company />}
          {currentStep === 1 && <Step2Business />}
          {currentStep === 2 && <Step3Admin />}
          {currentStep === 3 && <Step4Documents files={files} onFileChange={handleFileChange} />}
          {currentStep === 4 && <Step5Agreement />}
          {currentStep === 5 && <Step6Review files={files} onGoToStep={handleGoToStep} />}
        </div>

        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="gap-2"
          >
            <ArrowLeft size={15} />
            {t('nav.back')}
          </Button>

          <span className="text-xs text-gray-400 hidden sm:block">
            {t('nav.stepOf', { current: currentStep + 1, total: TOTAL_STEPS })}
          </span>

          {isLastStep ? (
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="gap-2 bg-[#0B3B2E] hover:bg-[#0a3327] text-white min-w-40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {t('nav.submitting')}
                </>
              ) : (
                <>
                  <Send size={15} />
                  {t('nav.submit')}
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="gap-2 bg-[#0B3B2E] hover:bg-[#0a3327] text-white"
            >
              {t('nav.next')}
              <ArrowRight size={15} />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
