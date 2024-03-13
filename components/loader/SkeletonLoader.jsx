import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

import styles from "./loader.style";

export default function SkeletonLoader() {
  const opacity = useRef(new Animated.Value(0.3));

  // const cardWidth =  Dimensions.get('window').width * 0.65
  // const skeWidth = cardWidth - 32;
  // console.log("DD:", Dimensions.get('window').width)

  // const translateX = useRef(new Animated.Value(-skeWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence(
        [Animated.timing(
          opacity.current,
          {
            toValue: 1,
            useNativeDriver: true,
            duration: 500,
          },
        ),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        })]
      )
    ).start()
  }, [opacity]);



  return (
    <View style={{flex: 1, flexDirection: "row", gap: 8}}>
      {
        [1,2].map((view, index) => 
      (
      <View key={`card-${index}`}>
        <View style={styles.container}>
          <Animated.View
            style={[styles.skeletonContainer,
             { opacity: opacity.current }]}
          >
            <View
              style={styles.skeletonImage}
            />
          </Animated.View>
        
          <Animated.View style={[styles.skeletonText, { opacity: opacity.current }]} />
          <Animated.View style={[styles.skeletonText, { opacity: opacity.current }]} />
        </View>
          </View>
        )
      )
      }
    </View>
  );
}
