import axios from "axios";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useState } from "react";

export default function FindById() {
  const [stateProdId, setStateProdId] = useState();
  const [stateProdName, setStateProdName] = useState();
  const [stateProdQuant, setStateProdQuant] = useState();
  const [stateProdPrice, setStateProdPrice] = useState();

  const handleFindById = () => {
    const findByIdReqUrl = `https://test-docker-repository.onrender.com/product/findById/${stateProdId}`;

    axios
      .get(findByIdReqUrl, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((resp) => {
        Alert.alert("AVISO!", "PRODUTO ENCONTRADO COM SUCESSO!", [
          {
            text: "Entendido",
            onPress: () => {
              setStateProdId("");
            },
          },
        ]);
        setStateProdName(resp.data.name);
        setStateProdQuant(resp.data.quantity + "");
        setStateProdPrice(resp.data.price + "");
        console.log(resp.data);
      })
      .catch((error) => {
        Alert.alert("ERRO", "PRODUTO NÃO ENCONTRADO", [
          {
            text: "Entendido",
            onPress: () => {
              setStateProdId("");
            },
          },
        ]);
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.AllMiddleContent}>
        <View style={styles.midleScreenContent}>
          <View style={styles.midleContentContainer}>
            <Text style={styles.title}>Search product</Text>
            <TextInput
              style={styles.textInput}
              value={stateProdId}
              placeholder="Digite o Id"
              onChangeText={(newValue) => {
                setStateProdId(newValue);
                console.log(newValue);
              }}
              keyboardType="numeric"
            />
            <Button
              style={styles.button}
              title="Search"
              color="#6700B3"
              onPress={() => {
                handleFindById();
              }}
            />
          </View>
        </View>
        <View style={styles.midleScreenContent}>
          <View style={styles.midleContentContainer}>
            { stateProdName ? 
              <>
                <Text style={styles.textResponse}>
                  {`Nome do Produto: ${stateProdName}`}
                </Text>
                <Text
                  style={styles.textResponse}
                >{`Quantidade do Produto: ${stateProdQuant}`}</Text>
                <Text style={styles.textResponse}>
                  {`Preço do Produto: ${stateProdPrice}`}
                </Text>
              </>
            : 
                <Text style={styles.textResponse}>
                  {`PESQUISE O PRODUTO`}
                </Text>}
          </View>
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
  AllMiddleContent: {
    height: 400,
    gap: 10,
    marginTop: 80,
  },
  midleScreenContent: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22.7,
    backgroundColor: "#fff",
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  midleContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  textInput: {
    color: "#6700B3",
    borderBottomWidth: 1,
    borderColor: "#6700B3",
    width: 220,
    paddingLeft: 4,
    marginBottom: 20,
  },
  title: {
    color: "#6700B3",
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 20,
  },
  textResponse: {
    color: "#6700B3",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 20,
  },
});
