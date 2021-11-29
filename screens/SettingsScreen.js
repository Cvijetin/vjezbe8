import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const json = await response.json();
      setUsers(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function handleHomePress() {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.screen}>
      <Button title="Go to the Home screen!" onPress={handleHomePress} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={users}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.avatar}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text>{item.first_name}</Text>
                    <Text>{item.last_name}</Text>
                    <Text>{item.email}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //alignItems: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    padding: 11,
  },
});
