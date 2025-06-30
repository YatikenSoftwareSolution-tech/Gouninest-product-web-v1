
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Wifi, Car } from 'lucide-react';
import Image from 'next/image';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  capacity: number;
  amenities: string[];
  featured?: boolean;
}

const PropertyCard = ({ 
  id, 
  title, 
  location, 
  price, 
  image, 
  rating, 
  capacity, 
  amenities, 
  featured = false 
}: PropertyCardProps) => {
  
  const handleCardClick = () => {
    console.log(`Navigating to property ${id}`);
    // Here you would navigate to the property details page
  };

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-scale-in ${
        featured
          ? "ring-2 ring-[var(--color-electric-400)] shadow-lg shadow-[var(--color-electric-400)]/20"
          : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          height={80}
          width={220}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-[var(--color-electric-500)] text-white animate-pulse-glow">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-semibold">
          ⭐ {rating}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-electric-600)] transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">Up to {capacity} guests</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-electric-600)]">
            ${price}
            <span className="text-sm text-gray-500">/week</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => {
            const icons = {
              WiFi: <Wifi className="w-3 h-3" />,
              Parking: <Car className="w-3 h-3" />,
              Gym: <Users className="w-3 h-3" />,
            };

            return (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700 hover:bg-[var(--color-electric-100)] hover:text-[var(--color-electric-700)] transition-colors duration-300"
              >
                {icons[amenity as keyof typeof icons]}
                <span className="ml-1">{amenity}</span>
              </Badge>
            );
          })}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
