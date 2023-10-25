import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote } from "./journalSlice";





export const startNewNote = () => {
	return async (dispach, getSate) => {
		const { uid } = getSate().auth;
		
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		}

		const newDoc = doc(collection(FirebaseDB, `${ uid }/journal/notas`));

		await setDoc(newDoc, newNote);
		
		newNote.id = newDoc.id;
		dispach(addNewEmptyNote( newNote ));
		dispach(setActiveNote( newNote ));
		//siapach( activeNote )




	}

}