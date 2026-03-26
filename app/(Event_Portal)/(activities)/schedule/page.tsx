import Image from "next/image";
import React from "react";

const scheduleDays = [
  {
    title: "Day 0",
    subtitle: "Pre-event schedule",
    image: "/2.png",
  },
  {
    title: "Day 1",
    subtitle: "Main event schedule",
    image: "/3.png",
  },
  {
    title: "Day 2",
    subtitle: "Closing day schedule",
    image: "/4.png",
  },
];

const Schedule = () => {
  return (
    <main className="relative w-full overflow-hidden px-[5vw] py-20 mt-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(92,10,10,0.22)] md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Event Schedule
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Day-wise plan for COMPOSIT
            </h1>
            <p className="mt-6 text-base leading-8 text-gray-300 md:text-lg">
              Browse the complete schedule for Day 0, Day 1, and Day 2 below.
              Each card contains the full poster for that day so participants
              can quickly check timings and activities.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-3">
          {scheduleDays.map((day) => (
            <article
              key={day.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_18px_50px_rgba(92,10,10,0.18)] md:p-6"
            >
              <div className="mb-5 flex flex-col gap-2 px-2 md:px-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                  {day.subtitle}
                </p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {day.title}
                </h2>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                <Image
                  src={day.image}
                  alt={`${day.title} schedule`}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-contain"
                  priority={day.title === "Day 0"}
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Schedule;
