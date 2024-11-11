import Background from "@/components/Background";
import { UserContext } from "@/hooks/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView,Text } from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import HeaderLogo from "@/components/HeaderLogo";
import baseApi from "@/constants/BaseApi";
import { Lobby } from "@/components/Lobby";

export default function Home() {
  const { user } = useContext(UserContext);
  const [lobbies, setLobbies] = useState([]);
  
  useEffect(() => {
    const getLobbies = async ()  => {
      const api = baseApi + '/Lobbies';
      try {
        await fetch(api).then(response => response.json()).then(data => setLobbies(data));
      } catch (error) {
        console.error("Error fetching lobbies:", error);  
      }
    }
    getLobbies();
  }); 

  return (
    <Background>
      <View style={styles.headerContainer}>
        
        <HeaderLogo />

        <View style={styles.rightHeaderContainer}>
          <TouchableOpacity>
            <FontAwesome name="user" size={27} style={styles.headerButtons}/>
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome name="cog" size={27} style={styles.headerButtons} />
          </TouchableOpacity>

        </View>
      </View>

      <View>
        <ScrollView>
          {
          Array.isArray(lobbies) && lobbies.length > 0 ? 
          lobbies.map((lobby, index) => (
            <Lobby key={index} lobby = {lobby} />
          )
        ) : (
          <Text>No lobbies available</Text>
          )}
        </ScrollView>
      </View>

    </Background>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtons: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '50%',
    padding: 5,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});