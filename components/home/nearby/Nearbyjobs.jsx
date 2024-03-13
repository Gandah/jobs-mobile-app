import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "../../../hooks/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import Stripeloader from "../../loader/StripeLoader";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer ",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity onPress={() => { router.push('/show-all/react-developer')}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <Stripeloader />
        ) : error ? (
          <Text style={{ color: COLORS.warning, textAlign: "center" }}>
            Something went wrong. Reload app.
          </Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              key={`nearby-job-${job?.job_id}`}
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
