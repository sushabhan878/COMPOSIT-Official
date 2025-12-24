import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },

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
                        role: user.role,
                        mobile: user.mobile,
                        gender: user.gender,
                        state: user.state,
                        city: user.city,
                        college: user.collegeName,
                        collegeId: user.collegeId,
                        department: user.department
                    }
                } catch (error) {
                    throw new Error(`Authentication failed: ${error}`)
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        // It will dump user data into token
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.mobile = user.mobile
                token.role = user.role
                token.gender = user.gender
                token.state = user.state
                token.city = user.city
                token.college = user.college
                token.collegeId = user.collegeId
                token.department = user.department
                token.image = user.image
                    
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
                session.user.mobile = token.mobile as string
                session.user.gender = token.gender as string
                session.user.state = token.state as string
                session.user.city = token.city as string
                session.user.college = token.college as string
                session.user.collegeId = token.collegeId as string
                session.user.department = token.department as string
                session.user.image = token.image as string
            }
            return session
        },

        // Callback to store data into database on google signin
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDb()
                let dbUser = await User.findOne({email: user.email})
                if (!dbUser) {
                    dbUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,

                    })
                }
                user.id = dbUser._id.toString()
                user.role = dbUser.role
                user.mobile = dbUser.mobile
                user.gender = dbUser.gender 
                user.state = dbUser.state
                user.city = dbUser.city
                user.college = dbUser.collegeName
                user.collegeId = dbUser.collegeId
                user.department = dbUser.department
            }
            return true
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