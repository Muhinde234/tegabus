"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getGreeting } from "@/utils/getGreeting";
import avatar from "@/public/images/avatar.png";
import { Bell, Shield, UserCog, Building, Ticket, Bus, Route, Clock, CreditCard } from "lucide-react";
import Image from "next/image";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold text-gray-800">
        {greeting}, welcome back!
      </h1>
    </div>
  );
};

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const tabs = [
    { name: "Profile", icon: <UserCog size={20} className="mr-2 text-white" /> },
    { name: "Preferences", icon: <Clock size={18} className="mr-2 text-white" /> },
    { name: "Company", icon: <Building size={18} className="mr-2 text-white" /> },
    { name: "Pricing", icon: <CreditCard size={18} className="mr-2 text-white" /> },
    { name: "Security", icon: <Shield size={18} className="mr-2 text-white" /> },
    { name: "Bus Management", icon: <Bus size={18} className="mr-2 text-white" /> },
    { name: "Route Management", icon: <Route size={18} className="mr-2 text-white" /> },
    { name: "Ticket Settings", icon: <Ticket size={18} className="mr-2 text-white" /> },
  ];
  

  const [activeTab, setActiveTab] = useState(
    tabs.find(tab => tab.name.toLowerCase() === tabFromUrl)?.name || "Profile"
  );

  const [name, setName] = useState("Dosta Admin");
  const [email, setEmail] = useState("admin@tegabus.com");
  const [phone, setPhone] = useState("+250788000000");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Africa/Kigali");
  const [notifications, setNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [companyName, setCompanyName] = useState("TegaBus");
  const [companyAddress, setCompanyAddress] = useState("");
  const [supportContact, setSupportContact] = useState("+250788000000");
  const [farePerKm, setFarePerKm] = useState("25");
  const [currency, setCurrency] = useState("RWF");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [busCapacity, setBusCapacity] = useState("40");
  const [seatColumns, setSeatColumns] = useState("4");
  const [routeStart, setRouteStart] = useState("");
  const [routeEnd, setRouteEnd] = useState("");
  const [intermediateStops, setIntermediateStops] = useState("");
  const [ticketFormat, setTicketFormat] = useState("QR Code");
  const [enableUSSD, setEnableUSSD] = useState(true);

  const languages = ["English", "French", "Kinyarwanda"];
  const timezones = ["Africa/Kigali", "Africa/Nairobi", "Africa/Johannesburg"];
  const currencies = ["RWF", "USD", "EUR"];
  const seatConfigs = ["4", "5", "6"];
  const ticketFormats = ["QR Code", "Numeric Code", "Both"];

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

const handleTabChange = (tabName: string): void => {
  setActiveTab(tabName);
  
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tabName.toLowerCase());
  window.history.pushState({}, '', url);
};
  return (
    <div className="px-6 mt-8 max-h-screen bg-gray-50   overflow-y-auto ">
      
      <div className="">
       
        <div className="flex justify-between items-center mb-6">
          <Greeting />
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors ">
              <Bell size={20} className="text-gray-600" />
              <span className="sr-only">Notifications</span>
            </button>

            <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-50 rounded-full pl-2 pr-4 py-1 transition-colors cursor-pointer ">
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
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3B2E] mb-2">Settings Dashboard</h1>
          <p className="text-gray-600">Configure all system settings for TegaBus operations</p>
        </div>


        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`py-3 px-6 text-sm font-medium rounded-t-lg transition-all flex items-center whitespace-nowrap cursor-pointer ${
                  activeTab === tab.name
                    ? "text-white bg-gradient-to-r from-[#0B3B2E] to-emerald-700 shadow-md"
                    : "text-gray-600 hover:text-[#0B3B2E] hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange(tab.name)}
              >
                <span className={`mr-2 p-1.5 rounded-full ${activeTab === tab.name ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className=" max-w-xl mx-auto  bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        
          {activeTab === "Profile" && (
          
            <div className="space-y-10 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Admin name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Admin email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Support contact"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

     
          {activeTab === "Preferences" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang} className="hover:bg-gray-100">{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz} className="hover:bg-gray-100">{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className="h-5 w-5 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                    />
                    <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                      Enable Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="smsAlerts"
                      checked={smsAlerts}
                      onChange={() => setSmsAlerts(!smsAlerts)}
                      className="h-5 w-5 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                    />
                    <label htmlFor="smsAlerts" className="text-sm font-medium text-gray-700">
                      Enable SMS Alerts (Twilio Integration)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

       
          {activeTab === "Company" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="TegaBus"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Contact</label>
                  <Input
                    value={supportContact}
                    onChange={(e) => setSupportContact(e.target.value)}
                    placeholder="+250788000000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                <textarea
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="Enter company address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3B2E] focus:border-[#0B3B2E] min-h-[100px]"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Logo</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Logo</span>
                  </div>
                  <div>
                    <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
                      Upload New Logo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 256x256px</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        
          {activeTab === "Pricing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fare Per KM</label>
                  <div className="flex gap-2">
                    <Select value={currency} onValueChange={setCurrency} >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((curr) => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={farePerKm}
                      onChange={(e) => setFarePerKm(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Adjustment (%)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Positive for increase, negative for decrease</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication</h3>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    checked={twoFactorAuth}
                    onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                    className="h-5 w-5 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                  />
                  <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-700">
                    Enable Two-Factor Authentication (OTP)
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-8">Extra security layer using Twilio SMS verification</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Session Management</h3>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                    Logout All Devices
                  </Button>
                  <p className="text-sm text-gray-500">Force logout from all active sessions</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
                    View Recent Activity
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Bus Management" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bus Capacity</label>
                  <Input
                    type="number"
                    value={busCapacity}
                    onChange={(e) => setBusCapacity(e.target.value)}
                    placeholder="40"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seat Columns</label>
                  <Select value={seatColumns} onValueChange={setSeatColumns}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select columns" />
                    </SelectTrigger>
                    <SelectContent>
                      {seatConfigs.map((col) => (
                        <SelectItem key={col} value={col}>{col} columns (A-{String.fromCharCode(64 + parseInt(col))})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Bus Layout</label>
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                        {Math.floor(i/4)+1}{String.fromCharCode(65 + (i%4))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Route Management" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route Start Point</label>
                  <Input
                    value={routeStart}
                    onChange={(e) => setRouteStart(e.target.value)}
                    placeholder="Kigali"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route End Point</label>
                  <Input
                    value={routeEnd}
                    onChange={(e) => setRouteEnd(e.target.value)}
                    placeholder="Huye"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intermediate Stops</label>
                <textarea
                  value={intermediateStops}
                  onChange={(e) => setIntermediateStops(e.target.value)}
                  placeholder="Enter stops separated by commas"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === "Ticket Settings" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Format</label>
                  <Select value={ticketFormat} onValueChange={setTicketFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketFormats.map((format) => (
                        <SelectItem key={format} value={format}>{format}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="enableUSSD"
                    checked={enableUSSD}
                    onChange={() => setEnableUSSD(!enableUSSD)}
                    className="h-5 w-5 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                  />
                  <label htmlFor="enableUSSD" className="text-sm font-medium text-gray-700">
                    Enable USSD Booking
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Confirmation Message</label>
                <textarea
                  defaultValue="Your booking with TegaBus is confirmed. Reference: {CODE}. Departure: {TIME} from {LOCATION}."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  rows={3}
                />
            
              </div>
            </div>
          )}
        </div>

      
        <div className="flex justify-end gap-4">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-100 px-6 py-3">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#0B3B2E] to-emerald-700 text-white hover:from-[#0B3B2E]/90 hover:to-emerald-700/90 px-6 py-3 shadow-md transition"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}