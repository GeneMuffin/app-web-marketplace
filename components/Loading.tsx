import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function Loading() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
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
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <FontAwesome name="spinner" size={60} color="#6B7DB3" />
        <FontAwesome 
          name="spinner" 
          size={60} 
          color="#BA68C8" 
          style={styles.secondIcon}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  iconContainer: {
    position: 'relative',
  },
  secondIcon: {
    position: 'absolute',
    opacity: 0.5,
  },
}); 