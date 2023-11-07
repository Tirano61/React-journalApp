import { addNewEmptyNote, savingNewNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";




describe('Pruebas en thunks', () => {
  
  const dispach = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  const getState = jest.fn();

  test('startNewNote debe crear una nota en blanco', async () => {
    const uid = 'test-uid';
    getState.mockReturnValue({ auth: { uid: uid } });
    await startNewNote()(dispach, getState);
    
    expect(dispach).toHaveBeenCalledWith(savingNewNote());
    expect(dispach).toHaveBeenCalledWith(addNewEmptyNote({
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: []
      
    }));
  });
});