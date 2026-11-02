import { BrainCircuit, GraduationCap, PackageOpen, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";

const BENEFITS = [
  {
    icon: BrainCircuit,
    accent: "text-neon-blue",
    ring: "border-neon-blue/30 bg-neon-blue/10",
    title: "Chuyển Hóa Tư Duy",
    description:
      "Hiểu đúng năng lực GenAI, LLMs, AI Agents và đón đầu dịch chuyển cấu trúc vận hành mới.",
  },
  {
    icon: GraduationCap,
    accent: "text-neon-purple",
    ring: "border-neon-purple/30 bg-neon-purple/10",
    title: "Nâng Cấp Kỹ Năng",
    description:
      "Prompting chuyên sâu và xây dựng AI Agents tự thiết lập quy trình tự động hóa tác vụ lặp lại.",
  },
  {
    icon: Rocket,
    accent: "text-neon-blue",
    ring: "border-neon-blue/30 bg-neon-blue/10",
    title: "Bứt Phá Kinh Doanh",
    description:
      "Tự động hóa tiếp thị, bán hàng, học từ case study thực chiến để tối ưu ROI.",
  },
  {
    icon: PackageOpen,
    accent: "text-neon-purple",
    ring: "border-neon-purple/30 bg-neon-purple/10",
    title: "Kho Tài Liệu Độc Quyền",
    description:
      "Sở hữu templates, SOP và hệ sinh thái 50+ công cụ AI tốt nhất phân theo phòng ban.",
  },
];

export function Benefits() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-neon-blue uppercase">
              Lợi ích tham dự
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Một ngày, thay đổi cách bạn làm việc
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 100}>
              <article className="group h-full rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-blue/40 hover:shadow-glow-soft">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${benefit.ring}`}
                >
                  <benefit.icon className={`h-6 w-6 ${benefit.accent}`} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
