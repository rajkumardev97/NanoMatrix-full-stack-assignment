import React, { Component, useState, useEffect } from "react";
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";

import { API_CONSTANTS } from "../shared/constants/api.constants";

function ProductActivity({ route, navigation }) {
  const [data, SetData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { sku, otherParam } = route.params;

  useEffect(() => {
    getProductDetails(sku);
  }, [sku]);

  const getProductDetails = async (sku_code) => {
    try {
      setLoading(true);
      let response = await fetch(
        `${API_CONSTANTS.PRODUCT.GET_BY_SKU_CODE}/${sku_code}`
      );

      let resData = await response.json();

      const { data } = resData;

      if (data) {
        SetData(data);
      } else {
        alert("Product Info not found in system");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`${error}`);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.productInfo}>Sku Id: {JSON.stringify(sku)}</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {data && (
            <Image
              style={styles.productImg}
              source={{
                uri: `${API_CONSTANTS.BASE.URL}/${data.product_image}`,
              }}
            />
          )}
          {data && <Text>Name: {data.product_name}</Text>}
          {data && <Text>Qty: {data.product_quantity}</Text>}
          {data && <Text>Category: {data.product_category}</Text>}
          {data && <Text>SUB Category: {data.product_sub_category}</Text>}
          {data && (
            <Image
              style={styles.productImg}
              source={{
                uri: `${API_CONSTANTS.BASE.URL}/${data.product_qr_code_image}`,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color: "black",
  },
  productInfo: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color: "green",
  },
  productImg: {
    width: 100,
    height: 100,
  },
});

export default ProductActivity;
