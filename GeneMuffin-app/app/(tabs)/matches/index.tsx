import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { getMatches } from '@/services/api';
import { RandomUser } from '@/services/api';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

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

const TRAITS = [
  { emoji: '🎨', text: 'Art Lover' },
  { emoji: '🐶', text: 'Pet Lover' },
  { emoji: '🌱', text: 'Environmentalist' },
  { emoji: '🎵', text: 'Music Enthusiast' },
  { emoji: '📚', text: 'Book Worm' },
  { emoji: '🏃', text: 'Fitness Fanatic' },
  { emoji: '🍳', text: 'Foodie' },
  { emoji: '✈️', text: 'Travel Lover' },
  { emoji: '🎮', text: 'Gamer' },
  { emoji: '🎭', text: 'Theater Goer' },
  { emoji: '🎬', text: 'Movie Buff' },
  { emoji: '🎪', text: 'Adventure Seeker' },
  { emoji: '🎯', text: 'Goal Oriented' },
  { emoji: '🧘', text: 'Yoga Practitioner' },
  { emoji: '🎲', text: 'Board Game Enthusiast' },
  { emoji: '🎪', text: 'Circus Arts' },
  { emoji: '🎨', text: 'Creative Soul' },
  { emoji: '🎭', text: 'Drama Queen' },
  { emoji: '🎪', text: 'Social Butterfly' },
  { emoji: '🎯', text: 'Focused Mind' }
];

