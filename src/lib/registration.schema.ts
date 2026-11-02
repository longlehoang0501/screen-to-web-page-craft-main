import { z } from "zod";

export const LOCATIONS = [
  "Hà Nội (NCC) - 14/11/2026",
  "TP. Hồ Chí Minh (GEM Center) - 21/11/2026",
] as const;

export const TICKETS = [
  "Vé Phổ Thông - 199.000 VNĐ",
  "Vé VIP - 399.000 VNĐ",
] as const;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ và tên đầy đủ")
    .max(100, "Họ và tên tối đa 100 ký tự"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ")
    .max(255, "Email tối đa 255 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ (VD: 0912345678)"),
  location: z.enum(LOCATIONS, {
    message: "Vui lòng chọn địa điểm tham dự",
  }),
  ticketType: z.enum(TICKETS, {
    message: "Vui lòng chọn hạng vé",
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
