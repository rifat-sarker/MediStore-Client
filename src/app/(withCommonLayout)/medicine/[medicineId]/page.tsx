import { redirect } from "next/navigation";

export default async function MedicineSingleRedirect({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) {
  const { medicineId } = await params;
  redirect(`/medicines/${medicineId}`);
}
