import { createSlice } from "@reduxjs/toolkit";



export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		messageSave: '',
		notes: [],
		active: null,
		// active: {
		//     id: 'ABC123',
		//     title: '',
		//     body: '',
		//     date: 123456,
		//     imageUrls: [],
		// },


	},
	reducers: {
		savingNewNote: ( state ) => {
			state.isSaving = true;
		},
		addNewEmptyNote: ( state, action ) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSave = '';
		},
		setNotes: (state, { payload }) => {
			state.notes = payload;
		},
		setSaving: (state, action) => {
			state.isSaving = true;
			state.messageSave = '';
		},
		updateNote: (state, action) => {
			state.isSaving = false;
			state.notes = state.notes.map( note =>{
				if( note.id === action.payload.id ){
					return action.payload;
				}
				return note;
			});
			state.messageSave = `${action.payload.title }, actualizada correctamente`
		},
		deleteNoteById: (state, action) => {

		},
	},
})


export const {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById, } = journalSlice.actions;