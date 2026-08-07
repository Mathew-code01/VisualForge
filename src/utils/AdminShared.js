
// src/admin/AdminShared.js
export const WEBSITE_SECTIONS = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "services",
    label: "Services",
  },
  {
    id: "insights",
    label: "Insights",
  },
  {
    id: "work",
    label: "Work",
  },
];

const SECTION_POSITIONS = {
  home: [
    {
      id: "hero",
      label: "Hero",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ],

  about: [
    {
      id: "intro",
      label: "Intro",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ],

  services: [
    {
      id: "hero",
      label: "Hero",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ],

  insights: [
    {
      id: "hero",
      label: "Hero",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ],

  work: [
    {
      id: "hero",
      label: "Hero",
    },
    {
      id: "featured",
      label: "Featured",
    },
  ],
};

export function getSectionPositions(section) {
  return SECTION_POSITIONS[section] || [];
}

export const VIDEO_CATEGORIES = [
  "Video Editing",
  "Corporate",
  "Commercial",
  "Motivational",
  "Sports",
  "Social Media Content",
  "Promotional Video",
];

export const DEFAULT_VIDEO_META = {
  placement: [],
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
    about: false,
    services: false,
    insights: false,
    work: false,
  },
};

export function getSectionPositions(sectionId) {
  const section = WEBSITE_SECTIONS.find(
    (item) => item.id === sectionId
  );

  return section?.positions || [];
}