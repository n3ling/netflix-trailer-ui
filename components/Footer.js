import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'

const COLORS = {
    like: "#00eda6",
    nope: "#ff006f",
    star: "#07A6FF"
}
const Footer = ({handleChoice}) => {
  return (
    <View style={{
        position: 'absolute',
        bottom: 80,
        width: 280,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    }}>
      <Button 
        name="times"
        size={50}
        color={COLORS.nope}
        onPress={()=>handleChoice(-1)}
      />
      {/* <Button 
        name="star"
        size={45}
        color={COLORS.star}
        style={{
            height: 60,
            width: 60
        }}
      /> */}
      <Button 
        name="heart"
        size={40}
        color={COLORS.like}
        onPress={()=>handleChoice(1)}
      />
    </View>
  )
}

export default Footer