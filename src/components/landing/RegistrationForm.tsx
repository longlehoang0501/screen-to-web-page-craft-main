import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitRegistration } from "@/lib/registration.functions";
import { LOCATIONS, TICKETS, registrationSchema } from "@/lib/registration.schema";
import { Reveal } from "./Reveal";

interface RegistrationFormProps {
  /** Pre-selected ticket, set from the pricing cards. */
  selectedTicket?: string | undefined;
}

const inputClasses =
  "h-12 w-full rounded-xl border border-input bg-background/50 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/30";

export function RegistrationForm({ selectedTicket }: RegistrationFormProps) {
  const submitFn = useServerFn(submitRegistration);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    ticketType: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTicket) {
      setValues((prev) => ({ ...prev, ticketType: selectedTicket }));
    }
  }, [selectedTicket]);

  const setField = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof typeof values, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "") as keyof typeof values;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      await submitFn({ data: parsed.data });
      setStatus("success");
    } catch {
      setStatus("idle");
      setServerError("Đã có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau ít phút.");
    }
  }

  return (
    <section id="dang-ky" className="relative scroll-mt-16 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-neon-purple/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-glow-soft backdrop-blur-xl sm:p-10">
            {status === "success" ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-neon-blue" />
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Đăng ký thành công!
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Cảm ơn bạn đã đăng ký tham dự AI NEXUS 2026. Thông tin hướng dẫn
                  thanh toán sẽ được gửi qua email của bạn ngay bây giờ.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm font-semibold tracking-widest text-neon-blue uppercase">
                    Đăng ký nhận vé
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                    Giữ chỗ của bạn ngay hôm nay
                  </h2>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                      Họ và tên
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                      value={values.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      className={inputClasses}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="ban@congty.vn"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      className={inputClasses}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="0912 345 678"
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={inputClasses}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-medium">
                      Chọn địa điểm
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={values.location}
                      onChange={(e) => setField("location", e.target.value)}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="" disabled className="bg-card">
                        Chọn địa điểm tham dự
                      </option>
                      {LOCATIONS.map((location) => (
                        <option key={location} value={location} className="bg-card">
                          {location}
                        </option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ticketType" className="mb-2 block text-sm font-medium">
                      Chọn hạng vé
                    </label>
                    <select
                      id="ticketType"
                      name="ticketType"
                      value={values.ticketType}
                      onChange={(e) => setField("ticketType", e.target.value)}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="" disabled className="bg-card">
                        Chọn hạng vé
                      </option>
                      {TICKETS.map((ticket) => (
                        <option key={ticket} value={ticket} className="bg-card">
                          {ticket}
                        </option>
                      ))}
                    </select>
                    {errors.ticketType && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.ticketType}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-lg font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Xác nhận đăng ký
                      </>
                    )}
                  </button>

                  {serverError && (
                    <p className="text-center text-sm text-destructive">{serverError}</p>
                  )}

                  <p className="text-center text-sm text-muted-foreground">
                    Thông tin hướng dẫn thanh toán sẽ được gửi qua email ngay sau khi
                    bạn đăng ký.
                  </p>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
