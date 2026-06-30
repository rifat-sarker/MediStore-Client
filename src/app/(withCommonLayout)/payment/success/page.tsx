import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "@/types/common";

const PaymentSuccessPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { tran_id } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-600">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        
        {tran_id && (
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
            Transaction ID: <span className="font-semibold">{tran_id}</span>
          </div>
        )}

        <div className="pt-4">
          <Link href="/">
            <Button className="w-full h-12 text-lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
