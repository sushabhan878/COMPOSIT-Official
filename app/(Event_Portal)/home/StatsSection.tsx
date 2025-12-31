"use client";

import React, { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-16"
    >
      <div className="mx-auto max-w-10xl px-[5vw]">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Our Impact
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {/* Total Footfall */}
          <div className="group flex flex-col items-center space-y-4 text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
              <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-5 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                <svg
                  className="h-8 w-8 text-amber-400 md:h-10 md:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <CountUpNumber
                end={15000}
                duration={2000}
                isVisible={isVisible}
                className="text-4xl font-bold text-amber-400 md:text-5xl lg:text-6xl"
              />
              <p className="mt-2 text-sm font-medium text-gray-300 md:text-base">
                Total Footfall
              </p>
            </div>
          </div>

          {/* Total Events */}
          <div className="group flex flex-col items-center space-y-4 text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl transition-all duration-300 group-hover:bg-orange-400/30"></div>
              <div className="relative rounded-full bg-gradient-to-br from-orange-400/20 to-amber-500/20 p-5 transition-all duration-300 group-hover:from-orange-400/30 group-hover:to-amber-500/30">
                <svg
                  className="h-8 w-8 text-orange-400 md:h-10 md:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <CountUpNumber
                end={15}
                duration={1500}
                isVisible={isVisible}
                className="text-4xl font-bold text-orange-400 md:text-5xl lg:text-6xl"
              />
              <p className="mt-2 text-sm font-medium text-gray-300 md:text-base">
                Total Activities
              </p>
            </div>
          </div>

          {/* Social Media Reach */}
          <div className="group flex flex-col items-center space-y-4 text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
              <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-5 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                <svg
                  className="h-8 w-8 text-amber-400 md:h-10 md:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <CountUpNumber
                end={25000}
                duration={2500}
                isVisible={isVisible}
                className="text-4xl font-bold text-amber-400 md:text-5xl lg:text-6xl"
              />
              <p className="mt-2 text-sm font-medium text-gray-300 md:text-base">
                Social Media Reach
              </p>
            </div>
          </div>

          {/* Total Participants */}
          <div className="group flex flex-col items-center space-y-4 text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl transition-all duration-300 group-hover:bg-orange-400/30"></div>
              <div className="relative rounded-full bg-gradient-to-br from-orange-400/20 to-amber-500/20 p-5 transition-all duration-300 group-hover:from-orange-400/30 group-hover:to-amber-500/30">
                <svg
                  className="h-8 w-8 text-orange-400 md:h-10 md:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <CountUpNumber
                end={1200}
                duration={1800}
                isVisible={isVisible}
                className="text-4xl font-bold text-orange-400 md:text-5xl lg:text-6xl"
              />
              <p className="mt-2 text-sm font-medium text-gray-300 md:text-base">
                Total Participants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Counter Animation Component
const CountUpNumber = ({
  end,
  duration,
  isVisible,
  className,
}: {
  end: number;
  duration: number;
  isVisible: boolean;
  className?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <div className={className}>{count.toLocaleString()}</div>;
};

export default StatsSection;
