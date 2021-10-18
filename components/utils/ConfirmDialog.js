import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ConfirmDialog = (props) => {
    return (
            <View>
                <Portal>
                    <Dialog visible={props.visible} onDismiss={props.hideDialog}>
                        {/* <Dialog.Title>{props.title}</Dialog.Title> */}
                        <Dialog.Content>
                            <Paragraph>{props.content}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions style={{ justifyContent: props.justifyAction ? props.justifyAction: "flex-end" }}>
                            <Button onPress={props.hideDialog}>{props.cancelText}</Button>
                            <Button onPress={() => {
                                props.hideDialog();
                                props.executionFunction()
                            }}>{props.okText}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
    );
};

export default ConfirmDialog