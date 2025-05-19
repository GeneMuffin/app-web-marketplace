import { RandomUser } from '@/services/api';

const MOCK_PROFILE: RandomUser = {
  id: '1',
  name: {
    first: 'William',
    last: 'Thompson'
  },
  picture: {
    large: require('@/assets/images/avatars/men/3.jpg'),
    medium: require('@/assets/images/avatars/men/3.jpg'),
    thumbnail: require('@/assets/images/avatars/men/3.jpg')
  },
  location: {
    city: 'London',
    country: 'United Kingdom',
    street: {
      number: 42,
      name: 'Baker Street'
    },
    state: 'Greater London'
  },
  email: 'william.thompson@example.com',
  age: 29,
  gender: 'male',
  nat: 'GB',
  dob: {
    date: '1995-03-21T12:00:00Z',
    age: 29
  },
  dnaCompatibility: 94,
  interests: ['Rugby', 'Photography', 'British Literature', 'Tea Culture'],
  bio: 'Biomedical researcher at Imperial College London, specializing in genetic engineering. Passionate about British literature and traditional tea culture. Enjoys playing rugby on weekends and capturing London\'s architectural beauty through photography. Seeking a partner who appreciates both scientific discourse and cultural traditions.'
};

export default MOCK_PROFILE; 