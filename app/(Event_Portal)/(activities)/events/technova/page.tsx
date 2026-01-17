"use client";

import Team from "@/models/team.model";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

const tabs = [
  { id: "about", label: "About" },
  { id: "structure", label: "Structure" },
  { id: "faqs", label: "FAQ's" },
  { id: "contacts", label: "Contacts" },
];

const TechnovaPage = () => {
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
            <h2 className="text-3xl font-extrabold text-white">Structure</h2>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Number of Rounds
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-[#f4b000] mb-2">
                    Round 1: Abstract Submission at Unstop
                  </h4>
                  <p className="text-white/90">
                    Participants must submit an abstract (maximum 1000 words) of
                    their paper, highlighting the objective, methodology, and
                    key findings or insights. Shortlisted teams will be notified
                    of the final presentation.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4b000] mb-2">
                    Round 2: Classical Technical Conference at IIT Kharagpur
                    Campus
                  </h4>
                  <p className="text-white/90 mb-2">
                    Each team will present their paper in front of a panel of
                    judges. Presentations must be 10 minutes long, followed by a
                    5-minute Q&A session with the judges.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Eligibility Criteria
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  Open to all UG, PG and PhD students in the science and
                  engineering domains.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Participation Type
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  Maximum 3 members per team (individual participation is
                  allowed).
                </li>
                <li>
                  Each team can submit their presentation under one theme only.
                </li>
              </ul>
            </div>
          </section>
        );

      case "faqs":
        return (
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Rules & Guidelines
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can teams span different departments?",
                  a: "Yes. Cross-department and cross-institute teams are welcome.",
                },
                {
                  q: "Is there a registration fee?",
                  a: "No. Registration is free for all participants.",
                },
                {
                  q: "Can I participate individually?",
                  a: "Yes. Individual participation is allowed. You can submit as a team of one.",
                },
                {
                  q: "What happens if we exceed the presentation time limit?",
                  a: "Time limit penalties are as follows: 0-1 min: 10% of presentation marks, 1-2 mins: 20% of presentation marks, Greater than 2 mins: 50% of presentation marks.",
                },
                {
                  q: "Do I need to have a published paper?",
                  a: "No. Having a publication currently is not required, but it must be a proper draft.",
                },
                {
                  q: "What if plagiarism is detected?",
                  a: "Participants will be disqualified immediately if any type of plagiarism is detected.",
                },
                {
                  q: "Can a team submit papers in multiple themes?",
                  a: "No. Each team can submit their presentation under one theme only.",
                },
                {
                  q: "How will evaluation be done?",
                  a: "Evaluation will be done based on both round performances by the team. Factors include relevance of the topic, technical depth, presentation quality, and Q&A responses.",
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
                { name: "Debarshini Mondal", phone: "9933163116" },
                { name: "Jayesh Andhale", phone: "9767922637" },
                { name: "Ayush Ogle", phone: "8167069056" },
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
                Technova
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Showcase your scientific brilliance and innovative ideas at
                Technova! This event provides a platform for students to present
                technical papers or original research work in the fields of
                materials science and engineering. Participants can choose from
                one of the following themes:
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 1: Fundamentals & Extraction of Rare Earth Materials
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    Rare Earth Element (REE) classification and electronic
                    structure
                  </li>
                  <li>Mining, beneficiation, and separation techniques</li>
                  <li>
                    Hydrometallurgical and pyrometallurgical processing of REEs
                  </li>
                  <li>Sustainable and green extraction methods</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 2: Rare Earths in Energy Technologies
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    Rare earth permanent magnets for wind turbines and EV motors
                  </li>
                  <li>
                    REE-based materials in hydrogen production and storage
                  </li>
                  <li>Role of lanthanides in batteries and supercapacitors</li>
                  <li>Rare earth oxides in solid oxide fuel cells (SOFCs)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 3: Rare Earth Functional Materials
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    Luminescent and phosphor materials for LEDs and displays
                  </li>
                  <li>Magnetic materials and spintronic applications</li>
                  <li>Optical, laser, and photonic materials based on REEs</li>
                  <li>
                    Dielectric, ferroelectric, and multiferroic rare earth
                    compounds
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 4: Advanced & Emerging Applications of Rare Earths
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    Rare earths in quantum materials and advanced electronics
                  </li>
                  <li>
                    REEs in thermoelectric and energy-harvesting materials
                  </li>
                  <li>Rare earth nanomaterials and nanocomposites</li>
                  <li>
                    Additive manufacturing and advanced processing of REE-based
                    materials
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 5: Rare Earths for Sustainability & Circular Economy
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    Recycling and recovery of rare earth elements from e-waste
                  </li>
                  <li>
                    Substitution and reduction strategies for critical REEs
                  </li>
                  <li>Life-cycle assessment of rare earth materials</li>
                  <li>
                    Environmental and geopolitical challenges of rare earth
                    supply chains
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 6: Rare Earths in Defense, Space & Nuclear Applications
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>Radiation-resistant rare earth ceramics</li>
                  <li>REEs in nuclear fuel and reactor materials</li>
                  <li>Aerospace and space-grade rare earth alloys</li>
                  <li>High-temperature and extreme-environment applications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Theme 7: Computational & Data-Driven Approaches
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-white/90">
                  <li>
                    First-principles and DFT studies on rare earth materials
                  </li>
                  <li>Machine learning for discovery of REE-based compounds</li>
                  <li>
                    Modeling of magnetic, optical, and electronic properties
                  </li>
                  <li>Multiscale simulations for rare earth material design</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-sm text-white/90">
              <p className="font-semibold text-white mb-2">📝 Note:</p>
              <p>
                Having a publication currently is not required, but it must be a
                proper draft.
              </p>
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

    // Validation

    if (!teamName.trim()) {
      setRegisterMessage({
        type: "error",
        text: "Team name is required.",
      });
      return;
    }

    if (teamMembers.some((m) => !m.name.trim() || !m.compositId.trim())) {
      setRegisterMessage({
        type: "error",
        text: "Please fill in all member names and COMPOSIT IDs.",
      });
      return;
    }

    try {
      setRegisterLoading(true);
      const res = await axios.post("/api/event/create-team", {
        teamName,
        event: "Technova",
        leaderId: session?.data?.user?.compositId,
        members: teamMembers.map((member) => ({
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
        // Handle both error formats: { error: "message" } and { error: { message: "..." } }
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
      // Logic to handle joining a team
      const res = await axios.post("/api/event/join-team", {
        teamId,
        compositId: session?.data?.user?.compositId,
      });
      setJoinMessage({
        type: "success",
        text: "✅ You joined the team successfully!",
      });
      // Clear the team ID input
      setTeamId("");
      // Close popup after 2 seconds
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
              <h1 className="text-4xl font-extrabold text-white">Technova</h1>
              <p className="text-base leading-relaxed text-white/85">
                Build your team, register, and explore event details. Use the
                quick actions below to get started.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              {/**
               * Modified button group to include onClick handlers
               */}
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
                  link.href = "/Technova_2026.pdf"; // Update with the actual path to the PDF
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
                Check the tabs on the right for structure, FAQs, and contact
                points.
              </p>
            </div>
          </aside>

          <main className="flex flex-col gap-6 p-6 lg:p-10">
            {/* Remove sliding effect for mobile screens. */}
            <nav className="relative flex flex-wrap justify-center gap-2 rounded-2xl border border-white/20 bg-[#800000] shadow-sm md:grid md:grid-cols-4">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 text-center text-sm font-bold uppercase tracking-wide transition ${
                      isActive
                        ? "text-[#f4b000]"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
              {/** Sliding effect removed for mobile screens */}
              <div
                className="absolute bottom-0 left-0 h-1 w-1/4 bg-[#f4b000] transition-transform duration-300 hidden md:block"
                style={{
                  transform: `translateX(${
                    tabs.findIndex((tab) => tab.id === activeTab) * 100
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
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
                  className={`rounded-md border px-3 py-2 text-sm ${
                    registerMessage.type === "success"
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">Join Team</h2>
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
                  className={`rounded-md border px-3 py-2 text-sm ${
                    joinMessage.type === "success"
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
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

export default TechnovaPage;
