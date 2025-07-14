
import { conf } from '../conf/conf'  
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

   client = new Client();
   databases;
   bucket;

   constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
   }

   async createPost({title, slug, content , featuredimage, status, userid}){
    try{
        return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {title,  content , featuredimage, status, userid});
        /*const promise = databases.createDocument(
    '<DATABASE_ID>',
    '<COLLECTION_ID>',
    ID.unique(),
    { "title": "Hamlet" }
);*/

    }
    catch(error){
throw error
    }
   }

   async updatePost(slug, { title, content, featuredimage, status }) {
    try {
       return await this.databases.updateDocument(conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredimage,
            status,
        }
    )
    } catch (error) {
        throw error
    }
   }

   async deletepost(slug){
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug); 
      return true 
    } catch (error) {
        console.log(error);
        return false;
    }
   }

   async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
       throw error; 
       return false;
    }
   }//single post ke liye

   //saare post ke liye listdocument

   //queries use
  async getPosts(queries = [Query.equal("status","active")]){
   try {
    return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
   } catch (error) {
    console.log(error);
   return false   
}
  }

  //file upload service

  async uploadFile(file){
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(fileId){
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  getFileView(fileId){
    if (!fileId) return '';
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    );
  }
}
const service = new Service();
export default service
