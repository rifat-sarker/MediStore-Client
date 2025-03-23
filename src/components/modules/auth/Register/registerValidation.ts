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
      .string({ required_error: "Phone number is required" })
      .regex(/^\+8801[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    address: z
      .string({ required_error: "Address is required" })
      .min(5, "Address must be at least 5 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
