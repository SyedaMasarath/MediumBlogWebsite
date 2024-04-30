import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';


// Create the main Hono app
export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    }
  }>();

//zod validation, hash password
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
     try {
      //if user already exists or any other error
          const user = await prisma.user.create({
              data:{
                  username: body.username,
                  password : body.password,
                  name : body.name
              }
          })
          const jwt = await sign({
              id : user.id
          }, c.env.JWT_SECRET);
          return c.text(jwt);
     }
     catch(e){
          console.log(e);
          c.status(411);
          return c.text("Invalid Username");
     }
  })
  
userRouter.post('/signin',async (c) => {
      const body = await c.req.json();
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
         try{
          //if user already exists or any other error
              const user = await prisma.user.findFirst({
                  where:{
                      username: body.username,
                      password : body.password,
                  }
              })
              if(!user){
                  c.status(403);//unauthorized user
                  return c.text("invalid");
              }
              const jwt = await sign({
                  id : user.id
              }, c.env.JWT_SECRET);
              
              return c.text(jwt);
         }
         catch(e){
              console.log(e);
              c.status(411);
              return c.text("Invalid Username");
         }
  })
  
