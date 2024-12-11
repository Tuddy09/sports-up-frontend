import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Message } from "@/interfaces/Message";
import baseApi from "@/constants/BaseApi";
import { LinearGradient } from "expo-linear-gradient";

export default function MessagesAPI() {
  const id = useLocalSearchParams().id; // Extract the dynamic lobby ID (the directory name needs to be lobby/[id] )

  const [newMessage, setNewMessage] = useState("");

  //Delete these when implemented
  const hardcodedMessages: Message[] = [
    {
      messageId: 1,
      lobbyId: 101,
      senderUserId: 1001,
      messageText: "Hey everyone! How’s it going?",
      sentAt: "2024-12-05T10:15:00.000Z",
    },
    {
      messageId: 2,
      lobbyId: 101,
      senderUserId: 1002,
      messageText: "Good morning! I’m doing great. How about you?",
      sentAt: "2024-12-05T10:16:00.000Z",
    },
    {
      messageId: 3,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Hi all! Just grabbing some coffee. ☕️",
      sentAt: "2024-12-05T10:17:00.000Z",
    },
    {
      messageId: 4,
      lobbyId: 101,
      senderUserId: 1004,
      messageText: "Did anyone check out the new update in the app?",
      sentAt: "2024-12-05T10:18:00.000Z",
    },
    {
      messageId: 5,
      lobbyId: 101,
      senderUserId: 1001,
      messageText: "Not yet! Is it any good?",
      sentAt: "2024-12-05T10:19:00.000Z",
    },
    {
      messageId: 6,
      lobbyId: 101,
      senderUserId: 1003,
      messageText:
        "I saw it, but I haven’t explored it much. Seems cool though.",
      sentAt: "2024-12-05T10:20:00.000Z",
    },
    {
      messageId: 7,
      lobbyId: 101,
      senderUserId: 1002,
      messageText: "By the way, is anyone joining the game later?",
      sentAt: "2024-12-05T10:21:00.000Z",
    },
    {
      messageId: 8,
      lobbyId: 101,
      senderUserId: 1004,
      messageText:
        "I’ll be there. Just need to finish a couple of tasks first.",
      sentAt: "2024-12-05T10:22:00.000Z",
    },
    {
      messageId: 9,
      lobbyId: 101,
      senderUserId: 1001,
      messageText: "Same here. I'll join once I’m done with this report.",
      sentAt: "2024-12-05T10:23:00.000Z",
    },
    {
      messageId: 10,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Alright, let’s sync up before the game then!",
      sentAt: "2024-12-05T10:24:00.000Z",
    },
    {
      messageId: 11,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Alright, let’s sync up before the game then!",
      sentAt: "2024-12-05T10:24:00.000Z",
    },
    {
      messageId: 12,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Alright, let’s sync up before the game then!",
      sentAt: "2024-12-05T10:24:00.000Z",
    },
    {
      messageId: 13,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Alright, let’s sync up before the game then!",
      sentAt: "2024-12-05T10:24:00.000Z",
    },
    {
      messageId: 14,
      lobbyId: 101,
      senderUserId: 1003,
      messageText: "Alright, let’s sync up before the game then!",
      sentAt: "2024-12-05T10:24:00.000Z",
    },
  ];

  //Delete these when implemented
  const users: User[] = [
    { userId: "1001", username: "Alice", email: "1@1.com" },
    { userId: "1002", username: "Bob", email: "1@1.com" },
    { userId: "1003", username: "Charlie", email: "1@1.com" },
    { userId: "1004", username: "Diana", email: "1@1.com" },
  ];

  const [messages, setMessages] = useState<Message[]>(hardcodedMessages);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${baseApi}/lobby/${id}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await axios.post(`${baseApi}/api/lobby/${id}/messages`, {
        content: newMessage,
      });
      setMessages(response.data); // Append new message
      setNewMessage(""); // Clear the input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUserName = async (userId: number): Promise<string> => {
    try {
      const response = await axios.get(`${baseApi}/Users/${userId}`);
      return response.data ? response.data.Username : "Unknown User";
    } catch (error) {
      console.error(error);
      return "Unknown User"; // Fallback in case of error
    }
  };

  const [userNames, setUserNames] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchUserNames = async () => {
      const namesMap = new Map();
      for (let message of messages) {
        if (!namesMap.has(message.senderUserId)) {
          const name = await getUserName(message.senderUserId);
          users.forEach((user) => {
            namesMap.set(Number(user.userId), user.username); // Convert userId to a number
          });
          // namesMap.set(message.senderUserId, name);
        }
      }
      setUserNames(namesMap);
    };

    fetchUserNames();
    // fetchMessages();
  }, [id]);

  return (
    <KeyboardAvoidingView
      style={styles.contentContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient
        colors={["#2ecc71", "#3498db"]} // Gradient colors from your sign-in page
        style={styles.gradientBackground} // Apply gradient to background
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.messageId.toString()}
          renderItem={({ item }) => {
            const userName = userNames.get(item.senderUserId) || "Loading...";

            return (
              <View style={styles.messageContainer}>
                <Text style={styles.sender}>{userName}</Text>
                <Text style={styles.messageContent}>{item.messageText}</Text>
                <Text style={styles.messageDate}>
                  {new Date(item.sentAt).toLocaleString()}
                </Text>
              </View>
            );
          }}
        />

        <View style={styles.inputOuterContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  gradientBackground: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    // borderBottomColor: "#000",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginBottom: 5,
  },

  sender: {
    fontWeight: "bold",
    color: "#000",
  },
  messageContent: {
    fontSize: 16,
    color: "#000",
  },
  messageDate: {
    fontSize: 10,
    color: "white",
  },
  inputContainer: {
    width: "85%",
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  inputOuterContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 16,
    borderRadius: 25,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    minWidth: 70,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
