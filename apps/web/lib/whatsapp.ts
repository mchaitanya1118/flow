/**
 * Helper utilities for WhatsApp Integration across EstateFlow
 */

export interface WhatsAppInquiryParams {
  phone?: string;
  propertyTitle?: string;
  propertyId?: string;
  propertyPrice?: string;
  propertyLocation?: string;
  agentName?: string;
  customMessage?: string;
}

const DEFAULT_WHATSAPP_NUMBER = '919000072227'; // Default Concierge Number

/**
 * Format phone number to clean string suitable for wa.me URL
 * Removes all non-numeric characters except leading plus, then normalizes.
 */
export function formatPhoneNumber(phone?: string): string {
  if (!phone) return DEFAULT_WHATSAPP_NUMBER;
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    return `91${cleaned}`; // Default to India (+91) country code if 10 digits
  }
  return cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
}

/**
 * Build wa.me direct link with pre-encoded inquiry message
 */
export function buildWhatsAppLink(params: WhatsAppInquiryParams): string {
  const targetPhone = formatPhoneNumber(params.phone);

  let message = '';
  if (params.customMessage) {
    message = params.customMessage;
  } else if (params.propertyTitle) {
    message = `Hi${params.agentName ? ' ' + params.agentName : ''}, I am interested in *${params.propertyTitle}*`;
    if (params.propertyPrice) message += ` listed at ${params.propertyPrice}`;
    if (params.propertyLocation) message += ` in ${params.propertyLocation}`;
    if (params.propertyId) message += ` (Ref: #${params.propertyId})`;
    message += `. Please share more details, photos & floor plan.`;
  } else {
    message = `Hi, I would like to inquire about properties listed on EstateFlow.`;
  }

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}

/**
 * Generate predefined quick responses for WhatsApp bot concierge
 */
export const WHATSAPP_QUICK_TOPICS = [
  {
    id: 'schedule-visit',
    label: '🗓️ Schedule Site Visit',
    template: 'Hi EstateFlow Concierge! I want to schedule a site visit for property viewing.',
  },
  {
    id: 'price-negotiation',
    label: '💰 Price & Offer Inquiry',
    template: 'Hi, I would like to discuss price negotiation and best offer details for property listings.',
  },
  {
    id: 'home-loan',
    label: '🏦 Home Loan & EMI Assist',
    template: 'Hi, I need assistance with pre-approved Home Loans, low interest rates & EMI calculation.',
  },
  {
    id: 'list-property',
    label: '🏡 List My Property',
    template: 'Hi, I am a owner/agent looking to list my property on EstateFlow for fast sale/rent.',
  },
];
