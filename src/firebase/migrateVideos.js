// src/firebase/migrateVideos.js


import { db } from "./config.js";

import {
 collection,
 getDocs,
 updateDoc,
 doc
} from "firebase/firestore";

import {
 DEFAULT_VIDEO_CONTROL
} from "./videoSchema.js";


export async function migrateVideos(){

 const snapshot =
 await getDocs(collection(db,"videos"));


 for(const video of snapshot.docs){

   const data = video.data();


   await updateDoc(
     doc(db,"videos",video.id),
     {

      placement:
      data.placement || [],


      section:
      data.section || "",


      status:
      data.status || "active",


      featured:
      data.featured ?? false,


      order:
      data.order ?? 0,


      displaySettings:
      data.displaySettings ||
      DEFAULT_VIDEO_CONTROL.displaySettings,


      pageVisibility:
      data.pageVisibility ||
      DEFAULT_VIDEO_CONTROL.pageVisibility

     }
   );


   console.log(
    "Updated:",
    video.id
   );

 }

 console.log(
 "DATABASE MIGRATION COMPLETE"
 );

}