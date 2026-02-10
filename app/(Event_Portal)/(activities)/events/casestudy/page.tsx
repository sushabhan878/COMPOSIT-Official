"use client";

import Team from "@/models/team.model";
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

const CaseStudyPage = () => {
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

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 1: Online Aptitude Quiz
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Conducted on the Unstop platform</li>
                  <li>
                    Tests logical thinking, problem-solving abilities, and
                    quantitative aptitude
                  </li>
                  <li>Bonus points awarded to top scorers</li>
                  <li>
                    On-spot registration at Unstop allowed up to the round
                    deadline
                  </li>
                  <li>Top-performing teams proceed to Round 2</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 2: Problem Statement Analysis
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Top 25 teams from Round 1 invited</li>
                  <li>Invitations sent via email to team leads</li>
                  <li>
                    Problem Statement released on Unstop and official COMPOSIT
                    website
                  </li>
                  <li>
                    Teams must analyze the problem and design innovative,
                    feasible solutions
                  </li>
                  <li>
                    Submit detailed abstract/report following all requirements
                  </li>
                  <li>Font style: Arial, Font size: 12 for submissions</li>
                  <li>
                    Deadline is mandatory - late submissions disqualify teams
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 3: Offline Presentation
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Location: IIT Kharagpur campus</li>
                  <li>Top 7-10 teams selected for presentation</li>
                  <li>
                    Teams present comprehensive solutions to panel of judges
                  </li>
                  <li>Presentation: 8-10 slides (strict limit)</li>
                  <li>
                    Time limit: 10 minutes (strict enforcement with penalties)
                  </li>
                  <li>Allowed: sound effects, video clips, and graphics</li>
                  <li>Q&A Session: 5 minutes with judging panel</li>
                  <li>
                    Time penalties: 0-1 min (10%), 1-2 mins (20%),{" > "}2 mins
                    (50%) of marks
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
                  Team Composition
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Maximum 3 participants per team</li>
                  <li>Individual participation is also allowed</li>
                  <li>
                    No changes to team composition allowed after registration
                    deadline
                  </li>
                  <li>
                    Cross-institutional teams allowed with valid identification
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Event Progression
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Event consists of three rounds: Aptitude Quiz + Analysis
                    Round + Presentation
                  </li>
                  <li>Round 1 held online on Unstop</li>
                  <li>Approximately top 25 teams selected from Round 1</li>
                  <li>
                    Top 7-10 teams selected from Round 2 for final presentation
                  </li>
                  <li>Top 3 teams receive cash prizes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Submission Requirements
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    Round 2: Submit detailed abstract/report (minimum 5 pages)
                  </li>
                  <li>
                    Report must include: background, objectives, methods,
                    results, conclusion
                  </li>
                  <li>Font style: Arial, font size: 12</li>
                  <li>
                    Deadline is mandatory - late submissions disqualify teams
                  </li>
                  <li>
                    External resources allowed but require proper citations
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Presentation Guidelines
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Slide limit: 8-10 slides (strictly enforced)</li>
                  <li>Time limit: 10 minutes</li>
                  <li>Sound effects, video clips, and graphics are allowed</li>
                  <li>Q&A session: 5 minutes with judges</li>
                  <li>
                    Time penalties: 0-1 min (10%), 1-2 mins (20%),{" > "}2 mins
                    (50%)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Judging Criteria
                </h3>
                <div className="space-y-2 pl-5 text-white/90">
                  <p>
                    <strong>Evaluation based on:</strong>
                  </p>
                  <ul className="list-disc space-y-1 pl-5 mt-2">
                    <li>Creativity and innovation of solution</li>
                    <li>Feasibility of approach</li>
                    <li>Depth of analysis and research</li>
                    <li>Clarity of thought and presentation</li>
                    <li>Q&A session performance</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  General Rules
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Judges' decisions are final and binding</li>
                  <li>
                    In case of tie, team with better presentation score wins
                  </li>
                  <li>
                    Any action violating stated rules will immediately
                    disqualify the team
                  </li>
                  <li>
                    5 points from the first round are devoted to final results
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
                  q: "What is the procedure for registration for the event? Do all the members have to be registered?",
                  a: "Yes, all participants must first be registered through the COMPOSIT website, after which they will be provided with a participant ID.",
                },
                {
                  q: "Can we make changes to our team after registration?",
                  a: "No changes to the team composition will be allowed after the registration deadline.",
                },
                {
                  q: "Can a team consist of participants from different institutions?",
                  a: "Yes, cross-institutional teams are allowed as long as all members register and provide valid identification.",
                },
                {
                  q: "Are there any prerequisites for participating in the case study event?",
                  a: "No specific prerequisites are required. However, participants are encouraged to have basic knowledge of the domain related to the case study.",
                },
                {
                  q: "What will happen if the participating team submits their abstract idea after the deadline?",
                  a: "The team will be disqualified and not allowed to continue further in the event.",
                },
                {
                  q: "Will the first-round results weigh the final results?",
                  a: "Yes, 5 points are devoted from the first round to the final results.",
                },
                {
                  q: "What abstract format will be submitted in the second round?",
                  a: "The abstract should be a report of at least five pages, including the background, objectives, methods used for analyzing and collecting the data, results and conclusion of the given problem statement. This report must have the font style Arial and font size 12.",
                },
                {
                  q: "How will we know if we are qualified for the final round?",
                  a: "All teams submitting the abstract following all the rules and themes of the problem statement will be sent a confirmation mail regarding further details about the final round. There will be no elimination after the first round.",
                },
                {
                  q: "Is there a slide limit for the presentation?",
                  a: "Yes. There is a slide limit of 8-10 slides for the presentation.",
                },
                {
                  q: "What are the evaluation criteria for the case study?",
                  a: "The evaluation will be based on creativity, feasibility, depth of analysis, and clarity of presentation.",
                },
                {
                  q: "Will there be a Q&A session during the final presentation?",
                  a: "Yes, the judges will have a 5-minute Q&A session after each team's presentation.",
                },
                {
                  q: "Are we allowed to use external resources for the case study?",
                  a: "Yes, you may use external resources, but proper citations must be included in your submission.",
                },
                {
                  q: "What happens in case of a tie in the final scores?",
                  a: "In the event of a tie, the team with a better score in the presentation section will be declared the winner.",
                },
                {
                  q: "Will certificates be provided to all participants?",
                  a: "Yes, all participants will receive a participation certificate, and winners will receive additional recognition and prizes.",
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
                General Case Study
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                A case study competition where teams solve real-world business
                problems by creating creative and strategic solutions.
                Participants will develop detailed plans to solve the problem,
                showing their skills in effectively handling challenging
                situations.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">How It Works</h3>
              <p className="text-white/90">
                An esteemed panel of judges will review the solutions presented
                by the teams and select the winner. Interested teams are
                encouraged to sign up and show their problem-solving abilities
                in addressing real-life challenges.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Why Participate?</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>Solve real-world business problems</li>
                <li>Develop strategic thinking and analytical skills</li>
                <li>Present solutions to industry experts</li>
                <li>Win cash prizes (Top 3 teams)</li>
                <li>Gain practical experience in case analysis</li>
                <li>Network with peers and industry professionals</li>
                <li>Receive participation certificates</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Event Importance</h3>
              <p className="text-white/90">
                General Case Study is a very essential event conducted by
                COMPOSIT, which connects Students who have brilliant ideas for
                developing the World with Industries that need brilliant minds
                to find solutions to develop the World further. The exposure and
                experience received by the participants gives them the
                confidence to tackle more such problems in the future and
                knowledge regarding their solutions' real-world applications. In
                essence, it is one of the most important events of COMPOSIT.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Participation Details
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Team Size:</strong> 1-3 participants per team
                  (individual participation allowed)
                </li>
                <li>
                  <strong>Eligibility:</strong> Open to All
                </li>
                <li>
                  <strong>Format:</strong> 3 rounds (Quiz + Analysis +
                  Presentation)
                </li>
                <li>
                  <strong>Registration:</strong> Completely Free
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Event Rounds</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Round 1:</strong> Online Aptitude Quiz on Unstop
                  (logical thinking & problem-solving)
                </li>
                <li>
                  <strong>Round 2:</strong> Problem Statement Analysis &
                  Abstract Submission (top 25 teams)
                </li>
                <li>
                  <strong>Round 3:</strong> Offline Presentation at IIT
                  Kharagpur (top 7-10 teams)
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
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, { name: "", compositId: "" }]);
    }
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
        finalTeamName = `CaseStudy_${leaderId}`;
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
        event: "CaseStudy",
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
              <h1 className="text-4xl font-extrabold text-white">Case Study</h1>
              <p className="text-base leading-relaxed text-white/85">
                Solve real-world business problems creatively. Develop strategic
                solutions and present to industry experts.
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
                  link.href = "/CaseStudy_2026.pdf"; // Update with the actual path to the PDF
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
            {/* Remove sliding effect for mobile screens. */}
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
              {/** Sliding effect removed for mobile screens */}
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

export default CaseStudyPage;
