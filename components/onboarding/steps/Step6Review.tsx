'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Building2, Briefcase, UserCog, FileText, CheckSquare, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { OnboardingFormData } from '../schema';
import type { UploadedFiles } from '../schema';

interface Step6ReviewProps {
  files: UploadedFiles;
  onGoToStep: (step: number) => void;
}

interface ReviewSectionProps {
  icon: React.ReactNode;
  title: string;
  stepIndex: number;
  editLabel: string;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}

function ReviewSection({ icon, title, stepIndex, editLabel, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-sm text-gray-800">{title}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit(stepIndex)}
          className="h-7 px-2 gap-1.5 text-xs text-[#0B3B2E] hover:bg-[#0B3B2E]/10"
        >
          <Pencil size={12} />
          {editLabel}
        </Button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Row({ label, value, dim }: { label: string; value: React.ReactNode; dim?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 shrink-0">{label}</span>
      <span className={cn('text-sm text-right font-medium', dim && 'text-gray-400 font-normal')}>
        {value}
      </span>
    </div>
  );
}

export function Step6Review({ files, onGoToStep }: Step6ReviewProps) {
  const form = useFormContext<OnboardingFormData>();
  const t = useTranslations('onboarding');
  const data = form.getValues();
  const routes = (data.routes || []) as string[];

  const transportTypeLabel = data.transportType
    ? t(`step2.types.${data.transportType}` as Parameters<typeof t>[0])
    : null;

  const missing = <span className="text-red-400">{t('step6.missing')}</span>;
  const notUploaded = <span className="text-gray-400 font-normal text-xs">{t('step6.notUploaded')}</span>;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step6.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step6.description')}</p>
      </div>

      {/* Company Info */}
      <ReviewSection
        icon={<Building2 size={16} className="text-[#0B3B2E]" />}
        title={t('step6.sections.companyInfo')}
        stepIndex={0}
        editLabel={t('step6.editButton')}
        onEdit={onGoToStep}
      >
        <Row label={t('step6.rows.companyName')} value={data.companyName || missing} />
        <Row label={t('step6.rows.registrationNumber')} value={data.registrationNumber || missing} />
        <Row label={t('step6.rows.email')} value={data.companyEmail || missing} />
        <Row label={t('step6.rows.phone')} value={data.phone || missing} />
        <Row label={t('step6.rows.address')} value={data.address || missing} />
      </ReviewSection>

      {/* Business Details */}
      <ReviewSection
        icon={<Briefcase size={16} className="text-[#0B3B2E]" />}
        title={t('step6.sections.businessDetails')}
        stepIndex={1}
        editLabel={t('step6.editButton')}
        onEdit={onGoToStep}
      >
        <Row label={t('step6.rows.transportType')} value={transportTypeLabel ?? missing} />
        <Row label={t('step6.rows.numberOfBuses')} value={data.numberOfBuses ?? missing} />
        <Row label={t('step6.rows.yearsOfOperation')} value={data.yearsOfOperation ?? missing} />
        <div className="py-1.5">
          <span className="text-xs text-gray-400">{t('step6.rows.routes')}</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {routes.filter(Boolean).length > 0 ? (
              routes.filter(Boolean).map((r, i) => (
                <span
                  key={i}
                  className="inline-block px-2.5 py-1 bg-[#0B3B2E]/8 text-[#0B3B2E] text-xs rounded-full font-medium border border-[#0B3B2E]/20"
                >
                  {r}
                </span>
              ))
            ) : (
              missing
            )}
          </div>
        </div>
      </ReviewSection>

      {/* Admin Account */}
      <ReviewSection
        icon={<UserCog size={16} className="text-[#0B3B2E]" />}
        title={t('step6.sections.adminAccount')}
        stepIndex={2}
        editLabel={t('step6.editButton')}
        onEdit={onGoToStep}
      >
        <Row label={t('step6.rows.fullName')} value={data.adminFullName || missing} />
        <Row label={t('step6.rows.email')} value={data.adminEmail || missing} />
        <Row label={t('step6.rows.password')} value="••••••••" dim />
      </ReviewSection>

      {/* Documents */}
      <ReviewSection
        icon={<FileText size={16} className="text-[#0B3B2E]" />}
        title={t('step6.sections.documents')}
        stepIndex={3}
        editLabel={t('step6.editButton')}
        onEdit={onGoToStep}
      >
        <Row label={t('step6.rows.businessCertificate')} value={files.businessCertificate ? files.businessCertificate.name : notUploaded} />
        <Row label={t('step6.rows.transportLicense')} value={files.transportLicense ? files.transportLicense.name : notUploaded} />
        <Row label={t('step6.rows.companyLogo')} value={files.companyLogo ? files.companyLogo.name : notUploaded} />
      </ReviewSection>

      {/* Agreements */}
      <ReviewSection
        icon={<CheckSquare size={16} className="text-[#0B3B2E]" />}
        title={t('step6.sections.agreements')}
        stepIndex={4}
        editLabel={t('step6.editButton')}
        onEdit={onGoToStep}
      >
        <Row
          label={t('step6.rows.termsAccepted')}
          value={
            data.acceptTerms
              ? <span className="text-green-600">{t('step6.accepted')}</span>
              : <span className="text-red-400">{t('step6.notAccepted')}</span>
          }
        />
        <Row
          label={t('step6.rows.commissionAccepted')}
          value={
            data.acceptCommission
              ? <span className="text-green-600">{t('step6.accepted')}</span>
              : <span className="text-red-400">{t('step6.notAccepted')}</span>
          }
        />
      </ReviewSection>

      <p className="text-xs text-gray-400 text-center">{t('step6.confirmText')}</p>
    </div>
  );
}
