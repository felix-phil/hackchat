import { Linking, Share } from "react-native"
import * as Contacts from "expo-contacts"
// import * as Intent from "expo-intent-launcher"
import RNContacts from "react-native-contacts"

export const shareText = async (content, { url, title }) => {
    try {
        const result = await Share.share({
            message: content,
            url: url ? url : "",
            title: title ? title : ""
        })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                alert(`Done ${result.activityType}`)
            } else {
                alert('Done')
            }
        } else if (result.action === Share.dismissedAction) {
            alert('Dismissed')
        }
    } catch (error) {
        alert(error.message)
    }
}

export const openContacts = async () => {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            if (Linking.canOpenURL('content://com.android.contacts/contacts')) {
                Linking.openURL('content://com.android.contacts/contacts')
            } else {
                throw new Error("Unable to open")
            }
        }
    } catch (error) {
        alert(error.message)
    }
}
export const openWebUrl = async (url) => {
    try {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url)
        } else {
            throw new Error("Can't open link")
        }
    } catch (error) {
        alert(error.message)
    }
}
export const presentContactForm = async (id) => {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            await Contacts.presentFormAsync(id)
            console.log(contact)
        }
    } catch (error) {
        alert(error.message)
    }
}
export const addContact = async (id) => {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const contact = {
                [Contacts.Fields.FirstName]: 'Bird',
                [Contacts.Fields.LastName]: 'Man',
                [Contacts.Fields.Company]: 'Young Money',
            };
            await Contacts.addContactAsync(contact)
            console.log(contact)
        }
    } catch (error) {
        alert(error.message)
    }
}

export const addToContacts = async (firstName, lastName, phone) => {
    try {
        var newPerson = {
            phoneNumbers: [{
                label: "HAckChat Mobile",
                number: phone,
            }],
            displayName: `${firstName} ${lastName}`
        }
        const newContact = await RNContacts.openContactForm(newPerson)
        return newContact
    } catch (err) {
        throw err
    }
}