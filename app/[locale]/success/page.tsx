import { Button } from "@/components/ui/button";
import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-2">Payment Successful</h1>
        <p className="text-gray-600">Thank you! Your payment was processed successfully.</p>
      </div>
       <Link href="/">
          <Button className="bg-green-800 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
            Back to Home
          </Button>
          
        </Link>
        
    </div>
  );
};

export default Success;
