export const stripText = (text = "", max = 155) => {
  const clean = String(text).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max)}...` : clean;
};

export const formatAction = (text = "") => {
  const value = String(text).replaceAll("_", " ").replaceAll(":", " - ").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
