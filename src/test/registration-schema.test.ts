import { describe, expect, it } from "vitest";
import { LOCATIONS, TICKETS, registrationSchema } from "@/lib/registration.schema";

describe("registrationSchema", () => {
  it("accepts a valid registration", () => {
    const result = registrationSchema.safeParse({
      fullName: "Nguyễn Văn A",
      email: "ban@congty.vn",
      phone: "0912345678",
      location: LOCATIONS[0],
      ticketType: TICKETS[0],
    });
    expect(result.success).toBe(true);
  });

  it("prices stay exactly as published: 199.000 VNĐ standard, 399.000 VNĐ VIP", () => {
    expect(TICKETS).toEqual(["Vé Phổ Thông - 199.000 VNĐ", "Vé VIP - 399.000 VNĐ"]);
  });

  it("event dates and venues stay exactly as published", () => {
    expect(LOCATIONS).toEqual([
      "Hà Nội (NCC) - 14/11/2026",
      "TP. Hồ Chí Minh (GEM Center) - 21/11/2026",
    ]);
  });

  it("rejects an invalid phone number", () => {
    const result = registrationSchema.safeParse({
      fullName: "Nguyễn Văn A",
      email: "ban@congty.vn",
      phone: "12345",
      location: LOCATIONS[0],
      ticketType: TICKETS[0],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = registrationSchema.safeParse({
      fullName: "Nguyễn Văn A",
      email: "not-an-email",
      phone: "0912345678",
      location: LOCATIONS[1],
      ticketType: TICKETS[1],
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty required fields", () => {
    const result = registrationSchema.safeParse({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      ticketType: "",
    });
    expect(result.success).toBe(false);
  });
});
