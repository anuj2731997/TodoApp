import {z} from "zod";

export const todoSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1,"Title is required").max(100,"Title must be less than 100 characters").trim(),
    description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
   completed: z.boolean().default(false),
   priority: z.enum(["low", "medium", "high"]).default("medium")   

})