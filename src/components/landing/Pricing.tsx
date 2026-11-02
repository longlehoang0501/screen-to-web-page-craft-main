import { Check, Crown } from "lucide-react";
import { Reveal } from "./Reveal";

const STANDARD_FEATURES = [
  "01 chỗ ngồi tiêu chuẩn",
  "Bộ Kit sự kiện số (E-Badge, E-Certificate)",
  "Slide bài giảng (bản PDF tóm tắt)",
  "Teabreak tiêu chuẩn buổi chiều",
  "Bộ quà tặng cơ bản",
];

const VIP_FEATURES = [
  "Ngồi Top 3 hàng ghế đầu sát sân khấu",
  "Check-in lối đi VIP",
  "Networking Lounge & Teabreak cao cấp",
  "200+ Prompts AI chuyên sâu & Ebook",
  "Xem lại Full HD Video Replay trong 3 tháng",
  "Quà tặng vật lý cao cấp",
];

interface PricingProps {
  onSelectTicket: (ticket: string) => void;
}

export function Pricing({ onSelectTicket }: PricingProps) {
  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-neon-blue/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-neon-purple/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-neon-purple uppercase">
              Cơ cấu hạng vé
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Chọn trải nghiệm phù hợp với bạn
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2">
          {/* Standard ticket */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Vé Phổ Thông
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">Standard Ticket</p>
              <p className="mt-6">
                <span className="font-display text-4xl font-bold">199.000</span>
                <span className="ml-2 text-muted-foreground">VNĐ</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {STANDARD_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-blue" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onSelectTicket("Vé Phổ Thông - 199.000 VNĐ")}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl border border-neon-blue/40 bg-neon-blue/10 font-semibold text-neon-blue transition-colors hover:bg-neon-blue/20"
              >
                Chọn vé Phổ Thông
              </button>
            </article>
          </Reveal>

          {/* VIP ticket — highlighted */}
          <Reveal className="h-full" delay={120}>
            <article className="relative h-full rounded-3xl bg-gradient-to-b from-neon-blue via-neon-purple to-neon-purple p-[1.5px] shadow-glow">
              <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-1 text-xs font-bold tracking-wide text-primary-foreground uppercase">
                <Crown className="h-3.5 w-3.5" />
                Giá trị tốt nhất
              </span>
              <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-card p-8">
                <h3 className="font-display text-xl font-semibold">
                  Vé VIP Executive
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">VIP Ticket</p>
                <p className="mt-6">
                  <span className="font-display text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    399.000
                  </span>
                  <span className="ml-2 text-muted-foreground">VNĐ</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {VIP_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-purple" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelectTicket("Vé VIP - 399.000 VNĐ")}
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                >
                  Chọn vé VIP
                </button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
