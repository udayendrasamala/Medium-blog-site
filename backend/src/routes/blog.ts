import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import { blogInput, updateblogInput } from '@aerospace/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    JWT_SEC:string
    }
    Variables:{
        userId:string;
    }
}>();


//middleware
blogRouter.use('/*',async (c,next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const header=c.req.header('Authorization') || "";
    try{
        
        const user=await verify(header,c.env.JWT_SEC);
        
        if(user)
        {
            c.set("userId",String(user.id));// i stringed it
            await next();
        }
        else
        {
            c.status(403);
            return c.json({
                message:"user not logged in"
            })
        }
    }
    catch(e)
    {
        c.status(403);
        console.log(e);
        return c.json({message:"you are not loggged in"});
    }
});

blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const authorId=c.get("userId");

    
    const {success}=blogInput.safeParse(body);
    if(!success)
    {
        c.status(403);
        return c.json({
            message:"Invalid data"
        })
    }

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId//get it from middleware
        }
    })
    
    return c.json({
        id:blog.id
    })
})
  
blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json()
    try{
    const {success}=updateblogInput.safeParse(body);

    if(!success)
    {
        c.status(411);
        return c.json({
            message:"updation gone wrong"
        })
    }

    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json({id:blog.id});
}
catch(e)
{
    console.log (e);
}

})

//Todo pagination 

blogRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({blogs});
})
  
blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=c.req.param("id");

    try{
        const blog=await prisma.post.findFirst({
            where:{
                id:body
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({blog});
    }
    catch(e)
    {
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        });
    }
})

