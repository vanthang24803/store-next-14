import * as z from "zod";

import {
  capitalizeRegex,
  specialCharRegex,
  uppercaseCharRegex,
  digitRegex,
} from "@/utils/regex";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Hãy nhập họ của bạn" })
    .max(50, "Họ của bạn quá dài")
    .refine((value) => capitalizeRegex.test(value), {
      message: "Họ của bạn phải bắt đầu bằng chữ cái in hoa",
    }),
  lastName: z
    .string()
    .min(1, { message: "Tên của bạn" })
    .max(50, "Tên của bạn quá dài")
    .refine((value) => capitalizeRegex.test(value), {
      message: "Tên của bạn phải bắt đầu bằng chữ cái in hoa",
    }),
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
  password: z
    .string()
    .min(6, {
      message:
        "Mật khẩu của bạn quá ngắn ít nhất 6 chữ cái gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt",
    })
    .max(50, "Mật khẩu của bạn quá dài ")
    .refine((value) => specialCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có ký tự đặt biệt",
    })
    .refine((value) => uppercaseCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ cái in hoa",
    })
    .refine((value) => digitRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ số",
    }),
});

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu của bạn quá ngắn" })
    .max(50, { message: "Mật khẩu của bạn quá dài" }),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
});

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message:
        "Mật khẩu của bạn quá ngắn ít nhất 6 chữ cái gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt",
    })
    .max(50, "Mật khẩu của bạn quá dài ")
    .refine((value) => specialCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có ký tự đặt biệt",
    })
    .refine((value) => uppercaseCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ cái in hoa",
    })
    .refine((value) => digitRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ số",
    }),
});

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
