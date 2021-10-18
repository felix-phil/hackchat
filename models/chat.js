import db from "../helpers/db"

class Chat {
    constructor({ creator, recipientName, recipientNumber, roomId, recipientImage, lastMessageId, lastMessageText, contactId, id }) {
        this.id = id ? id : null
        this.creator = creator
        this.recipientName = recipientName
        this.recipientNumber = recipientNumber
        this.recipientImage = recipientImage
        this.roomId = roomId
        this.lastMessageId = lastMessageId
        this.lastMessageText = lastMessageText
        this.contactId = contactId
    }

    static init() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                        CREATE TABLE IF NOT EXISTS chat (
                            id INTEGER PRIMARY KEY NOT NULL,
                            creator VARCHAR(255) NOT NULL,
                            recipientName VARCHAR(255) NULL,
                            recipientNumber VARCHAR(255) NOT NULL,
                            recipientImage VARCHAR(255) NOT NULL,
                            roomId VARCHAR(255) NOT NULL,
                            lastMessageId INTEGER NOT NULL,
                            lastMessageText TEXT NOT NULL,
                            contactId INTEGER NULL
                        )
                    `,
                    [],
                    () => resolve(),
                    (_, err) => reject(err)
                )
            })
        })
        return promise
    }
    save() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                if (!id) {
                    tx.executeSql(
                        `
                            INSERT INTO chat (creator, recipientName, recipeintNumber, recipientImage, roomId, lastMessageId, lastMessageText, contactId)
                                VALUES (?, ?, ?, ?, ?, ?, ?)
                        `, [this.creator, this.recipientName, this.recipientNumber, this.recipientImage, this.roomId, this.lastMessageId, this.lastMessageText, this.contactId],
                        (_, res) => resolve(res),
                        (_, err) => reject(err)
                    )
                } else {
                    tx.executeSql(
                        `
                            UPDATE chat
                            SET creator = ?,
                                recipientName = ?,
                                recipientNumber = ?,
                                recipientImage = ?,
                                roomId = ?,
                                lastMessageId = ?,
                                lastMessageText = ?
                                contactId = ?
                            WHERE id = ?
                        `,
                        [this.creator, this.recipientName, this.recipientNumber, this.recipientImage, this.roomId, this.lastMessageId, this.lastMessageText, this.contactId, this.id],
                        (_, res) => resolve(res),
                        (_, err) => reject(err)
                    )
                }
            })
        })
        return promise
    }
    static findOne(field, filterSign, value){
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                        SELECT * FORM chat
                        WHERE ${field} ${filterSign} ?
                        LIMIT 1
                    `,
                    [value], 
                    (_, res) => resolve(res),
                    (_, err) => reject(err)
                )
            })
        })
        return promise
    }
    static findAll(){
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                        SELECT * FROM chat
                    `,
                    [], 
                    (_, res) => resolve(res),
                    (_, err) => reject(err)
                )
            })
        })
        return promise
    }
}

export default Chat