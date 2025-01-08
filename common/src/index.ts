import z from "zod";

export const signupInput=z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export type SignupInput=z.infer<typeof signupInput>

export const signinInput=z.object({
    username:z.string().email(),
    password:z.string().min(6)
})

export type SiginInput=z.infer<typeof signinInput>


export const blogInput=z.object({
    title:z.string(),
    content:z.string()
})

export type BlogInput=z.infer<typeof blogInput>

export const  updateblogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type UpdateblogInput=z.infer<typeof updateblogInput>