import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db-connection.js'
import typeDefs from './Graphql/typeDefs.js'
import { clerkClient, clerkMiddleware } from '@clerk/express'
import resolvers from './Graphql/resolvers.js'
import blogRouter from './routes/blog.routes.js';
import userRouter from './routes/user.routes.js';


await connectDB();
const app = express();


const expressServerStart = async () => {
    try {
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            credentials: true
        }));
        dotenv.config();
        app.use(helmet());
        app.use(clerkMiddleware({
            publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
            secretKey: process.env.CLERK_SECRET_KEY
        }));
        
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
    
        await server.start()
    
        app.use('/graphql', expressMiddleware(server));
        app.get('/', async (req, res) => {
            return res.json({ message: "I am Usman Haider. I welcome you at YCDirectory." })
        })
        app.use('/api', userRouter);
        app.use('/api', blogRouter);
        app.all('*', (req, res) => {
            return res.json({message: "Route does not exist. Please try some other route."});
        });
    
        
        app.use((err, req, res, next) => {
            console.log(err.message);
            res.json({message: "Sorry for inconvinience. Server is down."});
        })
        
        // app.listen(process.env.PORT || 3000, () => {
        //     console.log('Server is running on port 3000');
        // });
    } catch (error) {
        console.log("SERVER STOPPED: ", error.message);
        process.exit(1);
    }
}

expressServerStart();

export default app;