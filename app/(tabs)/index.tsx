import React, { useEffect, useState, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Pressable,
  Image,
  ImageBackground,
  ColorValue,
  ViewStyle,
  DimensionValue,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
  FadeIn,
  SlideInUp,
  withDelay,
  runOnJS,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const THEME_COLORS = {
  primary: '#89CFF0',
  secondary: '#FFB6C1',
  gradient: ['#89CFF0', '#FFB6C1'] as const,
  background: '#F0F8FF', 
  text: '#6495ED',
  shadow: '#89CFF0'
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
  const progress = useSharedValue(0);
  const blockOpacity = useSharedValue(1);
  const completionScale = useSharedValue(1);
  const completionOpacity = useSharedValue(0);
  const bubblesOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(1);

  const messages = [
    { text: 'Connecting to Ethereum Network...', icon: 'ethereum' },
    { text: 'Fetching DNA Data from Blockchain...', icon: 'database' },
    { text: 'Verifying Smart Contract...', icon: 'file-document-check' },
    { text: 'Processing Genetic Information...', icon: 'dna' },
    { text: 'Perfect Match Found!', icon: 'heart' }
  ];

  const updateMessage = React.useCallback((index: number) => {
    setCurrentMessage(index);
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      const totalDuration = 6000;
      const messageCount = messages.length - 1;
      const stepDuration = totalDuration / messageCount;

      progress.value = 0;
      blockOpacity.value = 1;
      completionOpacity.value = 0;
      bubblesOpacity.value = 0;
      messageOpacity.value = 1;
      setCurrentMessage(0);

      progress.value = withTiming(1, {
        duration: totalDuration,
        easing: Easing.linear
      }, (finished) => {
        if (finished) {
          runOnJS(setCurrentMessage)(messages.length - 1);
          completionOpacity.value = withSpring(1);
          bubblesOpacity.value = withSpring(1);
          messageOpacity.value = withSpring(0);
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
            withTiming(0.5, { duration: 100 }),
            withTiming(1, { duration: 200 })
          );
        }, stepDuration * i);
      }
    };

    const timer = setTimeout(startAnimation, 2000);
    return () => clearTimeout(timer);
  }, []);

  const progressStyle = useAnimatedStyle(() => {
    const width = progress.value * 100;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.3, 0.6, 1],
      ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493']
    ) as string;

    return {
      width: `${width}%` as DimensionValue,
      backgroundColor,
    } as ViewStyle;
  });

  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [
      { translateY: interpolate(messageOpacity.value, [0, 1], [10, 0], Extrapolate.CLAMP) }
    ],
    height: interpolate(messageOpacity.value, [0, 1], [0, 80], Extrapolate.CLAMP),
    marginBottom: interpolate(messageOpacity.value, [0, 1], [0, 16], Extrapolate.CLAMP),
  }));

  const completionStyle = useAnimatedStyle(() => ({
    opacity: completionOpacity.value,
    transform: [{ scale: completionScale.value }],
  }));

  const bubblesStyle = useAnimatedStyle(() => ({
    opacity: bubblesOpacity.value,
  }));

  return (
    <View style={styles.dnaProgressContainer}>
      
      
      <View style={styles.blockchainContainer}>
        <Animated.View style={[styles.heartBubblesOverlay, bubblesStyle]}>
          <LottieView
            source={require('@/assets/animations/heart-bubbles.json')}
            autoPlay
            loop
            style={styles.heartBubblesAnimation}
          />
        </Animated.View>

        <View style={styles.blockchainProgressBar}>
          <Animated.View style={[styles.blockchainProgress, progressStyle]} />
          <View style={styles.progressMarkers}>
            {messages.slice(0, -1).map((_, index) => (
              <View key={index} style={styles.marker} />
            ))}
          </View>
        </View>

        <Animated.View style={[styles.messageContainer, messageStyle]}>
          <View style={styles.messageIconContainer}>
            <LottieView
              source={require('@/assets/animations/loading.json')}
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          </View>
          <Text style={styles.messageText}>
            {messages[currentMessage].text}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.completionContainer, completionStyle]}>
          <View style={styles.completionIconContainer}>
            <LottieView
              source={require('@/assets/animations/heart.json')}
              autoPlay
              loop
              style={styles.heartAnimation}
            />
          </View>
          <Text style={styles.completionText}>
            {messages[messages.length - 1].text}
          </Text>
        </Animated.View>

        <View style={styles.blockInfoContainer}>

          <View style={styles.matchInfo}>
            <Text style={styles.matchText}>
              Your perfect match is waiting!
            </Text>
          </View>
          <View style={styles.blockchainDetails}>
            <Text style={styles.detailTitle}>Blockchain Data</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Contract Address:</Text>
              <Text style={styles.detailValue}>0x1234...5678</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Block Number:</Text>
              <Text style={styles.detailValue}>#18,245,678</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gas Used:</Text>
              <Text style={styles.detailValue}>42,000 Gwei</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const FEATURES = [
  {
    icon: 'emoticon-happy',
    title: 'DNA Matchmaking',
    desc: 'Find your perfect genetic match',
    gradient: ['rgba(137, 207, 240, 0.95)', 'rgba(255, 182, 193, 0.95)'] as const
  },
  {
    icon: 'heart-multiple',
    title: 'Health Insights',
    desc: 'Discover shared traits & wellness',
    gradient: ['rgba(255, 182, 193, 0.95)', 'rgba(137, 207, 240, 0.95)'] as const
  },
  {
    icon: 'shield-lock',
    title: 'Secure Data',
    desc: 'Your privacy is our priority',
    gradient: ['rgba(137, 207, 240, 0.95)', 'rgba(255, 182, 193, 0.95)'] as const
  },
  {
    icon: 'dna',
    title: 'Future Traits',
    desc: 'Predict your perfect match',
    gradient: ['rgba(255, 182, 193, 0.95)', 'rgba(137, 207, 240, 0.95)'] as const
  }
];

