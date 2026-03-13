import React, { useCallback, useEffect, useState } from "react";

const DOWNLOADS = {
  mac: "/downloads/UniSP-mac.dmg",
  win: "/downloads/UniSP-win.exe",
  android: "/downloads/UniSP-android.apk",
  ios: null,
};

function detectPlatform() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "win";
  if (/Mac/i.test(platform)) return "mac";
  return null;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function App() {
  const [year, setYear] = useState("");
  const [toast, setToast] = useState("");
  const [smartLabel, setSmartLabel] = useState("Download for this device");
  const [smartHref, setSmartHref] = useState(null);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));

    const platform = detectPlatform();
    const href = platform ? DOWNLOADS[platform] : null;

    if (!href) {
      setSmartLabel("See all downloads");
      setSmartHref(null);
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

    setSmartLabel(label);
    setSmartHref(href);
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const handleSmartClick = () => {
    if (!smartHref) {
      document.getElementById("downloads")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = smartHref;
    showToast("Starting download…");
  };

  const handleCopyLink = async () => {
    const platform = detectPlatform();
    const href = platform ? DOWNLOADS[platform] : null;
    const url = new URL(href || "#downloads", window.location.href).toString();
    const ok = await copyText(url);
    showToast(ok ? "Link copied to clipboard." : "Couldn’t copy link (browser blocked).");
  };

  const handleCopyHash = async (value) => {
    const ok = await copyText(value);
    showToast(ok ? "SHA-256 copied." : "Couldn’t copy (browser blocked).");
  };

  const handleDisabledLink = (e) => {
    e.preventDefault();
    showToast("Link not set yet — replace the placeholder URL.");
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="./" aria-label="UniSP home">
            <span className="brand-mark" aria-hidden="true"></span>
            <span className="brand-name">UniSP</span>
          </a>
          <nav className="top-nav" aria-label="Primary">
            <a href="#downloads">Download</a>
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="kicker">Official downloads</p>
              <h1>Get UniSP for your device.</h1>
              <p className="subtitle">
                Fast, lightweight, and built for everyday productivity. Choose your
                platform and install in minutes.
              </p>

              <div className="hero-cta">
                <div className="primary-download" role="group" aria-label="Quick download">
                  <button className="btn btn-primary" type="button" onClick={handleSmartClick}>
                    {smartLabel}
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={handleCopyLink}>
                    Copy download link
                  </button>
                </div>
                <p className="fineprint">
                  Current version: <strong id="app-version">v1.0.0</strong> ·
                  <a href="#release-notes" className="inline-link">
                    Release notes
                  </a>
                </p>
              </div>

              <div className="trust">
                <div className="trust-item">
                  <span className="trust-title">Secure</span>
                  <span className="trust-sub">Signed builds</span>
                </div>
                <div className="trust-item">
                  <span className="trust-title">Lightweight</span>
                  <span className="trust-sub">Small installer</span>
                </div>
                <div className="trust-item">
                  <span className="trust-title">Fast</span>
                  <span className="trust-sub">Instant launch</span>
                </div>
              </div>
            </div>

            <div className="hero-card" aria-label="App preview">
              <div className="preview">
                <div className="preview-top">
                  <span className="dot dot-red" aria-hidden="true"></span>
                  <span className="dot dot-yellow" aria-hidden="true"></span>
                  <span className="dot dot-green" aria-hidden="true"></span>
                  <span className="preview-title">UniSP</span>
                </div>
                <div className="preview-body">
                  <div className="preview-chip">Search</div>
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>
                  <div className="preview-grid">
                    <div className="preview-tile"></div>
                    <div className="preview-tile"></div>
                    <div className="preview-tile"></div>
                    <div className="preview-tile"></div>
                  </div>
                </div>
              </div>

              <div className="callout">
                <p className="callout-title">Need an older build?</p>
                <p className="callout-sub">
                  Grab previous versions from your releases page.
                </p>
                <a className="btn btn-small btn-secondary" href="#downloads">
                  See all downloads
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="downloads">
          <div className="container">
            <div className="section-head">
              <h2>Downloads</h2>
              <p className="section-sub">
                Replace the placeholder links with your real installers.
              </p>
            </div>

            <div className="download-grid" role="list">
              <article className="download-card" role="listitem">
                <div className="download-top">
                  <div className="platform">
                    <span className="platform-icon" aria-hidden="true">
                      
                    </span>
                    <div>
                      <h3>macOS</h3>
                      <p className="muted">macOS 12+ (Apple Silicon &amp; Intel)</p>
                    </div>
                  </div>
                  <span className="badge">Recommended</span>
                </div>
                <div className="download-actions">
                  <a className="btn btn-primary" href="/downloads/UniSP-mac.dmg">
                    Download .dmg
                  </a>
                  <a className="btn btn-ghost" href="/downloads/UniSP-mac.zip">
                    Portable .zip
                  </a>
                </div>
                <p className="fineprint">
                  SHA-256:{" "}
                  <button
                    className="linklike"
                    type="button"
                    onClick={() => handleCopyHash("REPLACE_WITH_SHA256")}
                  >
                    Copy
                  </button>
                  <span className="hash">REPLACE_WITH_SHA256</span>
                </p>
              </article>

              <article className="download-card" role="listitem">
                <div className="download-top">
                  <div className="platform">
                    <span className="platform-icon" aria-hidden="true">
                      ⊞
                    </span>
                    <div>
                      <h3>Windows</h3>
                      <p className="muted">Windows 10/11 (64-bit)</p>
                    </div>
                  </div>
                </div>
                <div className="download-actions">
                  <a className="btn btn-primary" href="/downloads/UniSP-win.exe">
                    Download .exe
                  </a>
                  <a className="btn btn-ghost" href="/downloads/UniSP-win.msi">
                    Installer .msi
                  </a>
                </div>
                <p className="fineprint">
                  SHA-256:{" "}
                  <button
                    className="linklike"
                    type="button"
                    onClick={() => handleCopyHash("REPLACE_WITH_SHA256")}
                  >
                    Copy
                  </button>
                  <span className="hash">REPLACE_WITH_SHA256</span>
                </p>
              </article>

              <article className="download-card" role="listitem">
                <div className="download-top">
                  <div className="platform">
                    <span className="platform-icon" aria-hidden="true">
                      ⌁
                    </span>
                    <div>
                      <h3>Android</h3>
                      <p className="muted">Android 8+ (APK)</p>
                    </div>
                  </div>
                </div>
                <div className="download-actions">
                  <a className="btn btn-primary" href="/downloads/UniSP-android.apk">
                    Download .apk
                  </a>
                  <a className="btn btn-ghost" href="#faq">
                    How to install
                  </a>
                </div>
                <p className="fineprint">
                  Prefer Play Store?{" "}
                  <a className="inline-link" href="#" onClick={handleDisabledLink}>
                    Add link
                  </a>
                </p>
              </article>

              <article className="download-card" role="listitem">
                <div className="download-top">
                  <div className="platform">
                    <span className="platform-icon" aria-hidden="true">
                      ⌁
                    </span>
                    <div>
                      <h3>iOS</h3>
                      <p className="muted">iOS 15+ (App Store)</p>
                    </div>
                  </div>
                </div>
                <div className="download-actions">
                  <a className="btn btn-primary" href="#" onClick={handleDisabledLink}>
                    App Store link
                  </a>
                  <a className="btn btn-ghost" href="#faq">
                    Troubleshooting
                  </a>
                </div>
                <p className="fineprint">
                  For TestFlight builds, replace this section.
                </p>
              </article>
            </div>

            <div className="notice">
              <div className="notice-icon" aria-hidden="true">
                i
              </div>
              <div>
                <p className="notice-title">Tip</p>
                <p className="notice-body">
                  Host your installers in <code>./downloads/</code> (or swap these links to your
                  CDN/GitHub Releases).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="features">
          <div className="container">
            <div className="section-head">
              <h2>Why UniSP</h2>
              <p className="section-sub">A few highlights users tend to care about.</p>
            </div>

            <div className="feature-grid">
              <div className="feature">
                <h3>Offline-first</h3>
                <p className="muted">Works great even when your connection doesn’t.</p>
              </div>
              <div className="feature">
                <h3>Sync when you want</h3>
                <p className="muted">Optional cloud sync across devices.</p>
              </div>
              <div className="feature">
                <h3>Keyboard-friendly</h3>
                <p className="muted">Quick actions and shortcuts out of the box.</p>
              </div>
              <div className="feature">
                <h3>Privacy-minded</h3>
                <p className="muted">Clear controls and transparent data handling.</p>
              </div>
              <div className="feature">
                <h3>Fast install</h3>
                <p className="muted">Small downloads and simple setup.</p>
              </div>
              <div className="feature">
                <h3>Accessible</h3>
                <p className="muted">
                  High contrast, focus states, and screen reader-friendly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="release-notes" aria-label="Release notes">
          <div className="container">
            <div className="section-head">
              <h2>Release notes</h2>
              <p className="section-sub">Keep this small and scannable.</p>
            </div>
            <div className="release">
              <div className="release-meta">
                <span className="pill">v1.0.0</span>
                <span className="muted">Mar 12, 2026</span>
              </div>
              <ul className="list">
                <li>Initial public release.</li>
                <li>Performance improvements and stability fixes.</li>
                <li>New onboarding flow.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt" id="faq">
          <div className="container">
            <div className="section-head">
              <h2>FAQ</h2>
              <p className="section-sub">Common questions around installs and updates.</p>
            </div>

            <div className="faq">
              <details>
                <summary>How do I verify the download?</summary>
                <div className="muted">
                  Compare the SHA-256 hash shown above with the file you downloaded. Replace
                  the placeholders with your real hashes.
                </div>
              </details>
              <details>
                <summary>My macOS download says it’s from an unidentified developer.</summary>
                <div className="muted">
                  If you distribute outside the App Store, ensure your app is signed and
                  notarized. Users can open System Settings → Privacy &amp; Security to allow
                  the app.
                </div>
              </details>
              <details>
                <summary>Does UniSP auto-update?</summary>
                <div className="muted">
                  Add your update policy here (in-app updater, store updates, or manual
                  downloads).
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <div className="brand small" aria-label="UniSP">
              <span className="brand-mark" aria-hidden="true"></span>
              <span className="brand-name">UniSP</span>
            </div>
            <p className="muted">
              © <span>{year}</span> UniSP. All rights reserved.
            </p>
          </div>
          <div className="footer-right">
            <a href="#" onClick={handleDisabledLink}>
              Privacy
            </a>
            <a href="#" onClick={handleDisabledLink}>
              Terms
            </a>
            <a href="#" onClick={handleDisabledLink}>
              Support
            </a>
          </div>
        </div>
      </footer>

      <div
        className={`toast${toast ? " show" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </>
  );
}

