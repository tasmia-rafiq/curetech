import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { COLORS, FONT, SIZES } from "../constants/theme";

const CustomDropdown = ({ placeholder, infoHead, infoIcon, selectedValue, onValueChange, data, reset }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  useEffect(() => {
    if (reset) {
      setSelectedLabel(placeholder);
    }
  }, [reset, placeholder]);

  const handleSelect = (item) => {
    setSelectedLabel(item.label);
    onValueChange(item.value);
    setDropdownVisible(false);
  };

  return (
    <View style={{ paddingTop: 30, width: "100%", gap: 20 }}>
      <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold, color: COLORS.blue }}>
        {infoHead}
      </Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <FontAwesomeIcon icon={infoIcon} color={COLORS.blue} size={SIZES.large} />
        <Text style={{ marginLeft: 10, fontSize: SIZES.font14, flex: 1, color: COLORS.blue, fontFamily: FONT.regular }}>
          {selectedLabel}
        </Text>
        <FontAwesomeIcon
          icon={dropdownVisible ? faChevronUp : faChevronDown}
          color={COLORS.blue}
          size={SIZES.medium}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <ScrollView>
            {data.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    paddingHorizontal: 20,
    gap: 15,
    width: "100%",
    height: 56,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#f1ecfa',
    borderColor: "#f1ecfa",
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 1000,
    padding: 15,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
});

export default CustomDropdown;
