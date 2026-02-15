"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

const tabs = [
  { id: "about", label: "About" },
  { id: "structure", label: "Structure" },
  { id: "rules", label: "Rules" },
  { id: "faqs", label: "FAQ's" },
  { id: "contacts", label: "Contacts" },
];

const Ore2EquityPage = () => {
  const session = useSession();
  const [activeTab, setActiveTab] = useState<string>("about");
  const [showPopup, setShowPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { name: "", compositId: "" },
  ]);
  const [teamId, setTeamId] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [joinMessage, setJoinMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "structure":
        return (
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Round Structure
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 1: Quiz
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Objective-type quiz covering basic finance, economics,
                    current affairs, and numerical reasoning
                  </li>
                  <li>Mode: Online / Offline (as per fest logistics)</li>
                  <li>Shortlisting based on scores and accuracy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 2: Submission Round
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Shortlisted teams receive a problem statement / dataset /
                    case
                  </li>
                  <li>
                    Tasks may include economic analysis, valuation logic or
                    market interpretation
                  </li>
                  <li>
                    Submission format: PDF / PPT (specified during event)
                  </li>
                  <li>
                    Evaluation based on clarity, reasoning and depth of analysis
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 3: Final Presentation
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Top teams present before the judging panel</li>
                  <li>Presentation: 6–8 minutes; Q&amp;A: 3–4 minutes</li>
                  <li>
                    Focus on strategic thinking, justification of assumptions and
                    communication
                  </li>
                </ul>
              </div>
            </div>
          </section>
        );

      case "rules":
        return (
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Rules & Guidelines
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Team Composition & Eligibility
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Open to all undergraduate and postgraduate students (all
                    departments/institutions)
                  </li>
                  <li>
                    Team size: 1–3 members; individual participation allowed
                  </li>
                  <li>
                    No prior finance background is mandatory, but basic awareness
                    is recommended
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  General Rules
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Adhere to deadlines strictly</li>
                  <li>
                    Plagiarism or use of unfair means will lead to
                    disqualification
                  </li>
                  <li>Judges' decisions are final and binding</li>
                  <li>
                    Any clarification or rule change will be communicated by the
                    organising team
                  </li>
                  <li>Teams must maintain decorum throughout the event</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Judging Criteria
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Conceptual clarity</li>
                  <li>Analytical depth and logical consistency</li>
                  <li>Practical relevance and valuation logic</li>
                  <li>
                    Presentation quality and ability to defend arguments during
                    Q&amp;A
                  </li>
                </ul>
              </div>
            </div>
          </section>
        );

      case "faqs":
        return (
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do we need prior finance knowledge?",
                  a: "No. The event is designed to be approachable while still challenging.",
                },
                {
                  q: "Can students from non-economics backgrounds participate?",
                  a: "Yes, students from all disciplines are encouraged to participate.",
                },
                {
                  q: "Will the problem statements be released beforehand?",
                  a: "No, all materials will be shared during the event rounds.",
                },
                {
                  q: "Is this a team-only event?",
                  a: "No, both solo and team participation are allowed.",
                },
              ].map((item, index) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-white/20 bg-white/5 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-white">
                    <span>
                      {index + 1} : {item.q}
                    </span>
                    <span className="text-[#f4b000] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-white/85">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        );

      case "contacts":
        return (
          <section className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white">Contacts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: "Finance & Economics Club", phone: "(TBD)" },
                { name: "Organising Chair", phone: "(TBD)" },
              ].map((contact) => (
                <article
                  key={contact.name}
                  className="rounded-2xl border border-white/25 bg-white/5 p-5 shadow-sm"
                >
                  <p className="text-lg font-semibold text-white">
                    {contact.name}
                  </p>
                  <p className="text-white/85">Contact: {contact.phone}</p>
                </article>
              ))}
            </div>
          </section>
        );

      case "about":
      default:
        return (
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ore2Equity
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Ore2Equity is a multi-round finance and economics event designed
                to test participants on their analytical ability, financial
                intuition, and real-world economic thinking. The event simulates
                the journey of transforming a raw resource (&quot;Ore&quot;) into
                a high-value financial outcome (&quot;Equity&quot;).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Importance of the Event
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  Encourages practical application of finance and economics
                  concepts
                </li>
                <li>
                  Develops critical thinking, valuation logic, and storytelling
                  skills
                </li>
                <li>
                  Mimics real-world roles such as analysts, consultants, and
                  investment professionals
                </li>
                <li>
                  Provides a competitive yet learning-oriented platform for
                  students across disciplines
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Participation & Team Size
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>Open to all undergraduate and postgraduate students</li>
                <li>
                  Participation can be individual or in teams (1–3 members)
                </li>
                <li>Number of rounds: 3</li>
              </ul>
            </div>
          </section>
        );
    }
  };

  const handleMemberChange = (
    index: number,
    field: "name" | "compositId",
    value: string,
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", compositId: "" }]);
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedMembers);
    }
  };

  const handleRegisterTeam = async () => {
    setRegisterMessage(null);

    const leaderName = session?.data?.user?.name;
    const leaderId = session?.data?.user?.compositId;
    const filledMembers = teamMembers.filter(
      (member) => member.name.trim() || member.compositId.trim(),
    );
    let finalTeamName = teamName.trim();
    let finalMembers = filledMembers;

    if (!leaderName || !leaderId) {
      setRegisterMessage({
        type: "error",
        text: "❌ Please sign in to register for this event.",
      });
      return;
    }

    if (filledMembers.length === 0) {
      finalMembers = [{ name: leaderName, compositId: leaderId }];
      if (!finalTeamName) {
        finalTeamName = `Ore2Equity_${leaderId}`;
      }
    } else {
      const hasLeader = filledMembers.some(
        (member) => member.compositId.trim() === leaderId,
      );
      if (!hasLeader) {
        finalMembers = [
          { name: leaderName, compositId: leaderId },
          ...filledMembers,
        ];
      }
    }

    // Validation
    if (!finalTeamName) {
      setRegisterMessage({
        type: "error",
        text: "Team name is required.",
      });
      return;
    }

    if (finalMembers.some((m) => !m.name.trim() || !m.compositId.trim())) {
      setRegisterMessage({
        type: "error",
        text: "Please fill in all member names and COMPOSIT IDs.",
      });
      return;
    }

    try {
      setRegisterLoading(true);
      const res = await axios.post("/api/event/create-team", {
        teamName: finalTeamName,
        event: "Ore2Equity",
        leaderId,
        members: finalMembers.map((member) => ({
          name: member.name,
          compositId: member.compositId,
        })),
      });

      console.log("Team Registered:", res.data);
      setRegisterMessage({
        type: "success",
        text: "✅ Team created successfully!",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setTeamName("");
        setTeamMembers([{ name: "", compositId: "" }]);
        setShowPopup(false);
        setRegisterMessage(null);
      }, 2000);
    } catch (error: any) {
      let errorMessage = "An error occurred while registering the team.";

      if (error.response?.status === 400) {
        const errorData = error.response.data;
        const errorText =
          typeof errorData.error === "string"
            ? errorData.error
            : errorData.error?.message || "";

        if (errorText.includes("Invalid") || errorText.includes("invalid")) {
          if (
            errorText.includes("compositId") ||
            errorText.includes("Composit ID")
          ) {
            errorMessage =
              "❌ Invalid COMPOSIT ID provided. Please check and try again.";
          } else if (errorText.includes("team data")) {
            errorMessage =
              "❌ Invalid team data. Please fill in all fields correctly.";
          } else {
            errorMessage = `❌ ${errorText}`;
          }
        } else if (
          errorText.includes("not found") ||
          errorText.includes("does not exist")
        ) {
          errorMessage =
            "❌ One or more members do not exist. Please verify all COMPOSIT IDs are correct.";
        } else if (errorText.includes("already")) {
          if (errorText.includes("registered")) {
            errorMessage =
              "❌ Team already registered for this event. One team per member is allowed.";
          } else if (errorText.includes("created")) {
            errorMessage =
              "❌ Leader has already created a team for this event. One team per leader is allowed.";
          } else {
            errorMessage = `❌ ${errorText}`;
          }
        } else if (errorText.includes("exists")) {
          errorMessage =
            "❌ User already exists in another team. Please check member details.";
        } else if (errorText) {
          errorMessage = `❌ ${errorText}`;
        }
      } else if (error.response?.status === 404) {
        errorMessage =
          "❌ One or more members do not exist. Please verify all COMPOSIT IDs are correct.";
      } else if (error.response?.status === 409) {
        errorMessage =
          "❌ Team name already exists. Please choose a different name.";
      } else if (error.response?.status === 401) {
        errorMessage = "❌ Unauthorized. Please sign in again.";
      } else if (error.response?.status === 500) {
        errorMessage = "❌ Internal server error. Please try again later.";
      } else if (error.message === "Network Error") {
        errorMessage = "❌ Network error. Please check your connection.";
      }

      setRegisterMessage({
        type: "error",
        text: errorMessage,
      });
      console.error("Error registering team:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    try {
      const res = await axios.post("/api/event/join-team", {
        teamId,
        compositId: session?.data?.user?.compositId,
      });
      setJoinMessage({
        type: "success",
        text: "✅ You joined the team successfully!",
      });
      setTeamId("");
      setTimeout(() => {
        setShowJoinPopup(false);
        setJoinMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error joining team:", error);
      let errorMessage = "An error occurred while joining the team.";
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        errorMessage = errorData.message || errorMessage;
      }
      setJoinMessage({
        type: "error",
        text: `❌ ${errorMessage}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-38 text-white md:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#800000]/50 bg-gradient-to-br from-[#800000]/70 via-[#0b4f8c]/65 to-[#f4b000]/60 shadow-[0_20px_90px_-55px_rgba(128,0,0,0.9)]">
        <div className="grid gap-8 lg:grid-cols-[340px,1fr] md:grid-cols-1">
          <aside className="flex flex-col gap-6 border-b border-white/15 p-8 md:border-b-0 md:border-r">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-white">
                Ore2Equity
              </h1>
              <p className="text-base leading-relaxed text-white/85">
                Test your financial intuition and analytical ability. Transform
                raw resources into high-value equity through multi-round
                challenges.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              <button
                key="Create Team"
                type="button"
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#800000] hover:bg-[#a01111]"
                onClick={() => setShowPopup(true)}
              >
                Create Team
              </button>
              <button
                key="Join Team"
                type="button"
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#0b4f8c] hover:bg-[#0d5fa8]"
                onClick={() => setShowJoinPopup(true)}
              >
                Join Team
              </button>
              <button
                key="Rules & Regulations"
                type="button"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Ore2Equity_2026.pdf";
                  link.download = "Rules_and_Regulations.pdf";
                  link.click();
                }}
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#f4b000] hover:bg-[#ffbf1f]"
              >
                Rules & Regulations
              </button>
            </div>

            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 text-sm text-white shadow-inner">
              <p className="font-semibold">Need help?</p>
              <p className="mt-1 text-white/80">
                Check the tabs on the right for structure, rules, FAQs, and
                contact points.
              </p>
            </div>
          </aside>

          <main className="flex flex-col gap-6 p-6 lg:p-10">
            <nav className="relative flex flex-wrap justify-center gap-2 rounded-2xl border border-white/20 bg-[#800000] shadow-sm md:grid md:grid-cols-5">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 text-center text-sm font-bold uppercase tracking-wide transition ${isActive
                        ? "text-[#f4b000]"
                        : "text-white hover:bg-white/15"
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
              <div
                className="absolute bottom-0 left-0 h-1 w-1/5 bg-[#f4b000] transition-transform duration-300 hidden md:block"
                style={{
                  transform: `translateX(${tabs.findIndex((tab) => tab.id === activeTab) * 100
                    }%)`,
                }}
              />
            </nav>

            <div className="rounded-3xl border border-white/25 bg-white/5 p-6 shadow-inner md:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Popup for team registration */}
      {showPopup && session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="w-full max-w-xl rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Register Team
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Team Name
                </label>
                <input
                  aria-label="Team Name"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
                />
              </div>
              {teamMembers.map((member, index) => (
                <div key={index} className="flex space-x-4 items-center">
                  <div className="flex-[2]">
                    <input
                      aria-label={`Member ${index + 1} Name`}
                      type="text"
                      placeholder="Member Name"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      aria-label={`Member ${index + 1} Composit ID`}
                      type="text"
                      placeholder="Composit ID"
                      value={member.compositId}
                      onChange={(e) =>
                        handleMemberChange(index, "compositId", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
                    />
                  </div>
                  {teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-white/60 hover:text-red-500 text-2xl font-bold transition focus:outline-none"
                      aria-label={`Remove member ${index + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addTeamMember}
                  disabled={teamMembers.length >= 3}
                  className="rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-4 py-2 text-sm font-medium text-white shadow-lg focus:outline-none hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Member{" "}
                  {teamMembers.length < 3
                    ? `(${teamMembers.length}/3)`
                    : "(Max)"}
                </button>
              </div>
              {registerMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-md border px-3 py-2 text-sm ${registerMessage.type === "success"
                      ? "border-emerald-800/40 bg-emerald-950/40 text-emerald-200"
                      : "border-red-800/40 bg-red-950/40 text-red-200"
                    }`}
                >
                  {registerMessage.text}
                </motion.div>
              )}
              <motion.button
                type="button"
                onClick={handleRegisterTeam}
                disabled={registerLoading}
                whileHover={{
                  scale: registerLoading ? 1 : 1.02,
                  boxShadow: "0 0 24px rgba(139,0,0,0.45)",
                }}
                whileTap={{ scale: registerLoading ? 1 : 0.98 }}
                className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {registerLoading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Registering…
                    </>
                  ) : (
                    <>Register Team</>
                  )}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ x: "-100%" }}
                  animate={{ x: registerLoading ? "100%" : "-100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "linear",
                  }}
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
              </motion.button>
            </form>
          </div>
        </div>
      )}

      {/* Join Team popup */}
      {showJoinPopup && session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowJoinPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Join Team
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Team ID
                </label>
                <input
                  aria-label="Team ID"
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
                />
              </div>
              {joinMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-md border px-3 py-2 text-sm ${joinMessage.type === "success"
                      ? "border-emerald-800/40 bg-emerald-950/40 text-emerald-200"
                      : "border-red-800/40 bg-red-950/40 text-red-200"
                    }`}
                >
                  {joinMessage.text}
                </motion.div>
              )}
              <button
                type="button"
                onClick={handleJoinTeam}
                className="w-full rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none hover:scale-105"
              >
                Join Team
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Login required popup for registration */}
      {showPopup && !session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Login Required
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Please sign in to register your team.
            </p>
            <button
              type="button"
              onClick={() => signIn()}
              className="w-full rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Login required popup for joining */}
      {showJoinPopup && !session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowJoinPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Login Required
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Please sign in to join a team.
            </p>
            <button
              type="button"
              onClick={() => signIn()}
              className="w-full rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ore2EquityPage;
