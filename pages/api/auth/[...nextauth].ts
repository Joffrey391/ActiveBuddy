import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubAuthProvider from 'next-auth/providers/github';

const authOptions: NextAuthOptions = {
    providers: [
        GitHubAuthProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            async profile(profile) {
                await dbConnect()
                const oldUser = await User.findOne({ email: profile.email });
                const userProfile = {
                    email: profile.email,
                    name: profile.name | profile.login,
                    avatar: profile.avatar_url,
                    role: 'user',
                };
                if (!oldUser) {
                    const newUser = new User({
                        ...userProfile,
                        provider: 'github',
                    })
                    await newUser.save();
                } else {
                    userProfile.role = oldUser.role;
                }
                return {id: profile.id, ...userProfile};
            },
        })
    ],
    callbacks: {
        jwt({token, user}) {
            if(user) token.role = (user as any).role;
            return token;
        },
    }
}

export default NextAuth(authOptions)