import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  SlideInUp,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const THEME_COLORS = {
  primary: '#89CFF0', // 嬰兒藍
  secondary: '#FFB6C1', // 淡粉紅
  gradient: ['#89CFF0', '#FFB6C1'] as const,
  background: '#F0F8FF', // 愛麗絲藍
  text: '#6495ED', // 礦藍
  shadow: '#89CFF0'
};

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: THEME_COLORS.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200)}>
        <LinearGradient
          colors={THEME_COLORS.gradient}
          style={styles.header}
        >
          <Text style={styles.title}>About GeneMuffin</Text>
          <Text style={styles.subtitle}>Your Recipe for DNA Romance</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View 
        entering={SlideInUp.delay(400)}
        style={styles.content}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>Our Mission</Text>
          <Text style={styles.text}>
            GeneMuffin is revolutionizing the way people connect through DNA-based matchmaking. 
            We combine cutting-edge genetic science with advanced technology to help you find 
            meaningful relationships based on genetic compatibility.
          </Text>
        </View>

        <View style={styles.featureGrid}>
          {[
            {
              icon: 'code' as const,
              title: 'DNA Matchmaking',
              desc: 'Advanced genetic compatibility analysis for deeper connections',
              gradient: ['rgba(137, 207, 240, 0.95)', 'rgba(255, 182, 193, 0.95)'] as const
            },
            {
              icon: 'heartbeat' as const,
              title: 'Health Insights',
              desc: 'Understanding shared health traits and risks',
              gradient: ['rgba(255, 182, 193, 0.95)', 'rgba(137, 207, 240, 0.95)'] as const
            },
            {
              icon: 'shield' as const,
              title: 'Secure Data',
              desc: 'Blockchain-powered privacy protection',
              gradient: ['rgba(137, 207, 240, 0.95)', 'rgba(255, 182, 193, 0.95)'] as const
            },
            {
              icon: 'line-chart' as const,
              title: 'Future Traits',
              desc: 'Predictive analysis for compatibility',
              gradient: ['rgba(255, 182, 193, 0.95)', 'rgba(137, 207, 240, 0.95)'] as const
            }
          ].map((feature, index) => (
            <Animated.View
              key={feature.title}
              entering={SlideInUp.delay(600 + index * 100)}
              style={styles.featureCard}
            >
              <View style={styles.featureImageContainer}>
                <Image
                  source={require('@/assets/images/features/card-bg.png')}
                  style={styles.featureBackground}
                  resizeMode="cover"
                />
              </View>
              <LinearGradient
                colors={feature.gradient}
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
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }]}>
                  <FontAwesome name={feature.icon} size={16} color={THEME_COLORS.primary} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.featureTitle, { 
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '700',
                    marginBottom: 8,
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }]}>{feature.title}</Text>
                  <Text style={[styles.featureDesc, { 
                    color: '#FFFFFF',
                    fontSize: 14,
                    lineHeight: 20,
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }]}>{feature.desc}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>DNA Romance App</Text>
          <Text style={styles.text}>
            Our innovative dating app goes beyond traditional matching algorithms. By analyzing 
            genetic markers, we provide insights into:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Genetic compatibility scores</Text>
            <Text style={styles.bulletPoint}>• Shared health characteristics</Text>
            <Text style={styles.bulletPoint}>• Potential future traits</Text>
            <Text style={styles.bulletPoint}>• Relationship longevity indicators</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>Why Choose GeneMuffin?</Text>
          <Text style={styles.text}>
            We offer a unique approach to modern dating by combining:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Advanced DNA analysis</Text>
            <Text style={styles.bulletPoint}>• Secure blockchain technology</Text>
            <Text style={styles.bulletPoint}>• Scientific compatibility matching</Text>
            <Text style={styles.bulletPoint}>• Comprehensive health insights</Text>
          </View>
        </View>

        <Pressable style={styles.actionButton}>
          <LinearGradient
            colors={THEME_COLORS.gradient}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Start Your DNA Journey</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 20,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoints: {
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    lineHeight: 28,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 16,
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
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: THEME_COLORS.shadow,
    marginBottom: 30,
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
}); 