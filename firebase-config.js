// ============================================================
// FIREBASE CONFIGURATION
// Ganti semua nilai di bawah ini dengan nilai dari Firebase Console Anda
// Cara dapat nilai ini: lihat panduan setup di README.md
// ============================================================

const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_ANDA",
  authDomain: "GANTI_DENGAN_PROJECT_ID.firebaseapp.com",
  projectId: "GANTI_DENGAN_PROJECT_ID",
  storageBucket: "GANTI_DENGAN_PROJECT_ID.appspot.com",
  messagingSenderId: "GANTI_DENGAN_MESSAGING_SENDER_ID",
  appId: "GANTI_DENGAN_APP_ID"
};

// VAPID Key untuk Push Notification (dari Firebase Cloud Messaging)
const VAPID_KEY = "GANTI_DENGAN_VAPID_KEY_ANDA";

// ============================================================
// WHITELIST USER & ROLES
// Daftarkan email Google semua PIC di sini
// role: "admin" = bisa semua
// role: "sales" = bisa input project baru
// role: "pic"   = hanya bisa update task sendiri
// ============================================================
const USER_WHITELIST = {
  // ADMIN
  "email.admin@gmail.com": { role: "admin", name: "Admin", division: "admin" },

  // SALES (bisa input project baru)
  "jessie@gmail.com":   { role: "sales", name: "Jessie",  division: "Sales" },
  "jessica@gmail.com":  { role: "sales", name: "Jessica", division: "Sales" },
  "yunita@gmail.com":   { role: "sales", name: "Yunita",  division: "Sales" },
  "anggita@gmail.com":  { role: "sales", name: "Anggita", division: "Sales" },

  // PRE PRODUCTION
  "feira@gmail.com":    { role: "pic", name: "Feira",   division: "Pre Production" },
  "helda@gmail.com":    { role: "pic", name: "Helda",   division: "Pre Production" },
  "anti@gmail.com":     { role: "pic", name: "Anti",    division: "Pre Production" },
  "lanti@gmail.com":    { role: "pic", name: "Lanti",   division: "Pre Production" },
  "tari@gmail.com":     { role: "pic", name: "Tari",    division: "Pre Production" },
  "eki@gmail.com":      { role: "pic", name: "Eki",     division: "Pre Production" },
  "rivaldi@gmail.com":  { role: "pic", name: "Rivaldi", division: "Pre Production" },
  "wulan@gmail.com":    { role: "pic", name: "Wulan",   division: "Pre Production" },

  // SAMPLE
  "vanny@gmail.com":    { role: "pic", name: "Vanny", division: "Sample" },
  "wiji@gmail.com":     { role: "pic", name: "Wiji",  division: "Sample" },
  "yogi@gmail.com":     { role: "pic", name: "Yogi",  division: "Sample" },
  "ase@gmail.com":      { role: "pic", name: "Ase",   division: "Sample" },
  "reza@gmail.com":     { role: "pic", name: "Reza",  division: "Sample" },

  // SOURCING
  "irene@gmail.com":    { role: "pic", name: "Irene",  division: "Sourcing" },

  // TECHNICAL
  "dandi@gmail.com":    { role: "pic", name: "Dandi",   division: "Technical" },
  "helmina@gmail.com":  { role: "pic", name: "Helmina", division: "Technical" },

  // DEVELOPMENT
  "siska@gmail.com":    { role: "pic", name: "Siska", division: "Development" },

  // SALES juga punya tugas lain
  "dita@gmail.com":     { role: "sales", name: "Dita", division: "Sales" },
};

