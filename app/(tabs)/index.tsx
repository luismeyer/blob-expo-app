import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

export default function HomeScreen() {
  const [url, setUrl] = useState("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          onPress={async () => {
            const res = await upload("test.txt", "Hello, World!", {
              access: "public",
              handleUploadUrl: "http://localhost:8081/blob",
            });

            setUrl(res.url);
          }}
        >
          upload
        </ThemedText>
      </ThemedView>

      {url && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title">{url}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
