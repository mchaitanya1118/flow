export type UserRole = 
  | 'USER'
  | 'OWNER'
  | 'AGENT'
  | 'AGENCY_ADMIN'
  | 'DEVELOPER'
  | 'DEVELOPER_ADMIN'
  | 'CONTENT_EDITOR'
  | 'MODERATOR'
  | 'SUPPORT'
  | 'FINANCE'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type Permission =
  | 'property:create'
  | 'property:update'
  | 'property:publish'
  | 'property:delete'
  | 'property:verify'
  | 'lead:view'
  | 'lead:update'
  | 'lead:assign'
  | 'viewing:manage'
  | 'project:create'
  | 'project:update'
  | 'unit:manage'
  | 'payment:view'
  | 'payment:refund'
  | 'moderation:review'
  | 'admin:user_suspend'
  | 'admin:settings_edit';

export type TransactionType = 'BUY' | 'RENT' | 'NEW_PROJECT' | 'COMMERCIAL';

export type PropertyType =
  | 'APARTMENT'
  | 'VILLA'
  | 'HOUSE'
  | 'PLOT'
  | 'LAND'
  | 'STUDIO'
  | 'PENTHOUSE'
  | 'OFFICE'
  | 'SHOP'
  | 'WAREHOUSE'
  | 'INDUSTRIAL'
  | 'FARM'
  | 'OTHER';

export type ListingStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'VERIFIED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'EXPIRED'
  | 'SOLD'
  | 'RENTED'
  | 'ARCHIVED';

export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED';

export type UnitAvailability = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'BLOCKED';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'VIEWING_SCHEDULED'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'CLOSED';

export type LeadScoreCategory = 'HOT' | 'WARM' | 'COLD';

export type ViewingStatus = 'REQUESTED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';

export type PromotionType = 'BOOST' | 'FEATURED' | 'PREMIUM' | 'SPONSORED';

export type SubscriptionPlanTier = 'BASIC' | 'PROFESSIONAL' | 'PREMIUM' | 'ENTERPRISE';

export type ReviewTargetType = 'AGENT' | 'AGENCY' | 'DEVELOPER';

export interface LocationGeo {
  latitude: number;
  longitude: number;
  city: string;
  locality: string;
  subLocality?: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface PropertySummary {
  id: string;
  title: string;
  slug: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  location: LocationGeo;
  mainImage: string;
  verified: boolean;
  promoted?: boolean;
  promotionType?: PromotionType;
  qualityScore: number;
  status: ListingStatus;
  updatedAt: string;
  agent?: {
    id: string;
    name: string;
    avatar: string;
    phone?: string;
    agencyName?: string;
    isVerified: boolean;
    rating: number;
  };
}

export interface SearchFilterState {
  transactionType: TransactionType;
  query?: string;
  city?: string;
  locality?: string;
  propertyTypes: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  minArea?: number;
  maxArea?: number;
  amenities: string[];
  furnishing?: 'FURNISHED' | 'SEMI_FURNISHED' | 'UNFURNISHED';
  readyToMove?: boolean;
  verifiedOnly?: boolean;
  ownerListedOnly?: boolean;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'quality';
  page?: number;
  limit?: number;
}

export interface MortgageCalculation {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
}
