'use client';

import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/inputField';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Route } from 'lucide-react';
import type { OnboardingFormData } from '../schema';

const TRANSPORT_TYPE_KEYS = [
  'intercity',
  'intracity',
  'minibus',
  'express',
  'shuttle',
  'mixed',
] as const;

export function Step2Business() {
  const form = useFormContext<OnboardingFormData>();
  const t = useTranslations('onboarding');
  const routes = (form.watch('routes') ?? ['']) as string[];
  const routeErrors = form.formState.errors.routes;

  const addRoute = () => {
    form.setValue('routes', [...routes, ''], { shouldValidate: false });
  };

  const removeRoute = (index: number) => {
    if (routes.length <= 1) return;
    form.setValue('routes', routes.filter((_, i) => i !== index), { shouldValidate: true });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t('step2.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('step2.description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step2.transportType.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-9">
                    <SelectValue placeholder={t('step2.transportType.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSPORT_TYPE_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`step2.types.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfBuses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step2.numberOfBuses.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" min={1} placeholder={t('step2.numberOfBuses.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfOperation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('step2.yearsOfOperation.label')} <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder={t('step2.yearsOfOperation.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Dynamic Routes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <FormLabel className="text-sm font-medium text-gray-700">
              {t('step2.routes.label')} <span className="text-red-500">*</span>
            </FormLabel>
            <p className="text-xs text-gray-400 mt-0.5">{t('step2.routes.description')}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRoute}
            className="gap-1.5 border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E] hover:text-white transition-colors"
          >
            <Plus size={14} />
            {t('step2.routes.addButton')}
          </Button>
        </div>

        <div className="space-y-2">
          {routes.map((_, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Route size={15} className="text-gray-400 shrink-0 mt-2" />
                  <input
                    {...form.register(`routes.${index}` as FieldPath<OnboardingFormData>)}
                    placeholder={t('step2.routes.placeholder', { index: index + 1 })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring placeholder:text-muted-foreground"
                  />
                </div>
                {(routeErrors as any)?.[index]?.message && (
                  <p className="text-destructive text-sm mt-1 ml-5">
                    {(routeErrors as any)[index].message}
                  </p>
                )}
              </div>
              {routes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRoute(index)}
                  className="mt-1.5 p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Remove route"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
        </div>

        {typeof routeErrors?.message === 'string' && (
          <p className="text-destructive text-sm mt-1">{routeErrors.message}</p>
        )}
      </div>
    </div>
  );
}
