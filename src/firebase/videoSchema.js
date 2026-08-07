// src/firebase/videoSchema.js


// src/firebase/videoSchema.js

export const DEFAULT_VIDEO_CONTROL = {
  placement: [],

  section: "",

  status: "active",

  featured: false,

  order: 0,

  displaySettings: {
    autoplay: true,
    muted: true,
    loop: true,
    priority: "normal",
  },

  pageVisibility: {
    home: false,
    services: false,
    work: false,
    about: false,
    insights: false,
    contact: false,
  },
};