// import Realm from "realm"
// class Contact extends Realm.Object { }
const Contact = {
    name: "Contact",
    properties: {
        id: {
            type: 'string'
        },
        firstName: {
            type: 'string?'
        },
        lastName: {
            type: 'string?'
        },
        name: {
            type: 'string'
        },
        contactSystemId: {
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        },
        status: {
            type: 'string',
        },
    },
    // primaryKey: "id"
}

export default Contact