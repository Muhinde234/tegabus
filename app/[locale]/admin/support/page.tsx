"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Greeting } from "@/components/greeting";
import { SupportContactCard } from "@/components/support-contact-card";
import { FAQItem } from "@/components/faq-item";
import { ResourceCard } from "@/components/resource-card";
import { SystemToolButton } from "@/components/system-tool-button";
import { TabNavigation } from "@/components/tab-navigation";
import { FAQCategoryFilter } from "@/components/faq-category-filter";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Bell, LifeBuoy, Mail, MessageSquare, Phone, FileText, Shield, Database, Users, CreditCard, Bus, HelpCircle } from "lucide-react";
import Image from "next/image";
import avatar from "@/public/images/avatar.png";

export default function AdminHelpSupportPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [helpTopic, setHelpTopic] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [isUrgent, setIsUrgent] = useState(false);
  const [hasScreenshots, setHasScreenshots] = useState(false);

  const t = useTranslations("support");
  const nav = useTranslations("navigation");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("contact.ticketSubmittedMessage"));
    setHelpTopic("");
    setHelpMessage("");
    setIsUrgent(false);
    setHasScreenshots(false);
  };

  const faqCategories = [
    { id: "all", name: t("faq.categories.all"), icon: <FileText size={16} /> },
    { id: "system", name: t("faq.categories.system"), icon: <Database size={16} /> },
    { id: "users", name: t("faq.categories.users"), icon: <Users size={16} /> },
    { id: "payments", name: t("faq.categories.payments"), icon: <CreditCard size={16} /> },
    { id: "fleet", name: t("faq.categories.fleet"), icon: <Bus size={16} /> },
    { id: "security", name: t("faq.categories.security"), icon: <Shield size={16} /> },
  ];

  const adminFaqs = [
    {
      question: t("faq.questions.systemSetup"),
      answer: t("faq.questions.systemSetupAnswer"),
      category: "system"
    },
    {
      question: t("faq.questions.addUsers"),
      answer: t("faq.questions.addUsersAnswer"),
      category: "users"
    },

  ];

  const adminResources = [
    {
      name: t("resources.adminSystemManual"),
      description: t("resources.completeGuide"),
      icon: <FileText size={20} />,
      url: "#"
    },

  ];

  const filteredFaqs = activeFaqCategory === "all"
    ? adminFaqs
    : adminFaqs.filter(faq => faq.category === activeFaqCategory);

  return (
    <div>
      <div >
        <div className="flex justify-between items-start mb-6">
          <div>
            <Greeting />
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#0B3B2E] flex items-center">
                <LifeBuoy className="mr-3" size={28} />
                <span className="bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </h1>
              <span className="hidden md:inline-block px-3 py-1 bg-[#0B3B2E]/10 text-[#0B3B2E] text-sm font-medium rounded-full">
                {t("subtitle")}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{t("description")}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10 hidden md:flex">
              <Phone size={16} className="mr-2" /> {t("emergencySupport")}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-white">
                <Bell size={20} className="text-gray-600 " />
              </Button>

              <Button variant="ghost" className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1 bg-gray-200 hover:bg-gray-50">
                <Image
                  src={avatar}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Dositha
                </span>
              </Button>
            </div>
          </div>
        </div>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="p-6 bg-white rounded-lg shadow-sm">
          {activeTab === "contact" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SupportContactCard
                  icon={<Mail className="text-[#0B3B2E]" size={20} />}
                  title={t("contact.technicalSupport")}
                  contact="support@tegabus.com"
                  description={t("contact.priorityResponse")}
                  buttonText={t("contact.emailSupport")}
                  buttonIcon={<Mail size={16} className="mr-2" />}
                />
                <SupportContactCard
                  icon={<Phone className="text-[#0B3B2E]" size={20} />}
                  title={t("contact.adminHotline")}
                  contact="+250 788 555 123"
                  description={t("contact.availableHours")}
                  buttonText={t("contact.callNow")}
                  buttonIcon={<Phone size={16} className="mr-2" />}
                />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                    <MessageSquare className="text-[#0B3B2E]" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{t("contact.submitTechnicalTicket")}</h3>
                </div>
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">{t("contact.issueType")}</Label>
                    <Select
                      value={helpTopic}
                      onValueChange={setHelpTopic}
                      required
                    >
                      <SelectTrigger >
                        <SelectValue placeholder={t("contact.placeholders.selectIssueType")} />
                      </SelectTrigger>
                      <SelectContent className="border border-gray-300">
                        <SelectItem value="system">{t("contact.issueTypes.system")}</SelectItem>
                        <SelectItem value="payments">{t("contact.issueTypes.payments")}</SelectItem>
                        <SelectItem value="users">{t("contact.issueTypes.users")}</SelectItem>
                        <SelectItem value="reports">{t("contact.issueTypes.reports")}</SelectItem>
                        <SelectItem value="other">{t("contact.issueTypes.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 max-w-3xl ">
                    <Label htmlFor="description">{t("contact.detailedDescription")}</Label>
                    <Textarea
                      id="description"
                      value={helpMessage}
                      onChange={(e) => setHelpMessage(e.target.value)}
                      rows={6}
                      placeholder={t("contact.placeholders.descriptionPlaceholder")}
                      required
                    />
                  </div>

                  <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={isUrgent}
                        onCheckedChange={(checked) => setIsUrgent(!!checked)}
                      />
                      <Label htmlFor="urgent">{t("contact.criticalSystemIssue")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="screenshots"
                        checked={hasScreenshots}
                        onCheckedChange={(checked) => setHasScreenshots(!!checked)}
                      />
                      <Label htmlFor="screenshots">{t("contact.attachedScreenshots")}</Label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline">
                      {t("contact.cancel")}
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] text-white hover:from-[#0B3B2E]/90 hover:to-[#1A936F]/90">
                      {t("contact.submitTechnicalTicketButton")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6">
              <FAQCategoryFilter
                categories={faqCategories}
                activeCategory={activeFaqCategory}
                onCategoryChange={setActiveFaqCategory}
              />

              <div className="space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isExpanded={faqExpanded === index}
                      onToggle={() => setFaqExpanded(faqExpanded === index ? null : index)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    <HelpCircle size={32} className="mx-auto mb-3 text-gray-400" />
                    <p>{t("faq.noQuestionsFound")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">{t("resources.title")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adminResources.map((resource, index) => (
                    <ResourceCard
                      key={index}
                      icon={resource.icon}
                      title={resource.name}
                      description={resource.description}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                    <Database className="text-[#0B3B2E]" size={20} />
                  </div>
                  <h4 className="font-medium text-gray-800">{t("resources.systemTools")}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SystemToolButton
                    icon={<Database size={24} className="text-[#0B3B2E]" />}
                    label={t("resources.databaseBackup")}
                  />
                  <SystemToolButton
                    icon={<Shield size={24} className="text-[#0B3B2E]" />}
                    label={t("resources.securityAudit")}
                  />
                  <SystemToolButton
                    icon={<FileText size={24} className="text-[#0B3B2E]" />}
                    label={t("resources.generateSystemReport")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}