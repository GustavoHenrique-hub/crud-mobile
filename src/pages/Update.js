import axios from "axios";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";

export default function Update({ route, navigation }) {
  //STATES FOR SAVE THE API REQUEST DATA
  const [stateProdName, setStateProdName] = useState();
  const [stateProdQuant, setStateProdQuant] = useState();
  const [stateProdPrice, setStateProdPrice] = useState();

  //STATE FOR UPDATE THE NEW DATA
  const [stateUpdateProdName, setStateUpdateProdName] = useState();
  const [stateUpdateProdQuant, setStateUpdateProdQuant] = useState();
  const [stateUpdateProdPrice, setStateUpdateProdPrice] = useState();

  const prodId = route.params;

  useEffect(() => {
    handleFindById(); // Chama a função ao carregar a tela
  }, []); // O array vazio [] faz com que a função seja chamada apenas uma vez ao montar o componente

  const handleFindById = () => {
    const findByIdReqUrl = `https://test-docker-repository.onrender.com/product/findById/${prodId.id}`;

    axios
      .get(findByIdReqUrl, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((resp) => {
        setStateProdName(resp.data.name)
        setStateProdQuant(resp.data.quantity + "")
        setStateProdPrice(resp.data.price + "")
        console.log(resp.data);
      }).catch((error) => {
        console.log(error.message)
      });
  };

  const handleUpdateProduct = () => {
    const updateReqUrl = `https://test-docker-repository.onrender.com/product/update/${prodId.id}`;

    axios
      .put(
        updateReqUrl,
        {
          name: stateUpdateProdName,
          quantity: stateUpdateProdQuant,
          price: stateUpdateProdPrice,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        Alert.alert("AVISO", "PRODUTO ATUALIZADO COM SUCESSO!!", [
          {
            text: "Entendido",
            onPress: () => {
              setStateUpdateProdName("");
              setStateUpdateProdQuant("");
              setStateUpdateProdPrice("");
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO ATUALIZADO!!", [
          {
            text: "Entendido",
          },
        ]);
      });
  };

  console.log(prodId.id);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topContainerLeft}>
          <Button
            title="Back"
            color="#6700B3"
            onPress={() => navigation.navigate("List")}
          />
        </View>
      </View>
      <View style={styles.midleScreenContent}>
        <View style={styles.midleContentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={stateProdName}
            value={stateUpdateProdName}
            onChangeText={(newValue) => {
              setStateUpdateProdName(newValue)
              console.log(newValue);
            }}
          />

          <TextInput
            style={styles.textInput}
            placeholder={stateProdQuant}
            value={stateUpdateProdQuant}
            onChangeText={(newValue) => {
              setStateUpdateProdQuant(newValue)
              console.log(newValue);
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder={stateProdPrice}
            value={stateUpdateProdPrice}
            onChangeText={(newValue) => {
              setStateUpdateProdPrice(newValue)
              console.log(newValue);
            }}
            keyboardType="numeric"
          />
          <Button
            style={styles.button}
            title="Submit"
            color="#6700B3"
            onPress={handleUpdateProduct}
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
  topContainer: {
    marginTop: 40,
    height: 60,
    padding: 10,
    justifyContent: "center",
  },
  topContainerLeft: {
    width: 60,
  },
  topContainerRight: {},
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
  },
  textInput: {
    color: "#6700B3",
    borderBottomWidth: 1,
    borderColor: "#6700B3",
    width: 200,
    paddingLeft: 4,
    marginBottom: 20,
  },
});
