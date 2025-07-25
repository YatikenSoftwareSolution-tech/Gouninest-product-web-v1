export interface LoginCred extends Record<string, unknown> {
  identifier: string;
  password: string;
}

export interface Universities {
  countryCode: string;
  universities: [string];
  // Add other properties as needed based on the API response
}

export interface LoginRes {
  message: string;
  token: string;
  user: User;
}

export interface AllCountries{
  name: string;
  callingCode: string;
  flag: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  image: string;
}

export interface RoomType {
  roomTypeSlug: string;
  roomName: string;
  roomClass: string;
  bathroomType: string;
  amenities: string[];
  images: string[];
  videos: string[];
  vrs: string[];
  area: number;
  bedrooms: number;
  bathrooms: number;
  tenancies: {
    [key: string]: {
      duration: string;
      weeks: number;
      moveIn: string;
      moveOut: string;
      originalPrice: number;
      discountedPrice: number;
      price: number;
      isExclusive: boolean;
    };
  };
}

export interface Property {
  key: string;
  _id: string;
  id: string;
  externalId: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  name: string;
  noOfRooms: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  countryCode: "US" | "GB" | "AU" | "CA" | "IE" | "NZ" | "DE" | "FR" | "NL";
  address: string;
  city: string;
  leaseDuration: string;
  amenities: string[];
  features: string[];
  propertyType: string;
  propertyCount: number;
  roomType: string;
  roomTypes: RoomType[];
  available: boolean;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  petPolicy: string;
  advanceRent: number;
  area: number;
  leaseTerm: number;
  externalSource: string;
  moveInDate: string; // ISO date string
  moveOutDate: string; // ISO date string
  university?: {
    name?: string;
    acronym?: string;
  };
  createdBy: string;
  isDeleted: boolean;
  isFeatured: boolean;
  verified: boolean;
  views: number;
  ratings: number;
  reviews: number;
  reviewCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  location: {
    region: string | undefined;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  
  media:{
    images: image[];
    videos: video[];
    vrs: video[]
  }
}

interface image {
  url: string;
  type: string
}
interface video{
  url:string;
  type: string;
}

export interface City {
  name: string;
  count: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface CountryCityPropertyCount {
  country: string;
  cities: City[];
  name: string;
  _id: string;
  city: string;
  propertyCount: number;
}

export interface CountryPropertyCount {
  country: string;
  properties: Property[];
  propertyCount: number;
  name: string;
  _id: string;
  city: string;
  value: string;
  label: string;
}

export interface CountryLocationCount {
  country: string;
  count: number;
}

export type Countries = CountryLocationCount[];
export type Locations = CountryCityPropertyCount[];
