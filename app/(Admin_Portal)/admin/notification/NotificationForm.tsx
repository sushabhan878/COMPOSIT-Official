"use client";

import { useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";

type Event = {
  _id: string;
  eventName: string;
};

export default function NotificationForm() {
  const [category, setCategory] = useState<"user" | "sa" | "event">("user");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ---------------- Fetch Events ---------------- */
  useEffect(() => {
    if (category === "event") {
      fetch("/api/admin/events")
        .then((res) => res.json())
        .then((data) => setEvents(data.events || []))
        .catch(() => setEvents([]));
    }
  }, [category]);

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/admin/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        eventId: category === "event" ? eventId : undefined,
        subject,
        body,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error || "Failed to send notification");
      return;
    }

    setSubject("");
    setBody("");
    setEventId("");
    setMessage(`✅ Sent to ${data.sent} recipients`);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 backdrop-blur-2xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Email notification
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-bold text-white">Compose & Send</h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Markdown supported
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="space-y-2">
            <label className="text-white/70 text-sm">
              Notification Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              aria-label="Notification Category"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#7a1f2a] focus:ring-2 focus:ring-[#7a1f2a]/40 transition"
            >
              <option value="user">All Users</option>
              <option value="sa">Campus Ambassadors</option>
              <option value="event">Event Participants</option>
            </select>
            <p className="text-xs text-white/50">
              Choose who should receive this email.
            </p>
          </div>

          {category === "event" && (
            <div className="space-y-2">
              <label className="text-white/70 text-sm">Select Event</label>
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                aria-label="Select Event"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#7a1f2a] focus:ring-2 focus:ring-[#7a1f2a]/40 transition"
              >
                <option value="">Choose event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.eventName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-white/50">
                Targets only participants of the selected event.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/70 text-sm">Email Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Important update regarding COMPOSIT"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#7a1f2a] focus:ring-2 focus:ring-[#7a1f2a]/40 transition"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white/70 text-sm">Email Body</label>
              <span className="text-xs text-white/50">Markdown supported</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <MarkdownEditor value={body} onChange={setBody} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between">
            <p className="text-xs text-white/60">
              Tip: Keep it concise and add clear calls to action.
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7a1f2a] via-[#7a1f2a] to-[#2d4f9e] hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
