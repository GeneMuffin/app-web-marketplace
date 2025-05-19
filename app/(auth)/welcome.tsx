import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6B7DB3', '#E6F3FF']}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200)}>
          <Image
            source={require('@/assets/images/Genemuffin-Logo.png')}
            
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(400)} style={styles.textContainer}>
          <Text style={styles.title}>Welcome to GeneMuffin</Text>
          <Text style={styles.subtitle}>
            Find your perfect match through DNA compatibility
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600)} style={styles.buttonContainer}>
          <Link href="/(auth)/login" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
              <FontAwesome name="arrow-right" size={20} color="#FFF" />
            </Pressable>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B7DB3',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
}); 