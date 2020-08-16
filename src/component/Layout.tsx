import React from "react";
import { SafeAreaView } from "react-native";

export const Layout: React.FC = ({ children }) => (
  <SafeAreaView>
    {children}
  </SafeAreaView>
);
