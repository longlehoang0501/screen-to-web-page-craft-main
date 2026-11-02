import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Intro } from "@/components/landing/Intro";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { Footer } from "@/components/landing/Footer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "AI NEXUS 2026 | Kiến tạo Tương lai & Bứt phá Năng suất",
      },
      {
        name: "description",
        content:
          "Hội nghị AI tiên phong tại Hà Nội (14/11/2026) và TP.HCM (21/11/2026). Làm chủ AI, tự động hóa tác vụ và xác lập vị thế dẫn đầu. Đăng ký ngay từ 199.000 VNĐ.",
      },
      {
        property: "og:title",
        content: "AI NEXUS 2026 | Kiến tạo Tương lai & Bứt phá Năng suất",
      },
      {
        property: "og:description",
        content:
          "Làm chủ AI – Kiến tạo đột phá. Sự kiện tiên phong bình dân hóa Trí tuệ Nhân tạo tại Hà Nội và TP.HCM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedTicket, setSelectedTicket] = useState<string | undefined>();

  const selectTicketAndScroll = useCallback((ticket: string) => {
    setSelectedTicket(ticket);
    requestAnimationFrame(() => {
      document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Hero />
      <Intro />
      <Benefits />
      <Pricing onSelectTicket={selectTicketAndScroll} />
      <RegistrationForm selectedTicket={selectedTicket} />
      <Footer />
    </div>
  );
}
