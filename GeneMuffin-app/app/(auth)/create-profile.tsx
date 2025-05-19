import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeIn } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

// Types
type FormStep = 'basic' | 'physical' | 'lifestyle';
type BloodType = 'A' | 'B' | 'AB' | 'O';
type SleepPattern = typeof SLEEP_PATTERNS[number];
type DietPreference = typeof DIET_PREFERENCES[number];
type ExerciseHabit = typeof EXERCISE_HABITS[number];
type Ethnicity = typeof ETHNICITIES[number];

interface FormData {
  name: string;
  age: number;
  height: number;
  weight: number;
  bloodType: BloodType;
  ethnicity: Ethnicity;
  personalityTraits: string[];
  lifestyle: {
    sleep: SleepPattern;
    diet: DietPreference;
    exercise: ExerciseHabit;
  };
}

// Constants for form options
const AGE_OPTIONS = Array.from({ length: 63 }, (_, i) => i + 18); // 18-80
const BLOOD_TYPES = ['A', 'B', 'AB', 'O'] as const;
const ETHNICITIES = [
  'Asian',
  'African',
  'Caucasian',
  'Hispanic',
  'Middle Eastern',
  'Pacific Islander',
  'Mixed',
  'Other'
] as const;
const PERSONALITY_TRAITS = [
  'Adventurous',
  'Analytical',
  'Artistic',
  'Athletic',
  'Cheerful',
  'Confident',
  'Creative',
  'Curious',
  'Empathetic',
  'Energetic',
  'Intellectual',
  'Introverted',
  'Extroverted',
  'Organized',
  'Passionate'
] as const;
const SLEEP_PATTERNS = [
  'Early Bird (Before 6AM)',
  'Morning Person (6-8AM)',
  'Regular (8-10AM)',
  'Night Owl (After 10AM)'
] as const;
const DIET_PREFERENCES = [
  'Balanced',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Mediterranean',
  'Gluten-Free'
] as const;
const EXERCISE_HABITS = [
  'Very Active (Daily)',
  'Active (3-5 times/week)',
  'Moderate (1-2 times/week)',
  'Light (Occasional)',
  'Minimal'
] as const;

