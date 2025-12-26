import connectDb from '@/lib/db'
import { auth } from '@/auth'
import Event from '@/models/event.model'
import Team from '@/models/team.model'
import ProfileClient from './ProfileClient'
import React from 'react'

const Page = async () => {
  await connectDb()
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">Please sign in</h1>
          <p className="text-white/60">Sign in to view your profile and registrations.</p>
        </div>
      </div>
    )
  }

  const registeredEventIds = (session.user.registeredEvents || []) as string[]
  const eventsDocs = registeredEventIds.length
    ? await Event.find({ _id: { $in: registeredEventIds } }).lean()
    : []
  const events = eventsDocs.map((e: any) => ({ id: e._id.toString(), name: e.eventName as string }))

  let teamName: string | null = null
  let teamMembers: string[] = []
  if (session.user.team) {
    const teamDoc: any = await Team.findById(session.user.team).lean()
    if (teamDoc) {
      teamName = teamDoc.teamName || null
      teamMembers = (teamDoc.members || []).map((m: any) => m?.name).filter(Boolean)
    }
  }

  const user = { name: session.user.name, email: session.user.email, image: session.user.image || undefined }

  return <ProfileClient user={user} events={events} team={{ teamName, teamMembers }} />
}

export default Page
