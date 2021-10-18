import { lookupPhoneUrl, getProfileUrl } from "./endpoints"

export const lookUpPhone = async (countryCode, phoneNumber) => {
    try {
        const res = await fetch(lookupPhoneUrl, {
            method: "POST",
            body: JSON.stringify({ countryCode, phoneNumber }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        if (!res.ok) {
            let errorMessage = "Internal server error!"
            const errorData = await res.json()
            if (errorData.data && errorData.data.length !== 0) {
                errorMessage = errorData.data[0].msg
            } else {
                errorMessage = errorData.message
            }
            throw new Error(errorMessage)
        }
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }

}

export const getProfile = async (phone, token, deviceId) => {
    try {
        const res = await fetch(getProfileUrl(phone), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "device": `Bearer ${deviceId}`,
                "Authorization":`Bearer ${token}`
            }
        })
        if (!res.ok) {
            let errorMessage = "Internal server error!"
            const errorData = await res.json()
            if (errorData.data && errorData.data.length !== 0) {
                errorMessage = errorData.data[0].msg
            } else {
                errorMessage = errorData.message
            }
            throw new Error(errorMessage)
        }
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }

}