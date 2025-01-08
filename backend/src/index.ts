import {Hono} from 'hono'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SEC:string
	}
}>();

app.use('/*',cors());
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

// app.use('/api/v1/blog/*',async (c,next)=>{
//   const header=c.req.header("Authorization")||""
//   //our respones is of form "bearer token"
//   const token=header.split(" ")[1]

//   const response=await verify(header,c.env.JWT_SEC)

//   if(response.id)
//   {
//     next()
//   }
//   else
//   {
//     c.status(403)
//     return c.json({error:"unauthorized"});
//   }
// })


export default app;
