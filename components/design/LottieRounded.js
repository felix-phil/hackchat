import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Hacker from "../../assets/animations/hacker.json";
import { ThemeProvider } from "react-native-paper"
class LottieRounded extends React.Component {
    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };

    render() {
        return (
            <View style={{ ...styles.animationContainer }}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={Hacker}
                    speed={0.5}
                />
            </View>
        );
    }
}
export default LottieRounded

const styles = StyleSheet.create({
    animationContainer: {
        // backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 150,
        backgroundColor: "#ccc",
        zIndex: 9999999999
    },

});