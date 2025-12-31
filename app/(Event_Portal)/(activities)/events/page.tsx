"use client";
import EventCard from "@/components/EventCard";
import { motion } from "framer-motion";

const events = [
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766907889/GettyImages-755651077-5b3fedf646e0fb005bc0269e_uty8jy.jpg",
    title: "Metacode",
    description:
      "Solve engaging coding challenges that blend innovation, problem-solving, and computation.",
    href: "events/metacode",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912201/michelearoundtheworld-ASxUnYgNnKs-unsplash_qxh9uc.jpg",
    title: "Technova",
    description:
      "Present groundbreaking research and innovative ideas in materials science and engineering to redefine the future.",
    href: "events/technova",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1767204568/Screenshot_2025-12-31_233803_aav5el.png",
    title: "Enigma",
    description:
      "Test your knowledge in an exciting online quiz featuring diverse questions from engineering to general awareness.",
    href: "events/enigma",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912196/stephen-dawson-qwtCeJ5cLYs-unsplash_yshlx8.jpg",
    title: "Excavate",
    description:
      "Apply critical thinking and analytical skills to uncover data-driven insights and innovative solutions.",
    href: "events/excavate",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912210/bailey-mahon-2b6K4uy0Hbc-unsplash_bh9sny.jpg",
    title: "Metaclix",
    description:
      "Capture the beauty of science and technology through photography and compete in a dynamic contest.",
    href: "events/metaclix",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912214/marvin-meyer-SYTO3xs06fU-unsplash_ehgamu.jpg",
    title: "Case Study",
    description:
      "Analyze real-world challenges, craft strategic solutions, and showcase your problem-solving expertise.",
    href: "events/casestudy",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912220/austin-distel-wD1LRb9OeEo-unsplash_tilrco.jpg",
    title: "Ideathon",
    description:
      "An event for aspiring entrepreneurs to pitch innovative ideas, receive expert feedback, and propel their vision into reality.",
    href: "events/ideathon",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dohx1bvom/image/upload/v1766912197/tom-claes-DkAEPVsK2_8-unsplash_pji8mu.jpg",
    title: "Cadvolution",
    description:
      "Design creative CAD models, justify your choices, and develop solutions for real-world challenges.",
    href: "events/cadvolution",
  },
];

const Events = () => {
  return (
    <main className="mt-20 min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-10xl px-[5vw]">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 space-y-3 text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
            COMPOSIT 2026
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Events
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
        </motion.header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:gap-y-16 sm:grid-cols-2 xl:grid-cols-3 place-items-center">
          {events.map((ev) => (
            <EventCard
              key={ev.title}
              imageUrl={ev.imageUrl}
              title={ev.title}
              description={ev.description}
              href={ev.href}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;
