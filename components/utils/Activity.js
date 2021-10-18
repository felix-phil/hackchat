import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Portal, ActivityIndicator, Dialog, TouchableRipple, Title, List } from 'react-native-paper'

const Activity = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible}>
                <Dialog.Content style={styles.content}>
                    <TouchableWithoutFeedback onPress={() => { console.log("cancel ?") }}>
                        <List.Item title={props.loadingText} titleStyle={{ color: "#cccccc", fontWeight: "bold" }} left={() => (<ActivityIndicator animating={true} size={"large"} />)} />
                    </TouchableWithoutFeedback>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    // content: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center"
    // }
})

export default Activity
