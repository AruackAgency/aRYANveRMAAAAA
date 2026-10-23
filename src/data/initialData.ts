import { PhotoItem, ReasonItem, WishItem, FortuneItem } from '../types';

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    chapter: 'Chapter I',
    title: 'The Smile That Stopped Time',
    subtitle: 'A smile capable of lighting up the darkest nights',
    description: 'The first time you smiled, the whole universe seemed to pause. There is an effortless warmth in the way you look at the world, turning simple everyday moments into pure poetry.',
    imageUrl: '/photos/swetakshi_1.jpg',
    dateTag: 'Eternal Memory',
    locationTag: 'Where Time Stood Still ✨',
    quote: '"You don’t just have a pretty smile, Swetakshi; you have a smile that makes everyone around you believe in magic again."',
    heartCount: 342,
    filter: 'warmth',
  },
  {
    id: 2,
    chapter: 'Chapter II',
    title: 'Grace, Elegance & Pure Magic',
    subtitle: 'Walking through life with unmatched poise and sweetness',
    description: 'There is a rare kind of elegance in how you carry yourself. Your laughter is musical, your kindness is boundless, and your presence alone brings peace and joy to everyone fortunate enough to know you.',
    imageUrl: '/photos/swetakshi_2.jpg',
    dateTag: 'Golden Moments',
    locationTag: 'In Full Bloom 🌸',
    quote: '"Beauty is in the soul, and yours shines so brightly it puts the stars to shame."',
    heartCount: 428,
    filter: 'rosegold',
  },
  {
    id: 3,
    chapter: 'Chapter III',
    title: 'Radiant, Fierce & Unstoppable',
    subtitle: 'Celebrating your spirit, your passion and your sparkle',
    description: 'You are not just charming—you have a fiery, passionate heart that dreams big and achieves bigger. You inspire me and everyone around you to be better, dream higher, and love harder.',
    imageUrl: '/photos/swetakshi_3.jpg',
    dateTag: 'Celebration of Life',
    locationTag: 'Under The Starlight 🎆',
    quote: '"The world was lucky the day you were born, Swetakshi, but I am the luckiest to celebrate you today."',
    heartCount: 512,
    filter: 'cinematic',
  },
  {
    id: 4,
    chapter: 'Chapter IV',
    title: 'My Favorite View in the Whole World',
    subtitle: 'Out of 8 billion souls, none compares to you',
    description: 'Every time I look at this picture, I am reminded of how blessed I am to have you in my life. You are my favorite thought, my sweetest dream, and the brightest chapter of my story.',
    imageUrl: '/photos/swetakshi_4.jpg',
    dateTag: 'Always & Forever',
    locationTag: 'Right Here With You 💖',
    quote: '"If I had a flower for every time you made me smile, I could walk through an endless garden forever."',
    heartCount: 689,
    filter: 'dreamy',
  },
];

export const REASONS_LIST: ReasonItem[] = [
  {
    id: 1,
    number: 1,
    title: 'Your Contagious Laugh',
    text: 'When you laugh from your heart, it creates a chain reaction of pure happiness that brightens up the whole room.',
    category: 'radiance',
    emoji: '✨',
  },
  {
    id: 2,
    number: 2,
    title: 'Your Sparkling Eyes',
    text: 'Your eyes hold an entire universe of dreams, depth, mischief, and unmatched gentleness.',
    category: 'radiance',
    emoji: '👀',
  },
  {
    id: 3,
    number: 3,
    title: 'How You Care for Others',
    text: 'You have a golden heart that genuinely feels for people and wants everyone around you to feel loved.',
    category: 'heart',
    emoji: '💖',
  },
  {
    id: 4,
    number: 4,
    title: 'Your Effortless Style',
    text: 'Whether in traditional elegance or casual chic, you always carry yourself with regal poise and grace.',
    category: 'radiance',
    emoji: '👑',
  },
  {
    id: 5,
    number: 5,
    title: 'Your Cute Expressions',
    text: 'The adorable faces you make when you are excited, surprised, or thinking deeply are utterly unforgettable.',
    category: 'quirks',
    emoji: '🥰',
  },
  {
    id: 6,
    number: 6,
    title: 'The Calm in Your Voice',
    text: 'Listening to you speak brings instant peace and comfort, no matter how chaotic the day was.',
    category: 'magic',
    emoji: '🕊️',
  },
  {
    id: 7,
    number: 7,
    title: 'Your Resilient Spirit',
    text: 'You handle life’s challenges with quiet strength, resilience, and an unwavering smile.',
    category: 'heart',
    emoji: '🌟',
  },
  {
    id: 8,
    number: 8,
    title: 'Your Beautiful Soul',
    text: 'As stunning as you look on the outside, your inner warmth and honesty are 100 times more breathtaking.',
    category: 'magic',
    emoji: '💎',
  },
  {
    id: 9,
    number: 9,
    title: 'How You Make Time Stop',
    text: 'Conversations with you make hours feel like seconds, and every moment feels priceless.',
    category: 'magic',
    emoji: '⏳',
  },
  {
    id: 10,
    number: 10,
    title: 'Your Passion & Ambition',
    text: 'Seeing you pursue what you love with dedication makes me admire you more each day.',
    category: 'radiance',
    emoji: '🔥',
  },
  {
    id: 11,
    number: 11,
    title: 'Your Gentle Humor',
    text: 'The witty remarks and cute jokes you drop make every dull moment instantly cheerful.',
    category: 'quirks',
    emoji: '🌸',
  },
  {
    id: 12,
    number: 12,
    title: 'Simply Being Swetakshi',
    text: 'You don’t have to do anything special to be extraordinary. Just being your true self is perfection.',
    category: 'magic',
    emoji: '👸',
  },
];

