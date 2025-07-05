"use client";

import { useState } from "react";
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
import { Bell, LifeBuoy, Mail, MessageSquare, Phone, FileText, ChevronDown, Shield, Database, Users, CreditCard, Bus, HelpCircle, Download } from "lucide-react";
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

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Support ticket submitted. Our team will respond within 2 business hours.");
    setHelpTopic("");
    setHelpMessage("");
    setIsUrgent(false);
    setHasScreenshots(false);
  };

  const faqCategories = [
    { id: "all", name: "All Questions", icon: <FileText size={16} /> },
    { id: "system", name: "System Setup", icon: <Database size={16} /> },
    { id: "users", name: "User Management", icon: <Users size={16} /> },
    { id: "payments", name: "Payments", icon: <CreditCard size={16} /> },
    { id: "fleet", name: "Fleet Management", icon: <Bus size={16} /> },
    { id: "security", name: "Security", icon: <Shield size={16} /> },
  ];

  const adminFaqs = [
    {
      question: "How do I set up the system for the first time?",
      answer: "Navigate to System Settings > Initial Setup. Follow the step-by-step wizard to configure your company details, routes, and payment integration.",
      category: "system"
    },
    {
      question: "How to add new admin users with different access levels?",
      answer: "Go to User Management > Add User. Assign roles (Admin, Manager, Cashier) with appropriate permissions. Managers can manage bookings but not system settings.",
      category: "users"
    },
    
  ];

  const adminResources = [
    { 
      name: "Admin System Manual", 
      description: "Complete guide to all admin features and settings",
      icon: <FileText size={20} />,
      url: "#"
    },
    
  ];

  const filteredFaqs = activeFaqCategory === "all" 
    ? adminFaqs 
    : adminFaqs.filter(faq => faq.category === activeFaqCategory);

  return (
    <div className="min-h-screen bg-gray-50 px-6 mt-8">
      <div >
        <div className="flex justify-between items-start mb-6">
          <div>
            <Greeting />
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#0B3B2E] flex items-center">
                <LifeBuoy className="mr-3" size={28} />
                <span className="bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] bg-clip-text text-transparent">
                  Admin Support Center
                </span>
              </h1>
              <span className="hidden md:inline-block px-3 py-1 bg-[#0B3B2E]/10 text-[#0B3B2E] text-sm font-medium rounded-full">
                Technical Assistance
              </span>
            </div>
            <p className="text-gray-600 mt-2">Get help with system administration, troubleshooting, and technical support</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10 hidden md:flex">
              <Phone size={16} className="mr-2" /> Emergency Support
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost"  size="icon" className="rounded-full bg-gray-200 hover:bg-white">
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
                  title="Technical Support"
                  contact="support@tegabus.com"
                  description="Priority response for system issues"
                  buttonText="Email Support"
                  buttonIcon={<Mail size={16} className="mr-2" />}
                />
                <SupportContactCard
                  icon={<Phone className="text-[#0B3B2E]" size={20} />}
                  title="Admin Hotline"
                  contact="+250 788 555 123"
                  description="Available 7AM-7PM (GMT+2)"
                  buttonText="Call Now"
                  buttonIcon={<Phone size={16} className="mr-2" />}
                />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                    <MessageSquare className="text-[#0B3B2E]" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Submit Technical Ticket</h3>
                </div>
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue Type</Label>
                    <Select 
                      value={helpTopic}
                      onValueChange={setHelpTopic}
                      required
                    >
                      <SelectTrigger >
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent className="border border-gray-300">
                        <SelectItem value="system">System Configuration</SelectItem>
                        <SelectItem value="payments">Payment Integration</SelectItem>
                        <SelectItem value="users">User Management</SelectItem>
                        <SelectItem value="reports">Reporting Issues</SelectItem>
                        <SelectItem value="other">Other Technical Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 max-w-3xl ">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={helpMessage}
                      onChange={(e) => setHelpMessage(e.target.value)}
                      rows={6}
                      placeholder="Include: 1) Steps to reproduce 2) Expected vs actual behavior 3) Screenshots if applicable"
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
                      <Label htmlFor="urgent">Critical System Issue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="screenshots" 
                        checked={hasScreenshots}
                        onCheckedChange={(checked) => setHasScreenshots(!!checked)}
                      />
                      <Label htmlFor="screenshots">Attached screenshots</Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] text-white hover:from-[#0B3B2E]/90 hover:to-[#1A936F]/90">
                      Submit Technical Ticket
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
                    <p>No questions found in this category</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Administrator Resources</h3>
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
                  <h4 className="font-medium text-gray-800">System Tools</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SystemToolButton 
                    icon={<Database size={24} className="text-[#0B3B2E]" />} 
                    label="Database Backup" 
                  />
                  <SystemToolButton 
                    icon={<Shield size={24} className="text-[#0B3B2E]" />} 
                    label="Security Audit" 
                  />
                  <SystemToolButton 
                    icon={<FileText size={24} className="text-[#0B3B2E]" />} 
                    label="Generate System Report" 
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