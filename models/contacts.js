import db from "../helpers/db"

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
    static findAll() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM contacts`, [], (_, result) => resolve(result), (_, err) => reject(err)
                )
            })
        })
        return promise
    }
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

                            resolve(this)
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