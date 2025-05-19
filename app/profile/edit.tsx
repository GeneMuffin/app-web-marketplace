import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MOCK_PROFILE from '@/data/mockProfile';
import { RandomUser } from '@/services/api';

interface ExtendedRandomUser extends RandomUser {
  interests?: string[];
  bio?: string;
  dnaCompatibility?: number;
}

interface FormField {
  label: string;
  value: string;
  placeholder: string;
  icon: keyof typeof FontAwesome.glyphMap;
  multiline?: boolean;
}

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = MOCK_PROFILE as ExtendedRandomUser;
  
  const [formFields, setFormFields] = useState<FormField[]>([
    { 
      label: 'Full Name', 
      value: `${profile.name.first} ${profile.name.last}`, 
      placeholder: 'Enter your full name', 
      icon: 'user' 
    },
    { 
      label: 'Age', 
      value: profile.age.toString(), 
      placeholder: 'Enter your age', 
      icon: 'birthday-cake' 
    },
    { 
      label: 'Location', 
      value: `${profile.location.city}, ${profile.location.country}`, 
      placeholder: 'Enter your location', 
      icon: 'map-marker' 
    },
    { 
      label: 'Address', 
      value: `${profile.location.street.number} ${profile.location.street.name}, ${profile.location.state}`, 
      placeholder: 'Enter your address', 
      icon: 'home' 
    },
    { 
      label: 'Bio', 
      value: profile.bio || '', 
      placeholder: 'Write something about yourself', 
      icon: 'pencil',
      multiline: true 
    },
    { 
      label: 'Email', 
      value: profile.email, 
      placeholder: 'Enter your email', 
      icon: 'envelope' 
    },
    { 
      label: 'Interests', 
      value: profile.interests?.join(', ') || '', 
      placeholder: 'Enter your interests (comma separated)', 
      icon: 'heart' 
    },
    { 
      label: 'DNA Compatibility', 
      value: `${profile.dnaCompatibility || 0}%`, 
      placeholder: 'DNA Compatibility Score', 
      icon: 'circle-o',
    }
  ]);

  const handleFieldChange = (index: number, newValue: string) => {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], value: newValue };
    setFormFields(newFields);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6B7DB3', '#E6F3FF']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#FFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Pressable onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {formFields.map((field, index) => (
          <Animated.View 
            key={field.label}
            entering={FadeInUp.delay(index * 100)}
            style={styles.fieldContainer}
          >
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name={field.icon} size={20} color="#6B7DB3" style={styles.fieldIcon} />
              <TextInput
                style={[styles.input, field.multiline && styles.multilineInput]}
                value={field.value}
                onChangeText={(text) => handleFieldChange(index, text)}
                placeholder={field.placeholder}
                placeholderTextColor="#999"
                multiline={field.multiline}
              />
            </View>
          </Animated.View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.privacyOption}>
            <FontAwesome name="eye" size={20} color="#6B7DB3" />
            <Text style={styles.privacyText}>Profile Visibility</Text>
            <Text style={styles.privacyValue}>Public</Text>
          </View>
          <View style={styles.privacyOption}>
            <FontAwesome name="bell" size={20} color="#6B7DB3" />
            <Text style={styles.privacyText}>Match Notifications</Text>
            <Text style={styles.privacyValue}>Enabled</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#6B7DB3',
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  privacyText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  privacyValue: {
    fontSize: 16,
    color: '#6B7DB3',
    fontWeight: '600',
  },
}); 