import { View, Text, ScrollView, StyleSheet, Pressable, Image, TouchableOpacity, Share, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Link, router, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { 
  FadeInUp, 
  FadeIn, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { getMatchById, RandomUser } from '@/services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Layout, Button, Icon, ProgressBar, Avatar } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import { Svg, Circle, Path, G, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { ImageSourcePropType } from 'react-native';

interface AvatarImages {
  female: {
    [key: string]: ImageSourcePropType;
  };
  male: {
    [key: string]: ImageSourcePropType;
  };
}

const AVATAR_IMAGES: AvatarImages = {
  // 女性頭像
  'female': {
    '1': require('@/assets/images/avatars/women/1.jpg'),
    '2': require('@/assets/images/avatars/women/2.jpg'),
    '3': require('@/assets/images/avatars/women/3.jpg'),
    '4': require('@/assets/images/avatars/women/4.jpg'),
    '5': require('@/assets/images/avatars/women/5.jpg'),
    '6': require('@/assets/images/avatars/women/6.jpg'),
    '7': require('@/assets/images/avatars/women/7.jpg'),
    '8': require('@/assets/images/avatars/women/8.jpg'),
    '9': require('@/assets/images/avatars/women/9.jpg'),
    '10': require('@/assets/images/avatars/women/10.jpg'),
    '11': require('@/assets/images/avatars/women/11.jpg'),
    '12': require('@/assets/images/avatars/women/12.jpg'),
    '13': require('@/assets/images/avatars/women/13.jpg'),
    '14': require('@/assets/images/avatars/women/14.jpg'),
    '15': require('@/assets/images/avatars/women/15.jpg'),
    '16': require('@/assets/images/avatars/women/16.jpg'),
    '17': require('@/assets/images/avatars/women/17.jpg'),
    '18': require('@/assets/images/avatars/women/18.jpg'),
    '19': require('@/assets/images/avatars/women/19.jpg'),
    '20': require('@/assets/images/avatars/women/20.jpg'),
    '21': require('@/assets/images/avatars/women/21.jpg'),
    '22': require('@/assets/images/avatars/women/22.jpg'),
    '23': require('@/assets/images/avatars/women/23.jpg'),
    '24': require('@/assets/images/avatars/women/24.jpg'),
    '25': require('@/assets/images/avatars/women/25.jpg'),
    '26': require('@/assets/images/avatars/women/26.jpg'),
    '27': require('@/assets/images/avatars/women/27.jpg'),
    '28': require('@/assets/images/avatars/women/28.jpg'),
    '29': require('@/assets/images/avatars/women/29.jpg'),
    '30': require('@/assets/images/avatars/women/30.jpg'), 
    '31': require('@/assets/images/avatars/women/31.jpg'),
    '32': require('@/assets/images/avatars/women/32.jpg'),
    '33': require('@/assets/images/avatars/women/33.jpg'),
    '34': require('@/assets/images/avatars/women/34.jpg'),
    '35': require('@/assets/images/avatars/women/35.jpg'),
    '36': require('@/assets/images/avatars/women/36.jpg'),
    '37': require('@/assets/images/avatars/women/37.jpg'),
    '38': require('@/assets/images/avatars/women/38.jpg'),
    '39': require('@/assets/images/avatars/women/39.jpg'),
    '40': require('@/assets/images/avatars/women/40.jpg'),
  },
  'male': {
    '1': require('@/assets/images/avatars/men/10.jpg'),
    '2': require('@/assets/images/avatars/men/2.jpg'),
    '3': require('@/assets/images/avatars/men/3.jpg'),
    '4': require('@/assets/images/avatars/men/4.jpg'),
    '5': require('@/assets/images/avatars/men/5.jpg'),
    '6': require('@/assets/images/avatars/men/6.jpg'),
    '7': require('@/assets/images/avatars/men/7.jpg'),
    '8': require('@/assets/images/avatars/men/8.jpg'),
    '9': require('@/assets/images/avatars/men/9.jpg'),
    '10': require('@/assets/images/avatars/men/1.jpg'),
    '11': require('@/assets/images/avatars/men/10.jpg'),
    '12': require('@/assets/images/avatars/men/2.jpg'),
    '13': require('@/assets/images/avatars/men/3.jpg'),
    '14': require('@/assets/images/avatars/men/4.jpg'),
    '15': require('@/assets/images/avatars/men/5.jpg'),
    '16': require('@/assets/images/avatars/men/6.jpg'), 
    '17': require('@/assets/images/avatars/men/7.jpg'),
    '18': require('@/assets/images/avatars/men/8.jpg'),
    '19': require('@/assets/images/avatars/men/9.jpg'),
    '20': require('@/assets/images/avatars/men/1.jpg'),
    '21': require('@/assets/images/avatars/men/2.jpg'),
    '22': require('@/assets/images/avatars/men/3.jpg'),
    '23': require('@/assets/images/avatars/men/4.jpg'),
    '24': require('@/assets/images/avatars/men/5.jpg'),
    '25': require('@/assets/images/avatars/men/6.jpg'),
    '26': require('@/assets/images/avatars/men/7.jpg'),
    '27': require('@/assets/images/avatars/men/8.jpg'),
    '28': require('@/assets/images/avatars/men/9.jpg'),
    '29': require('@/assets/images/avatars/men/10.jpg'),
    '30': require('@/assets/images/avatars/men/1.jpg'),
    '31': require('@/assets/images/avatars/men/2.jpg'),
    '32': require('@/assets/images/avatars/men/3.jpg'),
    '33': require('@/assets/images/avatars/men/4.jpg'),
    '34': require('@/assets/images/avatars/men/5.jpg'),
    '35': require('@/assets/images/avatars/men/6.jpg'),
    '36': require('@/assets/images/avatars/men/7.jpg'),
    '37': require('@/assets/images/avatars/men/8.jpg'),
    '38': require('@/assets/images/avatars/men/9.jpg'),
    '39': require('@/assets/images/avatars/men/10.jpg'),
    '40': require('@/assets/images/avatars/men/1.jpg'), 
  }
};

const THEME_COLORS = {
  primary: '#89CFF0', // Baby Blue
  secondary: '#FFB6C1', // Light Pink
  tertiary: '#FFD700', // Gold
  quaternary: '#98FB98', // Pale Green
  quinary: '#FFA07A', // Light Salmon
  gradient: ['#89CFF0', '#FFB6C1', '#FFD700', '#98FB98', '#FFA07A'] as const,
  background: '#F0F8FF', // Alice Blue
  text: '#6495ED', // Cornflower Blue
  shadow: '#89CFF0'
};

const DNA_COMPATIBILITY = {
  overall: 92,
  traits: [
    { 
      name: 'MHC Genes', 
      score: 95, 
      description: 'Strong immune system compatibility, beneficial for offspring health',
      icon: 'shield' as const,
      color: '#4CAF50',
      emoji: '🛡️'
    },
    { 
      name: 'Circadian Rhythm', 
      score: 88, 
      description: 'Similar sleep patterns, conducive to lifestyle synchronization',
      icon: 'moon-o' as const,
      color: '#2196F3',
      emoji: '🌙'
    },
    { 
      name: 'Metabolic Rate', 
      score: 90, 
      description: 'Matching energy levels, ideal for shared activities',
      icon: 'bolt' as const,
      color: '#FFC107',
      emoji: '⚡'
    },
    { 
      name: 'Sensory Perception', 
      score: 85, 
      description: 'Similar taste and smell preferences, enhancing dining experiences',
      icon: 'cutlery' as const,
      color: '#9C27B0',
      emoji: '🍽️'
    },
    { 
      name: 'Cognitive Style', 
      score: 87, 
      description: 'Similar thinking patterns, facilitating communication and understanding',
      icon: 'lightbulb-o' as const,
      color: '#3F51B5',
      emoji: '💡'
    },
    { 
      name: 'Emotional Response', 
      score: 89, 
      description: 'Similar emotional response patterns, promoting emotional resonance',
      icon: 'heart' as const,
      color: '#E91E63',
      emoji: '💖'
    }
  ],
  lifestyle: {
    sleep: 'Night Owl',
    diet: 'Balanced',
    exercise: 'Active',
    stress: 'Low',
    hobbies: ['Reading', 'Hiking', 'Photography'],
    values: ['Family', 'Health', 'Adventure']
  }
};

const DNAAnimation = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000 }),
      -1,
      false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Svg width="120" height="120" viewBox="0 0 120 120">
        <Defs>
          <SvgLinearGradient id="dnaGradient1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#B3BFDB" />
            <Stop offset="1" stopColor="#B3E6E0" />
          </SvgLinearGradient>
          <SvgLinearGradient id="dnaGradient2" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFB3B3" />
            <Stop offset="1" stopColor="#B3E6E0" />
          </SvgLinearGradient>
        </Defs>
        <G transform="translate(60,60)">
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x1 = 40 * Math.cos(angle);
            const y1 = 40 * Math.sin(angle);
            const x2 = 40 * Math.cos(angle + Math.PI);
            const y2 = 40 * Math.sin(angle + Math.PI);
            return (
              <G key={i}>
                <Path
                  d={`M ${x1} ${y1} Q 0 0 ${x2} ${y2}`}
                  stroke="url(#dnaGradient1)"
                  strokeWidth="2"
                  fill="none"
                />
                <Circle cx={x1} cy={y1} r="3" fill="url(#dnaGradient2)" />
                <Circle cx={x2} cy={y2} r="3" fill="url(#dnaGradient1)" />
              </G>
            );
          })}
        </G>
      </Svg>
    </Animated.View>
  );
};

