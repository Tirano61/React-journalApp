import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
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
		dispach(setActiveNote( newNote ));
		dispach(addNewEmptyNote( newNote ));

	}
}
export const startLoadingNotes = () => {
	return async ( dispach, getSate ) =>{
		const { uid } = getSate().auth;
		if(!uid) throw new Error( 'El uid de usuario no existe' );

		const notes = await loadNotes( uid );

		dispach( setNotes( notes ));
	}
}
export const startSavingNote = () => {
	return async( dispach, getState ) => {
		
		dispach( setSaving() );

		const { uid } = getState().auth;
		const { active:note } = getState().journal;

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;
		const docRef = doc( FirebaseDB, `${uid}/journal/notas/${note.id}`);

		await setDoc( docRef, noteToFirestore, { merge: true } );
		
		dispach( updateNote( note ));
	}
}

