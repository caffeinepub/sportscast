// Simple i18n implementation (i18next not installed)
export type Lang = "en" | "hi" | "ta" | "te" | "bn";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

export type TranslationKey =
  | "home"
  | "stats"
  | "groups"
  | "friends"
  | "shop"
  | "settings"
  | "predict"
  | "predicted"
  | "locked"
  | "live"
  | "upcoming"
  | "completed"
  | "submit"
  | "cancel"
  | "close"
  | "selectTeam"
  | "yourPrediction"
  | "predictMatch"
  | "totalPoints"
  | "correctPredictions"
  | "incorrectPredictions"
  | "totalPredictions"
  | "accuracy"
  | "myProfile"
  | "createGroup"
  | "joinGroup"
  | "groupName"
  | "inviteCode"
  | "generate"
  | "join"
  | "leaderboard"
  | "copyLink"
  | "copied"
  | "points"
  | "cart"
  | "addToCart"
  | "watchAdDiscount"
  | "checkout"
  | "total"
  | "discount"
  | "orderSuccess"
  | "continueShopping"
  | "watchingAd"
  | "discountApplied"
  | "language"
  | "about"
  | "version"
  | "sportsCast"
  | "matchPredictions"
  | "vs"
  | "member"
  | "members"
  | "rank"
  | "name"
  | "enterGroupName"
  | "enterInviteCode"
  | "noGroups"
  | "remove"
  | "emptyCart"
  | "orderPlaced";

type Translations = Record<TranslationKey, string>;
type AllTranslations = Record<Lang, Translations>;

