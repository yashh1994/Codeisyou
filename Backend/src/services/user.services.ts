import { PrismaClient } from '@prisma/client';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import type { Profile, User } from '@prisma/client'
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


    await prisma.profile.create({
        data :{
            userId: user.id,
        }
    });


    console.debug('User created in database:', { id: user.id, email: user.email, name: user.name });

    // Exclude password from returned user
    const { password: _, id: __, ...rest } = user
    const userWithoutPassword = rest as Omit<Omit<User, 'id'>, 'password'>

    const token = jwt.sign(
    { email: user.email, user_name: user.user_name },
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
        { email: user.email, user_name: user.user_name },
        config.jwtSecret,
        { expiresIn: '7d' }
    );

    return token;
}
    

export async function getUserProfile(token: string): Promise<Omit<Omit<Profile, 'id'>, 'userId'> | null> {
    console.debug('getUserProfile called with token:', token);
    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { email: string, user_name: string };
        console.debug('Token decoded successfully:', decoded);

        const user = await prisma.user.findUnique({
            where: { user_name: decoded.user_name },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            console.debug('User or profile not found for user_name:', decoded.user_name);
            throw new Error('User or profile not found');
        }

        console.log("User profile retrieved successfully:", user.profile);

        const { id: _, userId: __, ...profileWithoutId } = user.profile;
        return profileWithoutId as Omit<Omit<Profile, 'id'>, 'userId'>;

    } catch (error) {
        console.error('Error verifying token or fetching user profile:', error);
        throw new Error('Failed to retrieve user profile');
    }
}

export async function saveUserProfile(token: string, profileData: Omit<Profile, 'id' | 'userId'>): Promise<void> {
    console.debug('saveUserProfile called with token:', token);
    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { email: string, user_name: string };
        console.debug('Token decoded successfully:', decoded);

        const user = await prisma.user.findUnique({
            where: { user_name: decoded.user_name },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            console.debug('User or profile not found for user_name:', decoded.user_name);
            throw new Error('User or profile not found');
        }

        const updatedProfile = await prisma.profile.update({
            where: { id: user.profile.id },
            data: {
            bio: profileData.bio ?? user.profile.bio,
            location: profileData.location ?? user.profile.location,
            companyOrUniversity: profileData.companyOrUniversity ?? user.profile.companyOrUniversity,

            leetcodeUsername: profileData.leetcodeUsername ?? user.profile.leetcodeUsername,
            hackerrankUsername: profileData.hackerrankUsername ?? user.profile.hackerrankUsername,
            codeforcesUsername: profileData.codeforcesUsername ?? user.profile.codeforcesUsername,
            codechefUsername: profileData.codechefUsername ?? user.profile.codechefUsername,
            atcoderUsername: profileData.atcoderUsername ?? user.profile.atcoderUsername,

            gmailLink: profileData.gmailLink ?? user.profile.gmailLink,
            githubLink: profileData.githubLink ?? user.profile.githubLink,
            linkedinLink: profileData.linkedinLink ?? user.profile.linkedinLink,
            resumeLink: profileData.resumeLink ?? user.profile.resumeLink,
            portfolioLink: profileData.portfolioLink ?? user.profile.portfolioLink,
            twitterLink: profileData.twitterLink ?? user.profile.twitterLink,

            programmingLanguages: profileData.programmingLanguages ?? user.profile.programmingLanguages,

            codingStats: profileData.codingStats ?? user.profile.codingStats ?? {},
            }
        });

        console.log("User profile updated successfully:", updatedProfile);

        return;
    } catch (error) {
        console.error('Error verifying token or saving user profile:', error);
        throw new Error('Failed to save user profile');
    }
}

