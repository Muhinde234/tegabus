"use client";

import { useState, useEffect } from "react";
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
    <h1 className="text-xl font-semibold text-gray-800 mb-4">
      {greeting}, welcome back!
    </h1>
  );
};

export default function SettingsPage() {
  const tabs = [
    { name: "Profile", icon: <UserCog size={18} className="mr-2" /> },
    { name: "Preferences", icon: <Clock size={18} className="mr-2" /> },
    { name: "Company", icon: <Building size={18} className="mr-2" /> },
    { name: "Pricing", icon: <CreditCard size={18} className="mr-2" /> },
    { name: "Security", icon: <Shield size={18} className="mr-2" /> },
    { name: "Bus Management", icon: <Bus size={18} className="mr-2" /> },
    { name: "Route Management", icon: <Route size={18} className="mr-2" /> },
    { name: "Ticket Settings", icon: <Ticket size={18} className="mr-2" /> },
  ];
  
  const [activeTab, setActiveTab] = useState("Profile");

 
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

  return (
    <div className="mt-8 px-6 bg-white max-h-screen overflow-y-auto">
      <div className="flex justify-between">
        <Greeting />
        <div className="flex items-center gap-2 shrink-0 order-2 md:order-3 mb-8">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-2 bg-gray-300 hover:bg-gray-200 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B3B2E] mb-2">Settings</h1>
        <p className="text-gray-600">Configure all system settings for TegaBus operations</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-3 px-4 text-sm font-medium rounded-t-lg transition-all flex items-center whitespace-nowrap ${
              activeTab === tab.name
                ? "text-white bg-[#0B3B2E] shadow-sm"
                : "text-gray-600 hover:text-[#0B3B2E] hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Admin name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Admin email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Support contact"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Preferences" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                />
                <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="smsAlerts"
                  checked={smsAlerts}
                  onChange={() => setSmsAlerts(!smsAlerts)}
                  className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                />
                <label htmlFor="smsAlerts" className="text-sm font-medium text-gray-700">
                  Enable SMS Alerts (Twilio Integration)
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Company" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="TegaBus"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Contact</label>
              <Input
                value={supportContact}
                onChange={(e) => setSupportContact(e.target.value)}
                placeholder="+250788000000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
              <Input
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
              />
            </div>
          </div>
        )}

        {activeTab === "Pricing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fare Per KM</label>
              <div className="flex">
                <Select value={currency} onValueChange={setCurrency} className="w-24 mr-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Adjustment (%)</label>
              <Input
                type="number"
                placeholder="0"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Positive for increase, negative for decrease</p>
            </div>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication</h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={twoFactorAuth}
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                  className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
                />
                <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-700">
                  Enable Two-Factor Authentication (OTP)
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Extra security layer using Twilio SMS verification</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Session Management</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Logout All Devices
                </Button>
                <p className="text-sm text-gray-500">Force logout from all active sessions</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
              <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
                View Recent Activity
              </Button>
            </div>
          </div>
        )}

        {activeTab === "Bus Management" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus Capacity</label>
              <Input
                type="number"
                value={busCapacity}
                onChange={(e) => setBusCapacity(e.target.value)}
                placeholder="40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seat Columns</label>
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Bus Layout</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route Start Point</label>
              <Input
                value={routeStart}
                onChange={(e) => setRouteStart(e.target.value)}
                placeholder="Kigali"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route End Point</label>
              <Input
                value={routeEnd}
                onChange={(e) => setRouteEnd(e.target.value)}
                placeholder="Huye"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Intermediate Stops</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Format</label>
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
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableUSSD"
                checked={enableUSSD}
                onChange={() => setEnableUSSD(!enableUSSD)}
                className="h-4 w-4 text-[#0B3B2E] border-gray-300 rounded focus:ring-[#0B3B2E]"
              />
              <label htmlFor="enableUSSD" className="text-sm font-medium text-gray-700">
                Enable USSD Booking
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Confirmation Message</label>
              <textarea
                defaultValue="Your booking with TegaBus is confirmed. Reference: {CODE}. Departure: {TIME} from {LOCATION}."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">Use as placeholders</p>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end gap-4 pb-8">
        <Button variant="outline" className="border-gray-300">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-[#0B3B2E] text-white hover:bg-[#0B3B2E]/90 px-6 py-3 shadow-sm transition"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}