// ============================================================
// DEFINISI 37 TASK & DEPENDENCY DEADLINE
// ============================================================
const TASK_DEFINITIONS = [
  {
    id: "T01", name: "Email Approved",
    division: "Sales", pics: ["Jessie","Jessica","Yunita","Anggita"],
    deadlineRule: { type: "fixed", baseTask: null, days: 0, label: "H+0 dari Email Approved" }
  },
  {
    id: "T02", name: "Transfer Data",
    division: "Sales", pics: ["Jessie","Jessica","Yunita","Anggita"],
    deadlineRule: { type: "after", baseTask: "T01", days: 1, label: "H+1 dari Email Approved" }
  },
  {
    id: "T03", name: "Pembuatan Draft Sample",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T01", days: 1, label: "H+1 dari Email Approved" }
  },
  {
    id: "T04", name: "Persiapan Material Approval Sheet",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T02", days: 2, label: "H+2 dari Transfer Data" }
  },
  {
    id: "T05", name: "Pengajuan ID Master (Glove) Sales",
    division: "Sales", pics: ["Jessica","Yunita","Anggita"],
    deadlineRule: { type: "after", baseTask: "T02", days: 2, label: "H+2 dari Transfer Data" }
  },
  {
    id: "T06", name: "Pengajuan ID Master (Glove) Sourcing",
    division: "Sourcing", pics: ["Irene"],
    deadlineRule: { type: "after", baseTask: "T02", days: 2, label: "H+2 dari Transfer Data" }
  },
  {
    id: "T07", name: "Pengajuan ID Master (Glove) Pre Production",
    division: "Pre Production", pics: ["Feira"],
    deadlineRule: { type: "after", baseTask: "T02", days: 2, label: "H+2 dari Transfer Data" }
  },
  {
    id: "T08", name: "Pembuatan BOM",
    division: "Sales", pics: ["Tari","Wulan"],
    deadlineRule: { type: "after", baseTask: "T02", days: 3, label: "H+3 dari Transfer Data" }
  },
  {
    id: "T09", name: "Pembuatan Approval Sheet Accessories",
    division: "Development", pics: ["Siska"],
    deadlineRule: { type: "afterMultiple", baseTasks: ["T05","T06","T07"], days: 7, label: "H+7 dari ID Master Glove selesai" }
  },
  {
    id: "T10", name: "Pembuatan Approval Sheet Material",
    division: "Development", pics: ["Siska"],
    deadlineRule: { type: "afterMultiple", baseTasks: ["T05","T06","T07"], days: 10, label: "H+10 dari ID Master Glove selesai" }
  },
  {
    id: "T11", name: "Pembuatan Approval Sheet Accessories Packing",
    division: "Development", pics: ["Siska"],
    deadlineRule: { type: "afterMultiple", baseTasks: ["T05","T06","T07"], days: 14, label: "H+14 dari ID Master Glove selesai" }
  },
  {
    id: "T12", name: "Pembuatan Cutting Detail",
    division: "Pre Production", pics: ["Helda","Anti"],
    deadlineRule: { type: "after", baseTask: "T02", days: 1, label: "H+1 dari Transfer Data" }
  },
  {
    id: "T13", name: "Penyerahan Pattern Cutting Dies",
    division: "Pre Production", pics: ["Lanti"],
    deadlineRule: { type: "after", baseTask: "T02", days: 2, label: "H+2 dari Transfer Data" }
  },
  {
    id: "T14", name: "Pembuatan Spec System (Glove)",
    division: "Pre Production", pics: ["Helda"],
    deadlineRule: { type: "after", baseTask: "T08", days: 3, label: "H+3 dari Pembuatan BOM" }
  },
  {
    id: "T15", name: "Pembuatan Glove Spec",
    division: "Pre Production", pics: ["Helda","Anti"],
    deadlineRule: { type: "after", baseTask: "T02", days: 7, label: "H+7 dari Transfer Data" }
  },
  {
    id: "T16", name: "Pembuatan SMV",
    division: "Pre Production", pics: ["Tari","Eki"],
    deadlineRule: { type: "after", baseTask: "T15", days: 2, label: "H+2 dari Pembuatan Glove Spec" }
  },
  {
    id: "T17", name: "Pembuatan SMV Asi Software",
    division: "Pre Production", pics: ["Tari","Eki"],
    deadlineRule: { type: "after", baseTask: "T16", days: 2, label: "H+2 dari Pembuatan SMV" }
  },
  {
    id: "T18", name: "Persiapan Material Running",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T08", days: 2, label: "H+2 dari Pembuatan BOM" }
  },
  {
    id: "T19", name: "Ketersediaan Cutting Dies",
    division: "Pre Production", pics: ["Lanti"],
    deadlineRule: { type: "after", baseTask: "T02", days: 14, label: "H+14 dari Transfer Data" }
  },
  {
    id: "T20", name: "Pembuatan SPO",
    division: "Sales", pics: ["Dita"],
    deadlineRule: { type: "after", baseTask: "T14", days: 1, label: "H+1 dari Pembuatan Spec System (Glove)" }
  },
  {
    id: "T21", name: "Pembuatan SOC",
    division: "Sales", pics: ["Dita"],
    deadlineRule: { type: "after", baseTask: "T14", days: 2, label: "H+2 dari Pembuatan Spec System (Glove)" }
  },
  {
    id: "T22", name: "Tanggal Supply SPO Terdekat",
    division: "Sales", pics: ["Jessica","Anggita","Yunita"],
    deadlineRule: { type: "afterMultiple", baseTasks: ["T20","T21"], days: 1, label: "H+1 dari SPO & SOC selesai" }
  },
  {
    id: "T23", name: "Running + Validasi Glove Spec",
    division: "Technical", pics: ["Dandi","Helmina"],
    deadlineRule: { type: "after", baseTask: "T18", days: 7, label: "H+7 dari Persiapan Material Running" }
  },
  {
    id: "T24", name: "Launching / PP Meeting",
    division: "Sales", pics: ["Jessie","Jessica","Anggita","Yunita"],
    deadlineRule: { type: "after", baseTask: "T02", days: 14, label: "H+14 dari Transfer Data" }
  },
  {
    id: "T25", name: "Email Permintaan Packing Spec",
    division: "Sales", pics: ["Jessica","Anggita","Yunita"],
    deadlineRule: { type: "fixed", baseTask: null, days: 0, label: "H+0 (input manual)" }
  },
  {
    id: "T26", name: "Pembuatan Packing Spec",
    division: "Pre Production", pics: ["Rivaldi"],
    deadlineRule: { type: "after", baseTask: "T25", days: 3, label: "H+3 dari Email Permintaan Packing Spec" }
  },
  {
    id: "T27", name: "Confirm + Sebar Packing Spec",
    division: "Sales", pics: ["Jessica","Anggita","Yunita"],
    deadlineRule: { type: "after", baseTask: "T26", days: 7, label: "H+7 dari Pembuatan Packing Spec" }
  },
  {
    id: "T28", name: "Pengajuan ID Master (Packing) Sales",
    division: "Sales", pics: ["Jessica","Anggita","Yunita"],
    deadlineRule: { type: "after", baseTask: "T27", days: 2, label: "H+2 dari Confirm Packing Spec" }
  },
  {
    id: "T29", name: "Pengajuan ID Master (Packing) Sourcing",
    division: "Sourcing", pics: ["Irene"],
    deadlineRule: { type: "after", baseTask: "T27", days: 2, label: "H+2 dari Confirm Packing Spec" }
  },
  {
    id: "T30", name: "Pengajuan ID Master (Packing) Pre Production",
    division: "Pre Production", pics: ["Feira"],
    deadlineRule: { type: "after", baseTask: "T27", days: 2, label: "H+2 dari Confirm Packing Spec" }
  },
  {
    id: "T31", name: "Pembuatan Spec System (Packing)",
    division: "Pre Production", pics: ["Helda"],
    deadlineRule: { type: "afterMultiple", baseTasks: ["T28","T29","T30"], days: 2, label: "H+2 dari ID Master Packing selesai" }
  },
  {
    id: "T32", name: "Color Window",
    division: "Sales", pics: ["Siska"],
    deadlineRule: { type: "after", baseTask: "T04", days: 2, label: "H+2 dari Persiapan Material Approval Sheet" }
  },
  {
    id: "T33", name: "Duplikat Sample",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T01", days: 1, label: "H+1 dari Email Approved" }
  },
  {
    id: "T34", name: "Measurement",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T01", days: 1, label: "H+1 dari Email Approved" }
  },
  {
    id: "T35", name: "Print Window",
    division: "Sample", pics: ["Yogi"],
    deadlineRule: { type: "after", baseTask: "T04", days: 5, label: "H+5 dari Persiapan Material Approval Sheet" }
  },
  {
    id: "T36", name: "QA File",
    division: "Sample", pics: ["Vanny","Wiji"],
    deadlineRule: { type: "after", baseTask: "T02", days: 14, label: "H+14 dari Transfer Data" }
  },
  {
    id: "T37", name: "Setor Pattern ke Pre Production",
    division: "Sample", pics: ["Ase","Reza"],
    deadlineRule: { type: "after", baseTask: "T01", days: 1, label: "H+1 dari Email Approved" }
  }
];

// Export untuk dipakai di semua halaman
if (typeof module !== "undefined") {
  module.exports = { firebaseConfig, VAPID_KEY, USER_WHITELIST, TASK_DEFINITIONS };
}
