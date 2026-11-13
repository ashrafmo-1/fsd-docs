import { getLlmsIndexForLocale, llmsTextResponse } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return llmsTextResponse(getLlmsIndexForLocale("ru"));
}
