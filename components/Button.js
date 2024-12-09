import { View, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const Button = ({ name, size, color, style, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const animateScale = useCallback((newValue)=>{
            Animated.spring(scale, {
                toValue: newValue,
                friction: 4,
                useNativeDriver: true
            }).start()
    },[scale])
  return (
    <TouchableWithoutFeedback
        onPressIn={()=>animateScale(0.75)}
        onPressOut={()=>{
            animateScale(1)
            onPress()
        }}
        delayPressIn={0}
        delayPressOut={100}
    >
        <Animated.View
            style={{
                height: 75,
                width: 75,
                backgroundColor: "transparent",
                elevation: 5,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                borderColor: color,
                borderWidth: 1.2,
                transform: [{scale}],
                ...style
            }}
        >
            <FontAwesome name={name} size={size} color={color} />
        </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Button