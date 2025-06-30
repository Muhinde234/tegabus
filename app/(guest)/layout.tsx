import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
        {children}
      <Footer />
    </div>
  );
}
