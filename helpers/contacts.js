import * as Contacts from "expo-contacts"
import { sanitizePhone } from "../constants/easy_functions"

export const getAllContacts = async () => {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        let contacts = []
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                for (const con of data) {
                    if (con.phoneNumbers) {
                        for (const num of con.phoneNumbers) {
                            contacts.push({ phoneNumber: sanitizePhone(num.number), firstName: con.firstName, lastName: con.lastName, name: con.name, id: con.id })
                        }
                    }
                }
            }
        }
        return contacts
    } catch (error) {
        throw error
    }
};