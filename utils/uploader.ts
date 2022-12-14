import axios from 'axios';
import FormData from 'form-data';

export async function uploadImage(image: string | Buffer) {
  const form = new FormData();
  form.append('image', image.toString('base64'));
  console.log('Uploading image');
  try {
    const res = await axios.post('https://api.imgbb.com/1/upload', form, {
      params: {
        expiration: 600,
        key: process.env.IMGBB_KEY,
      },
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Uploaded image');
    return res;
  } catch (err) {
    console.error(err);
    return { data: { data: { url: '' } } };
  }
}
