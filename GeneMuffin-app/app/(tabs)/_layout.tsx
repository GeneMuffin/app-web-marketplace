import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Dimensions, StyleSheet, Platform, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBarIcon = ({ name, color }: { name: any; color: string }) => (
  <View style={styles.iconContainer}>
    <FontAwesome name={name} size={24} color={color} />
  </View>
);

const CustomMatchIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <Image
      source={require('@/assets/images/Genemuffin-Render-300.png')}
      style={[styles.customIcon, { tintColor: color }]}
      resizeMode="contain"
    />
  </View>
);

const TabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.label, { color }]}>{label}</Text>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 80 : 60;
  
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6B7DB3',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            ...styles.tabBar,
            height: tabBarHeight + insets.bottom,
            paddingBottom: insets.bottom,
          },
          tabBarItemStyle: styles.tabItem,
          tabBarIconStyle: styles.tabIcon,
          tabBarLabelStyle: styles.tabLabel,
          // Add bottom padding to screen content
          tabBarBackground: () => (
            <View style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: tabBarHeight + insets.bottom,
              backgroundColor: '#FFF' 
            }} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            tabBarLabel: ({ color }) => <TabBarLabel label="Home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="matches/index"
          options={{
            title: 'Matches',
            tabBarIcon: ({ color }) => <CustomMatchIcon color={color} />,
            tabBarLabel: ({ color }) => <TabBarLabel label="Matches" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            tabBarLabel: ({ color }) => <TabBarLabel label="Profile" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            tabBarLabel: ({ color }) => <TabBarLabel label="Settings" color={color} />,
          }}
        />
        
        {/* Hide dynamic route screens from tab bar */}
        <Tabs.Screen
          name="matches/[id]"
          options={{
            tabBarButton: () => null,
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabBar: {
    backgroundColor: '#FFF',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  tabItem: {
    flex: 1,
    minWidth: '25%',
    height: Platform.OS === 'ios' ? 50 : 40,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    height: 24,
    width: 24,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  customIcon: {
    width: 24,
    height: 24,
  },
});
