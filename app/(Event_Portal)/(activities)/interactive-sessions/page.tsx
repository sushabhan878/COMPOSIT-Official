import Image from "next/image";
import React from "react";

const sessionDetails = [
  { label: "Speaker", value: "Rahul Dash" },
  { label: "Role", value: "Product Manager, Instron" },
  { label: "Date", value: "28 March" },
  { label: "Time", value: "5:00 PM to 6:00 PM (Tentative)" },
  { label: "Mode", value: "Online Interactive Session" },
  { label: "Venue", value: "SN Bose Auditorium, Main Building" },
];

const highlights = [
  "Understand why fatigue testing matters in engineering design and product reliability.",
  "Explore practical fatigue testing techniques used across materials and manufacturing workflows.",
  "Gain industry-facing insights from Rahul Dash of Instron during a focused interactive session.",
];

const InteractiveSessions = () => {
  return (
    <main className="relative w-full overflow-hidden px-[5vw] py-20 mt-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(92,10,10,0.22)] md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Interactive Session
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Importance of Fatigue Testing and Techniques
              </h1>
              <p className="mt-6 text-base leading-8 text-gray-300 md:text-lg">
                Rahul Dash, Product Manager at Instron, will deliver an
                interactive session on the importance of fatigue testing and the
                techniques used to evaluate material and product performance
                under repeated loading conditions.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[1.75rem] border border-amber-400/20 bg-black/20 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
                <Image
                  src="/rahul.jpg"
                  alt="Rahul Dash"
                  width={900}
                  height={1100}
                  className="h-full w-full rounded-[1.25rem] object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessionDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-amber-400/20 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-300/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                  {detail.label}
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              What to Expect
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
            <div className="mt-6 space-y-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-black/15 p-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
                  <p className="text-gray-300 leading-7">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-amber-400/20 bg-linear-to-br from-amber-500/10 to-white/5 p-8 backdrop-blur-xl md:p-10">
            <h2 className="text-2xl font-semibold text-white">Session Note</h2>
            <p className="mt-5 text-gray-300 leading-7">
              The session is currently scheduled as an online interactive event,
              with the listing noting SN Bose Auditorium, Main Building, as the
              venue. Please treat the timing as tentative and watch for final
              confirmation from the COMPOSIT team.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Topic Focus
              </p>
              <p className="mt-3 text-white leading-7">
                Fatigue testing, its importance in performance validation, and
                the techniques used to study durability under cyclic loads.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default InteractiveSessions;
