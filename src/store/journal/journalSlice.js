import { createSlice } from "@reduxjs/toolkit";



export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: true,
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
		addNewEmptyNote: ( state, action ) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
		},
		setNotes: (state, action) => {

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
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById, } = journalSlice.actions;