'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/inputField';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import type { OnboardingFormData } from '../schema';

function PasswordInput({
  placeholder,
  field,
}: {
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className="pr-10"
        {...field}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        tabIndex={-1}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export function Step3Admin() {
  const form = useFormContext<OnboardingFormData>();
  const t = useTranslations('onboarding');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step3.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step3.description')}</p>
      </div>

      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
        <ShieldCheck size={18} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700">{t('step3.infoBanner')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="adminFullName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t('step3.fullName.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder={t('step3.fullName.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adminEmail"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t('step3.adminEmail.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('step3.adminEmail.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adminPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step3.password.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <PasswordInput placeholder={t('step3.password.placeholder')} field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adminConfirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step3.confirmPassword.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <PasswordInput placeholder={t('step3.confirmPassword.placeholder')} field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
