export interface MockUser {
  id: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    country: string;
    city: string;
  };
  email: string;
  gender: string;
  nat: string;
  dnaCompatibility: number;
  interests: string[];
  bio: string;
}

export const mockMatches: MockUser[] = [
  {
    id: "1",
    name: { first: "Emma", last: "Thompson" },
    picture: {
      large: "https://randomuser.me/api/portraits/women/1.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/1.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/1.jpg"
    },
    location: { country: "United States", city: "New York" },
    email: "emma.thompson@example.com",
    gender: "female",
    nat: "US",
    dnaCompatibility: 92,
    interests: ["Genetics", "Hiking", "Photography"],
    bio: "Genetic researcher with a passion for understanding human connections through DNA."
  },
  {
    id: "2",
    name: { first: "Sophie", last: "Anderson" },
    picture: {
      large: "https://randomuser.me/api/portraits/women/2.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/2.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg"
    },
    location: { country: "United Kingdom", city: "London" },
    email: "sophie.anderson@example.com",
    gender: "female",
    nat: "GB",
    dnaCompatibility: 88,
    interests: ["Bioinformatics", "Yoga", "Travel"],
    bio: "Bioinformatics specialist exploring the intersection of technology and genetics."
  },
  // ... 更多 mock 數據
]; 