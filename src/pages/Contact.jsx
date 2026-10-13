import React from "react";
import { useLocale, SiteLink, LanguageSwitch } from "../locale.jsx";
import {
  Track,
  Counter,
  StickyHeader,
  MobileNavigation,
} from "../components/Interactions.jsx";
import { ContentSection, FeaturedPrograms } from "../components/Content.jsx";
import { EnquiryForm } from "../components/EnquiryForm.jsx";

export default function Contact() {
  const { t } = useLocale();
  return (
    <>
      <div className="page page--desktop">
        <StickyHeader className="d-header-sticky" id="desktop-header">
          <div className="d-header-liquid">
            <div className="d-header__side">
              <LanguageSwitch />
              <SiteLink href="#" className="d-glass-btn">
                {t("الدخول إلى مسابقة النقاط")}
              </SiteLink>
            </div>
            <nav className="d-nav" aria-label={t("القائمة الرئيسية")}>
              <SiteLink
                href="contact.html"
                className="is-active"
                aria-current="page"
              >
                {t("اتصل بنا")}
              </SiteLink>
              <SiteLink href="programs.html">
                {t("البرامج")}
                <i></i>
              </SiteLink>
              <SiteLink href="index.html#d-features">{t("المميزات")}</SiteLink>
              <SiteLink href="index.html">{t("الرئيسية")}</SiteLink>
            </nav>
            <SiteLink
              href="index.html"
              className="d-logo"
              aria-label={t("دروب العربية")}
            >
              <span className="w6">{t("دروب العربية")}</span>
              <img
                src="/assets/img/logo.png"
                alt={t("")}
                width="49"
                height="56"
              />
            </SiteLink>
          </div>
        </StickyHeader>
      </div>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-wrap">
            <span className="contact-eyebrow">{t("دروب العربية")}</span>
            <h1>{t("رحلتك تبدأ بمحادثة")}</h1>
            <p>
              {t(
                "نحن هنا للإجابة عن أسئلتك ومساعدتك في اختيار البرنامج المناسب لك.",
              )}
            </p>
            <SiteLink href="#enquiry">{t("أرسل استفسارك ↙")}</SiteLink>
          </div>
          <div className="contact-orbit" aria-hidden="true"></div>
        </section>
        <div className="contact-wrap contact-content">
          <section className="contact-methods" aria-label={t("طرق التواصل")}>
            <SiteLink href="tel:+905347308092" className="contact-card">
              <span className="contact-card-icon" aria-hidden="true">
                {t("↗")}
              </span>
              <h2>{t("الجوال")}</h2>
              <span dir="ltr">{t("+90 534 730 80 92")}</span>
            </SiteLink>
            <SiteLink href="tel:+902125214116" className="contact-card">
              <span className="contact-card-icon" aria-hidden="true">
                {t("↗")}
              </span>
              <h2>{t("الهاتف")}</h2>
              <span dir="ltr">{t("+90 212 521 41 16")}</span>
            </SiteLink>
            <div className="contact-card">
              <span className="contact-card-icon" aria-hidden="true">
                {t("↗")}
              </span>
              <h2>{t("الفاكس")}</h2>
              <span dir="ltr">{t("+90 212 521 41 36")}</span>
            </div>
          </section>
          <div className="contact-grid">
            <section className="contact-form-panel" id="enquiry">
              <span className="contact-eyebrow">{t("لنتعرف عليك")}</span>
              <h2>{t("أخبرنا عن خططك")}</h2>
              <p>{t("شاركنا التفاصيل التالية لنتواصل معك بشأن البرنامج.")}</p>
              <div className="contact-success" role="status" hidden={true}>
                {t("تم إرسال استفسارك بنجاح. شكراً لتواصلك معنا.")}
              </div>
              <EnquiryForm />
            </section>
            <aside className="contact-aside">
              <div className="contact-address">
                <span className="contact-eyebrow">{t("تفضل بزيارتنا")}</span>
                <h2>{t("نلتقي في إسطنبول")}</h2>
                <p dir="ltr">
                  {t(
                    "Akşemsettin, Akdeniz Cd. No:101, 34080 Fatih/İstanbul, Türkiye",
                  )}
                </p>
                <SiteLink
                  href="https://maps.google.com/?q=Ak%C5%9Femsettin,+Akdeniz+Cd.+No:101,+34080+Fatih%2F%C4%B0stanbul"
                  target="_blank"
                  rel="noopener"
                >
                  {t("عرض على الخريطة ↗")}
                </SiteLink>
              </div>
              <div className="contact-photo">
                <img
                  src="/assets/img/manuscript.jpg"
                  alt={t("مخطوطة عربية وكوب شاي")}
                />
                <h2>{t("معا نتعلم اللغة ونعيش الثقافة الاردنية")}</h2>
              </div>
            </aside>
          </div>
        </div>
        <footer className="contact-footer contact-wrap">
          <SiteLink href="index.html">{t("دروب العربية")}</SiteLink>
          <p>{t("تعلم اللغة. عش الثقافة. اكتشف العالم.")}</p>
          <SiteLink href="programs.html">{t("اكتشف برامجنا ↗")}</SiteLink>
        </footer>
      </main>
      <MobileNavigation className="m-nav" aria-label={t("القائمة الرئيسية")}>
        <SiteLink href="#" className="m-nav__item m-nav__item--wide">
          <img
            src="/assets/img/icon-trophy.svg"
            alt={t("")}
            className="m-nav__trophy"
          />
          <span>{t("مسابقة النقاط")}</span>
        </SiteLink>
        <SiteLink
          href="contact.html"
          className="m-nav__item is-active"
          aria-current="page"
        >
          <img src="/assets/img/icon-phone.svg" alt={t("")} />
          <span>{t("اتصل بنا")}</span>
        </SiteLink>
        <SiteLink href="programs.html" className="m-nav__item">
          <img src="/assets/img/icon-cal-w.svg" alt={t("")} />
          <span>{t("البرامج")}</span>
        </SiteLink>
        <SiteLink href="index.html#m-features" className="m-nav__item">
          <img src="/assets/img/icon-check-w.svg" alt={t("")} />
          <span>{t("المميزات")}</span>
        </SiteLink>
        <SiteLink href="index.html" className="m-nav__item">
          <img src="/assets/img/icon-home.svg" alt={t("")} />
          <span>{t("الرئيسية")}</span>
        </SiteLink>
      </MobileNavigation>
    </>
  );
}
