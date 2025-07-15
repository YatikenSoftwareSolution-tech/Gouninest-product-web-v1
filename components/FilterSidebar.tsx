// "use client";

// import { X } from "lucide-react";

// const FilterSidebar = ({ isOpen, onClose, priceRange, setPriceRange }) => {
//   return (
//     <div
//       className={`${
//         isOpen ? "block" : "hidden"
//       } lg:block w-full lg:w-80 bg-white p-6 border-r border-gray-200 h-full overflow-y-auto mt-0.5`}
//     >
//       <div className="flex items-center justify-between mb-6 lg:hidden">
//         <h3 className="text-lg font-semibold">Filters</h3>
//         <button onClick={onClose} className="p-2">
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="space-y-6">
//         {/* Max Price */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             maxPrice
//           </h4>
//           <div className="pl-6 space-y-2">
//             <div className="flex items-center space-x-2">
//               <label className="text-sm">Maximum</label>
//               <input
//                 type="number"
//                 value={priceRange.max}
//                 onChange={(e) =>
//                   setPriceRange({
//                     ...priceRange,
//                     max: parseInt(e.target.value),
//                   })
//                 }
//                 className="border rounded px-3 py-1 w-24"
//                 placeholder="£15000"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Min Price */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             minPrice
//           </h4>
//           <div className="pl-6 space-y-2">
//             <div className="flex items-center space-x-2">
//               <label className="text-sm">Minimum</label>
//               <input
//                 type="number"
//                 value={priceRange.min}
//                 onChange={(e) =>
//                   setPriceRange({
//                     ...priceRange,
//                     min: parseInt(e.target.value),
//                   })
//                 }
//                 className="border rounded px-3 py-1 w-24"
//                 placeholder="£129"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Durations */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             durations
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "50 weeks+",
//               "39-49 weeks",
//               "27-38 weeks",
//               "13-26 weeks",
//               "1-12 weeks",
//               "Flexible",
//             ].map((duration) => (
//               <label key={duration} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{duration}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Room Types */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             roomTypes
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               { name: "Studio", price: "£485.78/Week" },
//               { name: "En-suite", price: "£355.33/Week" },
//               { name: "Non En-suite", price: "£359.36/Week" },
//               { name: "Shared Room", price: "£320.46/Week" },
//             ].map((room) => (
//               <label
//                 key={room.name}
//                 className="flex items-center justify-between"
//               >
//                 <div className="flex items-center space-x-2">
//                   <input type="checkbox" className="rounded" />
//                   <span className="text-sm">{room.name}</span>
//                 </div>
//                 <span className="text-sm text-gray-600">{room.price}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Move In Month */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             moveInMonth
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ].map((month) => (
//               <label key={month} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{month}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Property Types */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             propertyTypes
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "Purpose Built Student Accommodation",
//               "Shared House",
//               "Private Apartment",
//               "Homestay",
//               "Hotel/Hostel",
//             ].map((type) => (
//               <label key={type} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{type}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Services */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             services
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "No Service Fee",
//               "Free WiFi",
//               "Cleaning Service",
//               "Maintenance",
//               "Reception Service",
//               "Laundry Service",
//             ].map((service) => (
//               <label key={service} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{service}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Amenities */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             amenities
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "Furnished",
//               "Kitchen",
//               "Bathroom",
//               "Study Area",
//               "Common Room",
//               "Gym",
//               "Cinema Room",
//               "Parking",
//             ].map((amenity) => (
//               <label key={amenity} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{amenity}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Location Features */}
//         <div>
//           <h4 className="font-semibold mb-3 flex items-center">
//             <input type="checkbox" className="mr-2 rounded" defaultChecked />
//             locationFeatures
//           </h4>
//           <div className="pl-6 space-y-2">
//             {[
//               "Near University",
//               "Near Subway",
//               "Near Shopping Center",
//               "Near Fast Food",
//               "Near Chinese Supermarket",
//               "Near Bargain Supermarket",
//               "City Center",
//               "Quiet Area",
//             ].map((feature) => (
//               <label key={feature} className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded" />
//                 <span className="text-sm">{feature}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors">
//           Clear Filter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
import React from 'react'

const FilterSidebar = () => {
  return (
    <div>FilterSidebar</div>
  )
}

export default FilterSidebar