import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Snackbar, Colors, Paragraph, Subheading } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons"
const Alert = (props) => {
    const { type } = props
    let colorType = Colors.white

    if(type === "error"){
        colorType = Colors.red700
    }else if(type === "info"){
        colorType = Colors.blue300
    } else if(type === "success"){
        colorType = Colors.green300
    }else{
        colorType = Colors.white
    }
    
    return (
        <View style={styles.container}>
            <Snackbar
                visible={props.visible}
                onDismiss={props.onDismiss}
                duration={5000}
                action={{
                    label: <MaterialCommunityIcons name="close" size={20} />,
                    onPress: props.actionLabelPress ? props.actionLabelPress : props.onDismiss,
                }}>
                <Text style={{ color: colorType }}>
                    {props.message}
                </Text>
            </Snackbar>
        </View>
    );
};
export default Alert

const styles = StyleSheet.create({
    container: {

    }
})
