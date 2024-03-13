import { StyleSheet } from "react-native";

import { SIZES, SHADOWS, COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: 250,
        height:150,
        overflow: "hidden",
        padding: SIZES.xLarge,
        backgroundColor:  "#fff",
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
      },
      skeletonContainer: {
        width: 50,
        height: 50
      },
      skeletonImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0, 0.15)",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      },
      skeletonText:{
        width: '90%',
        height: 10,
        backgroundColor: "rgba(0,0,0, 0.12)",
        borderRadius: SIZES.medium,
      },
      stripeContainer: {
        width: 330,
        overflow: "hidden",
        padding: SIZES.medium,
        backgroundColor:  "#fff",
        borderRadius: SIZES.medium,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        height: 80,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
      },
    
});

export default styles;