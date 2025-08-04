export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  image: string;
  desc: string;
  location: string;
  urgent: boolean;
  tags: string[];
}

export interface Story {
  id: number;
  petName: string;
  adopter: string;
  image: string;
  story: string;
}

export const pets: Pet[] = [
  {
    id: 1,
    name: "Priya",
    breed: "Golden Retriever", 
    age: "2 years",
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    desc: "Friendly and energetic, loves playing fetch in Lodhi Gardens.",
    location: "Connaught Place Shelter",
    urgent: false,
    tags: ["Friendly", "Active", "Good with kids"]
  },
  {
    id: 2, 
    name: "Arjun",
    breed: "Indie Mix",
    age: "5 years",
    size: "Medium",
    gender: "Male", 
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
    desc: "Calm and gentle, perfect for Delhi apartment living.",
    location: "Karol Bagh Animal Care",
    urgent: true,
    tags: ["Calm", "Gentle", "Apartment-friendly"]
  },
  {
    id: 3,
    name: "Sakshi", 
    breed: "Labrador Mix",
    age: "1 year",
    size: "Medium",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400", 
    desc: "Playful puppy who loves monsoon walks in India Gate.",
    location: "South Delhi Rescue",
    urgent: false,
    tags: ["Playful", "Young", "Monsoon-ready"]
  }
];

export const stories: Story[] = [
  {
    id: 1,
    petName: "Raja",
    adopter: "Meera S.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300",
    story: "Raja has brought endless joy to our Gurgaon home!"
  },
  {
    id: 2,
    petName: "Simba", 
    adopter: "Rohit K.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300",
    story: "Simba helped me through tough times during Delhi lockdown."
  }
];