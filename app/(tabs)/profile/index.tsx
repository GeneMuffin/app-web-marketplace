import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator, Platform, ImageSourcePropType, Dimensions, ViewStyle, DimensionValue, Easing } from 'react-native';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { RandomUser } from '@/services/api';
import MOCK_PROFILE from '@/data/mockProfile';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@ui-kitten/components';
import Animated, { 
  FadeInUp,
  FadeIn,
  FadeOut,
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
  runOnJS,
  interpolate,
  Extrapolate,
  interpolateColor
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface ExtendedRandomUser extends RandomUser {
  interests: string[];
  bio: string;
}

const THEME_COLORS = {
  primary: '#89CFF0', // 嬰兒藍
  secondary: '#FFB6C1', // 淡粉紅
  gradient: ['#89CFF0', '#FFB6C1'] as const,
  background: '#F0F8FF', // 愛麗絲藍
  text: '#6495ED', // 礦藍
  shadow: '#89CFF0'
};

const SplashAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // 入場動畫
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
    opacity.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });


    const timer = setTimeout(() => {
      opacity.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      }, () => {
        runOnJS(onComplete)();
      });
      
      scale.value = withSpring(0.0, {
        damping: 0,
        stiffness: 100,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[styles.splashContainer, animatedStyle]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Image
        source={require('@/assets/images/Genemuffin-Render-300.png')}
        style={styles.splashImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const ProfileImage = () => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.05),
        withSpring(1)
      ),
      -1,
      true
    );

    rotation.value = withRepeat(
      withSequence(
        withSpring(-5),
        withSpring(5),
        withSpring(0)
      ),
      -1,
      true
    );
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  return (
    <View style={styles.profileImageContainer}>
      <LinearGradient
        colors={THEME_COLORS.gradient}
        style={styles.imageGradientBorder}
      >
        <AnimatedImage
          source={require('@/assets/images/avatars/men/3.jpg')}
          style={[styles.profileImage, imageStyle]}
        />
      </LinearGradient>
      <View style={styles.heartDecoration}>
        <FontAwesome name="heart" size={24} color={THEME_COLORS.secondary} />
      </View>
    </View>
  );
};

