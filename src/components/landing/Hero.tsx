import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/75 to-background" />

      <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 text-center sm:pt-40 sm:pb-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 px-4 py-1.5 text-sm font-medium text-neon-blue">
            <Sparkles className="h-4 w-4" />
            Hội nghị công nghệ AI tiên phong
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            AI NEXUS 2026:{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Kiến tạo Tương lai &amp; Bứt phá Năng suất
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Làm chủ AI – Kiến tạo đột phá. Sự kiện tiên phong bình dân hóa Trí tuệ
            Nhân tạo giúp bạn giải mã sức mạnh công nghệ, tự động hóa tác vụ và
            xác lập vị thế dẫn đầu.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm backdrop-blur">
              <MapPin className="h-4 w-4 text-neon-blue" />
              Hà Nội: 14/11/2026 (NCC)
            </span>
            <span className="text-border hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm backdrop-blur">
              <MapPin className="h-4 w-4 text-neon-purple" />
              TP.HCM: 21/11/2026 (GEM Center)
            </span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10">
            <a
              href="#dang-ky"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-8 text-lg font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Đăng ký tham gia ngay
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
