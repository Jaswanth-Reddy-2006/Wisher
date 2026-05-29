export interface WishData {
  id?: string;
  templateType: 
    | 'retro-box' 
    | 'neon-cyberpunk-vinyl' 
    | 'pop-up-storybook' 
    | 'cosmic-constellation'
    | 'magical-balloon-release'
    | 'elegant-card' 
    | 'wax-seal-scroll' 
    | 'infinity-origami-fold' 
    | 'glass-botanical-box'
    | 'modern-door' 
    | 'blueprint-to-brick' 
    | 'isometric-neighborhood' 
    | 'cozy-mailbox-reveal'
    | 'cap-toss'
    | 'stork-delivery'
    | 'silk-ribbon-envelope'
    | 'golden-keycard'
    | 'cosmic-galaxy-portal'
    | 'diploma-roll-unwrap'
    | 'curtain-spotlight'
    | 'nursery-mobile'
    | 'garden-gate'
    | 'ring-doorbell';
  title: string;
  targetName: string;
  date: string; // ISO string / Date format string
  message: string;
  primaryColor?: string; // Hex color override
  musicUrl?: string;     // URL to backing audio track
  musicName?: string;    // Display title of track
  bgImage?: string;      // Base64 or online image URL
  extraMessage?: string; // Optional secondary message block
  rsvpEmail?: string;    // RSVP target email
  venueName?: string;    // Wedding venue name
  googleMapsUrl?: string;// Venue Google Maps location link
  weddingTime?: string;  // Ceremony time string
  brideName?: string;    // Bride profile name
  groomName?: string;    // Groom profile name
}

export interface TemplateProps {
  data: WishData;
  isPreview?: boolean;
}
