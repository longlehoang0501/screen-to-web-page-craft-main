import introAiNetwork from "@/assets/intro-ai-network.jpg";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-neon-blue/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-neon-blue/25 shadow-glow-soft">
            <img
              src={introAiNetwork}
              alt="Mạng lưới nơ-ron AI phát sáng"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="text-sm font-semibold tracking-widest text-neon-purple uppercase">
              Giới thiệu sự kiện
            </p>

            <blockquote className="mt-4 rounded-3xl border border-neon-blue/30 bg-card/60 p-6 shadow-glow-soft backdrop-blur sm:p-8">
              <p className="font-display text-lg leading-relaxed font-semibold sm:text-xl">
                Năm 2026 không còn là thời điểm để bàn luận "AI có thay thế con
                người hay không", mà là lúc chứng kiến khoảng cách bứt phá giữa
                những người biết làm chủ AI và phần còn lại bị bỏ lại phía sau.
              </p>
            </blockquote>

            <p className="mt-6 leading-relaxed text-muted-foreground sm:text-lg">
              Với sự góp mặt của các chuyên gia và nhà quản trị hàng đầu, AI
              NEXUS 2026 là chuỗi hội thảo chuyên sâu kết hợp workshop thực chiến
              thường niên mang sứ mệnh bình dân hóa và thương mại hóa Trí tuệ
              Nhân tạo. Sự kiện tập trung giải mã và chuyển giao các giải pháp
              Generative AI, mô hình ngôn ngữ lớn (LLMs) cùng hệ sinh thái AI
              Agents tự động — đưa sức mạnh công nghệ từ lý thuyết vào thẳng công
              việc hàng ngày của cá nhân và quy trình vận hành thực tế của doanh
              nghiệp.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