// Mock profiles for demonstration
const MOCK_PROFILES = [
  {
    name: 'Emma Thompson',
    age: 28,
    height: 168,
    weight: 58,
    bloodType: 'A',
    ethnicity: 'Caucasian',
    personalityTraits: ['Creative', 'Empathetic', 'Adventurous'],
    lifestyle: {
      sleep: 'Early Bird (Before 6AM)',
      diet: 'Mediterranean',
      exercise: 'Active (3-5 times/week)'
    }
  },
  {
    name: 'James Chen',
    age: 32,
    height: 175,
    weight: 70,
    bloodType: 'B',
    ethnicity: 'Asian',
    personalityTraits: ['Analytical', 'Organized', 'Intellectual'],
    lifestyle: {
      sleep: 'Regular (8-10AM)',
      diet: 'Balanced',
      exercise: 'Moderate (1-2 times/week)'
    }
  },
  {
    name: 'Sofia Rodriguez',
    age: 25,
    height: 162,
    weight: 54,
    bloodType: 'O',
    ethnicity: 'Hispanic',
    personalityTraits: ['Passionate', 'Energetic', 'Artistic'],
    lifestyle: {
      sleep: 'Night Owl (After 10AM)',
      diet: 'Vegetarian',
      exercise: 'Very Active (Daily)'
    }
  },
  {
    name: 'Alexander Wright',
    age: 35,
    height: 183,
    weight: 78,
    bloodType: 'AB',
    ethnicity: 'Mixed',
    personalityTraits: ['Confident', 'Athletic', 'Extroverted'],
    lifestyle: {
      sleep: 'Morning Person (6-8AM)',
      diet: 'Keto',
      exercise: 'Very Active (Daily)'
    }
  },
  {
    name: 'Zara Hassan',
    age: 27,
    height: 165,
    weight: 56,
    bloodType: 'A',
    ethnicity: 'Middle Eastern',
    personalityTraits: ['Curious', 'Cheerful', 'Introverted'],
    lifestyle: {
      sleep: 'Regular (8-10AM)',
      diet: 'Gluten-Free',
      exercise: 'Moderate (1-2 times/week)'
    }
  }
];

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 25,
    height: 170,
    weight: 65,
    bloodType: 'A',
    ethnicity: 'Asian',
    personalityTraits: [],
    lifestyle: {
      sleep: 'Regular (8-10AM)',
      diet: 'Balanced',
      exercise: 'Moderate (1-2 times/week)'
    }
  });

  const handleBack = () => {
    if (currentStep === 'physical') {
      setCurrentStep('basic');
    } else if (currentStep === 'lifestyle') {
      setCurrentStep('physical');
    }
  };

  const handleNext = () => {
    if (currentStep === 'basic') {
      setCurrentStep('physical');
    } else if (currentStep === 'physical') {
      setCurrentStep('lifestyle');
    } else {
      router.replace('/(tabs)');
    }
  };

  const isStepValid = () => {
    if (currentStep === 'basic') {
      return formData.age > 0 && formData.ethnicity;
    } else if (currentStep === 'physical') {
      return formData.height >= 140 && 
             formData.weight >= 40 && 
             formData.bloodType &&
             formData.personalityTraits.length > 0;
    }
    return true;
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={styles.stepRow}>
        <View style={[styles.step, styles.stepActive]}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>Basic</Text>
        </View>
        <View style={[styles.stepLine, currentStep !== 'basic' && styles.stepLineActive]} />
        <View style={[styles.step, currentStep !== 'basic' && styles.stepActive]}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>Physical</Text>
        </View>
        <View style={[styles.stepLine, currentStep === 'lifestyle' && styles.stepLineActive]} />
        <View style={[styles.step, currentStep === 'lifestyle' && styles.stepActive]}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>Lifestyle</Text>
        </View>
      </View>
    </View>
  );

  const togglePersonalityTrait = (trait: string) => {
    setFormData(prev => {
      const traits = prev.personalityTraits.includes(trait)
        ? prev.personalityTraits.filter(t => t !== trait)
        : [...prev.personalityTraits, trait];
      return { ...prev, personalityTraits: traits };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentStep !== 'basic' && (
          <Pressable style={styles.backButton} onPress={handleBack}>
            <FontAwesome name="angle-left" size={24} color="#333" />
          </Pressable>
        )}
        <Text style={styles.title}>建立帳號</Text>
        {renderStepIndicator()}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInRight} style={styles.formContainer}>
          {currentStep === 'basic' && (
            <View>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Name (Optional)"
                value={formData.name}
                onChangeText={(text: string) => setFormData({ ...formData, name: text })}
              />
              
              <Text style={styles.label}>Age</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.age}
                  onValueChange={(value: number) => setFormData({ ...formData, age: value })}
                  style={styles.picker}
                >
                  {AGE_OPTIONS.map((age) => (
                    <Picker.Item key={age} label={`${age}`} value={age} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Ethnicity</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.ethnicity}
                  onValueChange={(value: Ethnicity) => setFormData({ ...formData, ethnicity: value })}
                  style={styles.picker}
                >
                  {ETHNICITIES.map((ethnicity) => (
                    <Picker.Item key={ethnicity} label={ethnicity} value={ethnicity} />
                  ))}
                </Picker>
              </View>
            </View>
          )}

          {currentStep === 'physical' && (
            <View>
              <Text style={styles.sectionTitle}>Physical Traits</Text>
              
              <Text style={styles.label}>Height (cm): {formData.height}</Text>
              <Slider
                style={styles.slider}
                minimumValue={140}
                maximumValue={200}
                step={1}
                value={formData.height}
                onValueChange={(value: number) => setFormData({ ...formData, height: value })}
                minimumTrackTintColor="#6B7DB3"
                maximumTrackTintColor="#DDD"
              />

              <Text style={styles.label}>Weight (kg): {formData.weight}</Text>
              <Slider
                style={styles.slider}
                minimumValue={40}
                maximumValue={120}
                step={1}
                value={formData.weight}
                onValueChange={(value: number) => setFormData({ ...formData, weight: value })}
                minimumTrackTintColor="#6B7DB3"
                maximumTrackTintColor="#DDD"
              />

              <Text style={styles.label}>Blood Type</Text>
              <View style={styles.bloodTypeContainer}>
                {BLOOD_TYPES.map((type) => (
                  <Pressable
                    key={type}
                    style={[
                      styles.bloodTypeButton,
                      formData.bloodType === type && styles.bloodTypeButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, bloodType: type })}
                  >
                    <Text style={[
                      styles.bloodTypeText,
                      formData.bloodType === type && styles.bloodTypeTextActive
                    ]}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Personality Traits (Select up to 3)</Text>
              <View style={styles.traitsContainer}>
                {PERSONALITY_TRAITS.map((trait) => (
                  <Pressable
                    key={trait}
                    style={[
                      styles.traitButton,
                      formData.personalityTraits.includes(trait) && styles.traitButtonActive
                    ]}
                    onPress={() => togglePersonalityTrait(trait)}
                    disabled={formData.personalityTraits.length >= 3 && !formData.personalityTraits.includes(trait)}
                  >
                    <Text style={[
                      styles.traitText,
                      formData.personalityTraits.includes(trait) && styles.traitTextActive
                    ]}>
                      {trait}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {currentStep === 'lifestyle' && (
            <View>
              <Text style={styles.sectionTitle}>Lifestyle Preferences</Text>
              
              <Text style={styles.label}>Sleep Pattern</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.lifestyle.sleep}
                  onValueChange={(value: SleepPattern) => setFormData({
                    ...formData,
                    lifestyle: { ...formData.lifestyle, sleep: value }
                  })}
                  style={styles.picker}
                >
                  {SLEEP_PATTERNS.map((pattern) => (
                    <Picker.Item key={pattern} label={pattern} value={pattern} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Diet Preference</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.lifestyle.diet}
                  onValueChange={(value: DietPreference) => setFormData({
                    ...formData,
                    lifestyle: { ...formData.lifestyle, diet: value }
                  })}
                  style={styles.picker}
                >
                  {DIET_PREFERENCES.map((diet) => (
                    <Picker.Item key={diet} label={diet} value={diet} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Exercise Habits</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.lifestyle.exercise}
                  onValueChange={(value: ExerciseHabit) => setFormData({
                    ...formData,
                    lifestyle: { ...formData.lifestyle, exercise: value }
                  })}
                  style={styles.picker}
                >
                  {EXERCISE_HABITS.map((habit) => (
                    <Picker.Item key={habit} label={habit} value={habit} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <Animated.View entering={FadeIn} style={styles.footer}>
        <Pressable 
          style={[styles.button, !isStepValid() && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!isStepValid()}
        >
          <Text style={styles.buttonText}>
            {currentStep === 'lifestyle' ? 'Complete Profile' : 'Continue'}
          </Text>
          <FontAwesome 
            name={currentStep === 'lifestyle' ? 'check' : 'arrow-right'} 
            size={16} 
            color="#FFF" 
            style={styles.buttonIcon} 
          />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepIndicator: {
    marginTop: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  step: {
    alignItems: 'center',
    opacity: 0.5,
  },
  stepActive: {
    opacity: 1,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6B7DB3',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: '#DDD',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#6B7DB3',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
  },
  slider: {
    height: 40,
    marginBottom: 20,
  },
  sliderValue: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 16,
    color: '#666',
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bloodTypeButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  bloodTypeButtonActive: {
    backgroundColor: '#6B7DB3',
    borderColor: '#6B7DB3',
  },
  bloodTypeText: {
    fontSize: 16,
    color: '#333',
  },
  bloodTypeTextActive: {
    color: '#FFF',
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: 20,
  },
  traitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    margin: 4,
    backgroundColor: '#FFF',
  },
  traitButtonActive: {
    backgroundColor: '#6B7DB3',
    borderColor: '#6B7DB3',
  },
  traitText: {
    fontSize: 14,
    color: '#333',
  },
  traitTextActive: {
    color: '#FFF',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  button: {
    backgroundColor: '#6B7DB3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#6B7DB3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#DDD',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 14,
    marginTop: -16,
    marginBottom: 20,
  },
}); 