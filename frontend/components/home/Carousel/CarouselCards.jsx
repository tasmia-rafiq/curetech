import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import data from '../data'
import { COLORS } from '../../../constants/theme'

const CarouselCards = ({ onPress }) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  const renderItem = ({ item, index }) => {
    return <CarouselCardItem item={item} index={index} onPress={() => onPress(item.target)} />;
  };

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 10,
          marginHorizontal: 0,
          backgroundColor: COLORS.blue,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
        tappableDots={true}
      />
    </View>
  )
}

export default CarouselCards