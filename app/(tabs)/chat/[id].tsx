import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  avatar: string;
}

// Format time to 12-hour format
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

// Initial messages with DNA-related content
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I noticed we have a high DNA compatibility score of 92%. Would you like to chat about our genetic match?",
    sender: "other",
    timestamp: new Date(Date.now() - 3600000),
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    text: "Hello! Yes, I was particularly intrigued by our MHC gene compatibility. It shows we have strong immune system synergy!",
    sender: "me",
    timestamp: new Date(Date.now() - 3000000),
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 3,
    text: "That's fascinating! I also noticed we share similar circadian rhythm patterns. Are you an early bird too?",
    sender: "other",
    timestamp: new Date(Date.now() - 2400000),
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

// Smart responses based on keywords
const smartResponses = {
  dna: [
    "Our DNA compatibility is truly fascinating! What aspects interest you most?",
    "The genetic markers we share suggest strong biological compatibility.",
    "I've been studying our DNA match report. The immune system compatibility is particularly intriguing.",
  ],
  genes: [
    "Speaking of genes, our circadian rhythm patterns are highly compatible!",
    "Our genetic profile shows we both have excellent metabolic health markers.",
    "The genetic analysis shows we share some rare but beneficial gene variants.",
  ],
  health: [
    "Health is so important! Our genetic profiles suggest we both prioritize wellness.",
    "Our DNA indicates we might have similar approaches to health and fitness.",
    "I appreciate how our genetic compatibility extends to health-related traits.",
  ],
  interests: [
    "Beyond genetics, I'd love to hear more about your interests!",
    "While our DNA match is strong, shared interests are equally important.",
    "Our compatibility goes beyond genetics - what activities do you enjoy?",
  ],
  default: [
    "That's interesting! Tell me more about your thoughts on our match.",
    "I'm enjoying getting to know you beyond our genetic compatibility.",
    "It's amazing how much we have in common, both genetically and personally.",
  ]
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 80 : 60;

  const generateSmartResponse = (message: string) => {
    const lowercaseMsg = message.toLowerCase();
    let responseArray = smartResponses.default;

    if (lowercaseMsg.includes('dna')) responseArray = smartResponses.dna;
    else if (lowercaseMsg.includes('gene')) responseArray = smartResponses.genes;
    else if (lowercaseMsg.includes('health')) responseArray = smartResponses.health;
    else if (lowercaseMsg.includes('interest')) responseArray = smartResponses.interests;

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText.trim(),
        sender: 'me',
        timestamp: new Date(),
        avatar: "https://randomuser.me/api/portraits/men/44.jpg"
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: generateSmartResponse(inputText),
          sender: 'other' as const,
          timestamp: new Date(),
          avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        };
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Enter" && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message: Message) => (
    <Animated.View 
      entering={FadeInUp}
      style={[
        styles.messageContainer,
        message.sender === 'me' ? styles.myMessage : styles.otherMessage
      ]}
    >
      {message.sender !== 'me' && (
        <Image source={{ uri: message.avatar }} style={styles.avatar} />
      )}
      <View style={[
        styles.messageContent,
        message.sender === 'me' ? styles.myMessageContent : styles.otherMessageContent
      ]}>
        <LinearGradient
          colors={message.sender === 'me' ? ['#B3BFDB', '#B3E6E0'] : ['#F0F0F0', '#F0F0F0']}
          style={styles.messageGradient}
        >
          <Text style={[
            styles.messageText,
            message.sender === 'me' ? styles.myMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
        </LinearGradient>
        <Text style={styles.timestamp}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
      {message.sender === 'me' && (
        <Image source={{ uri: message.avatar }} style={styles.avatar} />
      )}
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <LinearGradient
        colors={['#B3BFDB', '#B3E6E0']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/matches')}
        >
          <FontAwesome name="arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.headerName}>Emma Thompson</Text>
            <Text style={styles.headerStatus}>
              {isTyping ? 'Typing...' : 'Online • DNA Match 92%'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <FontAwesome name="ellipsis-v" size={20} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderMessage(item)}
        contentContainerStyle={[
          styles.messagesContent,
          { paddingBottom: tabBarHeight + insets.bottom + 60 }
        ]}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        ListFooterComponent={
          isTyping ? (
            <Animated.View 
              entering={FadeInUp}
              exiting={FadeOutDown}
              style={styles.typingIndicator}
            >
              <ActivityIndicator size="small" color="#6B7DB3" />
              <Text style={styles.typingText}>Emma is typing...</Text>
            </Animated.View>
          ) : null
        }
      />

      <BlurView 
        intensity={10} 
        style={[
          styles.inputContainer,
          { 
            paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 25 : 12),
            bottom: tabBarHeight
          }
        ]}
      >
        <TouchableOpacity style={styles.attachButton}>
          <LinearGradient
            colors={['#B3BFDB', '#B3E6E0']}
            style={styles.iconButton}
          >
            <FontAwesome name="plus" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          multiline
          onKeyPress={handleKeyPress}
          blurOnSubmit={false}
        />
        <Pressable 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <LinearGradient
            colors={inputText.trim() ? ['#B3BFDB', '#B3E6E0'] : ['#E0E0E0', '#E0E0E0']}
            style={styles.iconButton}
          >
            <FontAwesome
              name="send"
              size={20}
              color={inputText.trim() ? '#FFF' : '#999'}
            />
          </LinearGradient>
        </Pressable>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
  },
  moreButton: {
    padding: 8,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '70%',
  },
  messageGradient: {
    borderRadius: 20,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFF',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  attachButton: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  myMessageContent: {
    alignItems: 'flex-end',
  },
  otherMessageContent: {
    alignItems: 'flex-start',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
  },
}); 