const EditProfileButton = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.05),
        withSpring(1)
      ),
      -1,
      true
    );
  }, []);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    router.push('/profile/edit');
  };

  return (
    <Animated.View style={buttonStyle}>
      <Pressable style={styles.editButton} onPress={handlePress}>
        <LinearGradient
          colors={THEME_COLORS.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.editButtonGradient}
        >
          <FontAwesome name="edit" size={20} color="#FFF" />
          <Text style={styles.editButtonText}>Edit Profile ✨</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const InterestTag = ({ interest, index }: { interest: string; index: number }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      index * 100,
      withSpring(1, { damping: 5, stiffness: 100 })
    );
    
    scale.value = withDelay(
      index * 100,
      withSpring(1, { damping: 5, stiffness: 100 })
    );

    rotation.value = withRepeat(
      withSequence(
        withSpring(-5, { damping: 5, stiffness: 100 }),
        withSpring(5, { damping: 5, stiffness: 100 }),
        withSpring(0, { damping: 5, stiffness: 100 })
      ),
      -1,
      true
    );
  }, []);

  const tagStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.interestTag, tagStyle]} entering={FadeInUp.delay(index * 100)}>
      <LinearGradient
        colors={['#FF69B4', '#BA68C8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.interestGradient}
      >
        <View style={styles.interestContent}>
          <FontAwesome name="star" size={14} color="#FFF" style={styles.interestIcon} />
          <Text style={styles.interestText}>{interest}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const AnimatedDNA = () => {
  return (
    <View style={styles.dnaContainer}>
      <LottieView
        source={require('@/assets/animations/dna.json')}
        autoPlay
        loop
        style={styles.dnaAnimation}
      />
    </View>
  );
};

const BlockchainProgress = () => {
  const [currentMessage, setCurrentMessage] = React.useState(0);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const progress = useSharedValue(0);
  const blockOpacity = useSharedValue(1);
  const completionScale = useSharedValue(1);
  const completionOpacity = useSharedValue(0);

  const messages = [
    { text: 'Connecting to Blockchain Network...', icon: 'link' },
    { text: 'Reading DNA Smart Contract...', icon: 'code' },
    { text: 'Fetching DNA Data from Block #1337...', icon: 'database' },
    { text: 'Decrypting Genetic Information...', icon: 'key' },
    { text: 'Verifying DNA Integrity...', icon: 'shield' },
    { text: '✨ DNA Analysis Complete! ✨', icon: 'heart' }
  ];

  const updateMessage = React.useCallback((index: number) => {
    setCurrentMessage(index);
  }, []);

  const startSync = () => {
    setIsSyncing(true);
    const startAnimation = () => {
      const totalDuration = 5000;
      const messageCount = messages.length - 1;
      const stepDuration = totalDuration / messageCount;

      progress.value = 0;
      blockOpacity.value = 1;
      completionOpacity.value = 0;
      setCurrentMessage(0);

      progress.value = withTiming(1, {
        duration: totalDuration
      }, (finished) => {
        if (finished) {
          runOnJS(setCurrentMessage)(messages.length - 1);
          completionOpacity.value = withSpring(1);
          completionScale.value = withRepeat(
            withSequence(
              withSpring(1.2),
              withSpring(1)
            ),
            -1,
            true
          );
        }
      });

      for (let i = 1; i < messages.length - 1; i++) {
        setTimeout(() => {
          runOnJS(updateMessage)(i);
          blockOpacity.value = withSequence(
            withSpring(0.5, { damping: 10 }),
            withSpring(1, { damping: 10 })
          );
        }, stepDuration * i);
      }
    };

    startAnimation();
  };

  const progressStyle = useAnimatedStyle(() => {
    const width = progress.value * 100;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.3, 0.6, 1],
      [THEME_COLORS.primary, THEME_COLORS.secondary, THEME_COLORS.primary, THEME_COLORS.secondary]
    ) as string;

    return {
      width: `${width}%` as DimensionValue,
      backgroundColor,
    } as ViewStyle;
  });

  const messageStyle = useAnimatedStyle(() => ({
    opacity: blockOpacity.value,
    transform: [
      { translateY: interpolate(blockOpacity.value, [0, 1], [10, 0], Extrapolate.CLAMP) }
    ],
  }));

  const completionStyle = useAnimatedStyle(() => ({
    opacity: completionOpacity.value,
    transform: [{ scale: completionScale.value }],
  }));

  return (
    <View style={styles.dnaProgressContainer}>
      <View style={styles.blockchainContainer}>
        {!isSyncing ? (
          <Pressable 
            style={styles.syncButton}
            onPress={startSync}
          >
            <LinearGradient
              colors={THEME_COLORS.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.syncButtonGradient}
            >
              <FontAwesome name="refresh" size={20} color="#FFF" />
              <Text style={styles.syncButtonText}>Sync DNA Data</Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <>
            <View style={styles.blockchainProgressBar}>
              <Animated.View style={[styles.blockchainProgress, progressStyle]} />
              <View style={styles.progressMarkers}>
                {messages.slice(0, -1).map((_, index) => (
                  <View key={index} style={styles.marker} />
                ))}
              </View>
            </View>

            <Animated.View style={[styles.messageContainer, messageStyle]}>
              <FontAwesome 
                name={messages[currentMessage].icon as keyof typeof FontAwesome.glyphMap} 
                size={20} 
                color={THEME_COLORS.primary}
              />
              <Text style={[styles.messageText, { color: THEME_COLORS.text }]}>
                {messages[currentMessage].text}
              </Text>
            </Animated.View>

            <Animated.View style={[styles.completionContainer, completionStyle]}>
              <FontAwesome name="link" size={20} color={THEME_COLORS.primary} />
              <Text style={[styles.completionText, { color: THEME_COLORS.text }]}>
                ✨ Synchronization Complete! ✨
              </Text>
            </Animated.View>

            <View style={styles.blockInfoContainer}>
              <Text style={styles.blockInfoText}>
                Contract: 0x7Dc3...F8b9
              </Text>
              <Text style={styles.blockInfoText}>
                Network: Ethereum Mainnet
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<ExtendedRandomUser>(MOCK_PROFILE as ExtendedRandomUser);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <ScrollView 
        style={[styles.container]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20 }
        ]}
      >
        <Animated.View style={styles.header} entering={FadeInUp.delay(200)}>
          <ProfileImage />
          <Text style={styles.name}>
            {profile.name.first} {profile.name.last} ✨
          </Text>
          <Text style={styles.location}>
            <FontAwesome name="map-marker" size={16} color={THEME_COLORS.primary} /> {profile.location.city}, {profile.location.country}
          </Text>
          <EditProfileButton />
        </Animated.View>

        <Animated.View style={styles.bioSection} entering={FadeInUp.delay(400)}>
          <Text style={styles.sectionTitle}>About Me 💖</Text>
          <Text style={styles.bioText}>{profile.bio}</Text>
        </Animated.View>

        <Animated.View style={styles.interestsSection} entering={FadeInUp.delay(600)}>
          <Text style={styles.sectionTitle}>Interests 🌟</Text>
          <View style={styles.interestTags}>
            {profile.interests.map((interest, index) => (
              <InterestTag key={index} interest={interest} index={index} />
            ))}
          </View>
        </Animated.View>

        <Animated.View style={styles.dnaSection} entering={FadeInUp.delay(800)}>
          <Text style={styles.sectionTitle}>DNA Profile </Text>
          <BlockchainProgress />
        </Animated.View>
      </ScrollView>
      
      {showSplash && <SplashAnimation onComplete={handleSplashComplete} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
    margin: 16,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  profileImageContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  imageGradientBorder: {
    padding: 3,
    borderRadius: 70,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  heartDecoration: {
    position: 'absolute',
    right: -5,
    bottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: THEME_COLORS.text,
    marginBottom: 8,
    textShadowColor: 'rgba(100, 149, 237, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  location: {
    fontSize: 16,
    color: THEME_COLORS.primary,
    marginBottom: 16,
  },
  bioSection: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    margin: 16,
    padding: 20,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME_COLORS.text,
    marginBottom: 16,
    textShadowColor: 'rgba(100, 149, 237, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bioText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  interestsSection: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    margin: 16,
    padding: 20,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  interestTag: {
    borderRadius: 20,
    overflow: 'hidden',
    margin: 4,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  interestGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestIcon: {
    marginRight: 8,
  },
  interestText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dnaSection: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    margin: 16,
    padding: 20,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  editButton: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 16,
  },
  editButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dnaProgressContainer: {
    padding: 1,
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: 'rgba(137, 207, 240, 0.1)', // Using THEME_COLORS.primary with opacity
    borderRadius: 12,
    marginVertical: 10,
  },
  blockchainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockchainProgressBar: {
    height: 8,
    backgroundColor: 'rgba(137, 207, 240, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  blockchainProgress: {
    height: '100%',
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 4,
  },
  progressMarkers: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  marker: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(137, 207, 240, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  messageText: {
    marginLeft: 12,
    fontSize: 14,
    color: THEME_COLORS.text,
    flex: 1,
  },
  blockInfoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
    marginTop: 8,
  },
  blockInfoText: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 12,
    backgroundColor: 'rgba(137, 207, 240, 0.15)',
    borderRadius: 12,
  },
  completionText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '400',
  },
  dnaContainer: {
    position: 'absolute',
    width: 300,
    height: 120,
    alignSelf: 'center',
    top: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dnaAnimation: {
    width: '100%',
    height: '100%',
  },
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 1000,
  },
  splashImage: {
    width: 200,
    height: 200,
  },
  syncButton: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginVertical: 10,
  },
  syncButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  syncButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 