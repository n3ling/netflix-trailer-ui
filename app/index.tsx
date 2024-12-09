import { Animated, Dimensions, PanResponder, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { trailers as trailersArray } from "../utils/data";
import { useState, useEffect, useRef, useCallback } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get('screen')

export default function Index() {
  const [trailers, setTrailers] = useState(trailersArray);

  // Animated value for swipe and titleSign
  const swipe = useRef(new Animated.ValueXY()).current;
  const titleSign = useRef(new Animated.Value(1)).current;

  // Panresponder config
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, {dx, dy, y0})=>{
      swipe.setValue({x: dx, y: dy});
      titleSign.setValue( y0 > (height * 0.9)/2 ? 1: -1)
    },

    onPanResponderRelease: (_, { dx, dy})=> {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if(isActionActive){
        //Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 500,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(removeTopCard)
      }else{
        // return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0
          },
          useNativeDriver: true,
          friction: 5
        }).start()
      }
    }
  });

  // remove top card from trailers array
  const removeTopCard = useCallback(()=>{
    setTrailers((prevState)=>prevState.slice(1));
    swipe.setValue({x:0, y:0});
  },[swipe])

  // handle user choice (left or right)
  const handleChoice = useCallback((direction: number)=>{
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 400,
      useNativeDriver: true
    }).start(removeTopCard)
  },[removeTopCard, swipe.x])

  useEffect(()=>{
    if(!trailers.length){
      setTrailers(trailersArray) // set to setTrailers(trailers) to prevent looping
    }
  },[trailers.length])

  return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#222'
        }}
      >
        <StatusBar hidden={true} />
        {
          trailers.map(({title, image, overview}, index)=>{
            const isFirst = index == 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <Card 
                key={index}
                title={title} 
                image={image} 
                overview={overview}
                isFirst={isFirst}
                swipe={swipe}
                titleSign={titleSign}
                {...dragHandlers}
              />
            )
          }).reverse()
        }
        <Footer handleChoice={handleChoice}/>
      </View>
  );
}
