import z from "zod";

const loginUserValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export const loginValidation = {
  loginUserValidationSchema,
};
export type ILoginUser = z.infer<typeof loginUserValidationSchema>;