export const INITIAL_WISHES: WishItem[] = [
  {
    id: 'w-1',
    author: 'From My Heart to Yours',
    text: 'May your new year of life overflow with boundless happiness, successful milestones, unconditional love, and dreams coming true, dearest Swetakshi! 🎂✨',
    category: 'love',
    timestamp: 'Just now',
    sparkleColor: '#f43f5e',
  },
  {
    id: 'w-2',
    author: 'The Stars & Cosmos',
    text: 'May you always keep that breathtaking smile alive. You deserve every joy in the universe today and always! 🌟',
    category: 'happiness',
    timestamp: 'Today',
    sparkleColor: '#fbbf24',
  },
  {
    id: 'w-3',
    author: 'Your Number One Admirer',
    text: 'To the girl who makes everyday feel magical: Happy Birthday Queen Swetakshi Singh! Never stop shining bright. 👑💖',
    category: 'dreams',
    timestamp: 'Today',
    sparkleColor: '#ec4899',
  },
];

export const BIRTHDAY_FORTUNES: FortuneItem[] = [
  {
    fortune: 'An extraordinary year of love, success, and spontaneous adventures awaits you!',
    blessing: 'The stars predict immense happiness, thriving ambitions, and radiant memories.',
    luckyNumber: 7,
    luckyColor: 'Rose Gold & Royal Emerald',
  },
  {
    fortune: 'Your kindness is about to attract the most beautiful blessings into your life.',
    blessing: 'Every door you knock on this year shall open with golden opportunities.',
    luckyNumber: 24,
    luckyColor: 'Champagne & Ruby Pink',
  },
  {
    fortune: 'You are entering a chapter where all your quiet hard work turns into loud triumphs!',
    blessing: 'May peace and prosperity accompany every step you take, Queen Swetakshi.',
    luckyNumber: 11,
    luckyColor: 'Lavender Starlight',
  },
  {
    fortune: 'Someone out there is deeply grateful for your existence every single day.',
    blessing: 'Love, laughter, and lifelong cherished moments will follow you wherever you go.',
    luckyNumber: 99,
    luckyColor: 'Velvet Crimson',
  },
];

export const DEFAULT_LETTER = `Dearest Swetakshi,

Happy, Happy Birthday to the most breathtaking person in my world! ✨

Today isn’t just another day on the calendar—it is the day the universe decided to become infinitely more beautiful by welcoming you into it.

Every time I see you smile, talk about your passions, or even just be your effortlessly charming self, I am reminded of how lucky the world is to have your warmth. You carry a magic with you that is so rare: a blend of kindness, elegance, fierce strength, and that radiant spark that makes everything around you glow.

On this special birthday, my only wish for you is boundless joy. May this year bring you closer to all the grand dreams in your heart. May you always be surrounded by laughter, peace, genuine love, and moments that take your breath away.

Thank you for being the wonderful, irreplaceable soul that you are. Today is all about celebrating you, Queen Swetakshi!

Forever celebrating you,
With all my love & sweetest wishes 💖`;
