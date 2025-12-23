import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, request) { 
                try {
                    await connectDb()
                    const email = credentials?.email
                    const password = credentials?.password as string

                    const user = await User.findOne({ email })
                    if (!user) {
                        throw new Error("User does not exist")
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password) 
                    if (!isPasswordValid) {
                        throw new Error("Invalid password")
                    }
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                } catch (error) {
                    throw new Error(`Authentication failed: ${error}`)
                }
            }
      })
    ],
    callbacks: {
        // It will dump user data into token
        jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                token.name = user.name,
                token.email = user.email,
                token.role = user.role
            }
            return token
        },

        // it will dump token data into session
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    },
    secret: process.env.AUTH_SECRET
})