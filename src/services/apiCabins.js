import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create the Cabin with imagePath
  const { data, error } = await supabase.from('cabins').insert([
    {
      ...newCabin,
      image: imagePath,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload the Image to the supabase bucket
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.error(storageError);

    throw new Error(
      'Cabin image could not be uploaded so cabin could not be created'
    );
  }

  return data;
}
