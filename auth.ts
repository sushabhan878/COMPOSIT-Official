import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import { cookies } from "next/headers"
import { join } from "path"
import { generateUniqueCompositID } from "./lib/generateCompositId"
 
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
                        mobile: user.mobile,
                        image: user.image,
                        role: user.role,
                        gender: user.gender,
                        state: user.state,
                        city: user.city,
                        collegeName: user.collegeName,
                        collegeId: user.collegeId,
                        department: user.department,
                        yearOfStudy: user.yearOfStudy,
                        joinDate: user.joinDate,
                        saId: user.saId,
                        referralLink: user.referralLink,
                        referralQrLink: user.referralQrLink,
                        SARank: user.SARank,
                        numberOfReferrals: user.numberOfReferrals,
                        team: user.team,
                        registeredEvents: user.registeredEvents,
                        cirtificates: user.cirtificates
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
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.mobile = user.mobile
                token.image = user.image
                token.role = user.role
                token.gender = user.gender
                token.state = user.state
                token.city = user.city
                token.collegeName = user.collegeName
                token.collegeId = user.collegeId
                token.department = user.department
                token.yearOfStudy = user.yearOfStudy
                token.joinDate= user.joinDate?.toString()
                token.saId= user.saId
                token.referralLink= user.referralLink
                token.referralQrLink= user.referralQrLink
                token.SARank= user.SARank
                token.numberOfReferrals= user.numberOfReferrals
                token.team= user.team
                token.registeredEvents= user.registeredEvents?.map(String)
                token.cirtificates= user.cirtificates ?.map(String)
            }

            // When session.update() is called
            if (trigger === "update") {
                token.numberOfReferrals = session.numberOfReferrals
                token.SARank = session.SARank
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
                session.user.collegeName = token.collegeName as string
                session.user.collegeId = token.collegeId as string
                session.user.department = token.department as string
                session.user.image = token.image as string
                session.user.yearOfStudy = token.yearOfStudy as string
                session.user.joinDate = token.joinDate as string
                session.user.saId = token.saId as string
                session.user.referralLink = token.referralLink as string
                session.user.referralQrLink = token.referralQrLink as string
                session.user.SARank = token.SARank as number
                session.user.numberOfReferrals = token.numberOfReferrals as number
                session.user.team = token.team as string
                session.user.registeredEvents = token.registeredEvents as string[]
                session.user.cirtificates = token.cirtificates as string[]
            }
            return session
        },

        // Callback to store data into database on google signin
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDb()
                const cookiesStore = await cookies()
                const referralCode = cookiesStore.get("referralCode")?.value
                let dbUser = await User.findOne({email: user.email})
                if (!dbUser) {
                    const compositId = await generateUniqueCompositID()
                    dbUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        compositId,
                        saId: referralCode || null,
                        joinDate: new Date(),
                    })
                }
                if (referralCode) {
                      await User.updateOne(
                        { saId: referralCode, role: "sa" },
                        { $inc: { numberOfReferrals: 1 } }
                      )
                }
                user.id = dbUser._id.toString()
                user.role = dbUser.role
                user.mobile = dbUser.mobile
                user.gender = dbUser.gender 
                user.state = dbUser.state
                user.city = dbUser.city
                user.collegeName = dbUser.collegeName
                user.collegeId = dbUser.collegeId
                user.department = dbUser.department
                user.yearOfStudy = dbUser.yearOfStudy
                user.joinDate = dbUser.joinDate
                user.saId = dbUser.saId
                user.referralLink = dbUser.referralLink
                user.referralQrLink = dbUser.referralQrLink
                user.SARank = dbUser.SARank
                user.numberOfReferrals = dbUser.numberOfReferrals
                user.team = dbUser.team
                user.registeredEvents = dbUser.registeredEvents
                user.cirtificates = dbUser.cirtificates
                // clear cookie
                cookiesStore.delete("referralCode")
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
        maxAge: 1 * 24 * 60 * 60 // 1 day
    },
    secret: process.env.AUTH_SECRET
})