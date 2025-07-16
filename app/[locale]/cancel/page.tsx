"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          You have cancelled your payment. If this was a mistake, please try again.
        </p>
        <Link href="/">
          <Button className="bg-green-800 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
            Back to Home
          </Button>
          
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
