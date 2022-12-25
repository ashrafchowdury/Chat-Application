import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-hot-toast";

//upload the image on firebase storage & get the image URL
export const imageUpload = (file, fileName, setimage) => {
  const storage = getStorage();

  const storageRef = ref(storage, `${fileName}/ ${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      toast.success((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      toast.error("Someting want wrong!");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setimage(downloadURL);
      });
    }
  );
};
