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

const RefractPage = () => {
  const session = useSession();
  const [activeTab, setActiveTab] = useState<string>("about");
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "structure":
        return (
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Event Structure
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Single Round – Online Submission
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    <strong>Submission Period:</strong> 4th - 26th March, 2026
                  </li>
                  <li>
                    <strong>Submission Mode:</strong> Online via official
                    COMPOSIT website
                  </li>
                  <li>
                    <strong>Result Announcement:</strong> 29th March, 2026
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Categories
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    <strong>Photography</strong> - Original photographs with
                    basic editing allowed
                  </li>
                  <li>
                    <strong>Videography</strong> - Creative videos up to 3
                    minutes
                  </li>
                  <li>
                    <strong>Meme Creation</strong> - Theme-based original memes
                  </li>
                  <li>
                    <strong>Poster Designing</strong> - Digital or hand-drawn
                    designs
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Submission Guidelines
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Participants must register through the official COMPOSIT
                    website
                  </li>
                  <li>Maximum one entry per category per participant</li>
                  <li>
                    All submissions must adhere to the announced theme:{" "}
                    <strong>&quot;Rare Earth Materials&quot;</strong>
                  </li>
                  <li>
                    Entries evaluated based on creativity, originality,
                    relevance to theme, visual impact, and execution
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Theme: &quot;Rare Earth Materials&quot;
                </h3>
                <p className="text-white/90 mb-3">
                  Creatively interpret the theme through visual storytelling and
                  artistic expression. Explore technical, abstract,
                  environmental, industrial, societal, or futuristic
                  perspectives.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Role of rare earth materials in modern technology</li>
                  <li>Mining and extraction processes</li>
                  <li>Environmental impact and sustainability</li>
                  <li>Recycling and circular economy</li>
                  <li>Future applications and innovations</li>
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
                  Category Guidelines
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white/95 mb-1">
                      📸 Photography
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-white/90">
                      <li>Original photograph taken by participant</li>
                      <li>
                        Basic editing allowed (color correction, cropping,
                        lighting)
                      </li>
                      <li>AI-generated images not allowed</li>
                      <li>Format: JPEG/PNG</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white/95 mb-1">
                      🎬 Videography
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-white/90">
                      <li>Maximum duration: 3 minutes</li>
                      <li>Original content created by participant</li>
                      <li>
                        Background music allowed (copyright compliance required)
                      </li>
                      <li>Format: MP4</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white/95 mb-1">
                      😂 Meme Creation
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-white/90">
                      <li>Original and theme-based</li>
                      <li>No offensive or derogatory content</li>
                      <li>Format: JPEG/PNG</li>
                      <li>Clear and readable text mandatory</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white/95 mb-1">
                      🎨 Poster Designing
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-white/90">
                      <li>Must align with announced theme</li>
                      <li>Digital or hand-drawn scanned designs allowed</li>
                      <li>Format: JPEG/PNG/PDF</li>
                      <li>Originality is key - minimal plagiarism tolerance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  General Rules
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Event consists of a single submission round</li>
                  <li>
                    All participants must register through COMPOSIT website
                    before submission
                  </li>
                  <li>
                    Entries must be original and created solely by the
                    participant
                  </li>
                  <li>
                    Plagiarism, AI-generated content, or copyright violations
                    result in disqualification
                  </li>
                  <li>Late submissions will not be accepted</li>
                  <li>
                    Participants can submit in multiple categories but only one
                    entry per category
                  </li>
                  <li>
                    Top 3 entries overall (across all categories) receive cash
                    prizes totaling Rs. 5,000
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Judging Criteria
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    <strong>Creativity and Originality</strong> - Unique
                    perspective and creative expression
                  </li>
                  <li>
                    <strong>Relevance to Theme</strong> - Clear connection to
                    &quot;Rare Earth Materials&quot;
                  </li>
                  <li>
                    <strong>Aesthetic Appeal and Presentation</strong> - Visual
                    impact and composition
                  </li>
                  <li>
                    <strong>Technical Quality</strong> - Resolution, clarity,
                    and production standards
                  </li>
                  <li>
                    <strong>Impact and Engagement</strong> - Ability to engage
                    and captivate audience
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
                  q: "What is the procedure for registration?",
                  a: "All participants must register through the official COMPOSIT website and obtain a participant ID before submitting their entries.",
                },
                {
                  q: "Can I participate in more than one category?",
                  a: "Yes, participants may submit entries in multiple categories. However, only one entry per category is allowed.",
                },
                {
                  q: "Can I edit my submission after uploading it?",
                  a: "No, changes are not allowed after the submission deadline (26th March, 2026).",
                },
                {
                  q: "Is team participation allowed?",
                  a: "No, REFRACT is strictly an individual participation event.",
                },
                {
                  q: "What happens if plagiarism is detected?",
                  a: "The participant will be immediately disqualified from the competition.",
                },
                {
                  q: "Will certificates be provided?",
                  a: "Yes, all participants will receive participation certificates. Winners will receive certificates along with prize money.",
                },
                {
                  q: "What happens in case of a tie?",
                  a: "In the event of a tie, judges will re-evaluate entries based on creativity and originality to determine the winner.",
                },
                {
                  q: "Can I submit AI-generated content?",
                  a: "No, AI-generated images and manipulated content are not allowed. Original content is required.",
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
                { name: "Ayush Ogale", phone: "8167069056" },
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
                REFRACT
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                REFRACT is a creative flagship event of COMPOSIT that celebrates
                imagination, expression, and storytelling through visual media.
                Designed to bring out the artistic side of participants, this
                event invites submissions across multiple creative domains
                including photography, videography, meme creation, and poster
                designing.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Event Overview</h3>
              <p className="text-white/90">
                Participants will interpret themes in their own unique way and
                submit original creative works that reflect innovation, clarity
                of thought, and impactful storytelling. REFRACT aims to provide
                a platform for creators to showcase their artistic vision and
                compete in a dynamic and expressive environment.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Key Details</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Theme:</strong> Rare Earth Materials
                </li>
                <li>
                  <strong>Submission Period:</strong> 4th - 26th March, 2026
                </li>
                <li>
                  <strong>Result Announcement:</strong> 29th March, 2026
                </li>
                <li>
                  <strong>Prize Money:</strong> Rs. 5,000 (Top 3 entries)
                </li>
                <li>
                  <strong>Participation Type:</strong> Individual Only
                </li>
                <li>
                  <strong>Eligibility:</strong> Open to All
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Categories</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Photography</strong> - Capture perspectives on rare
                  earth materials through visual storytelling
                </li>
                <li>
                  <strong>Videography</strong> - Express creativity through
                  motion and audio (3 minutes max)
                </li>
                <li>
                  <strong>Meme Creation</strong> - Use humor to convey
                  meaningful messages about the theme
                </li>
                <li>
                  <strong>Poster Designing</strong> - Create impactful designs
                  that communicate your vision
                </li>
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
  ) => {};

  const addTeamMember = () => {};

  const removeTeamMember = (index: number) => {};

  const handleRegisterTeam = async () => {
    setRegisterMessage(null);

    if (!session?.data?.user) {
      setRegisterMessage({
        type: "error",
        text: "❌ Please sign in to register for this event.",
      });
      return;
    }

    try {
      setRegisterLoading(true);
      const res = await axios.post("/api/event/create-team", {
        teamName: "Refract_Individual",
        event: "Refract",
        leaderId: session.data.user.compositId,
        members: [
          {
            name: session.data.user.name,
            compositId: session.data.user.compositId,
          },
        ],
      });

      console.log("Registered for Refract:", res.data);
      setRegisterMessage({
        type: "success",
        text: "✅ Successfully registered for Refract!",
      });

      setTimeout(() => {
        setShowRegisterPopup(false);
        setRegisterMessage(null);
      }, 2000);
    } catch (error: any) {
      let errorMessage = "An error occurred while registering for the event.";

      if (error.response?.status === 400) {
        const errorData = error.response.data;
        const errorText =
          typeof errorData.error === "string"
            ? errorData.error
            : errorData.error?.message || "";

        if (errorText.includes("Invalid") || errorText.includes("invalid")) {
          errorMessage =
            "❌ Invalid registration data. Please check your details.";
        } else if (
          errorText.includes("not found") ||
          errorText.includes("does not exist")
        ) {
          errorMessage = "❌ Your profile was not found. Please sign in again.";
        } else if (errorText.includes("already")) {
          errorMessage = "❌ You are already registered for this category.";
        } else if (errorText) {
          errorMessage = `❌ ${errorText}`;
        }
      } else if (error.response?.status === 404) {
        errorMessage = "❌ Your profile was not found. Please sign in again.";
      } else if (error.response?.status === 409) {
        errorMessage = "❌ You are already registered for Refract.";
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
      console.error("Error registering for Refract:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleJoinTeam = async () => {};

  return (
    <div className="min-h-screen bg-transparent px-4 py-38 text-white md:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#800000]/50 bg-linear-to-br from-[#800000]/70 via-[#0b4f8c]/65 to-[#f4b000]/60 shadow-[0_20px_90px_-55px_rgba(128,0,0,0.9)]">
        <div className="grid gap-8 lg:grid-cols-[340px,1fr] md:grid-cols-1">
          <aside className="flex flex-col gap-6 border-b border-white/15 p-8 md:border-b-0 md:border-r">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-white">REFRACT</h1>
              <p className="text-base leading-relaxed text-white/85">
                Celebrate imagination and expression through visual media.
                Showcase your artistic vision across photography, videography,
                memes, and poster design.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              <button
                key="Register"
                type="button"
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#800000] hover:bg-[#a01111]"
                onClick={() => setShowRegisterPopup(true)}
              >
                Register
              </button>
              <button
                key="Rules & Regulations"
                type="button"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Refract Event Draft.pdf";
                  link.download = "Refract_Rules_and_Guidelines.pdf";
                  link.click();
                }}
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#f4b000] hover:bg-[#ffbf1f]"
              >
                Rules & Regulations
              </button>
            </div>
            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 text-sm text-white shadow-inner">
              <p className="font-semibold">📸 Event Info</p>
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
              <div
                className="absolute bottom-0 left-0 h-1 w-1/5 bg-[#f4b000] transition-transform duration-300 hidden md:block"
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

      {/* Registration popup for individual participants */}
      {showRegisterPopup && session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowRegisterPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Register for REFRACT
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Your Name
                </label>
                <input
                  aria-label="Your Name"
                  type="text"
                  value={session.data.user.name || ""}
                  disabled
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  COMPOSIT ID
                </label>
                <input
                  aria-label="COMPOSIT ID"
                  type="text"
                  value={session.data.user.compositId || ""}
                  disabled
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
                />
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
                whileTap={{
                  scale: registerLoading ? 1 : 0.98,
                }}
                className="relative w-full overflow-hidden rounded-lg bg-linear-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
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
                    <>Register</>
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
                  className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
                />
              </motion.button>
            </form>
          </div>
        </div>
      )}

      {/* Login required popup for registration */}
      {showRegisterPopup && !session?.data?.user && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setShowRegisterPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-black/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white/90 mb-4">
              Login Required
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Please sign in to register for REFRACT.
            </p>
            <button
              type="button"
              onClick={() => signIn()}
              className="w-full rounded-lg bg-linear-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefractPage;
