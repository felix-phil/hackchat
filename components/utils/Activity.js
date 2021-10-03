import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Portal, ActivityIndicator, Dialog, TouchableRipple, Paragraph } from 'react-native-paper'

const Activity = (props) => {
    return (
        <View>
            <Portal>
                    <Dialog visible={props.visible}>
                {/* <TouchableRipple onPress={() => { console.log("cancel ?") }}> */}
                        <Dialog.Content style={styles.content}>
                            <View>
                                <ActivityIndicator animating={true} size={"large"} />
                            </View>
                            <View>
                                <Paragraph>{props.loadingText}</Paragraph>
                            </View>
                        </Dialog.Content>
                {/* </TouchableRipple> */}
                    </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default Activity
