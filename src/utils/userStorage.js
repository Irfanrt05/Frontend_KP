export const DEFAULT_MALE_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" rx="60" fill="#e9f8f3"/>
    <circle cx="60" cy="44" r="22" fill="#f0c7a5"/>
    <path d="M36 43c2-22 19-30 36-20 9 5 13 14 12 27-12-8-28-10-48-7z" fill="#1f2937"/>
    <path d="M28 104c5-25 19-37 32-37s27 12 32 37" fill="#10BB89"/>
    <path d="M43 48c7 6 25 6 34 0" stroke="#111827" stroke-width="2" fill="none" opacity=".35"/>
  </svg>`);

export const DEFAULT_FEMALE_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" rx="60" fill="#fff0f6"/>
    <circle cx="60" cy="44" r="21" fill="#f1c2a0"/>
    <path d="M35 56c-3-24 9-39 25-39s28 15 25 39c-8-9-42-9-50 0z" fill="#4b2e2a"/>
    <path d="M28 104c5-25 19-37 32-37s27 12 32 37" fill="#ec4899"/>
    <path d="M46 50c8 6 20 6 28 0" stroke="#111827" stroke-width="2" fill="none" opacity=".35"/>
  </svg>`);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

export const saveStoredUser = (updates) => {
  const current = getStoredUser() || {};
  const next = { ...current, ...updates };
  localStorage.setItem("user", JSON.stringify(next));
  window.dispatchEvent(new Event("user-updated"));
  return next;
};

export const getDisplayName = (user) =>
  user?.name || user?.username || user?.email?.split("@")[0] || "User";

export const getUserAvatar = (user) => {
  if (user?.avatar) return user.avatar;
  if (user?.gender === "female") return DEFAULT_FEMALE_AVATAR;
  return DEFAULT_MALE_AVATAR;
};
