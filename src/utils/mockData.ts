import type { WishData } from '../templates/types';

export const templateMockData: Record<WishData['templateType'], WishData> = {
  'retro-box': {
    templateType: 'retro-box',
    title: "Happy 25th Birthday!",
    targetName: "Alexander Mercer",
    date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
    message: "Wishing you a spectacular year ahead filled with joy, magic, and boundless success! You deserve the world. Click the box to open your surprise!",
    primaryColor: "#d30f0f",
    extraMessage: "P.S. Surprise rooftop drinks start at 8:00 PM!",
    rsvpEmail: "alex@wisher.net"
  },
  'neon-cyberpunk-vinyl': {
    templateType: 'neon-cyberpunk-vinyl',
    title: "Synthwave B-Day Vibe",
    targetName: "Cyber Unit 09",
    date: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 16),
    message: "System status: Joy maximized. Compilation of another year successful. Spin the vinyl to decrypt your core birthday sequence!",
    primaryColor: "#ff007f",
    extraMessage: "Coordinates locked. Arrival: Midnight.",
    rsvpEmail: "cyber@wisher.net"
  },
  'pop-up-storybook': {
    templateType: 'pop-up-storybook',
    title: "The Fairytale Chronicle",
    targetName: "Lady Penelope",
    date: new Date(Date.now() + 86400000 * 10).toISOString().slice(0, 16),
    message: "Once upon a time, a magical chapter began. Open this storybook to release balloon cascades, cardboard cake layers, and endless celebrations!",
    primaryColor: "#d4af37",
    extraMessage: "Grand banquet at the castle hall starts at dusk.",
    rsvpEmail: "penelope@wisher.net"
  },
  'cosmic-constellation': {
    templateType: 'cosmic-constellation',
    title: "Stellar Alignment",
    targetName: "Orion Star-Walker",
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
    message: "Your birthday is written in the cosmos! Break the glass sphere to connect the stars and align your custom birthday constellation.",
    primaryColor: "#00ffff",
    extraMessage: "Observe the telescope viewing party in the observatory.",
    rsvpEmail: "orion@wisher.net"
  },
  'elegant-card': {
    templateType: 'elegant-card',
    title: "Together in Love",
    targetName: "Sarah & David",
    date: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 16),
    message: "With hearts full of love, we invite you to share our joy as we flip the page to a new chapter and exchange our vows.",
    primaryColor: "#d4af37",
    extraMessage: "Ceremony begins at 4:00 PM. Garden reception to follow.",
    rsvpEmail: "sarahanddavid@wisher.net"
  },
  'wax-seal-scroll': {
    templateType: 'wax-seal-scroll',
    title: "The Royal Union Scroll",
    targetName: "Charlotte & James",
    date: new Date(Date.now() + 86400000 * 45).toISOString().slice(0, 16),
    message: "By royal decree, you are summoned to witness the grand union of Charlotte & James. Crack the stamped wax seal to unroll our linen scroll details.",
    primaryColor: "#b80c0c",
    extraMessage: "Grand ballroom waltz commences at sunset.",
    rsvpEmail: "royalwedding@wisher.net"
  },
  'infinity-origami-fold': {
    templateType: 'infinity-origami-fold',
    title: "The Origami Marriage",
    targetName: "Emma & Benjamin",
    date: new Date(Date.now() + 86400000 * 20).toISOString().slice(0, 16),
    message: "Love folds, unfolds, and expands infinitely. Unfold this origami invitation cards sequentially to uncover our countdown, venue, and map layers.",
    primaryColor: "#d30f0f",
    extraMessage: "Casual beach dinner and drinks. Dress code: Linen.",
    rsvpEmail: "emmaandben@wisher.net"
  },
  'glass-botanical-box': {
    templateType: 'glass-botanical-box',
    title: "Botanical Terrarium Invite",
    targetName: "Grace & William",
    date: new Date(Date.now() + 86400000 * 60).toISOString().slice(0, 16),
    message: "Step inside our green sanctuary display case! Open the golden glass door to enter our botanical garden wedding details card.",
    primaryColor: "#2d6a4f",
    extraMessage: "Forest glade chapel ceremony. Maps inside.",
    rsvpEmail: "graceandwill@wisher.net"
  },
  'modern-door': {
    templateType: 'modern-door',
    title: "Welcome to Our New Nest",
    targetName: "The Sharma Family",
    date: new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 16),
    message: "We have unlocked our new home! Rotate the brass key, slide open the door, and walk inside to tour our warm housewarming invitation details.",
    primaryColor: "#d30f0f",
    extraMessage: "P.S. Home tours and warm buffet start at 1:00 PM.",
    rsvpEmail: "sharmas@wisher.net"
  },
  'blueprint-to-brick': {
    templateType: 'blueprint-to-brick',
    title: "Blueprint morphing ceremony",
    targetName: "The Reddy Family",
    date: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 16),
    message: "From drafting lines to structural bricks, we built our dream home. Click 'Build' to watch the isometric walls raise and read our invite details!",
    primaryColor: "#00ffff",
    extraMessage: "Venue address and navigation code: Sector 4B, Grid 10.",
    rsvpEmail: "reddy@wisher.net"
  },
  'isometric-neighborhood': {
    templateType: 'isometric-neighborhood',
    title: "Golden Key Neighborhood",
    targetName: "The Bhatia Family",
    date: new Date(Date.now() + 86400000 * 15).toISOString().slice(0, 16),
    message: "A new key has unlocked a house in the block! Tap the floating gold key to drop it down our chimney, slide open the roof, and see our invite details card.",
    primaryColor: "#ffd700",
    extraMessage: "Dinner and block party games. Lawn access behind house.",
    rsvpEmail: "bhatia@wisher.net"
  },
  'cozy-mailbox-reveal': {
    templateType: 'cozy-mailbox-reveal',
    title: "Letter in Mailbox",
    targetName: "The Gupta Family",
    date: new Date(Date.now() + 86400000 * 8).toISOString().slice(0, 16),
    message: "Check the mail! Pull down the red curbside flag, slide out our customized envelope, and seal open our cozy housewarming card.",
    primaryColor: "#b80c0c",
    extraMessage: "Autumn backyard fire pit and barbecue starts at 6:00 PM.",
    rsvpEmail: "guptas@wisher.net"
  }
};
