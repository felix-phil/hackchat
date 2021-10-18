// const sendMessage = () => {
    //         if (destination.to === "" || destination.message === "") {
    //                 ToastAndroid.show("Phone Number or Message can't be empty", ToastAndroid.SHORT)
    //                 return
    //         }
    //         Socket.emit("chat", { action: 'create', to: destination.to, message: destination.message })
    //         setDestination(prev => { return { ...prev, message: "" } })
    // }
    // const listener = useCallback(
    //         () => {
    //                 Socket.on('new_message', data => {
    //                         console.log("New message emitted from")
    //                         if (data.receiver === phone) {
    //                                 console.log(data)
    //                                 if (data.action === "JoinAndRecieve") {
    //                                         Socket.emit("chat", { action: "join", roomId: data.roomId, message: data.message })
    //                                 }
    //                         }
    //                 })
    //                 Socket.on("actuallymessage", data => {
    //                         // console.log(data, phone)
    //                         setMessages(prev => [...prev, { message: data.message }])
    //                 })
    //         },
    //         [Socket, phone, setMessages, ToastAndroid],
    // )
    // useEffect(() => {
    //         listener()
    //         return () => {}
    // }, [listener])
