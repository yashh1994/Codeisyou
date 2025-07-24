import { PrismaClient } from '@prisma/client';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client'
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export async function signUpUser(email: string, password: string, name: string, user_name: string): Promise<{ user: Omit<Omit<User, 'id'>, 'password'>, token: string } | null> {
    console.debug('signUpUser called with:', { email, name });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        console.debug('User already exists:', { email });
        throw new Error('User already exists');
    }

    const hashedPassword = password; 
    // console.debug('Hashed password generated:', { hashedPassword });

    

    const user = await prisma.user.create({
    data: {
        user_name: user_name,
        name: name,
        email: email,
        password: hashedPassword,
        createdAt: new Date(),    
    }
  });


    console.debug('User created in database:', { id: user.id, email: user.email, name: user.name });

    // Exclude password from returned user
    const { password: _, id: __, ...rest } = user
    const userWithoutPassword = rest as Omit<Omit<User, 'id'>, 'password'>

    const token = jwt.sign(
    { email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: '7d' }
    );

return { user: userWithoutPassword, token }
    
}

export async function loginUser(email: string, password: string): Promise<string | null> {
    console.debug('loginUser called with:', { email });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.debug('User not found in database:', { email });
        throw new Error('User not found');
    }

    // Uncomment the next line if bcrypt is imported
    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = password === user.password; // Placeholder for debug if bcrypt is not used

    if (!isValid) {
        console.debug('Invalid password for user:', { email });
        throw new Error('Invalid password');
    }

    console.debug('User logged in successfully:', { id: user.id, email: user.email });

    // Exclude password from returned user

    
    const token = jwt.sign(
        { email: user.email, name: user.name },
        config.jwtSecret,
        { expiresIn: '7d' }
    );

    return token;
}