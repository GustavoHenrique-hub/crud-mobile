import axios from "axios";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useState } from "react";

export default function Insert() {
  const [stateProdName, setStateProdName] = useState();
  const [stateProdQuant, setStateProdQuant] = useState();
  const [stateProdPrice, setStateProdPrice] = useState();

  const handleAddProduct = () => {
    const insertReqUrl = `https://test-docker-repository.onrender.com/product/insert`;

    axios
      .post(
        insertReqUrl,
        {
          name: stateProdName,
          quantity: stateProdQuant,
          price: stateProdPrice,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        respInsertMessage = resp.data.message;
        Alert.alert("AVISO", "PRODUTO INSERIDO COM SUCESSO!!", [
          {
            text: "Entendido",
            onPress: () => {
              setStateProdName("");
              setStateProdQuant("");
              setStateProdPrice("");
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO INSERIDO", [
          {
            text: "Entendido",
          },
        ]);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.midleScreenContent}>
        <View style={styles.midleContentContainer}>
          <Text style={styles.title}>Add New Prod</Text>
          <TextInput
            style={styles.textInput}
            value={stateProdName}
            placeholder="Prod Name"
            onChangeText={(newValue) => {
              setStateProdName(newValue)
              console.log(newValue);
            }}
          />

          <TextInput
            style={styles.textInput}
            value={stateProdQuant}
            placeholder="Prod Quantity"
            onChangeText={(newValue) => {
              setStateProdQuant(newValue)
              console.log(newValue);
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            value={stateProdPrice}
            placeholder="Prod Price"
            onChangeText={(newValue) => {
              setStateProdPrice(newValue)
              console.log(newValue);
            }}
            keyboardType="numeric"
          />
          <Button
            style={styles.button}
            title="Submit"
            color="#6700B3"
            onPress={handleAddProduct}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7A1FF",
    display: "flex",
  },
  midleScreenContent: {
    justifyContent:"center",
    alignItems: "center",
    marginTop: 200,
    marginLeft: 70,
    backgroundColor: "#fff",
    width: 250,
    height: 300,
    borderRadius: 20,

  },
  midleContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  textInput: {
    color: "#6700B3",
    borderBottomWidth: 1,
    borderColor: "#6700B3",
    width: 200,
    paddingLeft: 4,
    marginBottom: 20,
  },
  title: {
    color: "#6700B3",
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 20
  }
});
