import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, Image as NativeImage, ToastAndroid } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import FastImage from "react-native-fast-image";

const Image = ({ containerStyle, url, onPress, onLoad, style, loaderSize, ...restProps }) => {
  const [loading, setLoading] = useState(false)

  // const handleLoading = (event) => {
  //   setLoaded(true)
  //   // console.log(event.nativeEvent)
  //   onLoad && onLoad(event)
  // }
  return (
    <TouchableOpacity style={[styles.base, containerStyle]} onPress={onPress} disabled={!onPress}>
      <NativeImage
        style={{...styles.base, ...style}}
        onLoad={e => onLoad(e)}
        onLoadStart={()=>setLoading(true)}
        onLoadEnd={()=> setLoading(false)}

        source={{
           uri: url,
           priority: FastImage.priority.high,
         }}
        // {...restProps}
        onError={() => {
            ToastAndroid.show("Download failed", ToastAndroid.SHORT)
        }}
      />
      {loading && (
        <ActivityIndicator  style={styles.loader} size={loaderSize || "large"} />
      )}
    </TouchableOpacity>
  )
}

export default Image

const BG_COLOR = "rgba(240, 242, 245, 1)"

const styles = StyleSheet.create({
  base: {
    height: "100%",
    width: "100%",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: BG_COLOR,
  },
})