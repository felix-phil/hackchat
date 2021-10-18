import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Country from '../../components/auth/Country'
import CustomAppbar from '../../components/main/headers/CustomNavigationAppbar'
import countries from "../../data/countries"

const Coutries = ({ navigation, route }) => {
    const [countryList, setCountryList] = useState(countries)
    const phone = route.params ? route.params.phone : ""
    const countryName = route.params ? route.params.name : ""
    const onSeachValueChange = (text) => {
        if (text.trim() !== "") {
            const results = countries.filter(country => country.name.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
            setCountryList(results)
        } else {
            setCountryList(countries)
        }
        countryList.filter(country => country.name === text)
        console.log(text, "From function")
    }
    useEffect(() => {
        navigation.setOptions({
            onHeaderSearchValueChange: onSeachValueChange
        })
    }, [])
    return <FlatList data={countryList}
        keyExtractor={(item) => item.dialCode + item.isoCode}
        renderItem={(itemData) => <Country
            flagUrl={itemData.item.flag}
            name={itemData.item.name}
            code={itemData.item.dialCode}
            handleSelect={() => {
                navigation.navigate('Login', { country: itemData.item, phone: phone })
            }}
            selected={itemData.item.name === countryName ? true : false}
        />}
    />
}
export const screenOptions = {
    headerTitle: "Select your country",
    header: (props) => <CustomAppbar {...props} searchOption={true} alignText="center" />
}
export default Coutries

const styles = StyleSheet.create({})
