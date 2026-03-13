const DOWNLOADS = {
  mac: "./downloads/UniSP-mac.dmg",
  win: "./downloads/UniSP-win.exe",
  android: "./downloads/UniSP-android.apk",
  ios: null,
};

function detectPlatform() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "win";
  if (/Mac/i.test(platform)) return "mac";
  return null;
}

function toast(message) {
  if (typeof document === "undefined") return;
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function setYear() {
  if (typeof document === "undefined") return;
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function setupSmartDownload() {
  if (typeof document === "undefined") return;
  const btn = document.getElementById("btn-smart-download");
  if (!btn) return;

  const platform = detectPlatform();
  const href = platform ? DOWNLOADS[platform] : null;

  if (!href) {
    btn.textContent = "See all downloads";
    btn.addEventListener("click", () => {
      document.getElementById("downloads")?.scrollIntoView({ behavior: "smooth" });
    });
    return;
  }

  const label =
    platform === "mac"
      ? "Download for macOS"
      : platform === "win"
        ? "Download for Windows"
        : platform === "android"
          ? "Download for Android"
          : "Download";

  btn.textContent = label;
  btn.addEventListener("click", () => {
    window.location.href = href;
    toast("Starting download…");
  });
}

function setupCopyLink() {
  if (typeof document === "undefined") return;
  const btn = document.getElementById("btn-copy-link");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const platform = detectPlatform();
    const href = platform ? DOWNLOADS[platform] : null;
    const url = new URL(href || "#downloads", window.location.href).toString();
    const ok = await copyText(url);
    toast(ok ? "Link copied to clipboard." : "Couldn’t copy link (browser blocked).");
  });
}

function setupHashCopy() {
  if (typeof document === "undefined") return;
  document.addEventListener("click", async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const id = t.getAttribute("data-copy");
    if (!id) return;
    const el = document.getElementById(id);
    const value = el?.textContent?.trim();
    if (!value) return;
    const ok = await copyText(value);
    toast(ok ? "SHA-256 copied." : "Couldn’t copy (browser blocked).");
  });
}

function disableAriaDisabledLinks() {
  if (typeof document === "undefined") return;
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const a = t.closest("a[aria-disabled='true']");
    if (!a) return;
    e.preventDefault();
    toast("Link not set yet — replace the placeholder URL.");
  });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  setYear();
  setupSmartDownload();
  setupCopyLink();
  setupHashCopy();
  disableAriaDisabledLinks();
}

