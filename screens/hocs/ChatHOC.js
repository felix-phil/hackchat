import React, { useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as socket from '../../helpers/socket'
import * as chatMessageAction from '../../store/actions/chatMessages'
// import * as chatAdjActions from '../../store/actions/chatAdjust'

const ChatHOC = ({ children }) => {
    const token = useSelector(state => state.auth.token)

    const dispatch = useDispatch()

    useEffect(() => {
        let Socket;
        try {
            Socket = socket.getScoket()
        } catch (err) {
            console.log(err)
            Socket = socket.init(token)
        }
        Socket.on(chatMessageAction.WEBSOCKET_TYPE, async(data) => {
            const { action } = data
            switch (action) {
                // case 'MASS_ACTION':
                //     dispatch(chatMessageAction.handleMassAction(data))
                //     break;
                case 'NEW_MESSAGE':
                    await dispatch(chatMessageAction.addMessage(data))
                    // await dispatch(chatAdjActions.addMessage(data))
                    break;
                case 'MESSAGE_SENT':
                    dispatch(chatMessageAction.handleMessageSent(data, 'SENT'))
                    break;
            }
        })
        return () => {
            Socket.removeAllListeners()
        }
    }, [token, dispatch])
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default ChatHOC

const styles = StyleSheet.create({})
