import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const THEME_COLORS = {
  primary: '#89CFF0', // 嬰兒藍
  secondary: '#FFB6C1', // 淡粉紅
  gradient: ['#89CFF0', '#FFB6C1'] as const,
  background: '#F0F8FF', // 愛麗絲藍
  text: '#6495ED', // 礦藍
  shadow: '#89CFF0'
};

type IconName = keyof typeof FontAwesome.glyphMap;

interface SettingItemProps {
  icon: IconName;
  title: string;
  description: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  type?: 'switch' | 'link';
  onPress?: () => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tabBarHeight = Platform.OS === 'ios' ? 80 : 60;

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    value, 
    onValueChange,
    type = 'switch',
    onPress
  }: SettingItemProps) => {
    const content = (
      <Animated.View 
        entering={FadeInUp.delay(200)} 
        style={styles.settingItem}
      >
        <View style={styles.settingContent}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(137, 207, 240, 0.15)' }]}>
            <FontAwesome name={icon} size={24} color={THEME_COLORS.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.settingTitle, { color: THEME_COLORS.text }]}>{title}</Text>
            <Text style={styles.settingDescription}>{description}</Text>
          </View>
          {type === 'switch' ? (
            <Switch
              value={value}
              onValueChange={onValueChange}
              trackColor={{ false: '#D1D1D6', true: THEME_COLORS.primary }}
              thumbColor={value ? '#FFF' : '#FFF'}
            />
          ) : (
            <FontAwesome name="chevron-right" size={16} color={THEME_COLORS.primary} />
          )}
        </View>
      </Animated.View>
    );

    if (type === 'link' && onPress) {
      return (
        <Pressable onPress={onPress}>
          {content}
        </Pressable>
      );
    }

    return content;
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: THEME_COLORS.background }]}
      contentContainerStyle={{
        paddingBottom: tabBarHeight + insets.bottom + 20
      }}
    >
      <LinearGradient
        colors={THEME_COLORS.gradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>App Preferences</Text>
        <SettingItem
          icon="bell"
          title="Notifications"
          description="Receive match and message alerts"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          icon="moon-o"
          title="Dark Mode"
          description="Switch to dark color theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingItem
          icon="map-marker"
          title="Location Services"
          description="Enable location-based matching"
          value={locationServices}
          onValueChange={setLocationServices}
        />
        <SettingItem
          icon="refresh"
          title="Data Sync"
          description="Keep your data up to date"
          value={dataSync}
          onValueChange={setDataSync}
        />

        <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>Account</Text>
        <SettingItem
          icon="user"
          title="Profile Settings"
          description="Edit your profile information"
          type="link"
          onPress={() => router.push('/profile/edit')}
        />
        <SettingItem
          icon="lock"
          title="Privacy"
          description="Manage your privacy settings"
          type="link"
        />
        <SettingItem
          icon="shield"
          title="Security"
          description="Update security preferences"
          type="link"
        />

        <Text style={[styles.sectionTitle, { color: THEME_COLORS.text }]}>Support</Text>
        <SettingItem
          icon="question-circle"
          title="Help Center"
          description="Get help and contact support"
          type="link"
        />
        <SettingItem
          icon="file-text-o"
          title="Terms of Service"
          description="Read our terms and conditions"
          type="link"
        />
        <SettingItem
          icon="info-circle"
          title="About"
          description="App version and information"
          type="link"
          onPress={() => router.push('/about')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  settingItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: THEME_COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 