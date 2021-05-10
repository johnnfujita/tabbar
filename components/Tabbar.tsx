import * as React from "react";
import {View, StyleSheet, SafeAreaView, Dimensions, Animated } from "react-native";
import  { Svg }  from "expo";

import * as shape from "d3-shape";

import StaticTabbar, { tabHeight as height } from "./StaticTabbar";

const tabs = [
    { name: "grid"},
    { name: "list" },
    { name: "refresh-cw"},
    { name: "box"},
    { name: "user"}
];

// width of the tab icons spatce based on the window width and the number of elements
const {width} = Dimensions.get("window");
const tabWidth = width / tabs.length;

// height of the TabBar


//svg object for creating the component passing on animated
const { Path } = Svg;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);


const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)([ 
        { x: 0, y: 0}, 
        {x: width, y: 0 }
    ]);

const tab =  shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([ 
        { x: width, y: 0}, 
        {x: width + 5, y:  0 }, 
        {x: width + 10, y: 10 }, 
        {x: width + 15, y: height }, 
        { x: width + tabWidth - 15, y: height}, 
        {x: width + tabWidth -  10, y:  10 }, 
        {x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0} 
    ]);

const right = shape.line()
.x(d => d.x)
.y(d => d.y)([ 
    { x: width + tabWidth, y: 0}, 
    {x: width * 2.5, y:  0 }, 
    {x: width * 2.5, y: height }, 
    {x: 0, y: height }, 
    {x: 0, y: 0 }]);
const d = `${left} ${tab} ${right}`;
 interface TabbarProps {}

export default class Tabbar extends React.PureComponent<TabbarProps> {
    
    value = new Animated.Value(-width);
    
    render() {
        const { value: translateX } = this;
        return(
            <>
            <View {...{width, height}}>
                <AnimatedSvg width={width * 2.5} style={{ transform: [{translateX}]}}{...{ height }}>
                    <Path {...{ d }} fill="white" />
                </AnimatedSvg>
                <View style={StyleSheet.absoluteFill}>
                    <StaticTabbar value={translateX} {...{tabs}}/>
                </View>
            </View>
            <SafeAreaView style={styles.safeArea} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "white"
    }
})