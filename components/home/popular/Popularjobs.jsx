import { useState } from 'react'
import { View, Text,
   TouchableOpacity,
    FlatList,
   } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../../../hooks/useFetch'
import SkeletonLoader from '../../loader/SkeletonLoader'


import { COLORS, SIZES } from '../../../constants'
import PopularJobCard
  from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'

const Popularjobs = () => {

  const router = useRouter();
  const { data,  error, isLoading} = useFetch('search', {
    query: 'Python developer in US',
    num_pages: '1',
  } )

  const [selectedJob, setSelectedJob] = useState("");

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };


  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => { router.push(`/show-all/python-developer`)}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
     </View>

     <View style={styles.cardsContainer}>
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <Text style={{ color: COLORS.warning, textAlign: "center" }} >Something went wrong. Reload app.</Text>
        ) : (<FlatList
            data={data} 
            initialNumToRender={6}
            renderItem={({ item }) => (
              <PopularJobCard
              item={item} 
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
        />)}
     </View>
    </View>
  )
}

export default Popularjobs