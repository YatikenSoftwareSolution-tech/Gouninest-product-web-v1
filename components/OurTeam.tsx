"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ava Smith",
    designation: "Co-Founder & CEO",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    bio: "Visionary leader passionate about student housing.",
    linkedin: "#",
  },
  {
    name: "Liam Johnson",
    designation: "CTO",
    photo:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Tech enthusiast and architect of our platform.",
    linkedin: "#",
  },
  {
    name: "Sophia Lee",
    designation: "Head of Marketing",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Storyteller connecting students to their dream homes.",
    linkedin: "#",
  },
  {
    name: "Noah Patel",
    designation: "Lead Designer",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Designs delightful and intuitive user experiences.",
    linkedin: "#",
  },
  {
    name: "Emma Brown",
    designation: "Customer Success",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    bio: "Ensures every student finds their perfect stay.",
    linkedin: "#",
  },
];

const OurTeamSection = () => {
  const [centerIdx, setCenterIdx] = useState(1); // Start with the second member centered

  const showMembers = () => {
    // Always show 3: left, center, right (with wrap-around)
    const total = teamMembers.length;
    const left = (centerIdx - 1 + total) % total;
    const right = (centerIdx + 1) % total;
    return [left, centerIdx, right];
  };

  const handleLeft = () => {
    setCenterIdx((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleRight = () => {
    setCenterIdx((prev) => (prev + 1) % teamMembers.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-electric-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Our Team</h2>
        <p className="text-lg text-gray-600 mb-10">
          Meet the passionate people behind our mission.
        </p>
        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handleLeft}
            className="p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-electric-100 transition flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-electric-600" />
          </button>

          {/* Cards */}
          <div className="flex gap-4 w-full max-w-2xl justify-center">
            {showMembers().map((idx, pos) => {
              const member = teamMembers[idx];
              const isCenter = pos === 1;
              return (
                <div
                  key={member.name}
                  className={`relative bg-white rounded-2xl shadow-lg flex flex-col items-center transition-all duration-300
                    ${isCenter
                      ? "scale-110 z-10 border-2 border-electric-500 shadow-2xl"
                      : "scale-95 opacity-80"
                    }
                    w-64 h-96 px-4 py-6
                  `}
                  style={{
                    boxShadow: isCenter
                      ? "0 8px 32px 0 rgba(52, 152, 219, 0.15)"
                      : "0 2px 8px 0 rgba(0,0,0,0.07)",
                  }}
                >
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-electric-600 font-medium mb-2">{member.designation}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-electric-600 hover:text-electric-800 transition"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleRight}
            className="p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-electric-100 transition flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-electric-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;