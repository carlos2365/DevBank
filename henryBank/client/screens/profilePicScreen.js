import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button as RNButton,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPic } from "../redux/user/actions";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.on}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                props.setModalVisible();
              }}
            >
              Close
            </Button>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  props.setNewImg(photo.uri); //set temp image
                  props.setModalVisible();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {type === Camera.Constants.Type.back ? "Front" : "Back "}
            </Button>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};

export default function ProfilePicScreen(props) {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.user.uri);
  const [tempImg, setTempImg] = useState("");
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

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

  const handleImgChange = () => {
    dispatch(updateUserPic(tempImg));
    props.navigation.navigate("Home");
  };
  const handleCancel = () => {
    setTempImg("");
    props.navigation.navigate("Home");
  };
  return (
    <View>
      <ImageBackground
        source={!!tempImg ? { uri: tempImg } : { uri: image }}
        style={styles.img}
      >
        <View style={styles.btn}>
          <RNButton
            title="Actualizar Foto"
            onPress={() => setShowCamera(true)} //props.navigation.navigate("Camera")}//set modal true
          />
          <RNButton onPress={handleImgChange} title="Aceptar" color="#16aa16" />
          <RNButton onPress={handleCancel} title="Cancelar" color="#ff3636" />
        </View>
      </ImageBackground>
      {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          setImage={(result) => setImage(result.uri)}
          setNewImg={(img) => setTempImg(img)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    position: "absolute",
    bottom: 33,
  },
});
