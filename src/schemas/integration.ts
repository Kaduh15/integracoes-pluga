import z from 'zod'

export const integrationSchema = z.object({
  app_id: z.string(),
  name: z.string(),
  color: z.string(),
  icon: z.url(),
  link: z.url(),
})

export type Integration = z.infer<typeof integrationSchema>
