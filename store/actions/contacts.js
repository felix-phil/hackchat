import Contact from "../../models/contacts"

export const SET_CONTACTS = "SET_CONTACTS"
export const SHOW_PORTAL_IMAGE = "SHOW_PORTAL_IMAGE"
export const HIDE_PORTAL_IMAGE = "HIDE_PORTAL_IMAGE"

export const setContacts = () => {
    return async dispatch => {
        try{
            const contacts = await Contact.findAll()
            dispatch({type: SET_CONTACTS, payload: contacts.rows._array})
        }catch(error){
            throw error
        }
    }
}
export const showPortalImage = (contact, routeName) => {
    return {
        type: SHOW_PORTAL_IMAGE,
        payload: {
            routeName: routeName,
            profileName: contact.name,
            profileImageUrl: contact.imageUrl,
            functionToHandleChat: () => {
                console.log("From Action")
            }
        }
    }
}
export const hidePortalImage = () => {
    return { type: HIDE_PORTAL_IMAGE }
}