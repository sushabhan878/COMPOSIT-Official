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

const ExcavatePage = () => {
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
                  <li>Tests analytical and reasoning skills</li>
                  <li>Bonus points awarded to top scorers</li>
                  <li>
                    On-spot registration at Unstop allowed up to the round
                    deadline
                  </li>
                  <li>Results mailed to selected participants</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 2: Report Submission
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Top 10-15 teams from Round 1 selected</li>
                  <li>
                    Problem Statement released on Unstop and official website
                  </li>
                  <li>
                    Teams must submit Jupyter notebook with detailed report and
                    documentation
                  </li>
                  <li>Font style: Arial, Font size: 12 for report</li>
                  <li>
                    Report should explain model approach and code snippets
                  </li>
                  <li>
                    Teams must follow all rules and problem statement themes
                  </li>
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
                  <li>Top 7 teams from Round 2 selected</li>
                  <li>Teams must prepare presentation for judging panel</li>
                  <li>Presentation slides: 8-10 slides (strict limit)</li>
                  <li>
                    Presentation time: 10 minutes (penalties for exceeding time)
                  </li>
                  <li>Q&A Session: 5 minutes with judging panel</li>
                  <li>
                    Time penalties: 0-1 min (10%), 1-2 mins (15%), {">"} 2 mins
                    (30%) of presentation marks
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
                    Event consists of three rounds: Aptitude Quiz + Submission
                    Round + Presentation Round
                  </li>
                  <li>Round 1 held online on Unstop</li>
                  <li>Approximately top 15 teams selected from Round 1</li>
                  <li>
                    Top 7 teams selected from Round 2 for final presentation
                  </li>
                  <li>Top 3 teams receive cash prizes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Submission Requirements
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Round 2: Submit Jupyter notebook with detailed report</li>
                  <li>Report font: Arial, font size: 12</li>
                  <li>
                    Deadline is mandatory - late submissions disqualify teams
                  </li>
                  <li>Report must explain model approach with code snippets</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Presentation Guidelines
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Slide limit: 8-10 slides (strictly enforced)</li>
                  <li>Presentation time: 10 minutes</li>
                  <li>Q&A session: 5 minutes with judges</li>
                  <li>
                    Time penalties: 0-1 min (10%), 1-2 mins (15%), {">"} 2 mins
                    (30%)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Judging Criteria
                </h3>
                <div className="space-y-3 pl-5 text-white/90">
                  <p>
                    <strong>Round 2:</strong> Report, model approach, and
                    accuracy
                  </p>
                  <p>
                    <strong>Round 3 Weightage:</strong>
                  </p>
                  <ul className="list-disc space-y-1 pl-5 mt-2">
                    <li>Approach: 15%</li>
                    <li>Model and accuracy: 40%</li>
                    <li>Questionnaire solutions: 10%</li>
                    <li>Q&A session: 25%</li>
                    <li>PPT: 5%</li>
                    <li>Quiz round score: 5%</li>
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
                  a: "Yes, all the participants must first register through the COMPOSIT website, after which they will receive a participant ID. Each team member must have their own COMPOSIT ID.",
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
                  q: "Are there any prerequisites for participating in the data analytics event?",
                  a: "No specific prerequisites are required. However, participants are encouraged to have basic knowledge of data science and the domain related to the problem statement.",
                },
                {
                  q: "What will happen if the participating team submits their report after the deadline?",
                  a: "The team will be disqualified and not allowed to continue further in the event.",
                },
                {
                  q: "Will the first-round results weigh the final results?",
                  a: "Yes, 5% of the final score is dependent on the results of the first round.",
                },
                {
                  q: "What report will be submitted in the second round?",
                  a: "The report should properly explain your model approach and different sections of your code using snippets of the Jupyter notebook submitted. This report must have the font style Arial and font size 12.",
                },
                {
                  q: "How will we know if we are qualified for the final round?",
                  a: "All teams submitting the report following all the rules and themes of the problem statement will be sent a confirmation mail regarding their selection for the final round.",
                },
                {
                  q: "Is there a slide limit for the presentation?",
                  a: "Yes. There is a slide limit of 8-10 slides for the presentation.",
                },
                {
                  q: "What are the evaluation criteria for the data analysis?",
                  a: "The evaluation will be based on model approach, accuracy, insights and clarity of presentation.",
                },
                {
                  q: "Will there be a Q&A session during the final presentation?",
                  a: "Yes, the judges will have a 5-minute Q&A session after each team's presentation.",
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
                EXCAVATE
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                EXCAVATE is an exciting team-based event that brings data
                analysis to the forefront of metallurgical and materials
                engineering. Designed to challenge your analytical and
                problem-solving skills, it's all about diving into real-world
                data, uncovering insights, and presenting innovative solutions.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">About the Event</h3>
              <p className="text-white/90">
                Whether you're just starting with data science or already a pro,
                EXCAVATE is a great way to sharpen your skills, connect with
                peers, and see the impact of data in engineering. Teams will
                analyze data, present their findings, and defend their approach
                in a fun and competitive environment.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Why Participate?</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>Solve challenging real-world problems</li>
                <li>Showcase analytical and data science skills</li>
                <li>Win cash prizes (Top 3 teams)</li>
                <li>Gain practical experience in data analysis</li>
                <li>Network with peers and industry professionals</li>
                <li>Receive participation certificates</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Event Importance</h3>
              <p className="text-white/90">
                EXCAVATE is a flagship event organized by COMPOSIT, offering
                students an opportunity to showcase their analytical skills by
                solving challenging real-world problems that demand innovation
                and impact. This competition encourages innovative thinking and
                equips participants with practical experience in data analysis,
                enhancing their ability to address complex scenarios.
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
                  <strong>Eligibility:</strong> Open to students pursuing
                  Bachelors, Masters, or Ph.D. in any science or engineering
                  discipline
                </li>
                <li>
                  <strong>Format:</strong> 3 rounds (Quiz + Report Submission +
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
                  (analytical & reasoning skills)
                </li>
                <li>
                  <strong>Round 2:</strong> Report & Jupyter Notebook Submission
                  (top 10-15 teams)
                </li>
                <li>
                  <strong>Round 3:</strong> Offline Presentation & Q&A at IIT
                  Kharagpur (top 7 teams)
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
        finalTeamName = `Excavate_${leaderId}`;
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
        event: "Excavate",
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
              <h1 className="text-4xl font-extrabold text-white">EXCAVATE</h1>
              <p className="text-base leading-relaxed text-white/85">
                Analyze real-world data, uncover insights, and present
                innovative solutions. Register your team today.
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
                  link.href = "/Excavate_2026.pdf"; // Update with the actual path to the PDF
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

export default ExcavatePage;
