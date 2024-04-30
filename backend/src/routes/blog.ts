import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';


// Create the main Hono app
export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    },
    Variables :{
        userId : string;
    }
 }>();

blogRouter.use("/*",async (c,next)=>{
    //extract user id
    //pass it down to route handler
    //add empty string to make auth header type to string
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id);
        next();
    }
    else{
        c.status(403);
        return c.json({
            message :"you are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   const blog = await prisma.post.create({
    data :{
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
    }
   })
	return c.json({
        id : blog.id
    })
})

blogRouter.put('/',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   const blog = await prisma.post.update({
    where :{
       id: body.id
    },
    data: {
        title: body.title,
        content: body.content,
    }
   })
	return c.json({
        id : blog.id
    })
})

blogRouter.get('/', async (c) => {
	const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   try {
   const blog = await prisma.post.findFirst({
    where :{
       id: body.id
    }
   })
	return c.json({
        blog
    })
    } catch(e){
        c.status(411);
        return c.json({
            message: "error fetching blog post"
        })
    }
})


//pagination // return 1st 10 and ask for more when scrolled
blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();
    return c.json({
        blogs
    })
})
