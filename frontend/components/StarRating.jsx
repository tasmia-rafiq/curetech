import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@fortawesome/react-native-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { COLORS } from '../constants/theme';

const StarRating = ({ rating }) => {
  const starIcons = [];
  const floorRating = Math.floor(rating);
  const remainder = rating - floorRating;

  // Render solid stars up to the floor rating
  for (let i = 0; i < floorRating; i++) {
    starIcons.push(<FontAwesome key={i} icon={solidStar} color={COLORS.yellow} size={20} />);
  }

  // Render a half star if remainder is greater than 0.25
  if (remainder > 0.25) {
    starIcons.push(<FontAwesome key={floorRating} icon={solidStar} color={COLORS.yellow} size={20} />);
  } else if (remainder > 0) {
    starIcons.push(<FontAwesome key={floorRating} icon={regularStar} color={COLORS.yellow} size={20} />);
  }

  // Render remaining empty stars
  const emptyStarsCount = 5 - starIcons.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    starIcons.push(<FontAwesome key={5 + i} icon={regularStar} color={COLORS.yellow} size={20} />);
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {starIcons.map((icon, index) => (
        <View key={index}>{icon}</View>
      ))}
      <Text style={{ marginLeft: 5 }}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default StarRating;