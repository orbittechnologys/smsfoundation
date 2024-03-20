import { BlobServiceClient } from '@azure/storage-blob';

const uploadToAzureStorage = async (file, blobName) => {

    console.log(file);

    const storageAccount = import.meta.env.VITE_APP_STORAGE_ACCOUNT; 
    
    const containerName = import.meta.env.VITE_APP_CONTAINER_NAME;

    const sasURL = import.meta.env.VITE_APP_SAS_URL;
    console.log(storageAccount, containerName, sasURL);

    const uploadUrl = sasURL;
    console.log(uploadUrl);
    const blobService = new BlobServiceClient(uploadUrl);

    console.log(blobService);

    const folderName = "sns";

    const containerClient =  blobService.getContainerClient(folderName); // Folder name 

      const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
         const options = { blobHTTPHeaders: { blobContentType: file.type } };

         console.log(blobClient);

  // upload file
    await blobClient.uploadData(file, options);

 

    const url = blobClient.url;
    console.log('File uploaded successfully. URL:', url);


    const imageUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${folderName}/${file.name}`

    return imageUrl;
};

export default uploadToAzureStorage;