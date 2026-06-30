import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "@/types/common";

const PaymentCancelPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { tran_id } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="w-20 h-20 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="text-gray-600">
          Your transaction has been cancelled. No charges were made to your account.
        </p>
        
        {tran_id && (
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
            Transaction ID: <span className="font-semibold">{tran_id}</span>
          </div>
        )}

        <div className="pt-4 flex flex-col gap-3">
          <Link href="/cart">
            <Button className="w-full h-12 text-lg">Return to Cart</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full h-12 text-lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
