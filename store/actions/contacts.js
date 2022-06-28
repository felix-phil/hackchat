import Contact from "../../models/contacts"

export const SET_CONTACTS = "SET_CONTACTS"
export const SHOW_PORTAL_IMAGE = "SHOW_PORTAL_IMAGE"
export const HIDE_PORTAL_IMAGE = "HIDE_PORTAL_IMAGE"
export const FILTER_CONTACTS = "FILTER_CONTACTS"

export const setContacts = () => {
    return async dispatch => {
        try {
            const contacts = await Contact.findAll()
            // console.log(contacts)
            dispatch({ type: SET_CONTACTS, payload: contacts })
        } catch (error) {
            throw error
        }
    }
}
export const filterContact = (filter) => {
    return { type: FILTER_CONTACTS, payload: filter }
}
export const showPortalImage = (contact, routeName, { functionToHandleChat }) => {
    return {
        type: SHOW_PORTAL_IMAGE,
        payload: {
            routeName: routeName,
            profileName: contact.name || contact.phone,
            profileImageUrl: contact.imageUrl,
            functionToHandleChat: functionToHandleChat
        }
    }
}
export const hidePortalImage = () => {
    return { type: HIDE_PORTAL_IMAGE }
}