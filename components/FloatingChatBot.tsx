"use client";
import React, { useState } from "react";
import { Bot } from "lucide-react";
import ConsultationModal from "./modals/ConsultationModal";

const FloatingChatBot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  return (
    <>
      <div className="fixed right-0 bottom-20 z-50 flex items-center">
        <div
          className="relative w-[250px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col justify-center w-[250px] h-18 rounded-l-full shadow-md bg-white border border-gray-200 hover:border-blue-400 transition-all duration-300 ease-in-out px-4 text-left ${
              isHovered ? "-right-2" : "-right-44"
            }`}
            aria-label="Ask me anything"
          >
            {isHovered ? (
              <div className="transition-opacity duration-300 flex items-center gap-2 justify-between mr-3 relative">
                <div className="relative">
                  <Bot size={50} />
                  {/* Active Indicator inside icon */}
                  <span className="absolute -top-4 right-2 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                  <span className="absolute -top-4 right-2 w-4 h-4 bg-green-500 rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-600">
                    What can I help you with?
                  </p>
                  <div
                    onClick={() => setShowConsultationModal(true)}
                    className="w-18 text-sm font-semibold text-gray-800 bg-red-200 hover:bg-red-500 hover:text-white pl-3 py-1 rounded-xl cursor-pointer"
                  >
                    Ask Me
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative text-sm font-medium text-gray-700">
                <div className="relative inline-flex">
                  <Bot size={50} />
                  {/* Active Indicator inside icon */}
                  <span className="absolute -top-3.5 right-2 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                  <span className="absolute -top-3.5 right-2 w-4 h-4 bg-green-500 rounded-full" />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {showConsultationModal && (
        <ConsultationModal
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
        />
      )}
    </>
  );
};

export default FloatingChatBot;
