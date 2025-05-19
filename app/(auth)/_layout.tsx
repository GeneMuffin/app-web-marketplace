import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <LinearGradient
        colors={['#6B7DB3', '#E6F3FF']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
      {Platform.OS === 'ios' && (
        <BlurView
          intensity={80}
          tint="light"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
      )}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerTransparent: true,
          headerBlurEffect: 'light',
          headerBackTitle: 'Back',
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'slide_from_right',
          presentation: 'card',
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Forgot Password',
          }}
        />
        <Stack.Screen
          name="verify-email"
          options={{
            title: 'Verify Email',
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            title: 'Reset Password',
          }}
        />
      </Stack>
    </>
  );
} 