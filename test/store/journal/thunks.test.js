import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";


jest.setTimeout(30000);
describe('Pruebas en Journal/thunks', () => { 
 
  const dispach = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  const getState = jest.fn();

  test('startNewNote debe crear una nota en blanco', async () => { 
    const uid = 'test-uid';
    getState.mockReturnValue({auth:{uid: uid }});
    await startNewNote() (dispach, getState);

    expect( dispach ).toHaveBeenCalledWith( savingNewNote() );
    expect( dispach ).toHaveBeenCalledWith( addNewEmptyNote({ 
      "body": "",
      "date": expect.any( Number ),
      "id": expect.any( String ),
      "imageUrls":  [],
      "title": "",
    }));
    expect( dispach ).toHaveBeenCalledWith( setActiveNote({ 
      "body": "",
      "date": expect.any( Number ),
      "id": expect.any( String ),
      "imageUrls":  [],
      "title": "",
    }));

    // Borrar firebase
    const collectionRef = collection(FirebaseDB, `${ uid }/journal/notas`);
    const docs = await getDocs( collectionRef );

    const deletPromises = [];
    docs.forEach( doc => deletPromises.push( deleteDoc( doc.ref )));

    await Promise.all( deletPromises );

  });

});