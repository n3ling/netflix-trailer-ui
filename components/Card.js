import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { Fragment, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Choice from './Choice'
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("screen");

const Card = ({ title, image, overview, isFirst, swipe, titleSign, ...rest }) => {

  const rotate = Animated.multiply(swipe.x, titleSign).interpolate({
    inputRange: [-100,0,100],
    outputRange: ['8deg', '0deg', '-8deg']
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }]
  }

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const renderChoice = useCallback(()=>{
    return(
      <Fragment>
        <Animated.View style={[
          styles.choiceContainer, 
          styles.likeContainer,
          {opacity: likeOpacity}
        ]}>
          <Choice type="like" />
        </Animated.View>
        <Animated.View style={[
          styles.choiceContainer, 
          styles.nopeContainer,
          {opacity: nopeOpacity}
        ]}>
          <Choice type="nope" />
        </Animated.View>
      </Fragment>
    )
  },[likeOpacity, nopeOpacity])

  return (
    <Animated.View style={[styles.container,
      isFirst && animatedCardStyle
    ]} {...rest}>
        <YoutubePlayer height={300} play={false} videoId={image} />
      <LinearGradient
        colors={['rgba(0,0,0,0.88)', 'rgba(0,0,0,1)']}
        style={styles.gradient}
      >
        <View style={styles.userContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{overview}</Text>
        </View>
      </LinearGradient>
      {isFirst && renderChoice()}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    width: width * 0.9, 
    height: height * 0.68
  },
  image: {
    width: width * 0.9,
    height: height * 0.68, 
    borderRadius: 20
  },
  gradient: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 350,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  userContainer: {
    position: 'absolute',
    top: 48,
    left: 24
  },
  descriptionContainer: {
    position: 'absolute',
    top: 120,
    left: 24,
    right: 24
  },
  descriptionText: {
    fontSize: 14,
    color: '#eee',
    fontWeight: '400'
  },
  title: {
    fontSize: 30,
    color: '#eee',
    fontWeight: '400'
  },
  choiceContainer: {
    position: 'absolute',
    top: 100
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: '-30deg' }]
  },
  nopeContainer: {
    right: 45,
    transform: [{ rotate: '30deg' }]
  }
})

export default Card