const translations: AllTranslations = {
  en: {
    home: "Home",
    stats: "Stats",
    groups: "Groups",
    friends: "Friends",
    shop: "Shop",
    settings: "Settings",
    predict: "Predict",
    predicted: "Predicted",
    locked: "Locked",
    live: "LIVE",
    upcoming: "Upcoming",
    completed: "Completed",
    submit: "Submit",
    cancel: "Cancel",
    close: "Close",
    selectTeam: "Select a team to predict",
    yourPrediction: "Your Prediction",
    predictMatch: "Predict Match",
    totalPoints: "Total Points",
    correctPredictions: "Correct",
    incorrectPredictions: "Incorrect",
    totalPredictions: "Total",
    accuracy: "Accuracy",
    myProfile: "My Profile",
    createGroup: "Create Group",
    joinGroup: "Join Group",
    groupName: "Group Name",
    inviteCode: "Invite Code",
    generate: "Create",
    join: "Join",
    leaderboard: "Leaderboard",
    copyLink: "Copy Invite Link",
    copied: "Copied!",
    points: "pts",
    cart: "Cart",
    addToCart: "Add to Cart",
    watchAdDiscount: "Watch Ad for 10% Off",
    checkout: "Checkout",
    total: "Total",
    discount: "Discount",
    orderSuccess: "Order Placed!",
    continueShopping: "Continue Shopping",
    watchingAd: "Playing Ad...",
    discountApplied: "10% discount applied!",
    language: "Language",
    about: "About",
    version: "Version",
    sportsCast: "SportsCast",
    matchPredictions: "Match Predictions",
    vs: "vs",
    member: "member",
    members: "members",
    rank: "Rank",
    name: "Name",
    enterGroupName: "Enter group name",
    enterInviteCode: "Enter invite code",
    noGroups: "No groups yet",
    remove: "Remove",
    emptyCart: "Your cart is empty",
    orderPlaced: "Thank you for your order!",
  },
  hi: {
    home: "होम",
    stats: "आँकड़े",
    groups: "ग्रुप",
    friends: "दोस्त",
    shop: "शॉप",
    settings: "सेटिंग",
    predict: "भविष्यवाणी",
    predicted: "भविष्यवाणी की",
    locked: "लॉक्ड",
    live: "लाइव",
    upcoming: "आगामी",
    completed: "पूर्ण",
    submit: "सबमिट",
    cancel: "रद्द करें",
    close: "बंद करें",
    selectTeam: "टीम चुनें",
    yourPrediction: "आपकी भविष्यवाणी",
    predictMatch: "मैच भविष्यवाणी",
    totalPoints: "कुल अंक",
    correctPredictions: "सही",
    incorrectPredictions: "गलत",
    totalPredictions: "कुल",
    accuracy: "सटीकता",
    myProfile: "मेरी प्रोफ़ाइल",
    createGroup: "ग्रुप बनाएं",
    joinGroup: "ग्रुप जॉइन करें",
    groupName: "ग्रुप का नाम",
    inviteCode: "इनवाइट कोड",
    generate: "बनाएं",
    join: "जॉइन",
    leaderboard: "लीडरबोर्ड",
    copyLink: "लिंक कॉपी करें",
    copied: "कॉपी किया!",
    points: "अंक",
    cart: "कार्ट",
    addToCart: "कार्ट में जोड़ें",
    watchAdDiscount: "विज्ञापन देखें, 10% छूट पाएं",
    checkout: "चेकआउट",
    total: "कुल",
    discount: "छूट",
    orderSuccess: "ऑर्डर हो गया!",
    continueShopping: "खरीदारी जारी रखें",
    watchingAd: "विज्ञापन चल रहा है...",
    discountApplied: "10% छूट लागू!",
    language: "भाषा",
    about: "के बारे में",
    version: "संस्करण",
    sportsCast: "स्पोर्ट्सकास्ट",
    matchPredictions: "मैच भविष्यवाणियाँ",
    vs: "बनाम",
    member: "सदस्य",
    members: "सदस्य",
    rank: "रैंक",
    name: "नाम",
    enterGroupName: "ग्रुप का नाम दर्ज करें",
    enterInviteCode: "इनवाइट कोड दर्ज करें",
    noGroups: "कोई ग्रुप नहीं",
    remove: "हटाएं",
    emptyCart: "कार्ट खाली है",
    orderPlaced: "आपका ऑर्डर प्राप्त हो गया!",
  },
  ta: {
    home: "முகப்பு",
    stats: "புள்ளிவிவரம்",
    groups: "குழுக்கள்",
    friends: "நண்பர்கள்",
    shop: "கடை",
    settings: "அமைப்புகள்",
    predict: "கணிக்க",
    predicted: "கணிக்கப்பட்டது",
    locked: "பூட்டப்பட்டது",
    live: "நேரடி",
    upcoming: "வரவிருக்கும்",
    completed: "முடிந்தது",
    submit: "சமர்ப்பி",
    cancel: "ரத்துசெய்",
    close: "மூடு",
    selectTeam: "அணியை தேர்ந்தெடுக்கவும்",
    yourPrediction: "உங்கள் கணிப்பு",
    predictMatch: "போட்டி கணிப்பு",
    totalPoints: "மொத்த புள்ளிகள்",
    correctPredictions: "சரியானவை",
    incorrectPredictions: "தவறானவை",
    totalPredictions: "மொத்தம்",
    accuracy: "துல்லியம்",
    myProfile: "என் சுயவிவரம்",
    createGroup: "குழு உருவாக்கு",
    joinGroup: "குழுவில் சேர்",
    groupName: "குழு பெயர்",
    inviteCode: "அழைப்பு குறியீடு",
    generate: "உருவாக்கு",
    join: "சேர்",
    leaderboard: "தலைமைப் பலகை",
    copyLink: "இணைப்பை நகலெடு",
    copied: "நகலெடுக்கப்பட்டது!",
    points: "புள்ளிகள்",
    cart: "வண்டி",
    addToCart: "வண்டியில் சேர்",
    watchAdDiscount: "விளம்பரம் பார்க்க 10% தள்ளுபடி",
    checkout: "வெளியேறு",
    total: "மொத்தம்",
    discount: "தள்ளுபடி",
    orderSuccess: "ஆர்டர் வைக்கப்பட்டது!",
    continueShopping: "தொடர்ந்து வாங்க",
    watchingAd: "விளம்பரம் ஓடுகிறது...",
    discountApplied: "10% தள்ளுபடி பயன்படுத்தப்பட்டது!",
    language: "மொழி",
    about: "பற்றி",
    version: "பதிப்பு",
    sportsCast: "ஸ்போர்ட்ஸ்கேஸ்ட்",
    matchPredictions: "போட்டி கணிப்புகள்",
    vs: "எதிர்",
    member: "உறுப்பினர்",
    members: "உறுப்பினர்கள்",
    rank: "தரவரிசை",
    name: "பெயர்",
    enterGroupName: "குழு பெயரை உள்ளிடவும்",
    enterInviteCode: "அழைப்பு குறியீட்டை உள்ளிடவும்",
    noGroups: "குழுக்கள் இல்லை",
    remove: "அகற்று",
    emptyCart: "வண்டி காலியாக உள்ளது",
    orderPlaced: "உங்கள் ஆர்டர் பெறப்பட்டது!",
  },
  te: {
    home: "హోమ్",
    stats: "గణాంకాలు",
    groups: "గ్రూపులు",
    friends: "స్నేహితులు",
    shop: "షాప్",
    settings: "సెట్టింగ్స్",
    predict: "అంచనా",
    predicted: "అంచనా వేయబడింది",
    locked: "లాక్ చేయబడింది",
    live: "లైవ్",
    upcoming: "రానున్న",
    completed: "పూర్తయింది",
    submit: "సమర్పించు",
    cancel: "రద్దు చేయి",
    close: "మూసివేయి",
    selectTeam: "జట్టును ఎంచుకోండి",
    yourPrediction: "మీ అంచనా",
    predictMatch: "మ్యాచ్ అంచనా",
    totalPoints: "మొత్తం పాయింట్లు",
    correctPredictions: "సరైనవి",
    incorrectPredictions: "తప్పు",
    totalPredictions: "మొత్తం",
    accuracy: "నిజశుద్ధి",
    myProfile: "నా ప్రొఫైల్",
    createGroup: "గ్రూప్ సృష్టించు",
    joinGroup: "గ్రూప్‌లో చేరు",
    groupName: "గ్రూప్ పేరు",
    inviteCode: "ఆహ్వాన కోడ్",
    generate: "సృష్టించు",
    join: "చేరు",
    leaderboard: "లీడర్‌బోర్డ్",
    copyLink: "లింక్ కాపీ చేయి",
    copied: "కాపీ చేయబడింది!",
    points: "పాయింట్లు",
    cart: "కార్ట్",
    addToCart: "కార్ట్‌కి జోడించు",
    watchAdDiscount: "యాడ్ చూసి 10% తగ్గింపు పొందు",
    checkout: "చెక్‌అవుట్",
    total: "మొత్తం",
    discount: "తగ్గింపు",
    orderSuccess: "ఆర్డర్ చేయబడింది!",
    continueShopping: "షాపింగ్ కొనసాగించు",
    watchingAd: "యాడ్ ప్లే అవుతోంది...",
    discountApplied: "10% తగ్గింపు వర్తింపజేయబడింది!",
    language: "భాష",
    about: "గురించి",
    version: "వెర్షన్",
    sportsCast: "స్పోర్ట్స్‌కాస్ట్",
    matchPredictions: "మ్యాచ్ అంచనాలు",
    vs: "వర్సెస్",
    member: "సభ్యుడు",
    members: "సభ్యులు",
    rank: "ర్యాంక్",
    name: "పేరు",
    enterGroupName: "గ్రూప్ పేరు నమోదు చేయండి",
    enterInviteCode: "ఆహ్వాన కోడ్ నమోదు చేయండి",
    noGroups: "గ్రూపులు లేవు",
    remove: "తీసివేయి",
    emptyCart: "కార్ట్ ఖాళీగా ఉంది",
    orderPlaced: "మీ ఆర్డర్ స్వీకరించబడింది!",
  },
  bn: {
    home: "হোম",
    stats: "পরিসংখ্যান",
    groups: "গ্রুপ",
    friends: "বন্ধুরা",
    shop: "দোকান",
    settings: "সেটিংস",
    predict: "পূর্বাভাস",
    predicted: "পূর্বাভাস দেওয়া হয়েছে",
    locked: "লক করা",
    live: "লাইভ",
    upcoming: "আসন্ন",
    completed: "সম্পন্ন",
    submit: "জমা দিন",
    cancel: "বাতিল",
    close: "বন্ধ করুন",
    selectTeam: "দল নির্বাচন করুন",
    yourPrediction: "আপনার পূর্বাভাস",
    predictMatch: "ম্যাচ পূর্বাভাস",
    totalPoints: "মোট পয়েন্ট",
    correctPredictions: "সঠিক",
    incorrectPredictions: "ভুল",
    totalPredictions: "মোট",
    accuracy: "নির্ভুলতা",
    myProfile: "আমার প্রোফাইল",
    createGroup: "গ্রুপ তৈরি করুন",
    joinGroup: "গ্রুপে যোগ দিন",
    groupName: "গ্রুপের নাম",
    inviteCode: "আমন্ত্রণ কোড",
    generate: "তৈরি করুন",
    join: "যোগ দিন",
    leaderboard: "লিডারবোর্ড",
    copyLink: "লিঙ্ক কপি করুন",
    copied: "কপি করা হয়েছে!",
    points: "পয়েন্ট",
    cart: "কার্ট",
    addToCart: "কার্টে যোগ করুন",
    watchAdDiscount: "বিজ্ঞাপন দেখুন, ১০% ছাড় পান",
    checkout: "চেকআউট",
    total: "মোট",
    discount: "ছাড়",
    orderSuccess: "অর্ডার দেওয়া হয়েছে!",
    continueShopping: "কেনাকাটা চালিয়ে যান",
    watchingAd: "বিজ্ঞাপন চলছে...",
    discountApplied: "১০% ছাড় প্রয়োগ করা হয়েছে!",
    language: "ভাষা",
    about: "সম্পর্কে",
    version: "সংস্করণ",
    sportsCast: "স্পোর্টসকাস্ট",
    matchPredictions: "ম্যাচ পূর্বাভাস",
    vs: "বনাম",
    member: "সদস্য",
    members: "সদস্যরা",
    rank: "র‍্যাংক",
    name: "নাম",
    enterGroupName: "গ্রুপের নাম লিখুন",
    enterInviteCode: "আমন্ত্রণ কোড লিখুন",
    noGroups: "কোনো গ্রুপ নেই",
    remove: "সরান",
    emptyCart: "কার্ট খালি",
    orderPlaced: "আপনার অর্ডার গ্রহণ করা হয়েছে!",
  },
};

export function getTranslation(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}
