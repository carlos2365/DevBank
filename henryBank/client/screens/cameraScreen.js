import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";

export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(false);
  const [oneFaceOnly, setOneFaceOnly] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let camera;
  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5 };
      const data = await camera.takePictureAsync(options); //aca viene la URI
      props.navigation.navigate("ProfilePic", { props, tempImg: data.uri });
    }
  }
  const handleFlash = () => {
    setFlash(!flash);
  };

  const facesDetected = ({ faces }) => {
    faces[0] && !faces[1] ? setOneFaceOnly(true) : setOneFaceOnly(false);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio="5:3"
        flashMode={flash ? "on" : "off"}
        ref={(ref) => (camera = ref)}
        onFacesDetected={facesDetected}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon name="refresh-cw" type="feather" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => takePicture()}
            styles={{ height: "100%" }}
          >
            <Icon name="camera-outline" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFlash} styles={{ height: "100%" }}>
            <Icon
              name={flash ? "flash-outline" : "flash-off-outline"}
              type="ionicon"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { height: "100%", justifyContent: "flex-end" },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    height: "10%",
    width: "100%",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {},
  text: { backgroundColor: "red" },
  image: { height: 80, width: 48 },
});
