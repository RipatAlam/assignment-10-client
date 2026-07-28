import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  return Response.json({ token });
}