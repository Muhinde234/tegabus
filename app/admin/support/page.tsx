"use client";

import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/utils/getGreeting";
import avatar from "@/public/images/avatar.png";
import { Bell, LifeBuoy, Mail, MessageSquare, Phone, FileText, ChevronDown, Shield, Database, Users, CreditCard, Bus, HelpCircle, Download } from "lucide-react";
import Image from "next/image";

export default function AdminHelpSupportPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [helpTopic, setHelpTopic] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Support ticket submitted. Our team will respond within 2 business hours.");
    setHelpTopic("");
    setHelpMessage("");
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
    {
      question: "How to integrate IremboPay with the system?",
      answer: "In Payment Settings, enter your IremboPay merchant ID and API keys. Test with small transactions before enabling live payments.",
      category: "payments"
    },
    {
      question: "How to add a new bus to our fleet?",
      answer: "In Fleet Management, click 'Add Bus'. Specify capacity, seat layout (e.g., 40 seats, 4 columns A-D), and assign a unique identifier.",
      category: "fleet"
    },
    {
      question: "How to enable two-factor authentication for admin accounts?",
      answer: "Under Security Settings, toggle 'Enable 2FA'. Admins will need to set up OTP via SMS or authenticator app on next login.",
      category: "security"
    },
    {
      question: "How to generate monthly revenue reports?",
      answer: "In Reports Dashboard, select date range and click 'Generate Report'. Export as PDF or Excel for further analysis.",
      category: "system"
    },
    {
      question: "How to handle double booking issues?",
      answer: "The system uses optimistic locking to prevent this. If it occurs, check Audit Logs to identify the conflict and contact technical support if needed.",
      category: "system"
    }
  ];

  const adminResources = [
    { 
      name: "Admin System Manual", 
      description: "Complete guide to all admin features and settings",
      icon: <FileText size={20} />,
      url: "#"
    },
    { 
      name: "API Integration Guide", 
      description: "Technical documentation for system integrations",
      icon: <Database size={20} />,
      url: "#"
    },
    { 
      name: "Security Best Practices", 
      description: "How to secure your admin portal and user data",
      icon: <Shield size={20} />,
      url: "#"
    },
    { 
      name: "Reporting Handbook", 
      description: "Guide to generating and interpreting system reports",
      icon: <FileText size={20} />,
      url: "#"
    }
  ];

  const Greeting = () => {
    const [greeting, setGreeting] = useState("");
  
    useEffect(() => {
      setGreeting(getGreeting());
    }, []);
  
    return (
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        {greeting}, welcome back!
      </h1>
    );
  };

  const filteredFaqs = activeFaqCategory === "all" 
    ? adminFaqs 
    : adminFaqs.filter(faq => faq.category === activeFaqCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        
        <div className="flex justify-between items-start mb-8">
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
              <button className="p-2 rounded-full bg-gray-200  hover:bg-gray-100 transition-colors relative">
                <Bell size={20} className="text-gray-600" />
              
              </button>

              <div className="flex items-center gap-2 bg-gray-200  hover:bg-gray-50 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
                <Image
                  src={avatar}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  alt="User avatar"
                />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Dositha
                </span>
             
              </div>
            </div>
          </div>
        </div>
          <div className="flex border-b border-gray-200">
            {["contact", "faq", "resources"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-6 text-sm font-medium transition-all flex items-center relative ${
                  activeTab === tab
                    ? "text-[#0B3B2E]"
                    : "text-gray-600 hover:text-[#0B3B2E] hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "contact" && <Mail size={16} className="mr-2" />}
                {tab === "faq" && <HelpCircle size={16} className="mr-2" />}
                {tab === "resources" && <FileText size={16} className="mr-2" />}
                {tab === "contact" ? "Contact Support" : tab === "faq" ? "Admin FAQs" : "Resources"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0B3B2E]"></span>
                )}
              </button>
            ))}
          </div>

       
          <div className="p-6">
           
            {activeTab === "contact" && (
              <div className="space-y-8">
                <div className="max-w-7xl max-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#0B3B2E]/5 to-[#1A936F]/5 p-6 rounded-lg border border-[#0B3B2E]/10">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                        <Mail className="text-[#0B3B2E]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0B3B2E]">Technical Support</h3>
                        <p className="text-sm text-gray-600">support@tegabus.com</p>
                        <p className="text-xs text-gray-500 mt-1">Priority response for system issues</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10 w-full">
                      <Mail size={16} className="mr-2" /> Email Support
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-[#0B3B2E]/5 to-[#1A936F]/5 p-6 rounded-lg border border-[#0B3B2E]/10">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                        <Phone className="text-[#0B3B2E]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0B3B2E]">Admin Hotline</h3>
                        <p className="text-sm text-gray-600">+250 788 555 123</p>
                        <p className="text-xs text-gray-500 mt-1">Available 7AM-7PM (GMT+2)</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10 w-full">
                      <Phone size={16} className="mr-2" /> Call Now
                    </Button>
                  </div>
                </div>

                <div className="max-w-7xl max-auto pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
                      <MessageSquare className="text-[#0B3B2E]" size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Submit Technical Ticket</h3>
                  </div>
                  <form onSubmit={handleSupportSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E] focus:border-transparent"
                        value={helpTopic}
                        onChange={(e) => setHelpTopic(e.target.value)}
                      >
                        <option value="">Select issue type</option>
                        <option value="system">System Configuration</option>
                        <option value="payments">Payment Integration</option>
                        <option value="users">User Management</option>
                        <option value="reports">Reporting Issues</option>
                        <option value="other">Other Technical Issue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                      <textarea
                        value={helpMessage}
                        onChange={(e) => setHelpMessage(e.target.value)}
                        rows={6}
                        placeholder="Include: 1) Steps to reproduce 2) Expected vs actual behavior 3) Screenshots if applicable"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E] focus:border-transparent"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="urgent"
                          className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                        />
                        <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                          Critical System Issue
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="screenshots"
                          className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                        />
                        <label htmlFor="screenshots" className="text-sm font-medium text-gray-700">
                          Attached screenshots
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" className="border-gray-300 hover:bg-gray-50">
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
                <div className="flex flex-wrap gap-3 mb-6">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg border transition-all ${
                        activeFaqCategory === category.id
                          ? "bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] text-white border-transparent shadow-sm"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-[#0B3B2E]/30"
                      }`}
                      onClick={() => setActiveFaqCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#0B3B2E]/50 transition-colors">
                        <button
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
                          onClick={() => setFaqExpanded(faqExpanded === index ? null : index)}
                        >
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <ChevronDown 
                            size={20} 
                            className={`text-gray-500 transition-transform ${faqExpanded === index ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        {faqExpanded === index && (
                          <div className="p-4 pt-0 text-gray-600 bg-gray-50 border-t border-gray-200">
                            <p className="mb-3">{faq.answer}</p>
                            <Button variant="outline" size="sm" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
                              Related Documentation
                            </Button>
                          </div>
                        )}
                      </div>
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

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Administrator Resources</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminResources.map((resource, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow hover:border-[#0B3B2E]/50 group">
                        <div className="flex items-start">
                          <div className="bg-[#0B3B2E]/10 p-3 rounded-full mr-4 group-hover:bg-[#0B3B2E]/20 transition-colors">
                            {resource.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{resource.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
                                View Online
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                                <Download size={16} className="mr-2" /> Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                    <Button variant="outline" className="border-gray-300 h-24 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#0B3B2E]/30">
                      <div className="bg-[#0B3B2E]/10 p-3 rounded-full mb-2">
                        <Database size={24} className="text-[#0B3B2E]" />
                      </div>
                      <span>Database Backup</span>
                    </Button>
                    <Button variant="outline" className="border-gray-300 h-24 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#0B3B2E]/30">
                      <div className="bg-[#0B3B2E]/10 p-3 rounded-full mb-2">
                        <Shield size={24} className="text-[#0B3B2E]" />
                      </div>
                      <span>Security Audit</span>
                    </Button>
                    <Button variant="outline" className="border-gray-300 h-24 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#0B3B2E]/30">
                      <div className="bg-[#0B3B2E]/10 p-3 rounded-full mb-2">
                        <FileText size={24} className="text-[#0B3B2E]" />
                      </div>
                      <span>Generate System Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
  );
}