const getRandomTraits = (count: number = 3) => {
  const shuffled = [...TRAITS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const AnimatedDNA = ({ size = 'normal' }: { size?: 'normal' | 'small' }) => {
  return (
    <View style={[styles.dnaContainer, size === 'small' && styles.dnaContainerSmall]}>
      <LottieView
        source={require('@/assets/animations/dna.json')}
        autoPlay
        loop
        style={[styles.dnaAnimation, size === 'small' && styles.dnaAnimationSmall]}
      />
    </View>
  );
};

const MatchCard = ({ item, index }: { item: RandomUser; index: number }) => {
  const matchPercentage = Math.floor(Math.random() * 10) + 85;
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const heartScale = useSharedValue(1);
  const [isLiked, setIsLiked] = useState(false);
  const [traits] = useState(() => getRandomTraits(3));
  const traitScale = useSharedValue(1);
  const traitRotation = useSharedValue(0);

  useEffect(() => {
    cardOpacity.value = withSpring(1, { damping: 12 });
    traitScale.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 5, stiffness: 100 }),
        withSpring(1, { damping: 5, stiffness: 100 })
      ),
      -1,
      true
    );

    traitRotation.value = withRepeat(
      withSequence(
        withSpring(-3, { damping: 5, stiffness: 100 }),
        withSpring(3, { damping: 5, stiffness: 100 }),
        withSpring(0, { damping: 5, stiffness: 100 })
      ),
      -1,
      true
    );
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const traitStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: traitScale.value },
      { rotate: `${traitRotation.value}deg` }
    ],
  }));

  const onPressIn = () => {
    cardScale.value = withSpring(0.95, { damping: 12 });
  };

  const onPressOut = () => {
    cardScale.value = withSpring(1, { damping: 12 });
  };

  const onLikePress = () => {
    setIsLiked(!isLiked);
    heartScale.value = withSequence(
      withSpring(1.2, { damping: 12 }),
      withSpring(1, { damping: 12 })
    );
  };

  return (
    <Pressable 
      style={styles.matchCard}
      onPress={() => router.push(`/(tabs)/matches/${item.id}`)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View 
        entering={FadeInUp.delay(index * 100)}
        style={[styles.cardContent, cardStyle]}
      >
        <LinearGradient
          colors={[
            THEME_COLORS.primary,
            THEME_COLORS.secondary,
            THEME_COLORS.tertiary,
            THEME_COLORS.quaternary
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        />
        
        <View style={styles.imageContainer}>
          <Image
            source={typeof item.picture.large === 'string' ? { uri: item.picture.large } : item.picture.large}
            style={styles.matchImage}
          />
          <BlurView intensity={80} style={styles.imageOverlay}>
            <View style={styles.compatibilityBadge}>
              <AnimatedDNA size="small" />
              <Text style={styles.compatibilityText}>{matchPercentage}%</Text>
              <Text style={styles.compatibilityLabel}>DNA Match</Text>
            </View>
          </BlurView>
          <View style={styles.imageControls}>
            <Pressable onPress={onLikePress} style={styles.likeButton}>
              <Animated.View style={heartStyle}>
                <MaterialCommunityIcons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={24} 
                  color={isLiked ? THEME_COLORS.secondary : THEME_COLORS.text} 
                />
              </Animated.View>
            </Pressable>
            <LottieView
              source={require('@/assets/animations/sparkles.json')}
              autoPlay
              loop
              style={styles.sparkleAnimation}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.matchName}>
              {item.name.first} {item.name.last} ✨
            </Text>
            <Text style={styles.matchAge}>{item.dob?.age || Math.floor(Math.random() * 15) + 25}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={14} color={THEME_COLORS.primary} />
            <Text style={styles.matchLocation}>
              {item.location.city}, {item.location.country}
            </Text>
          </View>

          <View style={styles.dnaCompatibility}>
            <View style={styles.dnaBarContainer}>
              <LinearGradient
                colors={[
                  THEME_COLORS.primary,
                  THEME_COLORS.secondary,
                  THEME_COLORS.tertiary
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.dnaBar, { width: `${matchPercentage}%` }]}
              />
            </View>
            <Text style={styles.dnaText}>Genetic Compatibility Score</Text>
          </View>

          <View style={styles.traitsContainer}>
            {traits.map((trait, traitIndex) => (
              <Animated.View 
                key={traitIndex} 
                style={[styles.traitBubble, traitStyle]}
                entering={FadeInUp.delay(traitIndex * 100)}
              >
                <LinearGradient
                  colors={[THEME_COLORS.primary, THEME_COLORS.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.traitGradient}
                />
                <View style={styles.traitContent}>
                  <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                  <Text style={styles.traitText}>{trait.text}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default function MatchesScreen() {
  const [matches, setMatches] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await getMatches(page);
      setMatches(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      fetchMatches();
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={THEME_COLORS.primary} />
        <Text style={styles.loadingText}>Loading more matches...</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={styles.background}>
        <LinearGradient
          colors={THEME_COLORS.gradient}
          style={[styles.gradient, { opacity: 0.1 }]}
        />
      </Animated.View>

      <FlatList
        data={matches}
        keyExtractor={(item, index) => `match-${item.id}-${index}`}
        renderItem={({ item, index }) => <MatchCard item={item} index={index} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <LinearGradient
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
              style={styles.headerGradient}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>DNA Matches</Text>
                <View style={styles.dnaAnimationContainer}>
                  <AnimatedDNA size="small" />
                </View>
              </View>
              
              <Text style={styles.subtitle}>Discover your genetic compatibility ✨</Text>
            </LinearGradient>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.background,
  },
  header: {
    paddingBottom: 10,
  },
  headerGradient: {
    borderRadius: 30,
    margin: 16,
    padding: 20,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: THEME_COLORS.text,
    marginRight: 10,
    textShadowColor: 'rgba(100, 149, 237, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  dnaAnimationContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    color: THEME_COLORS.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardContent: {
    overflow: 'hidden',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    opacity: 0.1,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  matchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    padding: 12,
  },
  compatibilityBadge: {
    alignItems: 'center',
  },
  compatibilityText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(255, 142, 142, 0.9)',
    shadowColor: 'rgb(255, 255, 255)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    textShadowColor: 'rgba(255, 230, 230, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginTop: 4,
  },
  compatibilityLabel: {
    fontSize: 12,
    color: 'rgba(130, 217, 255, 0.8)',
    shadowColor: 'rgb(255, 255, 255)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    textShadowColor: 'rgba(255, 230, 230, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginTop: 2,
  },
  infoContainer: {
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  matchName: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.text,
    flex: 1,
  },
  matchAge: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME_COLORS.primary,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchLocation: {
    fontSize: 16,
    color: THEME_COLORS.primary,
    marginLeft: 8,
  },
  dnaCompatibility: {
    marginTop: 8,
  },
  dnaBarContainer: {
    height: 6,
    backgroundColor: 'rgba(137, 207, 240, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  dnaBar: {
    height: '100%',
    borderRadius: 3,
  },
  dnaText: {
    fontSize: 12,
    color: THEME_COLORS.text,
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: THEME_COLORS.text,
  },
  dnaContainer: {
    position: 'absolute',
    width: 120,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dnaContainerSmall: {
    position: 'relative',
    width: 100,
    height: 100,
    top: 0,
  },
  dnaAnimation: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  dnaAnimationSmall: {
    transform: [{ scale: 0.8 }],
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  traitBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: THEME_COLORS.primary,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  traitGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  traitContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traitEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  traitText: {
    fontSize: 12,
    color: THEME_COLORS.text,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  imageControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sparkleAnimation: {
    width: 40,
    height: 40,
  },
}); 