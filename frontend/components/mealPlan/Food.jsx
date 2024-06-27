import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const Food = ({ foodName, items, src, foodTag }) => {
  const hasDropdown = items && items.length > 0;
  const [showDropdown, setShowDropdown] = useState(true);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.dropDown, { justifyContent: 'space-between' }]}
          activeOpacity={0.9}
          onPress={toggleDropdown}
          disabled={!hasDropdown}
        >
          <View style={styles.dropDown}>
            <Image source={src} style={styles.img} />
            <View style={{ width: '75%', paddingLeft: 10, }}>
              <Text style={styles.name}>{foodName}</Text>
              {foodTag && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>{foodTag}</Text>
                </View>
              )}
            </View>
          </View>
          {hasDropdown && (
            <FontAwesomeIcon icon={showDropdown ? faChevronUp : faChevronDown} />
          )}
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            <FlatList
              scrollEnabled={false}
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.dropdownItemContainer}>
                  <Image source={item.src} style={styles.img} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.dropdownItem}>{item.name}</Text>
                    {item.tag && (
                      <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{item.tag}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  timelineContainer: {
    alignItems: "center",
  },
  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.blue,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  dropDown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: 'wrap'
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  img: {
    width: 55,
    height: 50,
    borderRadius: 10,
  },
  dropdownList: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  dropdownItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  dropdownItem: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
  },
  itemTextContainer: {
    flex: 1,
  },
  tagContainer: {
    maxWidth: "98%",
  },
  tag: {
    fontSize: SIZES.font14,
    fontFamily: FONT.regular,
    color: COLORS.grey,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export default Food;
