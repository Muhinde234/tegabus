'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollText, Percent } from 'lucide-react';
import type { OnboardingFormData } from '../schema';

export function Step5Agreement() {
  const form = useFormContext<OnboardingFormData>();
  const t = useTranslations('onboarding');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step5.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step5.description')}</p>
      </div>

      {/* Terms card */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <ScrollText size={18} className="text-[#0B3B2E]" />
          <span className="font-semibold text-sm text-gray-800">{t('step5.terms.title')}</span>
        </div>
        <div className="p-4 text-sm text-gray-600 space-y-2 max-h-36 overflow-y-auto">
          <p>{t('step5.terms.content1')}</p>
          <p>{t('step5.terms.content2')}</p>
          <p>{t('step5.terms.content3')}</p>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 data-[state=checked]:bg-[#0B3B2E] data-[state=checked]:border-[#0B3B2E]"
                  />
                </FormControl>
                <div className="leading-snug">
                  <label
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => field.onChange(!field.value)}
                  >
                    {t('step5.terms.checkboxLabel')}
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Commission card */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <Percent size={18} className="text-[#0B3B2E]" />
          <span className="font-semibold text-sm text-gray-800">{t('step5.commission.title')}</span>
        </div>
        <div className="p-4 text-sm text-gray-600 space-y-2">
          <p>{t('step5.commission.description')}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li><strong className="text-gray-700">{t('step5.commission.tier1')}</strong></li>
            <li><strong className="text-gray-700">{t('step5.commission.tier2')}</strong></li>
            <li><strong className="text-gray-700">{t('step5.commission.tier3')}</strong></li>
          </ul>
          <p>{t('step5.commission.payoutInfo')}</p>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <FormField
            control={form.control}
            name="acceptCommission"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 data-[state=checked]:bg-[#0B3B2E] data-[state=checked]:border-[#0B3B2E]"
                  />
                </FormControl>
                <div className="leading-snug">
                  <label
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => field.onChange(!field.value)}
                  >
                    {t('step5.commission.checkboxLabel')}
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
