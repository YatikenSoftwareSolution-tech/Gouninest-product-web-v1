// import { useState } from "react";

// const houseRules = [
//   {
//     category: "Cancellation Policy",
//     content:
//       "No: Was No Pay\nYour application for a visa has been disclosed. Please note that this does not include situations where your visa has been granted and subsequently withdrawn.\nFor a review only of the above cancellation criteria and can provide us with evidence demonstrating that you meet the above view more.",
//   },
//   {
//     category: "No Place No Pay",
//     content:
//       "You have failed to determine possible but did not officially agree to such direct travel-related status.\nIf you are aware of this dispute or whether it is possible, then you would like to address automatically that you meet the above criteria, you may want for cancellation will be granted if you have already accepted your 'honorary agreement' and paid your view more.",
//   },
//   {
//     category: "Details",
//     content:
//       "Cancellation Policy\nTo execute your Room prior to 3rd July, you must do the following within 3 days of receipt of this 'honorary agreement' (please 3 View more).",
//   },
//   {
//     category: "Application Policy",
//     items: [
//       { title: "Age Limitation", content: "1–2 Styvora old" },
//       {
//         title: "Education Requirement",
//         items: ["PhD Permitted", "Postgraduate", "Undergraduate"],
//       },
//       { title: "Notionality or Region", content: "Unlimited notionality" },
//     ],
//   },
//   {
//     category: "Pets Policy",
//     content: "No Pet",
//   },
//   {
//     category: "Renewal Policy",
//     content:
//       "Students can re-book through the student portal or contact the concierge to make an application.",
//   },
//   {
//     category: "Early Move-in Policy",
//     content:
//       "Student can make an inquiry through Chapter email to apply for early check in.",
//   },
//   {
//     category: "Refund Policy",
//     content:
//       "To secure your Room prior to 3rd July, you must do the following within 3 days of receipt of this 'honorary Agreement' (Please 3 days being known as the 'Doctors Notting Period').\nView more",
//   },
//   {
//     category: "Room Assignment Policy",
//     content:
//       "Certain Room numbers can be selected during the booking process if noticable.",
//   },
//   {
//     category: "Room Change Policy",
//     content:
//       "We want your university experience to be on positive on possible – if you are having any issues with your flat marks, please let us know. We will do our best to help resolve any problems you might be having.",
//   },
//   {
//     category: "Subletting Policy",
//     content:
//       "After the 'Honorary Staff Date' as set out in the 'Honorary Agreement', requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on doubtfully and at our sole discretion. An Administrator has of £00 will be going to be working in the 'greeting facility' which you will be view more.",
//   },
//   {
//     category: "Termination Policy",
//     content:
//       "Not Applicable, if students tend to terminate their current contract, after the 'Honorary Staff Date' as set out in the 'Honorary Agreement', requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on doubtfully and at our sole discretion. An Administrator has of £00 will be view more.",
//   },
//   {
//     category: "Double Occupancy Policy",
//     items: [
//       {
//         title: "Share Studio – Parthouse",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Share Studio – Lower Level",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Share Studio – Mid Level",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Share Studio – Upper Level",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Gold Studio – Lower Level",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Gold Studio – Mid Level",
//         content: "Increase of £000 per Week",
//       },
//       {
//         title: "Gold Studio – Upper Level",
//         content: "Increase of £000 per Week",
//       },
//     ],
//   },
// ];
// export const HouseRulesSection: React.FC<SectionProps> = ({
//   selectedProperty,
// }) => {
//   const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>(
//     {}
//   );

//   const toggleRule = (category: string) => {
//     setExpandedRules((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
//         House Rules
//       </h3>
//       <div className="grid gap-4">
//         {houseRules.map((rule) => (
//           <div
//             key={rule.category}
//             className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
//           >
//             <button
//               className="w-full flex justify-between items-center gap-3"
//               onClick={() => toggleRule(rule.category)}
//               aria-expanded={expandedRules[rule.category]}
//               aria-controls={`${rule.category}-content`}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   <svg
//                     className="w-5 h-5 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-gray-800 text-left">
//                   {rule.category}
//                 </h4>
//               </div>
//               <svg
//                 className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
//                   expandedRules[rule.category] ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             <div
//               id={`${rule.category}-content`}
//               className={`mt-4 overflow-hidden transition-all duration-200 ${
//                 expandedRules[rule.category] ? "max-h-96" : "max-h-0"
//               }`}
//             >
//               {rule.content && (
//                 <p className="text-gray-600 text-sm mb-3 leading-relaxed">
//                   {rule.content}
//                 </p>
//               )}

//               {rule.items && (
//                 <div className="space-y-3">
//                   {rule.items.map((item) => (
//                     <div key={item.title} className="border-t pt-3">
//                       <h5 className="font-medium text-sm text-gray-700 flex items-center gap-2">
//                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                         {item.title}
//                       </h5>
//                       {item.content && (
//                         <p className="text-gray-500 text-sm mt-1 pl-3.5">
//                           {item.content}
//                         </p>
//                       )}
//                       {item.items && (
//                         <ul className="space-y-1.5 mt-2 pl-3.5">
//                           {item.items.map((subItem) => (
//                             <li
//                               key={subItem}
//                               className="text-gray-500 text-sm flex items-start gap-2"
//                             >
//                               <span className="text-gray-400 mt-1">•</span>
//                               {subItem}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react'

const HousingRuleSection = () => {
  return (
    <div>HousingRuleSection</div>
  )
}

export default HousingRuleSection
