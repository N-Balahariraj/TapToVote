import { doc, setDoc, getDocs, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";

export async function getEvents(){
    const events = [];
    try {
        const querySnapshot = await getDocs(collection(db,"events"));
        querySnapshot.forEach(doc => {
            events.push({id:doc.id,...doc.data()})
        });    
    } 
    catch (error) {
        console.log("err : ",error)
    }
    return events;
}

export async function setEvent(name,date,desc){
    await setDoc(doc(db,"events",name+"-"+date),{
        name: name,
        date: date,
        desc: desc
    })
}

export async function updateEvent(id,name,date,desc){
    try {
        await updateDoc(doc(db,"events",id),{
            name : name,
            date : date,
            desc : desc
        })
    }
    catch (error) {
        console.log("err : ",error)
    }
}

export async function deleteEvent(id){
    try {
        await deleteDoc(doc(db,"events",id))
    } 
    catch (error) {
        console.log("err : ",error);
    }
}

