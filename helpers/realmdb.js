import Realm from "realm"
import Contact from "../schemas/contacts"

// const realm = await Realm.open({
//     path: "hackchat",
//     schema: [ContactSchema]
// })

const realm = new Realm({
    path: "hackchat",
    schema:[Contact],
    schemaVersion: 5
})
export const deleteAllObjects = () => {
    realm.write(()=>{
        realm.deleteAll()
    })
}

// let realm;

// export const init = async() => {
//     realm = await Realm.open({
//         path: "hackchat",
//         schema: [ContactSchema]
//     })
//     return realm
// }

// export const getRealm = () => {
//     if(!realm){
//         throw new Error("No realm has been opened")
//     }
//     return realm
// }

export default realm