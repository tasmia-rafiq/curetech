// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'react-native-maps';
// import { getNearbyPlaces } from '../api-services/placesApi';

// const MedicalAssistanceScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission denied', 'Location permission is required to access this feature.');
//           return;
//         }

//         const loc = await Location.getCurrentPositionAsync({});
//         const { latitude, longitude } = loc.coords;
//         setLocation({ latitude, longitude });
//       } catch (error) {
//         console.error('Error requesting location permissions or retrieving location:', error);
//         Alert.alert('Error', 'Failed to get current location. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   useEffect(() => {
//     if (location) {
//       const fetchNearbyPlaces = async () => {
//         try {
//           setLoading(true);
//           const data = await getNearbyPlaces('hospital', location.latitude, location.longitude, 'DISTANCE');
//           console.log('Fetched places:', data.results);
//           setPlaces(data.results);
//         } catch (error) {
//           console.error('Error fetching nearby places:', error);
//           Alert.alert('Error', 'Failed to fetch nearby places. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchNearbyPlaces();
//     }
//   }, [location]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//           region={{
//             latitude: location?.latitude || 37.78825,
//             longitude: location?.longitude || -122.4324,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           {location && <Marker coordinate={location} title="You are here" />}
//           {places.map((place) => (
//             place.geocodes && place.geocodes.main && (
//               <Marker
//                 key={place.fsq_id}
//                 coordinate={{
//                   latitude: place.geocodes.main.latitude,
//                   longitude: place.geocodes.main.longitude,
//                 }}
//                 title={place.name}
//                 image={require('../assets/hospital.png')}
//               >
//               </Marker>
//             )
//           ))}
//         </MapView>
//       </View>
//       <FlatList
//         data={places}
//         keyExtractor={(item) => item.fsq_id}
//         renderItem={({ item }) => {
//           return (
//             <View style={styles.itemContainer}>
//               <Text style={styles.itemTitle}>{item.name}</Text>
//               {item.location && item.location.address ? (
//                 <Text style={styles.itemAddress}>{item.location.address}</Text>
//               ) : (
//                 <Text style={styles.itemAddress}>No address available</Text>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   mapContainer: {
//     height: '50%', // Adjust the height as per your requirement
//     marginBottom: 16,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemContainer: {
//     marginBottom: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   itemAddress: {
//     fontSize: 14,
//     marginTop: 4,
//   },
// });

// export default MedicalAssistanceScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Platform, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { getNearbyPlaces } from '../api-services/placesApi';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack } from 'expo-router';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const MedicalAssistanceScreen = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Location permission is required to access this feature.');
          return;
        }

        await getLocationWithRetry();
      } catch (error) {
        console.error('Error requesting location permissions or retrieving location:', error);
        Alert.alert('Error', 'Failed to get current location. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const getLocationWithRetry = async (retries = 3) => {
      let loc = null;
      for (let i = 0; i < retries; i++) {
        try {
          loc = await Location.getCurrentPositionAsync({});
          if (loc) break;
        } catch (error) {
          console.warn('Retrying to get location...', error);
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      }

      if (loc) {
        const { latitude, longitude } = loc.coords;
        setLocation({ latitude, longitude });
      } else {
        Alert.alert('Error', 'Failed to get current location after multiple attempts. Please try again.');
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchNearbyPlaces = async () => {
        try {
          setLoading(true);
          const data = await getNearbyPlaces(location.latitude, location.longitude);
          console.log('Fetched places:', data); // Debugging statement
          setPlaces(data);
        } catch (error) {
          console.error('Error fetching nearby places:', error);
          Alert.alert('Error', 'Failed to fetch nearby places. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchNearbyPlaces();
    }
  }, [location]);

  console.log("location: ", location);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerTitle: "Nearby Hospitals",
          headerTitleStyle: {
            fontSize: SIZES.xLarge,
            fontFamily: FONT.bold,
            color: COLORS.blue
          },
          headerTitleAlign: 'center',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: location?.latitude || 37.78825,
              longitude: location?.longitude || -122.4324,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {location && (
              <Marker
                coordinate={location}
                title="You are here"
                pinColor="green"
                description="This is your current location"
                draggable={false}
              />
            )}
            {places.map((place) => (
              <Marker
                key={place.place_id}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
              />
            ))}
          </MapView>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>

              {item.rating && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
                  {renderStarIcons(item.rating)}
                  <Text style={styles.rating}> ({item?.user_ratings_total})</Text>
                </View>
              )}

              {item.vicinity === "Pakistan" ? (
                <Text style={styles.itemAddress}>{item?.plus_code?.compound_code}</Text>
              ) : (
                <Text style={styles.itemAddress}>{item.vicinity}</Text>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const renderStarIcons = (rating) => {
  const starIcons = [];
  const floorRating = Math.floor(rating);
  const remainder = rating - floorRating;

  // Render solid stars up to the floor rating
  for (let i = 0; i < floorRating; i++) {
    starIcons.push(<FontAwesomeIcon key={i} icon={solidStar} color={"orange"} size={16} />);
  }

  // Render a half star if remainder is greater than 0.25
  if (remainder > 0.25) {
    starIcons.push(<FontAwesomeIcon key={'half'} icon={solidStar} color={"orange"} size={16} />);
  } else if (remainder > 0) {
    starIcons.push(<FontAwesomeIcon key={'half'} icon={regularStar} color={"orange"} size={16} />);
  }

  // Render remaining empty stars
  const emptyStarsCount = 5 - starIcons.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    starIcons.push(<FontAwesomeIcon key={5 + i} icon={regularStar} color={"orange"} size={16} />);
  }

  return starIcons;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: '55%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: SIZES.large,
    fontWeight: FONT.medium,
    paddingBottom: 5,
  },
  itemAddress: {
    fontSize: SIZES.font14,
    fontFamily: FONT.regular,
    marginTop: 4,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
    paddingVertical: 20,
  },
  rating: {
    fontFamily: FONT.regular,
    paddingTop: 2,
    paddingRight: 5,
  }
});

export default MedicalAssistanceScreen;
