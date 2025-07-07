"use client";

import { useTranslations } from 'next-intl';
import { MailOpen, MapPin, Phone } from "lucide-react";
import Container from "./container";
import { Button } from "../ui/button";
import { Input } from "./inputField";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const t = useTranslations('contact');

  return (
    <div id="#contact">
      <div className="text-center mt-8 mb-16 sm:mt-20 md:mt-24">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{t('title')}</h1>
      </div>

      <Container className="flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Contact Form */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2 items-center text-center lg:items-start lg:text-left">
          <h1 className="text-lime-400 font-bold">{t('contact_us')}</h1>
          <h1 className="text-2xl">{t('subtitle')}</h1>

          <form className="flex flex-col gap-4 mt-4 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder={t('placeholders.name')}
                className="border border-lime-400 rounded-md p-2 w-full"
              />
              <Input
                type="text"
                placeholder={t('placeholders.phone')}
                className="border border-lime-400 rounded-md p-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder={t('placeholders.email')}
                className="border border-lime-400 rounded-md p-2 w-full"
              />
              <Input
                type="text"
                placeholder={t('placeholders.subject')}
                className="border border-lime-400 rounded-md p-2 w-full"
              />
            </div>

            <Textarea
              placeholder={t('placeholders.message')}
              className="border border-lime-400 rounded-md p-2 min-h-[120px] w-full"
            />

            <Button variant="ghost" className="bg-lime-400">
              {t('send_message')}
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-lg max-w-md">{t('description')}</p>

          <div className="flex flex-col gap-8 mt-8 w-full max-w-md space-y-6">
            <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
              <Phone size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-700 font-medium">{t('call_us')}</h1>
                <p>(+250) 780 396 766</p>
              </div>
            </div>

            <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
              <MailOpen size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-700 font-medium">{t('email_us')}</h1>
                <p>support@Tegabus.com</p>
              </div>
            </div>

            <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
              <MapPin size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-700 font-medium">{t('location')}</h1>
                <p>{t('address')}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
