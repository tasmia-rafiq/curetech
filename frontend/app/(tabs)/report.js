import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import GeneralTab from '../../components/report/GeneralTab';
import { IP_ADDRESS } from '@env';

const Report = () => {
  const route = useRouter();
  const [reports, setReports] = useState([]);
  const [todayReports, setTodayReports] = useState([]);
  const [yesterdayReports, setYesterdayReports] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchReports();
    }, [])
  );

  const fetchReports = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${IP_ADDRESS}:5001/allreports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        const fetchedReports = data.data;
        const { today, yesterday } = categorizeReports(fetchedReports);
        setTodayReports(today);
        setYesterdayReports(yesterday);
        console.log('Today Reports: ', todayReports);
        console.log('Yesterday Reports: ', yesterdayReports);
      } else {
        console.error('Failed to fetch reports:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching reports:', error.message);
    }
  };

  const categorizeReports = (reports) => {
    const now = new Date();
    const todayReports = [];
    const yesterdayReports = [];

    reports.forEach(report => {
      const createdAtDate = new Date(report.createdAt);
      const diff = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 3600 * 24));

      if (diff === 0) {
        todayReports.push(report);
      } else if (diff === 1) {
        yesterdayReports.push(report);
      }
    });

    return { today: todayReports, yesterday: yesterdayReports };
  };

  const navigateToDetails = (reportId) => {
    route.push(`/report-details/${reportId}`);
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diff = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 3600 * 24));

    if (diff === 0) {
      // Today
      const hours = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 3600));
      const minutes = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60));
      if (hours > 0) {
        return `${hours} hr ago`;
      } else if (minutes >= 1) {
        return `${minutes} min ago`;
      } else {
        return `Just now`
      }
    } else if (diff === 1) {
      // Yesterday
      return "Yesterday";
    } else {
      // Date format
      return createdAtDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => route.back()}>
              <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
            </TouchableOpacity>
          ),
          headerTitle: "Reports",
          headerTitleStyle: {
            fontSize: SIZES.xLarge,
            fontFamily: FONT.bold,
            color: COLORS.blue
          },
          headerTitleAlign: 'center',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <ScrollView>
        {/* Display "Today" only if there are reports from today */}
        {todayReports.length > 0 && (
          <Text style={{ fontSize: SIZES.font14, color: COLORS.grey, fontFamily: FONT.regular, marginBottom: 10, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>Today</Text>
        )}
        {todayReports.map((report) => (
          <TouchableOpacity
            key={report._id}
            onPress={() => navigateToDetails(report._id)}
          >
            <GeneralTab
              report={'General Report'}
              time={formatTimeAgo(report.createdAt)}
              onPress={() => navigateToDetails(report._id)}
            />
          </TouchableOpacity>
        ))}

        {/* Display "Yesterday" only if there are reports from yesterday */}
        {yesterdayReports.length > 0 && (
          <Text style={{ fontSize: SIZES.font14, color: COLORS.grey, fontFamily: FONT.regular, marginBottom: 10, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>Yesterday</Text>
        )}
        {yesterdayReports.map((report) => (
          <TouchableOpacity
            key={report._id}
            onPress={() => navigateToDetails(report._id)}
          >
            <GeneralTab
              report={'General Report'}
              time={formatTimeAgo(report.createdAt)}
              onPress={() => navigateToDetails(report._id)}
            />
          </TouchableOpacity>
        ))}

        {/* Display "No reports available" if there are no reports */}
        {todayReports.length === 0 && yesterdayReports.length === 0 && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
            <Text style={{ fontSize: SIZES.medium, color: COLORS.grey, fontFamily: FONT.regular }}>No reports available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;
