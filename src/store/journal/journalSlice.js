import { createSlice } from "@reduxjs/toolkit";



export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		nessageSave: '',
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
		addNewEmptyNote: (state, { payload }) => {
			console.log(payload);
			state.notes.push(payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
		},
		setNotes: (state, action ) => {
			state.notes = action.payload;
		},
		setSaving: (state, action) => {

		},
		updateNote: (state, action) => {

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