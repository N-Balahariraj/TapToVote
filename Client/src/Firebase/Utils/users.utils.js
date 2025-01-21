import { auth,db } from "../Firebase.js";
import { doc,setDoc,collection,getDocs,getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth";

export async function SignUp(name,email,password,role){
    await createUserWithEmailAndPassword(auth,email,password);
    if (auth.currentUser) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name : name,
            email: email,
            role : role,
            events : []
        });
    }
    return auth.currentUser;
}

export async function SignIn(email,password){
    await signInWithEmailAndPassword(auth,email,password);
    return auth.currentUser;
}

export async function SignInWithGoogle(role){
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    const user =  result.user;
    if (user) {
        await setDoc(doc(db,"users",user.uid),{
            name : user.displayName,
            email : user.email,
            role : role,
            events : []
        })
    }
    return user;
}

export async function fetchUserDetails(uid){
    const userDetails = await getDoc(doc(db,'users',uid))
    if(userDetails.exists()){
        return userDetails.data();
    }
    console.log("No such user")
    return null
}

export async function fetchUsers(){
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    });
    return users;
}

export async function updateVotes(uid,vote){
    await updateDoc(doc(db,'users',uid),{
        events: arrayUnion(vote)
    })
}

export async function mapEvent(uid,eid){
    await updateDoc(doc(db,'users',uid),{
        events: arrayUnion(eid)
    })
}

export async function SignOut(){
    try {
        await signOut(auth)    
    } 
    catch (error) {
        console.log("Error : ",error.message)
    }
}