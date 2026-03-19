"use client";

import RegistrationClosed from "@/components/RegistrationClosed";
import { useState } from "react";

const tabs = [
  { id: "about", label: "About" },
  { id: "structure", label: "Structure" },
  { id: "faqs", label: "FAQ's" },
  { id: "contacts", label: "Contacts" },
];

const tabSliderClass: Record<string, string> = {
  about: "translate-x-0",
  structure: "translate-x-full",
  faqs: "translate-x-[200%]",
  contacts: "translate-x-[300%]",
};

const MetacadePage = () => {
  const [activeTab, setActiveTab] = useState<string>("about");

  const renderContent = () => {
    switch (activeTab) {
      case "structure":
        return (
          <section className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white">Structure</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 1: Online Quiz
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>Conducted online on the Unstop platform</li>
                  <li>Time limit: 20 minutes to attempt the quiz</li>
                  <li>Quiz window: Open for 4 hours</li>
                  <li>
                    Topics: Computer Science and DSA, Application of Materials
                    in Computer Architecture and Tools, Aptitude, Puzzles, etc.
                  </li>
                  <li>
                    This is an elimination round - top scorers will qualify for
                    the final coding round
                  </li>
                  <li>
                    The shortlisted candidates from the first round will be
                    invited to come offline for the final round at the IIT
                    Kharagpur campus
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Round 2: Offline Coding Round
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-white/90">
                  <li>
                    The top participants from the first round will be invited
                    for the final coding round
                  </li>
                  <li>The selected participants will be notified via email</li>
                  <li>Location: CIC lab at IIT Kharagpur</li>
                  <li>
                    This would be a competitive programming contest that will
                    consist of 3-5 coding questions
                  </li>
                  <li>Time limit: 90 minutes</li>
                  <li>Allowed Languages: C++/C/Java/Python</li>
                  <li>
                    The number of test cases passed will determine the final
                    marks
                  </li>
                  <li>
                    In case of a tie between two or more participant marks,
                    their timing will be taken into consideration
                  </li>
                  <li>
                    Top three winners will be selected based on their final
                    score
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
                  q: "What is the procedure for the registration of the event?",
                  a: "All participants must register through the official COMPOSIT'25 website, after which they will receive a COMPOSIT ID and individual Team ID. Participants will then need to enter their Team ID on the Unstop portal to complete the registration process.",
                },
                {
                  q: "Who can participate in MetaCode Challenge?",
                  a: "It is open to all students, professionals, and quiz enthusiasts. There are no restrictions based on academic background or experience.",
                },
                {
                  q: "Is there a registration fee?",
                  a: "No, registration is completely free on Unstop and Website for everyone.",
                },
                {
                  q: "Do I need any special software or tools to participate?",
                  a: "No, you only need a stable internet connection and a device (laptop, pc) to access the Unstop platform.",
                },
                {
                  q: "Is prior knowledge in a specific subject required?",
                  a: "The quiz covers a few domains including General Trivia, Computer Science, Data Structures and Algorithms, Puzzles, Aptitudes and Application of Materials. Having basic knowledge in these areas of Metallurgy and Materials Engineering may provide an advantage, but the questions are designed to be accessible to participants from all backgrounds.",
                },
                {
                  q: "Will all participants receive a certificate?",
                  a: "Yes, all the participants will receive their respective certificates.",
                },
                {
                  q: "When will the results be announced?",
                  a: "The results will be announced shortly after the quiz is completed. Participants will be informed via email through COMPOSIT'25 and unstop.",
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
                MetaCode
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                MetaCode is a competitive programming event designed to fuse
                Computational Power with Metallurgical Innovation, showcasing
                the application of coding in solving real-world challenges in
                materials science and engineering. The event emphasizes critical
                thinking, technical proficiency, and problem-solving skills
                through rounds that test aptitude, coding expertise, and
                innovative solutions. In the final round, participants will use
                programming languages like C++, C, or Java to tackle
                domain-specific problems, which will feature long competitive
                programming at IIT Kharagpur.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Number of Rounds</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Round 1:</strong> An online quiz on Unstop
                </li>
                <li>
                  <strong>Round 2:</strong> Offline Coding Round
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Key Features</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Round 1:</strong> Online quiz on Unstop platform (20
                  min quiz, 4-hour window)
                </li>
                <li>
                  <strong>Round 2:</strong> Offline coding round at IIT
                  Kharagpur (3-5 problems, 90 minutes)
                </li>
                <li>
                  <strong>Multiple Topics:</strong> CS, DSA, Application of
                  Materials in Computer Architecture and Tools, Aptitude,
                  Puzzles
                </li>
                <li>
                  <strong>Multiple Languages:</strong> C++/C/Java/Python
                  supported
                </li>
                <li>
                  <strong>Free Registration:</strong> No registration fees
                  required
                </li>
                <li>
                  <strong>Certificates:</strong> All participants receive
                  certificates
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Participation Details
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  <strong>Type:</strong> Individual Participation
                </li>
                <li>
                  <strong>Eligibility:</strong> Open to All
                </li>
                <li>
                  <strong>Registration:</strong> Completely Free
                </li>
                <li>
                  <strong>Platform:</strong> Unstop
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                General Instructions
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/90">
                <li>
                  Every participant must register online on Unstop as well as on
                  the official website of COMPOSIT
                </li>
                <li>
                  The decision of the organizers and judges will be final and
                  binding
                </li>
                <li>
                  COMPOSIT, IIT Kharagpur is not responsible for any late, lost,
                  or misdirected entries
                </li>
              </ul>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-38 text-white md:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#800000]/50 bg-linear-to-br from-[#800000]/70 via-[#0b4f8c]/65 to-[#f4b000]/60 shadow-[0_20px_90px_-55px_rgba(128,0,0,0.9)]">
        <div className="grid gap-8 lg:grid-cols-[340px,1fr] md:grid-cols-1">
          <aside className="flex flex-col gap-6 border-b border-white/15 p-8 md:border-b-0 md:border-r">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-white">MetaCode</h1>
              <p className="text-base leading-relaxed text-white/85">
                Fuse computational power with metallurgical innovation. Register
                as an individual and showcase your coding skills.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              <RegistrationClosed message="MetaCode registrations are now closed. Event information and rules are still available below." />
              <button
                type="button"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/MetaCode Event Draft.pdf";
                  link.download = "MetaCode_Rules_and_Regulations.pdf";
                  link.click();
                }}
                className="w-full rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg bg-[#f4b000] hover:bg-[#ffbf1f]"
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
                className={`absolute bottom-0 left-0 h-1 w-1/4 bg-[#f4b000] transition-transform duration-300 hidden md:block ${
                  tabSliderClass[activeTab] || "translate-x-0"
                }`}
              />
            </nav>

            <div className="rounded-3xl border border-white/25 bg-white/5 p-6 shadow-inner md:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MetacadePage;
