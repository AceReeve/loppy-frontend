import * as z from "zod";

export const CreateTeamSchema = z.object({
  team: z.string().min(1, {
    message: "Team Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const AddRoleSchema = z.object({
  role: z.string().min(1, {
    message: "Role is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const UpdateTeamSchema = z.object({
    team: z.string().min(1, {
      message: "Team Name is required.",
    }),
    description: z.string().min(1, {
      message: "Description is required",
    }),
  });