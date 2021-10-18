import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List, Avatar, useTheme } from 'react-native-paper'

const Country = (props) => {
    const theme = useTheme()
    return (
        <List.Item
            title={props.name}
            description={props.code}
            onPress={props.handleSelect}
            left={props => <Avatar.Image style={{ alignSelf: "center" }} size={20} source={{ uri: props.flagUrl }} />}
            right={rightProps => props.selected ? <List.Icon icon="check" color={theme.colors.primary} /> : null}
        />
    )
}

export default Country

const styles = StyleSheet.create({})
