import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Hacker from "../../assets/animations/hacker.json";
import { ActivityIndicator, Paragraph } from 'react-native-paper'

class LongActivity extends React.Component {
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
            <View style={styles.animationContainer}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: "70%",
                        height: 270,
                    }}
                    source={Hacker}
                    // cacheComposition
                    // autoSize
                    speed={0.5}
                />
                {/* <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this.resetAnimation} />
        </View> */}
                <ActivityIndicator animating={true} size="large" />
                <Paragraph>Setting things up...</Paragraph>
            </View>
        );
    }
}
export default LongActivity

const styles = StyleSheet.create({
    animationContainer: {
        // backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});