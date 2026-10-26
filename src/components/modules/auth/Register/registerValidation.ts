import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be between 2 and 50 characters")
      .max(50, "Name must be between 2 and 50 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^(?:\+?8801|01)[3-9]\d{8}$/.test(val), {
        message: "Invalid Bangladeshi phone number (e.g. 01700000000 or +8801700000000)",
      }),
    address: z.string().optional(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and a number"
      ),
    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
