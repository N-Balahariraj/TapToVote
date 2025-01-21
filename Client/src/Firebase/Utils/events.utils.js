import { doc, setDoc, getDocs, updateDoc, deleteDoc, collection, where } from "firebase/firestore";
import { db } from "../Firebase";

export async function getEvents(uid,role) {
    const events = [];
    try {
        const querySnapshot = await getDocs(collection(db, "events"), where("uid", "==", uid));
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (role == 'admin' & data.uid === uid) {
                events.push({ id: doc.id, ...data });
            }
            if(role == 'user'){
                events.push({ id: doc.id, ...data });
            }
        });
    }
    catch (error) {
        console.log("err : ", error)
    }
    return events;
}

export async function setEvent(uid, name, date, desc) {
    await setDoc(doc(db, "events", name + "-" + date), {
        uid: uid,
        name: name,
        date: date,
        desc: desc,
        votes: 0,
        counts: 0
    })
}

export async function updateEvent(id, name, date, desc) {
    await updateDoc(doc(db, "events", id), {
        name: name,
        date: date,
        desc: desc
    })
}

export async function deleteEvent(eid) {
        await deleteDoc(doc(db, "events", eid))
}

