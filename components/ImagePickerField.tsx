import React, { useState } from "react";
import { View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {
  value?: string;
  onChange: (uri: string) => void;
};

export default function ImagePickerField({ value, onChange }: Props) {
  const [uri, setUri] = useState<string | undefined>(value);

  const pickImage = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Permiso requerido", "Necesitamos permiso para usar la cámara/galería.");
    return;
  }

  const res = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    base64: false,
  });

  if (!res.canceled && res.assets && res.assets.length > 0) {
    const uri = res.assets[0].uri;
    setUri(uri);
    onChange(uri);
  }
};

  return (
    <View className="mb-3">
      {uri ? (
        <Image source={{ uri }} style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 8 }} />
      ) : null}
      <Button title={uri ? "Retomar foto" : "Tomar foto del recibo"} onPress={pickImage} />
    </View>
  );
}