const renderFeatureCard = ({ item, index }: { item: typeof FEATURES[0]; index: number }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      entering={SlideInUp.delay(600 + index * 100)}
      style={[styles.featureCard, animatedStyle]}
    >
      <View style={styles.featureImageContainer}>
        <Image
          source={require('@/assets/images/features/card-bg.png')}
          style={styles.featureBackground}
          resizeMode="cover"
        />
      </View>
      <LinearGradient
        colors={item.gradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          position: 'absolute',
          top: 12,
          right: 12,
          width: 40,
          height: 40,
          borderRadius: 20,
        }]}>
          <MaterialCommunityIcons 
            name={item.icon} 
            size={24} 
            color={THEME_COLORS.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.featureTitle, { 
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 8,
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }]}>{item.title}</Text>
          <Text style={[styles.featureDesc, { 
            color: '#FFFFFF',
            fontSize: 13,
            lineHeight: 20,
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }]}>{item.desc}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const UserPhotoWall = () => {
  const [avatars, setAvatars] = useState<ImageSourcePropType[]>([]);
  const scale = useSharedValue(1);

  // 預先定義所有可能的頭像
  const womenAvatars = [
    require('@/assets/images/avatars/women/1.jpg'),
    require('@/assets/images/avatars/women/2.jpg'),
    require('@/assets/images/avatars/women/3.jpg'),
    require('@/assets/images/avatars/women/4.jpg'),
    require('@/assets/images/avatars/women/5.jpg'),
    require('@/assets/images/avatars/women/6.jpg'),
    require('@/assets/images/avatars/women/7.jpg'),
    require('@/assets/images/avatars/women/8.jpg'),
    require('@/assets/images/avatars/women/9.jpg'),
    require('@/assets/images/avatars/women/10.jpg'),
    require('@/assets/images/avatars/women/11.jpg'),
    require('@/assets/images/avatars/women/12.jpg'),
    require('@/assets/images/avatars/women/13.jpg'),
    require('@/assets/images/avatars/women/14.jpg'),
    require('@/assets/images/avatars/women/15.jpg'),
    require('@/assets/images/avatars/women/16.jpg'),  
    require('@/assets/images/avatars/women/17.jpg'),
    require('@/assets/images/avatars/women/18.jpg'),
    require('@/assets/images/avatars/women/19.jpg'),
    require('@/assets/images/avatars/women/20.jpg'),
    require('@/assets/images/avatars/women/21.jpg'),
    require('@/assets/images/avatars/women/22.jpg'),
    require('@/assets/images/avatars/women/23.jpg'),
    require('@/assets/images/avatars/women/24.jpg'),
    require('@/assets/images/avatars/women/25.jpg'),
    require('@/assets/images/avatars/women/26.jpg'),
    require('@/assets/images/avatars/women/27.jpg'),
    require('@/assets/images/avatars/women/28.jpg'),
    require('@/assets/images/avatars/women/29.jpg'),  
    require('@/assets/images/avatars/women/30.jpg'),
    require('@/assets/images/avatars/women/31.jpg'),
    require('@/assets/images/avatars/women/32.jpg'),
    require('@/assets/images/avatars/women/33.jpg'),
    require('@/assets/images/avatars/women/34.jpg'),
    require('@/assets/images/avatars/women/35.jpg'),  
    require('@/assets/images/avatars/women/36.jpg'),
    require('@/assets/images/avatars/women/37.jpg'),
    require('@/assets/images/avatars/women/38.jpg'),
    require('@/assets/images/avatars/women/39.jpg'),
    require('@/assets/images/avatars/women/40.jpg'),
  ];

  const menAvatars = [
    require('@/assets/images/avatars/men/1.jpg'),
    require('@/assets/images/avatars/men/2.jpg'),
    require('@/assets/images/avatars/men/3.jpg'),
    require('@/assets/images/avatars/men/4.jpg'),
    require('@/assets/images/avatars/men/5.jpg'),
    require('@/assets/images/avatars/men/6.jpg'),
    require('@/assets/images/avatars/men/7.jpg'),
    require('@/assets/images/avatars/men/8.jpg'),
    require('@/assets/images/avatars/men/9.jpg'),
    require('@/assets/images/avatars/men/10.jpg'),
  ];

  useEffect(() => {
    const loadAvatars = () => {
      const newAvatars: ImageSourcePropType[] = [];
      
      for (let i = 0; i < 16; i++) {
        const isFemale = Math.random() > 0.5;
        const avatarArray = isFemale ? womenAvatars : menAvatars;
        const randomIndex = Math.floor(Math.random() * avatarArray.length);
        newAvatars.push(avatarArray[randomIndex]);
      }
      setAvatars(newAvatars);
    };

    loadAvatars();
    const interval = setInterval(loadAvatars, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 4 }),
        withSpring(1, { damping: 4 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.photoWallContainer, animatedStyle]}>
      <View style={styles.photoWallHeader}>
        <MaterialCommunityIcons 
          name="account-group" 
          size={24} 
          color={THEME_COLORS.primary}
        />
        <Text style={styles.photoWallTitle}>Meet Our Community</Text>
        <MaterialCommunityIcons 
          name="heart-multiple" 
          size={24} 
          color={THEME_COLORS.secondary}
        />
      </View>
      <View style={styles.photoGrid}>
        {avatars.map((avatar, index) => (
          <Animated.View
            key={String(avatar)+index}
            entering={FadeIn.delay(index * 100)}
            style={styles.photoItem}
          >
            <Image
              source={avatar}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <View style={styles.photoOverlay} />
            <MaterialCommunityIcons 
              name="heart" 
              size={16} 
              color="#FF69B4"
              style={styles.heartIcon}
            />
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 80 : 60;
  const scale = useSharedValue(1);
  const headerHeight = useSharedValue(height);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Heartbeat animation
    scale.value = withRepeat(
      withSequence(
        withSpring(1.1, { 
          damping: 4,
          stiffness: 10,
          mass: 2,
          velocity: 0.05
        }),
        withSpring(1, { 
          damping: 4,
          stiffness: 10,
          mass: 2,
          velocity: 0.05
        })
      ),
      -1,
      true
    );

    // Header animation
    setTimeout(() => {
      headerHeight.value = withSpring(280, {
        damping: 20,
        stiffness: 90
      });
      contentOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }, 3000);
  }, []);

  const heartbeatStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      borderBottomLeftRadius: interpolate(headerHeight.value, [280, height], [32, 0], Extrapolate.CLAMP),
      borderBottomRightRadius: interpolate(headerHeight.value, [280, height], [32, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            headerHeight.value,
            [height, 280],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        {
          translateY: interpolate(
            headerHeight.value,
            [height, 280],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, headerStyle]}>
        <LinearGradient
          colors={THEME_COLORS.gradient}
          style={styles.gradient}
        >
          <AnimatedDNA />
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/Genemuffin-Logo.png')}
              style={styles.logo}
              resizeMode="contain"
              tintColor="#FFFFFF"
            />
            <Text style={styles.title}>DNA ROMANCE</Text>
            <Text style={styles.subtitle}>Find your perfect match in your DNA 💘</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.content, contentStyle]}>
        <ImageBackground 
          source={require('@/assets/images/dna-background.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { backgroundColor: 'rgba(240, 248, 255, 0.85)' }]} />
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View 
              entering={SlideInUp.delay(600)}
              style={styles.featuresContainer}
            >

              <BlockchainProgress />
              <View style={[styles.statsRow, { backgroundColor: 'rgba(255, 255, 255, 0.85)' }]}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: THEME_COLORS.primary }]}>53</Text>
                  <Text style={styles.statLabel}>DNA Matches Found 💝</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: THEME_COLORS.primary }]}>92%</Text>
                  <Text style={styles.statLabel}>Match Rate ✨</Text>
                </View>
              </View>

              <UserPhotoWall />

              <View style={styles.featureGrid}>
                {FEATURES.map((item, index) => (
                  <Fragment key={item.title}>
                    {renderFeatureCard({ item, index })}
                  </Fragment>
                ))}
              </View>
            </Animated.View>

            <Animated.View 
              entering={SlideInUp.delay(1200)}
              style={[styles.actionContainer, { marginBottom: tabBarHeight + insets.bottom + 20 }]}
            >
              <Pressable style={styles.actionButton}>
                <LinearGradient
                  colors={THEME_COLORS.gradient}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Start DNA Analysis</Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingTop: 260,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  featuresContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#555',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 16,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: 24,
    width: '100%',
  },
  featureCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  featureImageContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  featureBackground: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  emojiIcon: {
    fontSize: 24,
  },
  featureTitle: {
    textAlign: 'center',
  },
  featureDesc: {
    textAlign: 'center',
    opacity: 0.95,
  },
  actionContainer: {
    padding: 16,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dnaContainer: {
    position: 'absolute',
    width: 600,
    height: 240,
    alignSelf: 'center',
    top: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dnaAnimation: {
    width: '100%',
    height: '100%',
  },
  dnaProgressContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
    borderRadius: 20,
    marginVertical: 16,
  },
  blockchainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  heartBubblesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
    zIndex: 0,
  },
  blockchainProgressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 192, 203, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
  blockchainProgress: {
    height: '100%',
    borderRadius: 6,
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
    backgroundColor: 'rgba(255, 192, 203, 0.1)',
    padding: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  messageText: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: '600',
  },
  blockInfoContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 192, 203, 0.3)',
    paddingTop: 12,
    marginTop: 8,
  },
  blockchainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  ethereumLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  blockInfoText: {
    fontSize: 14,
    color: '#FF69B4',
    fontWeight: '500',
    textAlign: 'center',
  },
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 16,
    backgroundColor: 'rgba(255, 192, 203, 0.15)',
    borderRadius: 16,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF1493',
  },
  photoWallContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 16,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  photoWallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  photoWallTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  photoItem: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 182, 193, 0.2)',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    opacity: 0.8,
  },
  messageIconContainer: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  loadingAnimation: {
    width: '100%',
    height: '100%',
  },
  completionIconContainer: {
    width: 68,
    height: 68,
    marginRight: 8,
  },
  heartAnimation: {
    width: '100%',
    height: '100%',
  },
  matchInfo: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 40,
  },
  matchText: {
    fontSize: 14,
    color: THEME_COLORS.secondary,
    fontWeight: '500',
    zIndex: 1,
  },
  heartBubblesAnimation: {
    width: '100%',
    height: '100%',
  },
  blockchainDetails: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 192, 203, 0.1)',
    borderRadius: 12,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.primary,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    color: THEME_COLORS.secondary,
    fontWeight: '500',
  },
});
