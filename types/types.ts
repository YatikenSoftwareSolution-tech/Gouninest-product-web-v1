export interface LoginCred extends Record<string, unknown> {
  identifier: string;
  password: string;
}

export interface LoginRes{
  message: string;
  token: string;
  user: User;
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

export interface Property {
  _id: string;
  externalId: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  noOfRooms: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  countryCode: string;
  city: string;
  leaseDuration: string;
  amenities: string[];
  features: string[];
  propertyType: string;
  roomType: string;
  available: boolean;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  petPolicy: string;
  area: number;
  leaseTerm: number;
  externalSource: string;
  moveInDate: string; // ISO date string
  moveOutDate: string; // ISO date string
  createdBy: string;
  isDeleted: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  views: number;
  ratings: number;
  reviewCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

export interface City {
  name: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface CountryCityPropertyCount {
  country: string;
  cities: City[];
}

export interface CountryPropertyCount {
  country: string;
  properties: Property[];
}

export interface CountryLocationCount {
  country: string;
  count: number;
}

export type Countries = CountryLocationCount[];
export type Locations = CountryCityPropertyCount[];
