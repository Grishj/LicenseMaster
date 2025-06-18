import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  placeholderTextColor,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusAnimation] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const animatedBorderColor = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 212, 255, 0.2)", "#00d4ff"],
  });

  const animatedBackgroundColor = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.12)"],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "#ff6b6b" : animatedBorderColor,
            backgroundColor: animatedBackgroundColor,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Ionicons
              name={leftIcon}
              size={20}
              color={isFocused ? "#00d4ff" : "rgba(255, 255, 255, 0.5)"}
            />
          </View>
        )}

        <TextInput
          style={[
            styles.textInput,
            {
              paddingLeft: leftIcon ? 50 : 16,
              paddingRight: secureTextEntry || rightIcon ? 50 : 16,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor || "rgba(255, 255, 255, 0.5)"
          }
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
          selectionColor="#00d4ff"
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="rgba(255, 255, 255, 0.5)"
            />
          </TouchableOpacity>
        )}

        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? "#00d4ff" : "rgba(255, 255, 255, 0.5)"}
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
  },
  textInput: {
    fontSize: 16,
    color: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  leftIconContainer: {
    position: "absolute",
    left: 16,
    top: 18,
    zIndex: 2,
  },
  rightIconContainer: {
    position: "absolute",
    right: 16,
    top: 18,
    zIndex: 2,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
});

export default TextInputField;
