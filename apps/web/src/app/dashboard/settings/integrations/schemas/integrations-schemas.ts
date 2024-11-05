import * as z from "zod";

export const serviceTitanSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client Secret is required"),
  appKey: z.string().min(1, "App Key is required"),
  tenantId: z.string().min(1, "Tenant ID is required"),
});

export type ServiceTitanFormValues = z.infer<typeof serviceTitanSchema>;
