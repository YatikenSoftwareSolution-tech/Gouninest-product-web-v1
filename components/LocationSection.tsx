// import React from "react";
// import { MapPin } from "lucide-react";
// import { SectionProps } from "./types";

// export const LocationSection: React.FC<SectionProps> = ({
//   selectedProperty,
// }) => {
//   const encodedAddress = encodeURIComponent(
//     selectedProperty?.location?.address || "New Delhi, India"
//   );

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
//         Location
//       </h3>

//       <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex items-start gap-3 mb-3">
//           <div className="bg-blue-50 p-2 rounded-lg">
//             <MapPin className="w-5 h-5 text-blue-600" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
//             <p className="text-gray-600">
//               {selectedProperty?.location?.address || (
//                 <span className="text-gray-400">Address not available</span>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="h-96 rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
//         <iframe
//           width="100%"
//           height="100%"
//           className="rounded-xl"
//           frameBorder="0"
//           style={{ border: 0 }}
//           referrerPolicy="no-referrer-when-downgrade"
//           src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

import React from 'react'

const LocationSection = () => {
  return (
    <div>LocationSection</div>
  )
}

export default LocationSection;
