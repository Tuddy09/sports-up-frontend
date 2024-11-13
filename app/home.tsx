import Background from "@/components/Background";
import { UserContext } from "@/hooks/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView,Text, Button } from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import HeaderLogo from "@/components/HeaderLogo";
import baseApi from "@/constants/BaseApi";
import { Lobby } from "@/components/Lobby";
import { mockLobby } from "@/constants/mockLobbies";

export default function Home() {
  //Cred ca ar trebui sa primesc lobby ca si parametru de la home page
  const [lobby, setLobby] = useState(mockLobby);

  return (
    <Background>

      <View style={styles.headerContainer}>
        <HeaderLogo />

        <View style={styles.rightHeaderContainer}>

          {/* Va duce pe profile page */}
          <TouchableOpacity> 
            <FontAwesome name="user" size={27} style={styles.headerButtons}/>
          </TouchableOpacity>

          {/* Va duce pe settings page */}
          <TouchableOpacity>
            <FontAwesome name="cog" size={27} style={styles.headerButtons} />
          </TouchableOpacity>
        </View>

      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join Lobby</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});