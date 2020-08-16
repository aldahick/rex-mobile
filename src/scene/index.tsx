import React from "react";
import { Text, View } from "react-native";
import { LogoutButton } from "../component/auth";

export const IndexScene: React.FC = () => (
  <View>
    <Text>
      Hello, world!
    </Text>
    <LogoutButton />
  </View>
);
