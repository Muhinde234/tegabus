import { getTranslations } from 'next-intl/server';
import { CompanyForm } from '@/components/onboarding/CompanyForm';
import { Bus, ShieldCheck, TrendingUp } from 'lucide-react';

export async function generateMetadata() {
  const t = await getTranslations('onboarding');
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function OnboardingPage() {
  const t = await getTranslations('onboarding');

  const benefits = [
    { icon: TrendingUp, title: t('page.benefits.reach.title'), text: t('page.benefits.reach.text') },
    { icon: Bus, title: t('page.benefits.fleet.title'), text: t('page.benefits.fleet.text') },
    { icon: ShieldCheck, title: t('page.benefits.payouts.title'), text: t('page.benefits.payouts.text') },
  ];

  return (
    <div className="min-h-[calc(100vh-160px)] bg-gray-50 ">
   
      <div className="bg-[#0B3B2E] text-white py-12 px-4 ">
        <div className="max-w-3xl mx-auto text-center mt-18">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-lg font-medium mb-4 border border-white/20">
            {t('page.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t('page.title')}</h1>
          <p className="text-green-100 text-sm sm:text-lg max-w-xl mx-auto">
            {t('page.description')}
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-3 bg-white/8 border border-white/10 rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-lg">{title}</p>
                  <p className="text-sm text-green-200 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <CompanyForm />
        </div>
      </div>
    </div>
  );
}
