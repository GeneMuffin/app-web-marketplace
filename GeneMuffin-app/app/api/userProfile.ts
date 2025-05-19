import axios from 'axios';
import { Platform } from 'react-native';

interface UserProfile {
  id: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dob: {
    age: number;
  };
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 30; // Maximum requests per minute
let requestCount = 0;
let windowStart = Date.now();

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const api = axios.create({
  baseURL: 'https://randomuser.me/api',
  timeout: 10000,
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getUserProfile = async (retryCount = 0): Promise<UserProfile> => {
  try {
    // Check rate limit
    const now = Date.now();
    if (now - windowStart >= RATE_LIMIT_WINDOW) {
      // Reset window
      requestCount = 0;
      windowStart = now;
    }

    if (requestCount >= MAX_REQUESTS) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    requestCount++;

    const response = await api.get('/', {
      params: {
        inc: 'name,location,picture,dob',
        nat: 'us,gb,au',
      },
    });

    return {
      id: response.data.results[0].login?.uuid || Date.now().toString(),
      name: response.data.results[0].name,
      location: response.data.results[0].location,
      picture: response.data.results[0].picture,
      dob: response.data.results[0].dob,
    };
  } catch (error: any) {
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      // Wait before retrying
      await sleep(RETRY_DELAY * (retryCount + 1));
      return getUserProfile(retryCount + 1);
    }

    if (error.response?.status === 429) {
      // If still getting 429 after retries, return mock data
      return getMockUserProfile();
    }

    console.error('Error fetching user profile:', error);
    return getMockUserProfile();
  }
};

// Mock data for fallback
const getMockUserProfile = (): UserProfile => ({
  id: Date.now().toString(),
  name: {
    first: 'Emma',
    last: 'Thompson',
  },
  location: {
    city: 'London',
    country: 'UK',
  },
  picture: {
    large: 'https://via.placeholder.com/150',
    medium: 'https://via.placeholder.com/100',
    thumbnail: 'https://via.placeholder.com/50',
  },
  dob: {
    age: 28,
  },
}); 