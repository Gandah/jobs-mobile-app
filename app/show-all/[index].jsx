import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";
import { toTitleCase } from "../../utils";
import useFetch from "../../hooks/useFetch";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import StripeLoader from "../../components/loader/StripeLoader";

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const pageName = toTitleCase(params.index)  
 
    // console.log(pageName)

  const { data, isLoading, error } = useFetch("search", {
    query: `${pageName}`,
    num_pages: "1",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{pageName}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <StripeLoader />
              ) : (
                error && <Text>Something went wrong</Text>
              )}
            </View>
          </>
        )}
    
      />
    </SafeAreaView>
  );
};

export default JobSearch;
