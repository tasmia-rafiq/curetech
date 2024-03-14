import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const ScreenHeaderBtn = ({ iconName, size, color }) => {
  return (
    <TouchableOpacity>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn