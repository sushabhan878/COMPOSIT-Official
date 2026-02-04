"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileClient from "./ProfileClient";

type UserType = {
  name: string;
  email: string;
  image?: string;
  compositId?: string;
};

type EventItem = {
  id: string;
  name: string;
};

type TeamData = {
  teamName: string;
  teamId: string;
  event: string;
  members: { name: string; compositId: string }[];
};

const ProfileClientWrapper = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/profile");

      const { user: dbUser, teams } = data;

      setUser({
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image || undefined,
        compositId: dbUser.compositId || undefined,
      });

      // Extract unique event names from all teams
      if (teams?.length) {
        const uniqueEvents = new Map<string, string>();
        teams.forEach((t: any) => {
          if (t.event) {
            // Use event name as both id and name
            uniqueEvents.set(t.event, t.event);
          }
        });

        const eventList: EventItem[] = Array.from(uniqueEvents.entries()).map(
          ([eventName]) => ({
            id: eventName,
            name: eventName,
          }),
        );

        setEvents(eventList);
        setTeams(teams);
      }
    } catch (err: any) {
      console.error("Profile fetch failed", err);
      console.error("Error response:", err?.response);

      // Set error message for display
      if (err?.response?.status === 429) {
        setError("Too many requests. Please wait a minute and try again.");
      } else if (err?.response?.status === 401) {
        setError("Please sign in to view your profile.");
      } else if (err?.response?.status === 404) {
        setError("User profile not found. Please contact support.");
      } else {
        setError(
          `Failed to load profile: ${err?.response?.data?.message || err.message || "Unknown error"}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-red-400 text-xl text-center">{error}</div>
        <button
          onClick={() => {
            setError(null);
            fetchProfile();
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-white text-xl">No user data available</div>
      </div>
    );
  }

  return <ProfileClient user={user} events={events} teams={teams} />;
};

export default ProfileClientWrapper;
