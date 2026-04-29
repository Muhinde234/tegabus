'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FileText, ImageIcon, Upload, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UploadedFiles } from '../schema';

interface Step4DocumentsProps {
  files: UploadedFiles;
  onFileChange: (key: keyof UploadedFiles, file: File | null) => void;
}

interface FileSlotProps {
  label: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  file: File | null;
  fieldKey: keyof UploadedFiles;
  isImage?: boolean;
  clickToUploadLabel: string;
  sizeLimit: string;
  removeFileLabel: string;
  onFileChange: (key: keyof UploadedFiles, file: File | null) => void;
}

function FileSlot({
  label,
  description,
  accept,
  icon,
  file,
  fieldKey,
  isImage = false,
  clickToUploadLabel,
  sizeLimit,
  removeFileLabel,
  onFileChange,
}: FileSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file && isImage ? URL.createObjectURL(file) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(fieldKey, selected);
    e.target.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <p className="text-xs text-gray-400">{description}</p>

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all duration-200 group',
          file
            ? 'border-[#0B3B2E] bg-green-50'
            : 'border-gray-200 hover:border-[#0B3B2E] hover:bg-gray-50'
        )}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />

        {file ? (
          <div className="flex items-center gap-3">
            {isImage && previewUrl ? (
              <img
                src={previewUrl}
                alt="Logo preview"
                className="w-14 h-14 object-contain rounded-lg border border-gray-200 bg-white"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-[#0B3B2E]/10 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-[#0B3B2E]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
            </div>
            <CheckCircle2 size={18} className="text-[#0B3B2E] shrink-0" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#0B3B2E]/10 flex items-center justify-center transition-colors">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-[#0B3B2E] transition-colors">
                {clickToUploadLabel}
              </p>
              <p className="text-xs text-gray-400">{sizeLimit}</p>
            </div>
          </div>
        )}
      </div>

      {file && (
        <button
          type="button"
          onClick={() => onFileChange(fieldKey, null)}
          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          <X size={13} />
          {removeFileLabel}
        </button>
      )}
    </div>
  );
}

export function Step4Documents({ files, onFileChange }: Step4DocumentsProps) {
  const t = useTranslations('onboarding');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step4.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step4.description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <FileSlot
          label={t('step4.businessCertificate.label')}
          description={t('step4.businessCertificate.description')}
          accept=".pdf"
          icon={<FileText size={20} className="text-gray-400" />}
          file={files.businessCertificate}
          fieldKey="businessCertificate"
          clickToUploadLabel={t('step4.clickToUpload')}
          sizeLimit={t('step4.pdfLimit')}
          removeFileLabel={t('step4.removeFile')}
          onFileChange={onFileChange}
        />

        <FileSlot
          label={t('step4.transportLicense.label')}
          description={t('step4.transportLicense.description')}
          accept=".pdf"
          icon={<Upload size={20} className="text-gray-400" />}
          file={files.transportLicense}
          fieldKey="transportLicense"
          clickToUploadLabel={t('step4.clickToUpload')}
          sizeLimit={t('step4.pdfLimit')}
          removeFileLabel={t('step4.removeFile')}
          onFileChange={onFileChange}
        />

        <FileSlot
          label={t('step4.companyLogo.label')}
          description={t('step4.companyLogo.description')}
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          icon={<ImageIcon size={20} className="text-gray-400" />}
          file={files.companyLogo}
          fieldKey="companyLogo"
          isImage
          clickToUploadLabel={t('step4.clickToUpload')}
          sizeLimit={t('step4.imageLimit')}
          removeFileLabel={t('step4.removeFile')}
          onFileChange={onFileChange}
        />
      </div>

      <p className="text-xs text-gray-400">* {t('step4.complianceNote')}</p>
    </div>
  );
}
