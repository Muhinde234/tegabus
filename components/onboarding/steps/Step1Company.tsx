'use client';

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
import type { OnboardingFormData } from '../schema';

export function Step1Company() {
  const form = useFormContext<OnboardingFormData>();
  const t = useTranslations('onboarding');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step1.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step1.description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step1.companyName.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder={t('step1.companyName.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step1.registrationNumber.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder={t('step1.registrationNumber.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step1.companyEmail.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('step1.companyEmail.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step1.phone.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="tel" placeholder={t('step1.phone.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t('step1.address.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder={t('step1.address.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
