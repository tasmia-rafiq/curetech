import { View, Text, Image } from 'react-native';

import styles from './profile.style';

const ProfileCard = ({ username }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
      <Image
        source={require('../../assets/profile.webp')}
        resizeMode='contain'
        style={styles.profileImg}
      />
      <Text style={styles.userName}>{username}</Text>
    </View>
  )
}

export default ProfileCard