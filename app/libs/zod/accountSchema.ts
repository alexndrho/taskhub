import { z } from 'zod';

const accountSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(70, {
      message: 'Name must be at most 70 characters.',
    }),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/, {
    message:
      'Password must be at least 8 characters and include at least one letter and one number.',
  }),
});

export { accountSchema };
