import db from "../helpers/db";

const tableName = "message"
export const statusValues = {
    READ: "READ",
    UNREAD: "UNREAD",
    PENDING: "PENDING",
    DELIVERED: "DELIVERED"
}

class Message {
    constructor({ id, chatId, messageText, createdByNumber, parent, date, hasMedia, mediaType, mediaUrl, mediaThumbnailUrl, status }) {
        this.id = id ? id : null;
        this.chatId = chatId;
        this.messageText = messageText;
        this.createdByNumber = createdByNumber;
        this.parent = parent;
        this.date = date;
        this.hasMedia = hasMedia;
        this.mediaType = mediaType;
        this.mediaUrl = mediaUrl;
        this.mediaThumbnailUrl = mediaThumbnailUrl;
        this.status = status ? status : statusValues.UNREAD
    }
    static init() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                         CREATE TABLE IF NOT EXISTS ${tableName} (
                            id INTEGER PRIMARY KEY NOT NULL,
                            chatId INTEGER NOT NULL,
                            messageText TEXT NULL,
                            createdByNumber TEXT NOT NULL,
                            date TEXT NOT NULL,
                            parent INTEGER NULL,
                            hasMedia INTEGER DEFAULT 0 NOT NULL,
                            mediaType VARCHAR NULL,
                            mediaUrl TEXT NULL,
                            mediaThumbnailUrl TEXT NULL,
                            status TEXT DEFAULT "${statusValues.UNREAD}" NOT NULL
                        )
                    `, [], () => resolve(), (_, err) => reject(err)
                )
            })
        })
        return promise
    }
    save() {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                if(!this.id){
                    tx.executeSql(
                        `
                            INSERT INTO ${tableName} (chatId, messageText, createdByNumber, date, parent, hasMedia, mediaType, mediaUrl, mediaThumbnailUrl, status)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `, [this.chatId, this.messageText, this.createdByNumber, this.date, this.parent, this.hasMedia, this.mediaType, this.mediaUrl, this.mediaThumbnailUrl, this.status],
                        (_, res) => resolve(res.insertId), 
                        (_, err)=>reject(err) 
                    )
                }
            })
        })
        return promise
    }
    static markAsRead(chatId){
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `
                    UPDATE ${tableName}
                    SET status = ?
                    WHERE chatId = ?
                    `,[statusValues.READ, chatId],
                    () => resolve(),
                    (_, err) => reject(err)
                )
            })
        })
    }

}
export default Message