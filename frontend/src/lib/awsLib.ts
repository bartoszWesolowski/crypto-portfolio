import { Storage } from 'aws-amplify';
import { FileType } from 'rsuite/esm/Uploader';
import { v4 as uuidv4 } from 'uuid';

export async function s3Upload(file: FileType) {
  const filename = `${uuidv4()}-${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file.blobFile, {
    contentType: file.blobFile?.type,
  });

  return stored.key;
}
