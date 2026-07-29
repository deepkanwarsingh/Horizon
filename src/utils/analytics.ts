// src/constants/analytics.ts

// Initial Form State
export const INITIAL_FORM = {
  reportName: "",
  email: "",
  department: "",
  reportType: "",
  timePeriod: "",
};

// Initial Error State
export const INITIAL_ERRORS = {
  reportName: "",
  email: "",
  department: "",
  reportType: "",
  timePeriod: "",
};

// Dropdown Options
export const REPORT_TYPES = [
  "Sales",
  "Marketing",
  "Finance",
  "Operations",
];

export const TIME_PERIODS = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
];

// Validation Patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LETTERS_ONLY_REGEX = /^[A-Za-z ]+$/;

// Shared Input Style
export const INPUT_STYLE =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

// Validation Messages
export const VALIDATION_MESSAGES = {
  reportNameRequired: "Report name is required.",
  reportNameMin: "Minimum 3 characters.",

  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email address.",

  departmentRequired: "Department is required.",
  departmentInvalid: "Only letters are allowed.",

  reportTypeRequired: "Please select a report type.",
  timePeriodRequired: "Please select a time period.",

  unsafeContent:
    "HTML tags, script tags, or javascript: URLs are not allowed.",
};

// UI Text
export const UI_TEXT = {
  title: "Analytics Form",
  description:
    "Fill out the form below to generate an analytics report.",

  reportNameLabel: "Report Name",
  reportNamePlaceholder: "Monthly Sales Report",

  emailLabel: "Email",
  emailPlaceholder: "example@email.com",

  departmentLabel: "Department",
  departmentPlaceholder: "Marketing",

  reportTypeLabel: "Report Type",
  reportTypePlaceholder: "Select Report Type",

  timePeriodLabel: "Time Period",
  timePeriodPlaceholder: "Select Time Period",

  previewTitle: "Live Preview",

  submitButton: "Generate Report",

  submitSuccess: "Analytics form submitted successfully!",
};

// Preview Fields
export const PREVIEW_FIELDS = [
  {
    key: "reportName",
    label: UI_TEXT.reportNameLabel,
  },
  {
    key: "email",
    label: UI_TEXT.emailLabel,
  },
  {
    key: "department",
    label: UI_TEXT.departmentLabel,
  },
  {
    key: "reportType",
    label: UI_TEXT.reportTypeLabel,
  },
  {
    key: "timePeriod",
    label: UI_TEXT.timePeriodLabel,
  },
] as const;