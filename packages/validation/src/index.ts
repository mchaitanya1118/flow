import { z } from 'zod';

export const RegisterUserSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  role: z.enum(['USER', 'OWNER', 'AGENT', 'DEVELOPER']).default('USER'),
});

export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const PropertyWizardSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(120),
  transactionType: z.enum(['BUY', 'RENT', 'NEW_PROJECT', 'COMMERCIAL']),
  propertyType: z.enum([
    'APARTMENT',
    'VILLA',
    'HOUSE',
    'PLOT',
    'LAND',
    'STUDIO',
    'PENTHOUSE',
    'OFFICE',
    'SHOP',
    'WAREHOUSE',
    'INDUSTRIAL',
    'FARM',
    'OTHER',
  ]),
  price: z.number().positive('Price must be greater than zero'),
  areaSqFt: z.number().positive('Area must be greater than zero'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  floorNumber: z.number().int().optional(),
  totalFloors: z.number().int().optional(),
  furnishing: z.enum(['FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED']).default('UNFURNISHED'),
  address: z.string().min(5),
  locality: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().min(30, 'Description must be at least 30 characters'),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string().url()).min(1, 'At least 1 photo is required'),
});

export const SearchQuerySchema = z.object({
  transactionType: z.enum(['BUY', 'RENT', 'NEW_PROJECT', 'COMMERCIAL']).default('BUY'),
  city: z.string().optional(),
  locality: z.string().optional(),
  propertyTypes: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.array(z.number()).optional(),
  bathrooms: z.array(z.number()).optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  readyToMove: z.boolean().optional(),
  verifiedOnly: z.boolean().optional(),
  sortBy: z.enum(['relevance', 'price_asc', 'price_desc', 'newest', 'quality']).default('relevance'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const CreateLeadSchema = z.object({
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
  seekerName: z.string().min(2),
  seekerEmail: z.string().email(),
  seekerPhone: z.string().min(10),
  message: z.string().optional(),
  source: z.string().default('WEBSITE'),
});

export const BookViewingSchema = z.object({
  propertyId: z.string(),
  scheduledAt: z.string().datetime(),
  notes: z.string().optional(),
});

export const ReviewSchema = z.object({
  targetType: z.enum(['AGENT', 'AGENCY', 'DEVELOPER']),
  targetId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3),
  comment: z.string().min(10),
});

export const MortgageCalculatorSchema = z.object({
  propertyPrice: z.number().positive(),
  downPaymentPercent: z.number().min(0).max(100).default(20),
  interestRateAnnual: z.number().min(0.1).max(30).default(8.5),
  loanTermYears: z.number().min(1).max(30).default(20),
});
