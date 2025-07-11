import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Providers from '@/components/progressProvider';

import { FloatingChatWidget } from "@/components/features/chatbot/floating-chat-widget"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <Providers>
        {children}

      </Providers>
        
         <FloatingChatWidget />
      <Footer />
    </div>
  );
}
