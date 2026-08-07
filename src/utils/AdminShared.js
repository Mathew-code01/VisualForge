
// src/admin/AdminShared.js
export const WEBSITE_SECTIONS = [
  {
    id: "home",
    label: "Home",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "services",
    label: "Services",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "work",
    label: "Work",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "about",
    label: "About",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    positions: [
      { id: "hero", label: "Hero" },
      { id: "featured", label: "Featured" },
    ],
  },
];

export function getSectionPositions(sectionId) {
  const section = WEBSITE_SECTIONS.find(
    (item) => item.id === sectionId
  );

  return section?.positions || [];
}

export const CATEGORIES = [
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