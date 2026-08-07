// src/firebase/videoSchema.js


export const DEFAULT_VIDEO_CONTROL = {

  placement: [],

  section: "",

  status: "active",

  featured: false,

  order: 0,

  displaySettings:{
    autoplay:true,
    muted:true,
    loop:true,
    priority:"normal"
  },

  pageVisibility:{
    home:false,
    about:false,
    services:false,
    insights:false,
    work:false
  }

};