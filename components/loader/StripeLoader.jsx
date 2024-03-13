import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

import styles from "./loader.style";

export default function StripeLoader() {
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
    <View style={{flex: 1, flexDirection: "column", gap: 10}}>
      {
        [1, 2, 3, 4].map((view, index) => 
      (
        <View 
          key={`stripe-${index}`}
          style={styles.stripeContainer}>        
          <Animated.View
            style={[styles.skeletonContainer, { opacity: opacity.current }]}
          >
            <View
              style={styles.skeletonImage}
            />
          </Animated.View>
          <View style={{flex: 1, 
          flexDirection: 'column',
          gap: 8,
          marginLeft: 10,
          justifyContent: "center",
            alignItems: "center",
          }}>
            <Animated.View style={[styles.skeletonText, 
            { opacity: opacity.current },
                
            ]} />  
            <Animated.View style={[styles.skeletonText, 
            { opacity: opacity.current },
           
            ]} />  
          </View>
        </View>
        )
      )
      }
    </View>
  );
}
