import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function List({ navigation }) {

  useEffect(() => {
    handleFindAll(); // Chama a função ao carregar a tela
  }, []); // O array vazio [] faz com que a função seja chamada apenas uma vez ao montar o componente

  //ARRAYS TO READ ALL DATA
  const [stateArray, setStateArray] = useState([]);
  const tempArray = [];

  //GET THE ID
  const [stateId, setStateId] = useState();

  const handleFindAll = () => {
    const findAllReqUrl = `https://test-docker-repository.onrender.com/product/findAll`;

    axios
      .get(findAllReqUrl, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        data.data.map((d, index) => {
          console.log(data.data[index]);
          tempArray.push({
            id: data.data[index].id,
            name: data.data[index].name,
            quantity: data.data[index].quantity,
            price: data.data[index].price,
          });
        });

        setStateArray(tempArray);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteProduct = (id) => {
    const deleteReqUrl = `https://test-docker-repository.onrender.com/product/delete/${id}`;

    axios
      .delete(deleteReqUrl)
      .then((resp) => {
        console.log(resp.data);
        Alert.alert("AVISO", "PRODUTO DELETADO COM SUCESSO!!", [
          {
            text: "Entendido",
            onPress: () => {
              handleFindAll();
            }
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO DELETADO!!", [
          {
            text: "Entendido",
            onPress: () => {
              handleFindAll();
            }
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMenu}>
        <Button
          onPress={handleFindAll}
          title="Refresh"
          accessibilityLabel="CLICK ME"
          color="#6700B3"
        />
        <FlatList
          style={styles.flatListContainer}
          data={stateArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.flatListParentItem}>
              <View style={styles.flatListChildLeftItem}>
                <Text style={styles.text}>{`ID: ${item.id}`}</Text>
                <Text style={styles.text}>{`Name: ${item.name}`}</Text>
                <Text style={styles.text}>{`Quantity: ${item.quantity}`}</Text>
                <Text style={styles.text}>{`Price: R$ ${item.price}`}</Text>
              </View>
              <View style={styles.flatListChildRightItem}>
                <Button
                  title="Delete"
                  onPress={() => handleDeleteProduct(item.id)
                  } // Passa o id do item a ser deletado
                  color="#6700B3"
                />
                {/* Botão que quero chamar tanto a tela quanto a função*/}
                <Button
                  title="Update"
                  onPress={() =>
                    navigation.navigate("Update", { id: item.id })
                  }
                  color="#6700B3"
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.text}>{`No data available`}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#D7A1FF",
  },
  containerMenu: {
    marginTop: 40,
  },
  flatListContainer: {
    backgroundColor: "#fff", // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    padding: 15, // Padding interno
    marginVertical: 10, // Margem vertical entre os itens
    shadowColor: "#000", // Sombra para dar destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra no Android
    width: 350,
  },
  flatListParentItem: {
    alignItems: "center", // Itens centralizados
    justifyContent: "space-between", // Itens justificados
    padding: 10, // Espaçamento interno
    display: "flex",
    flexDirection: "row",
    width: 320,
    marginBottom: 20,
  },
  flatListChildLeftItem: {},
  flatListChildRightItem: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: 110,
  },
});
