import db from "../helpers/db"
import realm from "../helpers/realmdb";
// import Realm from "realm"
import uuid from "react-native-uuid"
import ContactSchema from "../schemas/contacts";

const modelName = ContactSchema.name
class Contact {
    constructor({ contactSystemId, firstName, lastName, name, phoneNumber, imageUrl, status, id }) {
        this.id = id ? id : null;
        this.contactSystemId = contactSystemId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.status = status;
    }
    static init() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS contacts (
                        id INTEGER PRIMARY KEY NOT NULL,
                        firstName VARCHAR(255) NULL,
                        lastName VARCHAR(255) NULL,
                        contactSystemId VARCHAR(255) NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        phoneNumber VARCHAR(255) NOT NULL,
                        imageUrl VARCHAR NOT NULL,
                        status TEXT NOT NULL
                    );
                `,
                    [],
                    () => resolve(),
                    (_, err) => reject(err)
                );
            });
        });
        return promise
    }

    save() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                if (this.id) {
                    tx.executeSql(
                        `   
                            UPDATE contacts
                            SET contactSystemId = ?,
                                firstName = ?,
                                lastName = ?,
                                name = ?,
                                phoneNumber = ?,
                                imageUrl = ?,
                                status = ?
                            WHERE
                                id = ?
                        `,
                        [this.contactSystemId, this.firstName, this.lastName, this.name, this.phoneNumber, this.imageUrl, this.status, this.id],
                        (_, result) => resolve(result),
                        (_, err) => reject(err)
                    )
                } else {
                    tx.executeSql(
                        `
                        INSERT INTO contacts (firstName, lastName, contactSystemId, name, phoneNumber, imageUrl, status)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,
                        [this.firstName, this.lastName, this.contactSystemId, this.name, this.phoneNumber, this.imageUrl, this.status],
                        (_, result) => resolve(result),
                        (_, err) => reject(err)
                    )
                }
            })
        })

        return promise
    }
    // save(){
    //     const promise = new Promise((resolve, reject) => {
    //         if(!this.id){
    //             try{
    //                 let newObject;
    //                 realm.write(() => {
    //                     console.log("reached here")
    //                     const uuidv4 = uuid.v4().toString()
    //                     // const date = new Date()
    //                     newObject = realm.create(modelName, {
    //                         // id: uuidv4.concat(date.toISOString()),
    //                         id: uuidv4,
    //                         firstName: this.firstName,
    //                         lastName: this.lastName,
    //                         name: this.name,
    //                         contactSystemId: this.contactSystemId,
    //                         phoneNumber: this.phoneNumber,
    //                         imageUrl: this.imageUrl,
    //                         status: this.status
    //                     })
    //                 })
    //                 resolve(newObject)
    //             }catch(err){
    //                 reject(err)
    //             }
    //         }else{
    //             try{
    //                 // let updatedContact;
    //                 const allContacts = realm.objects(modelName);
    //                 const id = new UUID(this.id)
    //                 const filteredContacts = allContacts.filtered(`id == '${this.id}'`)
    //                 realm.write(()=> {
    //                     filteredContacts[0].firstName = this.firstName
    //                     filteredContacts[0].lastName = this.lastName
    //                     filteredContacts[0].name = this.name
    //                     filteredContacts[0].contactSystemId = this.contactSystemId
    //                     filteredContacts[0].phoneNumber = this.phoneNumber
    //                     filteredContacts[0].imageUrl = this.imageUrl
    //                     filteredContacts[0].status = this.status
    //                 })
    //                 resolve(filteredContacts[0])
    //             }catch(err){
    //                 reject(err)
    //             }
    //         }
    //     })
    //     return promise
    // }
    static findAll() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM contacts ORDER BY name ASC`, [], (_, result) => resolve(result.rows._array), (_, err) => reject(err)
                )
            })
        })
        return promise
    }
    // static findAll(){
    //     const promise = new Promise((resolve, reject) => {
    //         try{
    //             const contacts = realm.objects(modelName)
    //             resolve(contacts)
    //         }catch(err){
    //             reject(err)
    //         }
    //     })
    //     return promise
    // }
    // static findOne(field, operand, value){
    //     /*
    //      field: Name of field in database
    //      operand: Either ==|>|<|>=|<=|!=
    //      value: Value to filter for 
    //      */
    //     const promise = new Promise((resolve, reject) => {
    //         try{
    //             const contacts = realm.objects(modelName)
    //             const filteredContacts = contacts.filtered(`${field} ${operand} '${value}'`)
    //             if(filteredContacts.length > 0){
    //                 resolve(filteredContacts[0])
    //             }else{
    //                 resolve(null)
    //             }
    //         }catch(err){
    //             reject(err)
    //         }
    //     })
    //     return promise
    // }
    static findOne(field, value) {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                        SELECT * FROM contacts
                        WHERE ${field} = ? LIMIT 1
                    `,
                    [value],
                    (_, result) => {
                        // resolve(result.rows._array)
                        const con = result.rows._array
                        if (con.length > 0) {
                            const contact = con[0]
                            this.id = contact.id;
                            this.firstName = contact.firstName;
                            this.lastName = contact.lastName;
                            this.contactSystemId = contact.contactSystemId;
                            this.phoneNumber = contact.phoneNumber;
                            this.imageUrl = contact.imageUrl
                            this.status = contact.status

                            resolve(contact)
                        }else{
                            resolve(null)
                        }
                    },
                    (_, err) => {
                        reject(err)
                    }
                )
            })
        })

        return promise
    }
}

export default Contact