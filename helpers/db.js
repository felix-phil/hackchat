import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('hackchat.db');
export const dropTable = (tableName) => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction(tx => {
            tx.executeSql(`
                DROP TABLE IF EXISTS ${tableName}
            `,[], ()=>resolve(), (_, err)=> reject(err))
        })
    })
    return promise
}
export default db
