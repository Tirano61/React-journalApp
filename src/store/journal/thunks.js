import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";





export const startNewNote = () => {
	return async (dispach, getSate) => {

		dispach( savingNewNote())

		const { uid } = getSate().auth;
		
		const newNote = {
			title: 'Titulo de la nota 4',
			body: 'Este es el cuerpo de la nota 4',
			date: new Date().getTime(),
		}

		const newDoc = doc(collection(FirebaseDB, `${ uid }/journal/notas`));

		await setDoc(newDoc, newNote);
		
		newNote.id = newDoc.id;
		dispach(addNewEmptyNote( newNote ));
		dispach(setActiveNote( newNote ));

	}
}
export const startLoadingNotes = () => {
	return async ( dispach, getSate ) =>{
		const { uid } = getSate().auth;
		if(!uid) throw new Error( 'El uid de usuario no existe' );

		const notes = await loadNotes( uid );

		dispach( setNotes( {notes} ) )

	}
}