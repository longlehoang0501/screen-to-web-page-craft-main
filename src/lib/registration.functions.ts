import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { registrationSchema } from "./registration.schema";

/**
 * Append a registration row to a Google Sheet via a Google Apps Script Web App.
 *
 * The Apps Script URL is read from the GOOGLE_SHEET_WEBAPP_URL env variable.
 * If the env var is missing or the request fails the error is logged but does
 * NOT block the primary Supabase insert — the Sheet is treated as a
 * best-effort secondary store.
 */
async function appendToGoogleSheet(data: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  ticketType: string;
}) {
  const webAppUrl = process.env["GOOGLE_SHEET_WEBAPP_URL"];
  console.log("[GSheet] GOOGLE_SHEET_WEBAPP_URL =", webAppUrl ? `"${webAppUrl}"` : "(not set)");

  if (!webAppUrl) {
    console.warn("[GSheet] GOOGLE_SHEET_WEBAPP_URL not set — skipping");
    return;
  }

  const payload = JSON.stringify({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    location: data.location,
    ticketType: data.ticketType,
    submittedAt: new Date().toISOString(),
  });

  console.log("[GSheet] Sending payload:", payload);

  try {
    // First request: POST to Apps Script → expect 302 redirect
    const res = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
      redirect: "manual",
    });

    console.log("[GSheet] Response status:", res.status);

    if (res.status === 302) {
      // 302 = Google processed the script. Follow the redirect with GET
      // to retrieve the actual JSON response.
      const redirectUrl = res.headers.get("location");
      console.log("[GSheet] Redirect URL:", redirectUrl);

      if (redirectUrl) {
        const followRes = await fetch(redirectUrl, { redirect: "follow" });
        const body = await followRes.text();
        console.log("[GSheet] Final response:", followRes.status, body);
      }
    } else if (!res.ok) {
      const body = await res.text();
      console.error("[GSheet] Unexpected response:", res.status, body.slice(0, 500));
    } else {
      const body = await res.text();
      console.log("[GSheet] OK response:", res.status, body);
    }
  } catch (err) {
    console.error("[GSheet] Fetch error:", err);
  }
}

/**
 * Public lead-capture endpoint: validates the registration, then inserts one
 * row into public.registrations through the publishable (anon) client.
 * RLS on the table allows anon INSERT only — nothing can be read back.
 *
 * After the Supabase insert succeeds the data is also appended to a Google
 * Sheet via Apps Script (best-effort, non-blocking).
 */
export const submitRegistration = createServerFn({ method: "POST" })
  .validator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      // Opaque sb_ keys are not JWTs: send apikey, strip the default bearer.
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("registrations").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      ticket_type: data.ticketType,
    });

    if (error) {
      console.error("registration insert failed:", error.message);
      throw new Error("REGISTRATION_SAVE_FAILED");
    }

    // Append to Google Sheet (best-effort — errors are logged, not thrown)
    try {
      await appendToGoogleSheet(data);
    } catch (sheetErr) {
      console.error("[GSheet] Unhandled error:", sheetErr);
    }

    return { ok: true as const };
  });
