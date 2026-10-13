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
function ProgramsDesktopSection1() {
  const { t } = useLocale();
  return (
    <StickyHeader className="d-header-sticky" id="desktop-header">
      <div className="d-header-liquid">
        <div className="d-header__side">
          <LanguageSwitch />
          <SiteLink href="#" className="d-glass-btn">
            {t("الدخول إلى مسابقة النقاط")}
          </SiteLink>
        </div>
        <nav className="d-nav" aria-label={t("القائمة الرئيسية")}>
          <SiteLink href="contact.html">{t("اتصل بنا")}</SiteLink>
          <SiteLink
            href="programs.html"
            className="is-active"
            aria-current="page"
          >
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
          <img src="/assets/img/logo.png" alt={t("")} width="49" height="56" />
        </SiteLink>
      </div>
    </StickyHeader>
  );
}
function ProgramsDesktopSection4() {
  const { t } = useLocale();
  return (
    <div className="band band--d-progs-hero">
      <section className="sec d-progs-hero-sec" aria-label={t("مقدمة البرامج")}>
        <div className="d-progs-hero__backdrop" aria-hidden="true">
          <img src="/assets/img/program-petra.jpg" alt={t("")} />
        </div>
        <div className="d-progs-hero__tint" aria-hidden="true"></div>
        <div className="d-progs-hero__scrim-b" aria-hidden="true"></div>
        <div className="d-progs-hero__content">
          <span className="d-progs-hero__badge">
            {t("✨ برامج ومخيمات 2026")}
          </span>
          <h1 className="d-progs-hero__title">
            {t("برامج دروب العربية للغة والثقافة")}
          </h1>
          <p className="d-progs-hero__subtitle">
            {t(
              " نجمع بين التعليم اللغوي التطبيقي المكثف والانغماس الثقافي والرحلات الاستكشافية الاستثنائية في أعرق بلدان العالم العربي. ",
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
function ProgramsDesktopSection7() {
  const { t } = useLocale();
  return (
    <div className="band band--d-features">
      <ContentSection kind="programs" />
    </div>
  );
}
function ProgramsDesktopSection13() {
  const { t } = useLocale();
  return (
    <div className="band band--d-footer">
      <footer className="sec d-footer" id="d-contact">
        <p className="a d-footer__ghost w6" aria-hidden="true">
          {t("دروب العربية")}
        </p>
        <p className="a d-footer__brand w6">{t("دروب العربية")}</p>
        <div className="a d-footer__social">
          <p className="d-footer__label w5">{t("Social media")}</p>
          <div className="d-footer__links">
            <SiteLink
              href="#"
              target="_blank"
              rel="noopener"
              className="d-footer__ext"
            >
              <img
                src="/assets/img/icon-ext.svg"
                alt={t("")}
                width="20"
                height="20"
              />
              <span>{t("Instagram")}</span>
            </SiteLink>
            <SiteLink
              href="#"
              target="_blank"
              rel="noopener"
              className="d-footer__ext"
            >
              <img
                src="/assets/img/icon-ext.svg"
                alt={t("")}
                width="20"
                height="20"
              />
              <span>{t("Facebook")}</span>
            </SiteLink>
          </div>
        </div>
        <nav className="a d-footer__nav" aria-label={t("روابط التذييل")}>
          <SiteLink href="index.html">{t("الرئيسية")}</SiteLink>
          <SiteLink href="index.html#d-features">{t("المميزات")}</SiteLink>
          <SiteLink href="programs.html" className="is-active">
            {t("البرامج")}
          </SiteLink>
          <SiteLink href="contact.html">{t("اتصل بنا")}</SiteLink>
          <SiteLink href="#">{t("الدخول إلى مسابقة النقاط")}</SiteLink>
        </nav>
        <div className="a d-footer__rule" aria-hidden="true"></div>
        <button
          type="button"
          className="a d-footer__top js-top"
          aria-label={t("العودة إلى الأعلى")}
        >
          <img
            src="/assets/img/icon-chev-d.svg"
            alt={t("")}
            width="28"
            height="28"
          />
        </button>
      </footer>
    </div>
  );
}
function ProgramsDesktop() {
  return (
    <div className="page page--desktop" id="desktop">
      <ProgramsDesktopSection1 />
      <ProgramsDesktopSection4 />
      <ProgramsDesktopSection7 />
      <ProgramsDesktopSection13 />
    </div>
  );
}
function ProgramsMobileSection2() {
  const { t } = useLocale();
  return (
    <div className="band band--m-hero">
      <section className="sec m-progs-hero" aria-label={t("مقدمة البرامج")}>
        <span className="m-progs-hero__badge">{t("✨ برامج 2026")}</span>
        <h1 className="m-progs-hero__title">{t("البرامج والمخيمات")}</h1>
        <p className="m-progs-hero__sub">
          {t(
            "تعليم اللغة العربية بمعايشة ثقافية وتجربة استكشافية متكاملة في الأردن وسوريا والمملكة العربية السعودية.",
          )}
        </p>
      </section>
    </div>
  );
}
function ProgramsMobileSection5() {
  const { t } = useLocale();
  return (
    <main className="m-progs-body">
      <ContentSection kind="programs" />
    </main>
  );
}
function ProgramsMobileSection8() {
  const { t } = useLocale();
  return (
    <div className="band band--m-footer">
      <footer className="sec m-footer" id="m-contact">
        <p className="m-footer__brand w6">{t("دروب العربية")}</p>
        <nav className="m-footer__nav" aria-label={t("روابط التذييل")}>
          <SiteLink className="m-footer__link" href="index.html">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("الرئيسية")}</span>
          </SiteLink>
          <SiteLink className="m-footer__link" href="index.html#m-features">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("المميزات")}</span>
          </SiteLink>
          <SiteLink className="m-footer__link" href="programs.html">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("البرامج")}</span>
          </SiteLink>
          <SiteLink className="m-footer__link" href="tel:+905347308092">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("اتصل بنا")}</span>
          </SiteLink>
          <SiteLink className="m-footer__link" href="#">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("الدخول إلى مسابقة النقاط")}</span>
          </SiteLink>
        </nav>
        <div className="m-footer__social">
          <p className="m-footer__label w5">{t("Social media")}</p>
          <div className="m-footer__links">
            <SiteLink
              href="#"
              target="_blank"
              rel="noopener"
              className="m-footer__ext"
            >
              <img
                src="/assets/img/icon-ext-18.svg"
                alt={t("")}
                width="18"
                height="18"
              />
              <span>{t("Instagram")}</span>
            </SiteLink>
            <SiteLink
              href="#"
              target="_blank"
              rel="noopener"
              className="m-footer__ext"
            >
              <img
                src="/assets/img/icon-ext-18.svg"
                alt={t("")}
                width="18"
                height="18"
              />
              <span>{t("Facebook")}</span>
            </SiteLink>
          </div>
        </div>
        <div className="m-footer__bottom">
          <button
            type="button"
            className="m-footer__top js-top"
            aria-label={t("العودة إلى الأعلى")}
          >
            <img
              src="/assets/img/icon-chev-d-24.svg"
              alt={t("")}
              width="24"
              height="24"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
function ProgramsMobile() {
  return (
    <div className="page page--mobile" id="mobile">
      <ProgramsMobileSection2 />
      <ProgramsMobileSection5 />
      <ProgramsMobileSection8 />
    </div>
  );
}
export default function Programs() {
  const { t } = useLocale();
  return (
    <>
      <ProgramsDesktop />
      <ProgramsMobile />
      <MobileNavigation className="m-nav" aria-label={t("القائمة الرئيسية")}>
        <SiteLink href="#" className="m-nav__item m-nav__item--wide">
          <img
            src="/assets/img/icon-trophy.svg"
            alt={t("")}
            className="m-nav__trophy"
          />
          <span>{t("مسابقة النقاط")}</span>
        </SiteLink>
        <SiteLink href="contact.html" className="m-nav__item">
          <img src="/assets/img/icon-phone.svg" alt={t("")} />
          <span>{t("اتصل بنا")}</span>
        </SiteLink>
        <SiteLink
          href="programs.html"
          className="m-nav__item is-active"
          aria-current="page"
        >
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
