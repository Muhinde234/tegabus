"use client"
import { useState } from "react";
import { Book, Shield, CreditCard, X, User, Info, Menu } from "lucide-react";
import TermsSidebar from "../../../components/termsSidebar";
import Button from "../../../components/ui/button";





const Conditions = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
     

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:hidden p-4 border-b">
          <Button
           
            className="flex items-center gap-2"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu size={16} />
            <span>Quick Navigation</span>
          </Button>
        </div>

        <TermsSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 mb-8">
            <h1 className="text-4xl font-bold text-center mb-6">
              Terms and Conditions
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              These Terms and Conditions govern your use of the VeloTick online
              booking platform and related services. Please read them carefully
              before proceeding with any booking.
            </p>

            <div className="max-w-3xl mx-auto">
              <section id="general" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Book size={24} />
                  <span className="text-gray-800">1. General Terms</span>
                </h2>
                <div className="text-gray-500">
                  <p className="mb-4">
                    Welcome to VeloTick, the online bus ticket booking platform.
                    By accessing or using our website, mobile applications, or
                    any other services provided by VeloTick(collectively, the
                    "Services"), you agree to be bound by these Terms and
                    Conditions.
                  </p>
                  <p className="mb-4">
                    These Terms and Conditions constitute a legally binding
                    agreement between you and VeloTick regarding your use of the
                    Services. If you do not agree to these Terms and Conditions,
                    you may not access or use the Services.
                  </p>
                  <p>
                    VeloTick reserves the right to modify these Terms and
                    Conditions at any time. Your continued use of the Services
                    following the posting of modified Terms and Conditions means
                    that you accept and agree to the changes.
                  </p>
                </div>
              </section>

              <section id="booking" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Shield size={24} />
                  <span className="text-gray-800">2. Booking Policy</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    2.1 Booking Process
                  </h3>
                  <p className="mb-4">
                    To book a ticket through our Services, you must provide
                    accurate and complete information, including valid
                    identification where required. All provided information must
                    match the identification used during travel.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    2.2 Confirmation
                  </h3>
                  <p className="mb-4">
                    Upon successful booking and payment, you will receive a
                    booking confirmation via email or SMS. This confirmation
                    serves as your ticket and must be presented during boarding.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    2.3 Seat Allocation
                  </h3>
                  <p className="mb-4">
                    Seat numbers are allocated on a first-come, first-served
                    basis, or as per the bus operator's policy. VeloTick does
                    not guarantee the availability of specific seats unless
                    explicitly stated during the booking process.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    2.4 Age Requirements
                  </h3>
                  <p>
                    Passengers under the age of 18 may be required to travel
                    with an adult. For specific age policies, please refer to
                    the respective bus operator's terms.
                  </p>
                </div>
              </section>

              <section id="payments" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <CreditCard size={24} />
                  <span className="text-gray-800">3. Payments</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    3.1 Payment Methods
                  </h3>
                  <p className="mb-4">
                    We accept various payment methods including credit cards,
                    debit cards, net banking, and digital wallets. All payments
                    are processed through secure payment gateways.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">3.2 Currency</h3>
                  <p className="mb-4">
                    All prices are displayed in the local currency and include
                    applicable taxes and fees unless otherwise stated.
                    Additional bank charges may apply for international
                    transactions.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    3.3 Price Changes
                  </h3>
                  <p>
                    Ticket prices are subject to change without prior notice.
                    However, once a booking is confirmed and paid for, the price
                    will not be altered.
                  </p>
                </div>
              </section>

              <section id="cancellations" className="mb-12">
                <h2 className="text-2xl font-semibold  mb-3 flex items-center gap-2">
                  <X size={24} />
                  <span className="text-gray-800">
                    4. Cancellations & Refunds
                  </span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    4.1 Cancellation Policy
                  </h3>
                  <p className="mb-4">
                    Tickets may be cancelled through our website or mobile
                    application. Cancellation policies vary by bus operator and
                    route.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    4.2 Refund Process
                  </h3>
                  <p className="mb-4">
                    Refunds for cancelled tickets are processed according to the
                    applicable cancellation policy. The refund amount depends on
                    the timing of cancellation relative to the departure time.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    4.3 No-Show Policy
                  </h3>
                  <p>
                    If you fail to board the bus at the scheduled departure time
                    without prior cancellation, it will be considered a
                    "no-show" and no refund will be provided.
                  </p>
                </div>
              </section>

              <section id="user" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <User size={24} />
                  <span className="text-gray-800">
                    5. User Responsibilities
                  </span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    5.1 Account Security
                  </h3>
                  <p className="mb-4">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    5.2 Accurate Information
                  </h3>
                  <p className="mb-4">
                    You must provide accurate, current, and complete information
                    during the registration and booking processes.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    5.3 Prohibited Activities
                  </h3>
                  <p>
                    You agree not to use our Services for any illegal or
                    unauthorized purpose. You must not attempt to gain
                    unauthorized access to any part of our Services or interfere
                    with the proper working of our platform.
                  </p>
                </div>
              </section>

              <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Shield size={24} />
                  <span className="text-gray-800">6. Privacy Policy</span>
                </h2>
                <div className="text-gray-500">
                  <h3 className="text-xl font-semibold mb-3">
                    6.1 Data Collection
                  </h3>
                  <p className="mb-4">
                    We collect personal information necessary for providing our
                    Services, including but not limited to name, contact
                    details, and payment information.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.2 Data Usage</h3>
                  <p className="mb-4">
                    Your data is used for processing bookings, providing
                    customer support, improving our services, and complying with
                    legal obligations.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">
                    6.3 Data Security
                  </h3>
                  <p>
                    We implement appropriate security measures to protect your
                    personal information. However, no method of transmission
                    over the Internet or electronic storage is 100% secure, and
                    we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Info size={24} />
                  <span className="text-gray-800">7. Contact Information</span>
                </h2>
                <div className="text-gray-500">
                  <p className="mb-4">
                    If you have any questions or concerns regarding these Terms
                    and Conditions, please contact our customer support:
                  </p>

                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <p className="mb-2">
                      <strong>Customer Support:</strong> support@tegabus.com
                    </p>
                    <p className="mb-2">
                      <strong>Phone:</strong>+250780396766
                    </p>
                    <p className="mb-2">
                      <strong>Hours:</strong> 24/7
                    </p>
                    <p>
                      <strong>Address:</strong>Kigali
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
