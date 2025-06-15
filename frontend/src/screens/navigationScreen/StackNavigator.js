import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardScreen from "../onboarding/OnboardScreen"; // create this screen
import SignIn from "../authScreen/signIn/SignIn";
import SignUp from "../authScreen/signUp/SignUp";
import BottomTabs from "../../components/bottomTabs/BottomTabs";

import QuizScreen from "../quiz/QuizScreen"; // create
import ResultScreen from "../quiz/ResultScreen"; // create
import LeaderboardScreen from "../quiz/LeaderboardScreen"; // create

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboard"
    >
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainApp" component={BottomTabs} />

      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
