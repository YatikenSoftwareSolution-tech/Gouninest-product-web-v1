import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/types/types';

interface HoverCardProps {
  property: Property;
  colorClass: string;
  onPropertyClick: (property: Property) => void;
}

const HoverCard = ({ 
  property,
  colorClass,
  onPropertyClick
}: HoverCardProps) => {
  
  return (
   <div   
    className="flex-1 h-96 cursor-pointer transition-all duration-500 ease-in-out hover:flex-[1.5] group overflow-hidden rounded-lg shadow-lg"
     onClick={() => onPropertyClick(property)}
   >
    <div className="relative h-full">
      <Image 
       src={property?.images?.[0]} 
       alt={property?.title}
       width={400}
       height={384}
       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      {/* Featured Badge */}
      {property?.isFeatured && (
       <div className="absolute top-3 left-3 bg-electric-500 text-white px-2 py-1 rounded-lg text-sm font-semibold animate-pulse">
        Featured
       </div>
      )}
      
      {/* Rating Badge */}
      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
       {property?.ratings}
      </div>

      {/* Details Section - Bottom 10% */}
      <div className={`absolute bottom-0 left-0 right-0 h-[15%] ${colorClass} text-white px-4 py-2 flex items-center justify-between`}>
       <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">{property?.title}</h3>
        <div className="flex items-center text-xs opacity-90">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{property?.location.address}</span>
        </div>
       </div>
       <div className="text-right ml-2">
        <div className="text-lg font-semibold">${property?.price}</div>
        <div className="text-xs opacity-90">/week</div>
       </div>
      </div>
    </div>
   </div>
  );
};

export default HoverCard;
