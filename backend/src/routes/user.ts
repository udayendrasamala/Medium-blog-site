import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signinInput, signupInput } from '@aerospace/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    JWT_SEC:string
    }
}>();





userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json()
    const {success}=signinInput.safeParse(body);
    if(!success)
    {
      c.status(411)
      return c.json({
        message:"Invalid credentials"
      })
    }

    try{
      const user=await prisma.user.findUnique({
        where:{
          email:body.username,
          password:body.password
        }
      })
      // to create something for wrong password , need to check how to compare passwords .if they need to be decrypted
      // we need to decrypt thema nd compare
      if(!user)
      {
        c.status(403);
        return c.json({error:"user not found"});
      }
    
      const jwt=await sign({id:user.id},c.env.JWT_SEC);
      return c.json({jwt});
    }
    catch(e)
    {
      console.log(e);
      c.status(403);
      return c.text('invalid login')
    }
   
})
  
  
  
  
userRouter.post('/signup',async (c)=>{
    const body= await c.req.json();

    const result =signupInput.safeParse(body);
    console.log(result.error);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    if(!result.success)
    {
      c.status(411);
      return c.json({message:"Invalid inputs"});
    }

    try{
      const user = await prisma.user.create({
        data: {
          name:body.name,
          email: body.username,
          password: body.password,
        },
      })
    
      const token=await sign({id:user.id},c.env.JWT_SEC);
      return c.json({
        jwt:token
      })
    }
    catch(e)
    {
      console.log(e);
      c.status(411);
      const user=await prisma.user.findUnique({
        where :{
          email:body.username
        }
      })
      if(user)// or use e==P2002 this is error code for prisma if user already exists
      {
        return c.text("User Already Exists!")
      }

      // if (e instanceof Prisma.PrismaClientKnownRequestError){//this makes it work
      // if(e.code==="P2002")//throws e is type of unknown because we really dont know prisma is throwing the error
      // {
      //   return c.text("User already exists");
      // }
      return c.text('Invalid');
    }
})