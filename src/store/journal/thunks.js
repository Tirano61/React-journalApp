import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setFotosToActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => { 
	return async (dispach, getSate) => {

		dispach( savingNewNote())

		const { uid } = getSate().auth;
		
		const newNote = {
			title: 'Titulo',
			body: '',
			date: new Date().getTime(),
			imageUrls: [],
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

export const startUploadFiles = ( files = [] ) =>{
	return async ( dispach ) => {
		dispach( setSaving() );
		
		const fileUploadPromisse = [];
		for( const file of files ){
			fileUploadPromisse.push( fileUpload( file ));
		}

		const photosURL = await Promise.all( fileUploadPromisse );

		dispach( setFotosToActiveNote( photosURL ));

	}
}

export const startDeletingNote = () => {
	return async ( dispach, getState ) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		
		const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`);
		const res = await deleteDoc( docRef );
		
		dispach( deleteNoteById( note.id )) 

	}
}

