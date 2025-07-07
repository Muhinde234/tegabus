"use client";
import { useState } from "react";
import { Book, Shield, CreditCard, X, User, Info, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import TermsSidebar from "@/components/termsSidebar";
import { useTranslations } from "next-intl";

const Conditions = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const t = useTranslations("termsPage");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:hidden p-4 border-b">
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu size={16} />
            <span>{t("quickNavigation")}</span>
          </Button>
        </div>

        <TermsSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 mb-8">
            <h1 className="text-4xl font-bold text-center mb-6">
              {t("title")}
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            <div className="max-w-3xl mx-auto">
              <section id="general" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Book size={24} />
                  <span className="text-gray-800">{t("sections.general.title")}</span>
                </h2>
                <div className="text-gray-500">
                  <p className="mb-4">
                    {t("sections.general.welcome")}
                  </p>
                  <p className="mb-4">
                    {t("sections.general.binding")}
                  </p>
                  <p>
                    {t("sections.general.modifications")}
                  </p>
                </div>
              </section>

              <section id="booking" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Shield size={24} />
                  <span className="text-gray-800">{t("sections.booking.title")}</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.booking.process.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.booking.process.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.booking.confirmation.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.booking.confirmation.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.booking.seatAllocation.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.booking.seatAllocation.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.booking.ageRequirements.title")}
                  </h3>
                  <p>
                    {t("sections.booking.ageRequirements.content")}
                  </p>
                </div>
              </section>

              <section id="payments" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <CreditCard size={24} />
                  <span className="text-gray-800">{t("sections.payments.title")}</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.payments.methods.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.payments.methods.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">{t("sections.payments.currency.title")}</h3>
                  <p className="mb-4">
                    {t("sections.payments.currency.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.payments.priceChanges.title")}
                  </h3>
                  <p>
                    {t("sections.payments.priceChanges.content")}
                  </p>
                </div>
              </section>

              <section id="cancellations" className="mb-12">
                <h2 className="text-2xl font-semibold  mb-3 flex items-center gap-2">
                  <X size={24} />
                  <span className="text-gray-800">
                    {t("sections.cancellations.title")}
                  </span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.cancellations.policy.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.cancellations.policy.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.cancellations.refundProcess.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.cancellations.refundProcess.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.cancellations.noShow.title")}
                  </h3>
                  <p>
                    {t("sections.cancellations.noShow.content")}
                  </p>
                </div>
              </section>

              <section id="user" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <User size={24} />
                  <span className="text-gray-800">
                    {t("sections.userResponsibilities.title")}
                  </span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.userResponsibilities.accountSecurity.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.userResponsibilities.accountSecurity.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.userResponsibilities.accurateInfo.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.userResponsibilities.accurateInfo.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.userResponsibilities.prohibited.title")}
                  </h3>
                  <p>
                    {t("sections.userResponsibilities.prohibited.content")}
                  </p>
                </div>
              </section>

              <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Shield size={24} />
                  <span className="text-gray-800">{t("sections.privacy.title")}</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.privacy.dataCollection.title")}
                  </h3>
                  <p className="mb-4">
                    {t("sections.privacy.dataCollection.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">{t("sections.privacy.dataUsage.title")}</h3>
                  <p className="mb-4">
                    {t("sections.privacy.dataUsage.content")}
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    {t("sections.privacy.dataSecurity.title")}
                  </h3>
                  <p>
                    {t("sections.privacy.dataSecurity.content")}
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Info size={24} />
                  <span className="text-gray-800">{t("sections.contact.title")}</span>
                </h2>
                <div className="text-gray-500">
                  <p className="mb-4">
                    {t("sections.contact.description")}
                  </p>

                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <p className="mb-2">
                      <strong>{t("sections.contact.customerSupport")}:</strong> {t("sections.contact.email")}
                    </p>
                    <p className="mb-2">
                      <strong>{t("sections.contact.phone")}:</strong> {t("sections.contact.phoneNumber")}
                    </p>
                    <p className="mb-2">
                      <strong>{t("sections.contact.hours")}:</strong> {t("sections.contact.operatingHours")}
                    </p>
                    <p>
                      <strong>{t("sections.contact.address")}:</strong> {t("sections.contact.location")}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Conditions;
