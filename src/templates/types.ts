export interface WishData {
  id?: string;
  templateType: 'birthday-universe' | 'happy-birthday-classic' | 'pop-up-storybook' | 'romantic-anime-birthday' | 'cinematic-3d-birthday' | 'galactic-3d-heart';
  title: string;
  targetName: string;
  date: string; // ISO string / Date format string
  message: string;
  primaryColor?: string; // Hex color override
  musicUrl?: string;     // URL to backing audio track
  musicName?: string;    // Display title of track
  bgImage?: string;      // Base64 or online image URL (hero cover photo)
  extraMessage?: string; // Optional secondary message block
  rsvpEmail?: string;    // RSVP target email
  venueName?: string;    // Wedding venue name
  googleMapsUrl?: string;// Venue Google Maps location link
  weddingTime?: string;  // Ceremony time string
  brideName?: string;    // Bride profile name
  groomName?: string;    // Groom profile name
  senderName?: string;   // Sender of the wish

  // Quiz section — 3 customizable questions
  quizQ1?: string;
  quizA1a?: string;
  quizA1b?: string;
  quizA1c?: string;
  quizA1d?: string;
  quizA1correct?: number; // 0-3 index of correct answer

  quizQ2?: string;
  quizA2a?: string;
  quizA2b?: string;
  quizA2c?: string;
  quizA2d?: string;
  quizA2correct?: number;

  quizQ3?: string;
  quizA3a?: string;
  quizA3b?: string;
  quizA3c?: string;
  quizA3d?: string;
  quizA3correct?: number;

  // Photo gallery — 4 memory photos
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
}

export interface TemplateProps {
  data: WishData;
  isPreview?: boolean;
}
