import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'cursoreactjs',
  api_key: '161583326911261',
  api_secret: '6jPVrs2iXCZGJ6sZ_DnFTYGbIhM',
  secure: true
});

describe('Pruebas en fileUpload', () => { 

  test('Debe subir el archivo correctamente', async() => { 
    
    const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcsuMUAHIYSdiMzb-bZQ3forAO_hUL1qz_sG_bgfcjygb7yESozsCoLv2B9KlbiY3Ib8&usqp=CAU';

    const resp = await fetch( imageURL );
    const blob = await resp.blob();
    const file = new File( [blob], 'foto.jpg' );
    const url = await fileUpload( file );
    
    expect( typeof url ).toBe('string');

    const segments  = url.split( '/' );
    const imageId = segments[ segments.length -1].replace('.jpg','');
    await cloudinary.api.delete_resources(['journal/'+imageId]);


  });
  test('Debe retornal null', async() => { 
    const file = new File( [  ], 'foto.jpg' );
    const url = await fileUpload( file );
    
    expect( url ).toBe(null);
  });

});