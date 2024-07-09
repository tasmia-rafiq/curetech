import { GOOGLE_API_KEY } from '@env';
import axios from 'axios';

const API_KEY = GOOGLE_API_KEY; // Replace with your API key

export const getNearbyPlaces = async (latitude, longitude, radius = 5000, type = 'hospital', opennow = 'true') => {
  const API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&opennow=${opennow}&key=${API_KEY}`;
  try {
    const response = await axios.get(API_URL);
    console.log('API response:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
};


// const CLIENT_ID = 'IGCTNKFUNDCIZVRIWGUFIQ3NO05MW203LMRXHERK3YZV3GJM';
// const CLIENT_SECRET = 'RORTTD5XYSQ1FTDGXSS2OQFLEW4SCQ4T0MXAFPMF52LJUBED';

// export const getNearbyPlaces = async (query, latitude, longitude, sort) => {
//   const searchParams = new URLSearchParams({
//     query,
//     ll: `${latitude},${longitude}`,
//     sort,
//     // client_id: CLIENT_ID,
//     // client_secret: CLIENT_SECRET,
//     // v: '20240101',
//   });

//   const API_URL = `https://api.foursquare.com/v3/places/search?${searchParams}`;

//   try {
//     const results = await fetch(
//       API_URL, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'fsq397S3HFcF1hYVsIBrksbT9HONhB6tr/L4108NymuO49o='
//         }
//       }
//     );
//     const data = await results.json();
//     console.log('API response: ', data);
//     return data;
//     // const response = await axios.get(API_URL);
//     // console.log('API response:', response.data.results); // Check the structure of the response
//     // return response.data.results;
//   } catch (error) {
//     console.error('Error fetching nearby places from Foursquare:', error);
//     throw error;
//   }
// };
