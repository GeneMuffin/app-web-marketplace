import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockUsers from '../data/mockUsers.json';
import { ImageSourcePropType } from 'react-native';

const API_URL = 'https://randomuser.me/api';
const CACHE_KEY = 'random_users_cache';
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface RandomUser {
  id: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string | ImageSourcePropType;
    medium: string | ImageSourcePropType;
    thumbnail: string | ImageSourcePropType;
  };
  location: {
    city: string;
    country: string;
    state: string;
    street: {
      number: number;
      name: string;
    };
  };
  email: string;
  age: number;
  gender: string;
  nat: string;
  dob: {
    date: string;
    age: number;
  };
  dnaCompatibility?: number;
  interests?: string[];
  bio?: string;
}

interface CacheData {
  users: RandomUser[];
  timestamp: number;
}

const getCachedData = async (): Promise<CacheData | null> => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsedData: CacheData = JSON.parse(cachedData);
      if (Date.now() - parsedData.timestamp < CACHE_EXPIRY) {
        return parsedData;
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

const setCachedData = async (users: RandomUser[]): Promise<void> => {
  try {
    const cacheData: CacheData = {
      users,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

// 頭像映射對象類型
type AvatarIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
  21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
  31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
  41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;

const avatarImages: Record<AvatarIndex, any> = {
  1: require('@/assets/images/avatars/women/1.jpg'),
  2: require('@/assets/images/avatars/women/2.jpg'),
  3: require('@/assets/images/avatars/women/3.jpg'),
  4: require('@/assets/images/avatars/women/4.jpg'),
  5: require('@/assets/images/avatars/women/5.jpg'),
  6: require('@/assets/images/avatars/women/6.jpg'),
  7: require('@/assets/images/avatars/women/7.jpg'),
  8: require('@/assets/images/avatars/women/8.jpg'),
  9: require('@/assets/images/avatars/women/9.jpg'),
  10: require('@/assets/images/avatars/women/10.jpg'),
  11: require('@/assets/images/avatars/women/11.jpg'),
  12: require('@/assets/images/avatars/women/12.jpg'),
  13: require('@/assets/images/avatars/women/13.jpg'),
  14: require('@/assets/images/avatars/women/14.jpg'),
  15: require('@/assets/images/avatars/women/15.jpg'),
  16: require('@/assets/images/avatars/women/16.jpg'),
  17: require('@/assets/images/avatars/women/17.jpg'),
  18: require('@/assets/images/avatars/women/18.jpg'),
  19: require('@/assets/images/avatars/women/19.jpg'),
  20: require('@/assets/images/avatars/women/20.jpg'),
  21: require('@/assets/images/avatars/women/21.jpg'),
  22: require('@/assets/images/avatars/women/22.jpg'),
  23: require('@/assets/images/avatars/women/23.jpg'),
  24: require('@/assets/images/avatars/women/24.jpg'),
  25: require('@/assets/images/avatars/women/25.jpg'),
  26: require('@/assets/images/avatars/women/26.jpg'),
  27: require('@/assets/images/avatars/women/27.jpg'),
  28: require('@/assets/images/avatars/women/28.jpg'),
  29: require('@/assets/images/avatars/women/29.jpg'),
  30: require('@/assets/images/avatars/women/30.jpg'),
  31: require('@/assets/images/avatars/women/31.jpg'),
  32: require('@/assets/images/avatars/women/32.jpg'),
  33: require('@/assets/images/avatars/women/33.jpg'),
  34: require('@/assets/images/avatars/women/34.jpg'),
  35: require('@/assets/images/avatars/women/35.jpg'),
  36: require('@/assets/images/avatars/women/36.jpg'),
  37: require('@/assets/images/avatars/women/37.jpg'),
  38: require('@/assets/images/avatars/women/38.jpg'),
  39: require('@/assets/images/avatars/women/39.jpg'),
  40: require('@/assets/images/avatars/women/40.jpg'),
  41: require('@/assets/images/avatars/women/41.jpg'),
  42: require('@/assets/images/avatars/women/42.jpg'),
  43: require('@/assets/images/avatars/women/43.jpg'),
  44: require('@/assets/images/avatars/women/44.jpg'),
  45: require('@/assets/images/avatars/women/45.jpg'),
  46: require('@/assets/images/avatars/women/46.jpg'),
  47: require('@/assets/images/avatars/women/47.jpg'),
  48: require('@/assets/images/avatars/women/48.jpg'),
  49: require('@/assets/images/avatars/women/49.jpg'),
  50: require('@/assets/images/avatars/women/50.jpg'),
};


const avatarMenImages: Record<AvatarIndex, any> = {
  1: require('@/assets/images/avatars/men/10.jpg'),
  2: require('@/assets/images/avatars/men/2.jpg'),
  3: require('@/assets/images/avatars/men/3.jpg'),
  4: require('@/assets/images/avatars/men/4.jpg'),
  5: require('@/assets/images/avatars/men/5.jpg'),
  6: require('@/assets/images/avatars/men/6.jpg'),
  7: require('@/assets/images/avatars/men/7.jpg'),
  8: require('@/assets/images/avatars/men/8.jpg'),
  9: require('@/assets/images/avatars/men/9.jpg'),
  10: require('@/assets/images/avatars/men/1.jpg'),
  11: require('@/assets/images/avatars/men/10.jpg'),
  12: require('@/assets/images/avatars/men/2.jpg'),
  13: require('@/assets/images/avatars/men/3.jpg'),
  14: require('@/assets/images/avatars/men/4.jpg'),
  15: require('@/assets/images/avatars/men/5.jpg'),
  16: require('@/assets/images/avatars/men/6.jpg'),
  17: require('@/assets/images/avatars/men/7.jpg'),
  18: require('@/assets/images/avatars/men/8.jpg'),
  19: require('@/assets/images/avatars/men/9.jpg'),
  20: require('@/assets/images/avatars/men/1.jpg'),
  21: require('@/assets/images/avatars/men/2.jpg'),
  22: require('@/assets/images/avatars/men/3.jpg'),
  23: require('@/assets/images/avatars/men/4.jpg'),
  24: require('@/assets/images/avatars/men/5.jpg'),
  25: require('@/assets/images/avatars/men/6.jpg'),
  26: require('@/assets/images/avatars/men/7.jpg'),
  27: require('@/assets/images/avatars/men/8.jpg'),
  28: require('@/assets/images/avatars/men/9.jpg'),
  29: require('@/assets/images/avatars/men/10.jpg'),
  30: require('@/assets/images/avatars/men/1.jpg'),
  31: require('@/assets/images/avatars/men/2.jpg'),
  32: require('@/assets/images/avatars/men/3.jpg'),
  33: require('@/assets/images/avatars/men/4.jpg'),
  34: require('@/assets/images/avatars/men/5.jpg'),
  35: require('@/assets/images/avatars/men/6.jpg'),
  36: require('@/assets/images/avatars/men/7.jpg'),
  37: require('@/assets/images/avatars/men/8.jpg'),
  38: require('@/assets/images/avatars/men/9.jpg'),
  39: require('@/assets/images/avatars/men/10.jpg'),
  40: require('@/assets/images/avatars/men/1.jpg'),
  41: require('@/assets/images/avatars/men/2.jpg'),
  42: require('@/assets/images/avatars/men/3.jpg'),
  43: require('@/assets/images/avatars/men/4.jpg'),
  44: require('@/assets/images/avatars/men/5.jpg'),
  45: require('@/assets/images/avatars/men/6.jpg'),
  46: require('@/assets/images/avatars/men/7.jpg'),
  47: require('@/assets/images/avatars/men/8.jpg'),
  48: require('@/assets/images/avatars/men/9.jpg'),
  49: require('@/assets/images/avatars/men/10.jpg'),
  50: require('@/assets/images/avatars/men/1.jpg'),
};


// 獲取默認頭像的函數
const getDefaultAvatar = (userId: string, gender: string) => {
  const avatarIndex = (parseInt(userId) % 50 + 1) as AvatarIndex;
  const avatar = gender === 'male' ? avatarMenImages[avatarIndex] : avatarImages[avatarIndex];
  return {
    large: avatar,
    medium: avatar,
    thumbnail: avatar,
  };
};

// 獲取隨機頭像的函數
const getRandomAvatar = (userId: string, gender: string) => {
  const avatarIndex = (parseInt(userId) % 50 + 1) as AvatarIndex;
  const avatar = gender === 'male' ? avatarMenImages[avatarIndex] : avatarImages[avatarIndex];
  return {
    large: avatar,
    medium: avatar,
    thumbnail: avatar,
  };
};

export const getMatches = async (page: number = 1, limit: number = 10): Promise<RandomUser[]> => {
  try {
    // 計算分頁的起始和結束索引
    const start = (page - 1) * limit;
    const end = start + limit;

    // 從 mock 數據中獲取用戶
    const users = mockUsers.users
      .slice(start, end);

    // 為每個用戶獲取頭像和添加必要屬性
    const usersWithAvatars = users.map((user) => {
      const age = user.age || Math.floor(Math.random() * 15) + 25;
      return {
        ...user,
        age,
        picture: getDefaultAvatar(user.id, user.gender),
        dnaCompatibility: user.dnaCompatibility || Math.floor(Math.random() * 15) + 85,
        interests: user.interests || ['Genetics', 'Science', 'Technology'],
        bio: user.bio || 'Passionate about genetic research and innovation.',
        dob: {
          date: new Date().toISOString(),
          age
        },
        location: {
          city: user.location.city,
          country: user.location.country,
          state: '',
          street: {
            number: Math.floor(Math.random() * 1000),
            name: 'Main Street'
          }
        }
      };
    });

    // 緩存新數據
    await setCachedData(usersWithAvatars);
    return usersWithAvatars;
  } catch (error) {
    console.error('Error in getMatches:', error);
    // 返回至少一個默認用戶，而不是空數組
    return [{
      id: '1',
      name: { first: 'Emma', last: 'Thompson' },
      age: 28,
      picture: getDefaultAvatar('1', 'female'),
      location: { 
        city: 'New York', 
        country: 'United States',
        state: 'NY',
        street: {
          number: 123,
          name: 'Main Street'
        }
      },
      email: 'emma.thompson@example.com',
      gender: 'female',
      nat: 'US',
      dnaCompatibility: 92,
      interests: ['Genetics', 'Research', 'Innovation'],
      bio: 'Genetic researcher with a passion for understanding DNA.',
      dob: {
        date: new Date().toISOString(),
        age: 28
      }
    }];
  }
};

export const getMatchById = async (id: string): Promise<RandomUser | null> => {
  try {
    // 直接從 mock 數據中查找用戶
    const mockUser = mockUsers.users.find(user => user.id === id);

    if (mockUser) {
      const age = mockUser.age || Math.floor(Math.random() * 15) + 25;
      return {
        ...mockUser,
        age,
        picture: getDefaultAvatar(id, mockUser.gender),
        dnaCompatibility: mockUser.dnaCompatibility || Math.floor(Math.random() * 15) + 85,
        interests: mockUser.interests || ['Genetics', 'Science', 'Technology'],
        bio: mockUser.bio || 'Passionate about genetic research and innovation.',
        dob: {
          date: new Date().toISOString(),
          age
        },
        location: {
          city: mockUser.location.city,
          country: mockUser.location.country,
          state: '',
          street: {
            number: Math.floor(Math.random() * 1000),
            name: 'Main Street'
          }
        }
      };
    }

    return null;
  } catch (error) {
    console.error('Error in getMatchById:', error);
    return null;
  }
};

export const getUserProfile = async (): Promise<RandomUser> => {
  try {
    // 使用第一個 mock 用戶作為當前用戶，確保所有必要屬性都存在
    const mockUser = mockUsers.users[0];
    const age = mockUser.age || 28;
    return {
      ...mockUser,
      age,
      picture: getDefaultAvatar(mockUser.id, mockUser.gender),
      dnaCompatibility: mockUser.dnaCompatibility || 95,
      interests: mockUser.interests || ['Genetics', 'Research', 'Innovation'],
      bio: mockUser.bio || 'Passionate about genetic research and innovation.',
      dob: {
        date: new Date().toISOString(),
        age
      },
      location: {
        city: mockUser.location.city,
        country: mockUser.location.country,
        state: '',
        street: {
          number: Math.floor(Math.random() * 1000),
          name: 'Main Street'
        }
      }
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // 返回一個默認用戶，而不是拋出錯誤
    return {
      id: '1',
      name: { first: 'Emma', last: 'Thompson' },
      age: 28,
      picture: getDefaultAvatar('1', 'female'),
      location: { 
        city: 'New York', 
        country: 'United States',
        state: 'NY',
        street: {
          number: 123,
          name: 'Main Street'
        }
      },
      email: 'emma.thompson@example.com',
      gender: 'female',
      nat: 'US',
      dnaCompatibility: 92,
      interests: ['Genetics', 'Research', 'Innovation'],
      bio: 'Genetic researcher with a passion for understanding DNA.',
      dob: {
        date: new Date().toISOString(),
        age: 28
      }
    };
  }
}; 