interface GeneticTrait {
  name: string;
  score: number;
  description: string;
  icon: 'shield' | 'moon-o' | 'bolt' | 'cutlery' | 'lightbulb-o' | 'heart';
  color: string;
  emoji: string;
}

const GeneticTraitCard = ({ trait, index }: { trait: GeneticTrait; index: number }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1, { damping: 12 });
    scale.value = withSequence(
      withSpring(1.1, { damping: 12 }),
      withSpring(1, { damping: 12 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100)}
      style={[styles.traitCard, animatedStyle]}
    >
      <LinearGradient
        colors={[trait.color, `${trait.color}80`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.traitGradient}
      />
      <View style={styles.traitHeader}>
        <Text style={styles.traitEmoji}>{trait.emoji}</Text>
        <Text style={styles.traitName}>{trait.name}</Text>
      </View>
      <View style={styles.traitScore}>
        <ProgressBar
          progress={trait.score / 100}
          style={styles.progressBar}
          color={trait.color}
        />
        <Text style={styles.scoreText}>{trait.score}%</Text>
      </View>
      <Text style={styles.traitDescription}>{trait.description}</Text>
    </Animated.View>
  );
};

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const headerHeight = useSharedValue(300);
  const imageScale = useSharedValue(1);
  const chatButtonScale = useSharedValue(1);
  const router = useRouter();
  const heartScale = useSharedValue(1);

  useEffect(() => {
    chatButtonScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const chatButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chatButtonScale.value }],
  }));

  useEffect(() => {
    const fetchMatch = async () => {
      if (!id) {
        setError('Match ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const matchData = await getMatchById(id as string);
        if (matchData) {
          const gender = matchData.gender as 'male' | 'female';
          const maxAvatars = gender === 'male' ? 10 : 20;
          const avatarId = (parseInt(matchData.id) % maxAvatars + 1).toString();
          const avatar = AVATAR_IMAGES[gender][avatarId];
          
          setMatch({
            ...matchData,
            picture: {
              large: avatar,
              medium: avatar,
              thumbnail: avatar
            }
          });
          setError(null);
        } else {
          setError('No User Found');
        }
      } catch (err) {
        setError('Error loading match data');
        console.error('Error fetching match:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    heartScale.value = withSequence(
      withSpring(1.2, { damping: 12 }),
      withSpring(1, { damping: 12 })
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I found an incredible genetic match on GeneMuffin! Check out ${match?.name.first}'s profile - our DNA compatibility is remarkable!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    router.push('/(tabs)/matches/');
  };

  const scrollHandler = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      transform: [{ scale: imageScale.value }],
    };
  });

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B7DB3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!match) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Match not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        onScroll={event => {
          const scrollY = event.nativeEvent.contentOffset.y;
          headerHeight.value = withSpring(
            Math.max(150, 300 - scrollY),
            { damping: 15 }
          );
        }}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={THEME_COLORS.gradient}
          style={styles.background}
        />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color={THEME_COLORS.text} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.title}>DNA Match Details</Text>
            <Text style={styles.subtitle}>Discover your perfect match ✨</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={typeof match?.picture?.large === 'string' ? { uri: match.picture.large } : match?.picture?.large}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {match?.name.first} {match?.name.last}
            </Text>
            <Text style={styles.age}>{match?.dob?.age} years old</Text>
            <View style={styles.location}>
              <FontAwesome name="map-marker" size={16} color={THEME_COLORS.primary} />
              <Text style={styles.locationText}>
                {match?.location.city}, {match?.location.country}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.compatibilitySection}>
          <Text style={styles.sectionTitle}>DNA Compatibility</Text>
          <View style={styles.compatibilityScore}>
            <DNAAnimation />
            <Text style={styles.overallScore}>{DNA_COMPATIBILITY.overall}%</Text>
          </View>
          
          <View style={styles.traitsGrid}>
            {DNA_COMPATIBILITY.traits.map((trait, index) => (
              <GeneticTraitCard key={trait.name} trait={trait} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.lifestyleSection}>
          <Text style={styles.sectionTitle}>Lifestyle Match</Text>
          <View style={styles.lifestyleGrid}>
            {Object.entries(DNA_COMPATIBILITY.lifestyle).map(([key, value], index) => (
              <View key={key} style={styles.lifestyleCard}>
                <Text style={styles.lifestyleKey}>{key}</Text>
                <Text style={styles.lifestyleValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            onPress={handleLike} 
            style={[styles.actionButton, styles.likeButton]}
          >
            <Animated.View style={heartStyle}>
              <FontAwesome 
                name={isLiked ? "heart" : "heart-o"} 
                size={24} 
                color={isLiked ? THEME_COLORS.secondary : THEME_COLORS.text} 
              />
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleShare} 
            style={[styles.actionButton, styles.shareButton]}
          >
            <FontAwesome name="share" size={24} color={THEME_COLORS.text} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fabChat}
        onPress={() => router.push(`/chat/${id}`)}
      >
        <Animated.View style={[StyleSheet.absoluteFill, chatButtonAnimatedStyle]}>
          <LinearGradient
            colors={['#FFB6C1', '#FFE4B5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fabGradient}
          >
            <FontAwesome name="comments" size={24} color="#FFF" />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  headerContent: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: THEME_COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: THEME_COLORS.primary,
    marginTop: 4,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: THEME_COLORS.primary,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.text,
  },
  age: {
    fontSize: 18,
    color: THEME_COLORS.primary,
    marginTop: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 16,
    color: THEME_COLORS.primary,
    marginLeft: 4,
  },
  compatibilitySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME_COLORS.text,
    marginBottom: 16,
  },
  compatibilityScore: {
    alignItems: 'center',
    marginBottom: 20,
  },
  overallScore: {
    fontSize: 48,
    fontWeight: '700',
    color: THEME_COLORS.text,
    marginTop: 16,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  traitCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  traitGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    opacity: 0.1,
  },
  traitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  traitEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  traitName: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.text,
  },
  traitScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.text,
    marginLeft: 8,
  },
  traitDescription: {
    fontSize: 12,
    color: THEME_COLORS.text,
    opacity: 0.8,
  },
  lifestyleSection: {
    padding: 20,
  },
  lifestyleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lifestyleCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lifestyleKey: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.text,
    marginBottom: 4,
  },
  lifestyleValue: {
    fontSize: 16,
    color: THEME_COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    marginBottom: 50,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  likeButton: {
    backgroundColor: 'rgba(255, 249, 250, 0.8)',
  },
  shareButton: {
    backgroundColor: 'rgba(226, 240, 246, 0.8)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fabChat: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
    backgroundColor: '#FFB6C1',
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 