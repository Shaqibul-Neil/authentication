import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.number().optional(),
});

export const userValidation = {
  createUserValidationSchema,
};
export type IUser = z.infer<typeof createUserValidationSchema>;
