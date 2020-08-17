import React, { useState } from "react";
import { Text, View } from "react-native";
import { SocketEvent } from "../component/socket/SocketEvent";
import { IGarageDoor, IGarageDoorsPayload } from "../graphql/types";

export const GarageDoorsScene: React.FC = () => {
  const [garageDoors, setGarageDoors] = useState<IGarageDoor[]>([]);

  const onGarageDoorStatus = (payload: IGarageDoorsPayload) => {
    setGarageDoors(payload.garageDoors);
  };

  return (
    <SocketEvent name="garageDoors" handle={onGarageDoorStatus}>
      <View>
        {garageDoors.map(garageDoor => (
          <Text key={garageDoor._id}>
            {garageDoor.name}
          </Text>
        ))}
      </View>
    </SocketEvent>
  );
};
