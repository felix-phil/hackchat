
// const chatSocket = useCallback(
    //     () => {
    //         let Socket;
    //         try{
    //             Socket = socket.getScoket()
    //         }catch(err){
    //             console.log(err)
    //             Socket = socket.init(token)
    //         }
    //         Socket.on('ping', (d) => {
    //             console.log(d)
    //         })
    //         Socket.on(chatMessageAction.WEBSOCKET_TYPE, (data) => {
    //             const { action } = data
    //             switch (action) {
    //                 case 'NEW_MESSAGE':
    //                     dispatch(chatMessageAction.addMessage(data))
    //                     break;
    //                 case 'MESSAGE_SENT':
    //                     dispatch(chatMessageAction.handleMessageSent(data, 'SENT'))
    //                     break;
    //             }
    //         })
    //     },
    //     [token, dispatch],
    // )
    // useEffect(() => {
    //     chatSocket()
    // }, [chatSocket])