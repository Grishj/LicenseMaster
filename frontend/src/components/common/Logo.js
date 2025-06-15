import React from "react";
import { Image, StyleSheet } from "react-native";
import { images } from "../../assets/images";

const Logo = ({ size = 120 }) => {
  return (
    <Image
      source={images.logo}
      style={[styles.logo, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default Logo;
