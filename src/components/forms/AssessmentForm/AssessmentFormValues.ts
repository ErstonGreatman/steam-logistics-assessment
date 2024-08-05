import { z } from 'zod';


export const AssessmentFormSchema = z.object({
  name: z.string()
          .min(1, { message: 'Name is required' })
          .max(50, { message: 'Your name is too long! Are you of gnomish ancestry?' }),
  email: z.string()
          .min(1, { message: 'Email is required' })
          .email({ message: "Invalid email address" }),
  favoriteStarTrek: z.string(),
  walkIntoMordor: z.boolean().refine(value => !value, {
    message: 'One does not simply walk into Mordor',
  }),
  returnAPIError: z.boolean().default(false),
});

export type AssessmentFormValues = z.infer<typeof AssessmentFormSchema>;
