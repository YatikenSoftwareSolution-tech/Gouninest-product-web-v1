// import {
//   Users,
//   Wifi,
//   Dumbbell,
//   Home,
//   Printer,
//   Coffee,
//   Gamepad2,
//   Film,
//   Table2,
//   Package,
//   Truck,
//   Shirt,
//   CalendarDays,
//   Sun,
// } from "lucide-react";

// const amenities = [
//   {
//     category: "Shared Community",
//     count: 14,
//     items: [
//       { name: "Elevator", icon: <Home className="w-4 h-4" /> },
//       { name: "Laundry Room", icon: <Shirt className="w-4 h-4" /> },
//       { name: "Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
//       { name: "Free Printing", icon: <Printer className="w-4 h-4" /> },
//       { name: "Lounge", icon: <Users className="w-4 h-4" /> },
//       { name: "Conference Room", icon: <CalendarDays className="w-4 h-4" /> },
//     ],
//   },
//   {
//     category: "Fitness & Recreation",
//     count: 7,
//     items: [
//       { name: "Gym", icon: <Dumbbell className="w-4 h-4" /> },
//       { name: "Coffee Bar", icon: <Coffee className="w-4 h-4" /> },
//       { name: "Game Room", icon: <Gamepad2 className="w-4 h-4" /> },
//       { name: "Cinema Room", icon: <Film className="w-4 h-4" /> },
//       { name: "Table Tennis", icon: <Table2 className="w-4 h-4" /> },
//       { name: "Pool Table", icon: <Gamepad2 className="w-4 h-4" /> },
//     ],
//   },
//   {
//     category: "Property Services",
//     count: 7,
//     items: [
//       { name: "Reception", icon: <Home className="w-4 h-4" /> },
//       { name: "Package Room", icon: <Package className="w-4 h-4" /> },
//       { name: "Delivery Alert System", icon: <Truck className="w-4 h-4" /> },
//       { name: "Dry Cleaning Service", icon: <Shirt className="w-4 h-4" /> },
//       { name: "Housekeeping", icon: <Home className="w-4 h-4" /> },
//       { name: "Social Events", icon: <CalendarDays className="w-4 h-4" /> },
//     ],
//   },
//   {
//     category: "Outdoor Features",
//     count: 3,
//     items: [
//       { name: "Terrace", icon: <Sun className="w-4 h-4" /> },
//       { name: "Balcony", icon: <Sun className="w-4 h-4" /> },
//       { name: "Courtyard", icon: <Sun className="w-4 h-4" /> },
//     ],
//   },
// ];

// export const AmenitiesSection: React.FC<SectionProps> = ({
//   selectedProperty,
// }) => {
//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
//         Community Features
//       </h3>

//       {amenities.map((section) => (
//         <section key={section.category} className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="font-semibold text-gray-800">
//               {section.category}{" "}
//               <span className="text-blue-600">({section.count})</span>
//             </h4>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {section.items.map((item) => (
//               <div
//                 key={item.name}
//                 className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all"
//               >
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   {React.cloneElement(item.icon, {
//                     className: "w-5 h-5 text-blue-600",
//                   })}
//                 </div>
//                 <span className="text-gray-700">{item.name}</span>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}

//       <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors">
//         View all amenities
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-4 w-4"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

import React from 'react'

const AmenitiesSection = () => {
  return (
    <div>AmenitiesSection</div>
  )
}

export default AmenitiesSection