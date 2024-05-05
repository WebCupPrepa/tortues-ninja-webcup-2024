import { statusUpload } from "@/enums/statusUpload";
import { toastType } from "@/components/global/toast/toastType";
import { createToast } from "@/utils/createToast";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { storage } from "../index";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

export async function uploadImagesStorage(data = { collectionName: null, file: null }) {
  const { collectionName, file } = data;
  const fileNameSlugify = slugify(file.name, { lowercase: true });
  const fileId = uuidv4();
  const fileNameUuid = `ID[${fileId}]_${fileNameSlugify}`;

  const path = collectionName ? `${collectionName}/${fileNameUuid}` : `app/${fileNameUuid}`;
  const fileRef = ref(storage, path);

  try {
    const upload = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(upload.ref);

    return {
      name: file.name,
      nameInStorage: fileNameUuid,
      url: url,
      state: statusUpload.publish,
      id: fileId,
    };
  } catch (e) {
    console.error(e);
    return {
      image: file,
      state: statusUpload.publish,
      error: e,
    };
  }
}

export async function deleteImageStorage(data = { collectionName: null, image: null }) {
  const { collectionName, image } = data;

  const path = collectionName
    ? `${collectionName}/${image.nameInStorage}`
    : `app/${image.nameInStorage}`;

  const fileRef = ref(storage, path);

  try {
    const operation = await deleteObject(fileRef);
    createToast(toastType.success, "Image supprimé du serveur");
    return true;
  } catch (e) {
    console.error(e);
    createToast(
      toastType.success,
      "Erreur suppression",
      `Impossible de supprimé l'image : ${image.name} du serveur`
    );
    return false;
  }
}
