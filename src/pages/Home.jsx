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
function HomeDesktopSection1() {
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
          <SiteLink href="programs.html">{t("البرامج")}</SiteLink>
          <SiteLink href="#d-features">{t("المميزات")}</SiteLink>
          <SiteLink href="#d-home" className="is-active" aria-current="page">
            {t("الرئيسية")}
            <i></i>
          </SiteLink>
        </nav>
        <SiteLink
          href="#d-home"
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
function HomeDesktopSection4() {
  const { t } = useLocale();
  return (
    <section className="sec d-hero" id="d-home" aria-label={t("الرئيسية")}>
      <div className="a d-hero__backdrop" aria-hidden="true">
        <img className="cover" src="/assets/img/manuscript.jpg" alt={t("")} />
      </div>
      <div className="a d-hero__tint" aria-hidden="true"></div>
      <div className="a d-hero__scrim-b" aria-hidden="true"></div>
      <div className="a d-hero__scrim-t" aria-hidden="true"></div>
      <div className="d-hero__stage">
        <figure
          className="a d-hero__photo"
          style={{ "--x": "233", "--y": "178", "--w": "200", "--h": "310" }}
        >
          <img
            className="cover"
            src="/assets/img/yarmouk.jpg"
            alt={t("منظر طبيعي لمنطقة اليرموك")}
          />
        </figure>
        <figure
          className="a d-hero__photo"
          style={{ "--x": "887", "--y": "127", "--w": "316", "--h": "450" }}
        >
          <img
            className="cover"
            src="/assets/img/irbid.jpg"
            alt={t("برج الساعة في إربد")}
          />
        </figure>
        <figure
          className="a d-hero__photo"
          style={{ "--x": "417", "--y": "249", "--w": "500", "--h": "310" }}
        >
          <img
            className="cover"
            src="/assets/img/manuscript.jpg"
            alt={t("مخطوطة عربية وكوب شاي")}
          />
        </figure>
        <div className="a d-hero__flag" aria-hidden="true">
          <img src="/assets/img/hero-jordan-flag.webp" alt={t("")} />
        </div>
        <div className="a d-hero__img2" aria-hidden="true">
          <img src="/assets/img/hero-image2.webp" alt={t("")} />
        </div>
        <img
          className="a d-hero__img1"
          src="/assets/img/hero-image1.webp"
          alt={t("")}
          aria-hidden="true"
        />
        <div className="a d-hero__rail" aria-hidden="true"></div>
        <div
          className="a d-hero__rail d-hero__rail--active"
          aria-hidden="true"
        ></div>
        <p className="a d-hero__line2 w6 tr">{t("ونعيش الثقافة الاردنية")}</p>
        <div className="a d-hero__intro tr">
          <p>
            {t(
              "نحن فخورون بتقديم أفضل مخيم لغوي للطلاب من جميع الأعمار والمستويات. مخيمنا فريد من نوعه لأنه يجمع بين التعليم والترفيه بطريقة ممتعة وتفاعلية.",
            )}
          </p>
          <p>
            {t(
              "إذا كنت تبحث عن مخيم لغوي يوفر لك تجربة تعليمية غنية وممتعة، فإن مخيمنا هو الخيار الأمثل لك.",
            )}
          </p>
          <p>
            {t(
              "تذكر أن تعلم اللغة العربية هو استثمار في مستقبلك. ستفتح لك اللغة العربية فرصًا جديدة في التعليم والعمل والترفيه.",
            )}
          </p>
        </div>
        <p className="a d-hero__emph w5 tr">
          {t("كن مستعدًا لتجربة أشياء جديدة.")}
        </p>
        <SiteLink
          className="a btn btn--primary d-hero__cta"
          href="tel:+905347308092"
        >
          {t("الاتصال بنا الان")}
        </SiteLink>
        <span className="a d-caption" style={{ "--x": "1186", "--y": "360" }}>
          {t("إربد")}
        </span>
        <span className="a d-caption" style={{ "--x": "180", "--y": "443" }}>
          {t("معركة اليرموك")}
        </span>
        <h1 className="a d-hero__line1 w6 tr">
          {t("معا نتعلم اللغة")}
          <span className="sr-only">{t(" ونعيش الثقافة الاردنية")}</span>
        </h1>
      </div>
    </section>
  );
}
function HomeDesktopSection7() {
  const { t } = useLocale();
  return (
    <div className="band band--d-listen">
      <section className="sec d-listen" aria-labelledby="d-listen-title">
        <div className="a d-listen__surface" aria-hidden="true"></div>
        <button
          type="button"
          className="a d-listen__video js-video"
          data-yt="AoOTpDCN2tM"
          aria-label={t("تشغيل فيديو: المشرف العام وهو يشرح البرنامج")}
        >
          <span className="a d-listen__poster"></span>
          <img
            src="/assets/img/d-video-supervisor.svg"
            alt={t("")}
            width="1016"
            height="676"
          />
        </button>
        <div className="a d-listen__head tr w6">
          <h2 id="d-listen-title" className="d-listen__title">
            {t("استمع وشاهد")}
          </h2>
          <p className="d-listen__sub">
            {t("المشرف العام")}
            <br />
            {t("وهو يشرح البرنامج")}
            <br />
            {t("بكل بساطة")}
          </p>
        </div>
        <div className="a d-listen__hairline" aria-hidden="true"></div>
      </section>
    </div>
  );
}
function HomeDesktopSection10() {
  const { t } = useLocale();
  return (
    <div className="band band--d-academy">
      <section className="sec d-academy" aria-labelledby="d-academy-title">
        <figure className="a d-academy__photo">
          <img
            className="cover"
            src="/assets/img/yarmouk.jpg"
            alt={t("منظر طبيعي لمنطقة اليرموك")}
          />
        </figure>
        <p className="a d-academy__year w3" aria-hidden="true">
          {t("2009")}
        </p>
        <div className="a d-academy__col">
          <h2 id="d-academy-title" className="d-academy__title w6 tr">
            {t("معا نتعلم اللغة ونعيش الثقافة الاردنية")}
          </h2>
          <p className="d-academy__text tr">
            {t("إن أكاديمية إسطنبول التي تأسست عام ")}
            <strong className="w6">{t("2009")}</strong>
            {t(
              " والتي تعتبر أكبر مركز في مجال تعليم اللغة العربية والتركية للأجانب قد سجلت حتى اليوم نجاحات باهرة في التدريب والتعليم داخل مبناها من جهة وفيما تقدمه من خدمات للمؤسسات الأخرى من جهة ثانية.",
            )}
          </p>
          <SiteLink
            className="d-academy__link"
            href="programs.html"
            aria-label={t("اقرأ المزيد عن البرنامج")}
          >
            <img
              src="/assets/img/icon-arrow-f.svg"
              alt={t("")}
              width="32"
              height="32"
            />
            <span className="d-academy__rule"></span>
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection13() {
  const { t } = useLocale();
  return (
    <div className="band band--d-features">
      <section
        className="sec d-features"
        id="d-features"
        aria-label={t("المميزات")}
      >
        <div className="d-features__row" style={{ height: "560px" }}>
          <article
            className="a fcard fcard--light"
            style={{
              left: "714px",
              top: "0px",
              width: "486px",
              height: "560px",
            }}
          >
            <div className="fvis fvis--photo">
              <img
                className="cover"
                src="/assets/img/irbid.jpg"
                alt={t("برج الساعة في إربد")}
              />
              <span className="fill fscrim"></span>
              <span
                className="a fglass fglass--glass"
                style={{
                  right: "16px",
                  bottom: "16px",
                  width: "69px",
                  height: "69px",
                  borderRadius: "19px",
                }}
              >
                <img
                  src="/assets/img/f-icon-pin-w.svg"
                  alt={t("")}
                  style={{ width: "32px", height: "32px" }}
                />
              </span>
              <span className="a fchip fchip--ink">{t("01")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h3">
                {t(
                  "الرحلات مدروسة متناغمة مع الدروس الصباحية وليست منفصلة عنها",
                )}
              </h3>
              <div className="ftext ftext--reg">
                <p>
                  {t(
                    "بمعنى أن الرحلة ليست بهدف الزيارة وإنما بهدف ممارسة ما تعلمه الطالب صباحا، لذلك الرحلة المسائية تكون متعلقا بشكل مباشر أو غير مباشر بالدروس الصباحية، ضمن برنامج معد مسبقا.",
                  )}
                </p>
                <p>
                  {t(
                    "كل رحلة غير مرتبطة بمادة علمية لغوية هي رحلة للمتعة فقط وخارجة عن إطار هدفنا",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light"
            style={{
              left: "306px",
              top: "0px",
              width: "384px",
              height: "560px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(136.92deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <span
                className="a favatar"
                style={{
                  left: "56.5px",
                  top: "101.02px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#d73a48 0%,#471616 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "111.5px",
                  top: "101.02px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#c9a46a 0%,#6e6557 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "166.5px",
                  top: "101.02px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#a8242d 0%,#2c0e0e 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "221.5px",
                  top: "101.02px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#b8ae9c 0%,#4f4840 72.464%)",
                }}
              ></span>
              <span
                className="a fglass fglass--light"
                style={{
                  left: "271px",
                  top: "248px",
                  width: "67px",
                  height: "67px",
                  borderRadius: "19px",
                }}
              >
                <img
                  src="/assets/img/f-users-red.svg"
                  alt={t("")}
                  style={{ width: "31px", height: "31px" }}
                />
              </span>
              <span className="a fchip">{t("02")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t(
                  "الكادر التعليمي هم في الأصل أصحاب رسالة ويرغبون بتعليم العربية لغة القرآن الكريم",
                )}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "المعلم هو ركيزة العمل في المؤسسات التعليمية؛ لذلك فنحن نبحث عن معلمين يحملون لواء العلم والتعليم كرسالة وليس كمهنة فقط.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light"
            style={{ left: "0px", top: "0px", width: "282px", height: "560px" }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(137.49deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <img
                className="a"
                src="/assets/img/f-ring-l1.svg"
                alt={t("")}
                style={{
                  left: "65.94px",
                  top: "55.44px",
                  width: "120.12px",
                  height: "120.12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-l2.svg"
                alt={t("")}
                style={{
                  left: "35.91px",
                  top: "25.41px",
                  width: "180.18px",
                  height: "180.18px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-l3.svg"
                alt={t("")}
                style={{
                  left: "5.88px",
                  top: "-4.62px",
                  width: "240.24px",
                  height: "240.24px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-l4.svg"
                alt={t("")}
                style={{
                  left: "-24.15px",
                  top: "-34.65px",
                  width: "300.3px",
                  height: "300.3px",
                }}
              />
              <span
                className="a fglass fglass--light"
                style={{
                  left: "86.5px",
                  top: "76px",
                  width: "79px",
                  height: "79px",
                  borderRadius: "22px",
                }}
              >
                <img
                  src="/assets/img/f-users-red36.svg"
                  alt={t("")}
                  style={{ width: "36px", height: "36px" }}
                />
              </span>
              <span className="a fchip">{t("03")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("كادر تدريسي عنده روح عالية ويقدم أفضل ما عنده؛")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "نحن نؤمن بأن كل معلم ممكن أن يكون ناجح أو العكس؛ وهذا باعتبار البيئة التي يعمل بها المعلم. فاختيار المعلم الناجح وتهيئة البيئة المريحة له تجعله يبدع في عمله ويعمل بحب وهذا هو مفتاح نجاح كل المؤسسات.",
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className="d-features__row" style={{ height: "576px" }}>
          <article
            className="a fcard fcard--dark"
            style={{
              left: "918px",
              top: "0px",
              width: "282px",
              height: "576px",
            }}
          >
            <div className="fvis fvis--dark">
              <img
                className="a"
                src="/assets/img/f-ring-d1.svg"
                alt={t("")}
                style={{
                  left: "59.96px",
                  top: "72.46px",
                  width: "132.08px",
                  height: "132.08px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d2.svg"
                alt={t("")}
                style={{
                  left: "26.94px",
                  top: "39.44px",
                  width: "198.12px",
                  height: "198.12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d3.svg"
                alt={t("")}
                style={{
                  left: "-6.08px",
                  top: "6.42px",
                  width: "264.16px",
                  height: "264.16px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d4.svg"
                alt={t("")}
                style={{
                  left: "-39.1px",
                  top: "-26.6px",
                  width: "330.2px",
                  height: "330.2px",
                }}
              />
              <span
                className="a fglass fglass--glass"
                style={{
                  left: "83px",
                  top: "95.5px",
                  width: "86px",
                  height: "86px",
                  borderRadius: "24px",
                }}
              >
                <img
                  src="/assets/img/f-check-w.svg"
                  alt={t("")}
                  style={{ width: "40px", height: "40px" }}
                />
              </span>
              <span className="a fchip fchip--on-dark">{t("04")}</span>
              <SiteLink
                href="#"
                className="a farrow farrow--on-dark"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("الطالب في حال نشاط من بداية المخيم لنهايته")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "عندما نقوم ببرنامج يتماشى مع الهدف الذي جاء من أجله الطالب وتكون البرامج والخطط متناغمة فإن الطالب يشعر بسعادة كبيرة عند إنتاجه للغة جديدة وتحصيله المستمر الذي يجعله في حال نشاط دائم.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light fcard--h"
            style={{
              left: "408px",
              top: "0px",
              width: "486px",
              height: "276px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(127.68deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <img
                className="a"
                src="/assets/img/f-ring-s1.svg"
                alt={t("")}
                style={{
                  left: "45.6px",
                  top: "73.6px",
                  width: "98.8px",
                  height: "98.8px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-s2.svg"
                alt={t("")}
                style={{
                  left: "20.9px",
                  top: "48.9px",
                  width: "148.2px",
                  height: "148.2px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-s3.svg"
                alt={t("")}
                style={{
                  left: "-3.8px",
                  top: "24.2px",
                  width: "197.6px",
                  height: "197.6px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-s4.svg"
                alt={t("")}
                style={{
                  left: "-28.5px",
                  top: "-0.5px",
                  width: "247px",
                  height: "247px",
                }}
              />
              <span
                className="a fglass fglass--light"
                style={{
                  left: "62.5px",
                  top: "90.5px",
                  width: "65px",
                  height: "65px",
                  borderRadius: "18px",
                }}
              >
                <img
                  src="/assets/img/f-clock-red.svg"
                  alt={t("")}
                  style={{ width: "30px", height: "30px" }}
                />
              </span>
              <span className="a fchip">{t("05")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("الانتهاء من مستوى لغوي متكامل في مدة وجيزة.")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "هدفنا من إجراء مخيم لغوي في الأردن هو هدف لغوي بالدرجة الأولى؛ لذلك التركيز على الإنتاج اللغوي والتعلم وكسر حاجز اللغة، يكون قبل التفكير في الترفيه أو غيره مع الاهتمام به.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light fcard--h"
            style={{
              left: "408px",
              top: "300px",
              width: "486px",
              height: "276px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(127.68deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <img
                className="a"
                src="/assets/img/f-path-s.svg"
                alt={t("")}
                style={{
                  left: "22.8px",
                  top: "180.04px",
                  width: "144.4px",
                  height: "2px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step1.svg"
                alt={t("")}
                style={{
                  left: "159.2px",
                  top: "174.04px",
                  width: "16px",
                  height: "16px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "113.07px",
                  top: "176.04px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "64.93px",
                  top: "176.04px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "16.8px",
                  top: "176.04px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <span
                className="a fglass fglass--light"
                style={{
                  left: "62.5px",
                  top: "51.14px",
                  width: "65px",
                  height: "65px",
                  borderRadius: "18px",
                }}
              >
                <img
                  src="/assets/img/f-globe-red.svg"
                  alt={t("")}
                  style={{ width: "30px", height: "30px" }}
                />
              </span>
              <span className="a fchip">{t("06")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("محادثة مع المعلمين والمشرفين قبل زيارة الأردن عبر النت.")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "نستفيد من هذا الأمر في كسر حاجز الخوف والرهبة من الطالب قبل زيارة الأردن، أو الإجابة على جميع تساؤلاته قبل الوصول.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light"
            style={{ left: "0px", top: "0px", width: "384px", height: "576px" }}
          >
            <div className="fvis fvis--photo">
              <img
                className="cover"
                src="/assets/img/manuscript.jpg"
                alt={t("مخطوطة عربية وكوب شاي")}
              />
              <span className="fill fscrim"></span>
              <span
                className="a fglass fglass--glass"
                style={{
                  right: "16px",
                  bottom: "16px",
                  width: "96px",
                  height: "96px",
                  borderRadius: "27px",
                }}
              >
                <img
                  src="/assets/img/f-book-w.svg"
                  alt={t("")}
                  style={{ width: "44px", height: "44px" }}
                />
              </span>
              <span className="a fchip fchip--ink">{t("07")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("دورات وورشات عمل مستمرة من الأكاديمية للكادر التعليمي.")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "رأس المال البشري هو أهم نقطة في المؤسسات لذلك نسعى وبشكل دائم لتطوير والنهوض بالقدرات التي معنا.",
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className="d-features__row" style={{ height: "560px" }}>
          <article
            className="a fcard fcard--light"
            style={{
              left: "714px",
              top: "0px",
              width: "486px",
              height: "560px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(141.71deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <span className="a fgrid-v" style={{ left: "65.14px" }}></span>
              <span className="a fgrid-v" style={{ left: "130.29px" }}></span>
              <span className="a fgrid-v" style={{ left: "195.43px" }}></span>
              <span className="a fgrid-v" style={{ left: "260.57px" }}></span>
              <span className="a fgrid-v" style={{ left: "325.71px" }}></span>
              <span className="a fgrid-v" style={{ left: "390.86px" }}></span>
              <span className="a fgrid-h" style={{ top: "72px" }}></span>
              <span className="a fgrid-h" style={{ top: "144px" }}></span>
              <span className="a fgrid-h" style={{ top: "216px" }}></span>
              <span className="a fgrid-h" style={{ top: "288px" }}></span>
              <span
                className="a fglass fglass--light"
                style={{
                  left: "180px",
                  top: "132px",
                  width: "96px",
                  height: "96px",
                  borderRadius: "27px",
                }}
              >
                <img
                  src="/assets/img/f-cal-red.svg"
                  alt={t("")}
                  style={{ width: "44px", height: "44px" }}
                />
              </span>
              <span className="a fchip">{t("08")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h3">
                {t("برنامجنا مرن ويماشي جميع الأعمار والمستويات.")}
              </h3>
              <div className="ftext ftext--reg">
                <p>
                  {t(
                    "تم إعداد البرنامج من قبل أساتذة لهم باع طويل في هذا المجال مما يجعل المرونة أمر بسيط بالنسبة لهم.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--dark"
            style={{
              left: "408px",
              top: "0px",
              width: "282px",
              height: "560px",
            }}
          >
            <div className="fvis fvis--dark">
              <img
                className="a"
                src="/assets/img/f-ring-d1.svg"
                alt={t("")}
                style={{
                  left: "59.96px",
                  top: "74.46px",
                  width: "132.08px",
                  height: "132.08px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d2.svg"
                alt={t("")}
                style={{
                  left: "26.94px",
                  top: "41.44px",
                  width: "198.12px",
                  height: "198.12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d3.svg"
                alt={t("")}
                style={{
                  left: "-6.08px",
                  top: "8.42px",
                  width: "264.16px",
                  height: "264.16px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-ring-d4.svg"
                alt={t("")}
                style={{
                  left: "-39.1px",
                  top: "-24.6px",
                  width: "330.2px",
                  height: "330.2px",
                }}
              />
              <span
                className="a fglass fglass--glass"
                style={{
                  left: "83px",
                  top: "97.5px",
                  width: "86px",
                  height: "86px",
                  borderRadius: "24px",
                }}
              >
                <img
                  src="/assets/img/f-clock-w.svg"
                  alt={t("")}
                  style={{ width: "40px", height: "40px" }}
                />
              </span>
              <span className="a fchip fchip--on-dark">{t("09")}</span>
              <SiteLink
                href="#"
                className="a farrow farrow--on-dark"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("البرنامج مكثف من قبل الفطور حتى الساعة العاشرة مساء")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "لا يكون غمسا لغويا بدون تعرض الطالب لوقت طويل للغة؛ وباعتبار الفترة التي نزور فيها الأردن مؤقتة لذلك نسعى للاستفادة من كل دقيقة في الأردن.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--brand"
            style={{ left: "0px", top: "0px", width: "384px", height: "560px" }}
          >
            <div className="fvis fvis--brand">
              <span
                className="a favatar"
                style={{
                  left: "57.5px",
                  top: "89.26px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#d73a48 0%,#471616 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "112.5px",
                  top: "89.26px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#c9a46a 0%,#6e6557 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "167.5px",
                  top: "89.26px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#a8242d 0%,#2c0e0e 72.464%)",
                }}
              ></span>
              <span
                className="a favatar"
                style={{
                  left: "222.5px",
                  top: "89.26px",
                  backgroundImage:
                    "linear-gradient(146.47deg,#b8ae9c 0%,#4f4840 72.464%)",
                }}
              ></span>
              <span
                className="a fglass fglass--glass"
                style={{
                  left: "273px",
                  top: "220px",
                  width: "67px",
                  height: "67px",
                  borderRadius: "19px",
                }}
              >
                <img
                  src="/assets/img/f-users-w.svg"
                  alt={t("")}
                  style={{ width: "31px", height: "31px" }}
                />
              </span>
              <span className="a fchip fchip--on-dark">{t("10")}</span>
              <SiteLink
                href="#"
                className="a farrow farrow--on-dark"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t(
                  "المشرف العام للمخيم هو في الأصل معلم لغة للناطقين بغير العربية ويعرف أدق التفاصيل المطلوبة.",
                )}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "عندما تعمل في المجال الذي أنت متخصص فيه؛ أنتظر منك الإبداع، وعندما تعمل في مجال غير مجالك أنتظر منك تنفيذ مهام وفقط.",
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className="d-features__row" style={{ height: "520px" }}>
          <article
            className="a fcard fcard--light"
            style={{
              left: "816px",
              top: "0px",
              width: "384px",
              height: "520px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(141.06deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <img
                className="a"
                src="/assets/img/f-path-l.svg"
                alt={t("")}
                style={{
                  left: "42.48px",
                  top: "209.64px",
                  width: "269.04px",
                  height: "2px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step1.svg"
                alt={t("")}
                style={{
                  left: "303.52px",
                  top: "203.64px",
                  width: "16px",
                  height: "16px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "215.84px",
                  top: "205.64px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "126.16px",
                  top: "205.64px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <img
                className="a"
                src="/assets/img/f-step2.svg"
                alt={t("")}
                style={{
                  left: "36.48px",
                  top: "205.64px",
                  width: "12px",
                  height: "12px",
                }}
              />
              <span
                className="a fglass fglass--light"
                style={{
                  left: "129px",
                  top: "49.24px",
                  width: "96px",
                  height: "96px",
                  borderRadius: "27px",
                }}
              >
                <img
                  src="/assets/img/f-check-red.svg"
                  alt={t("")}
                  style={{ width: "44px", height: "44px" }}
                />
              </span>
              <span className="a fchip">{t("11")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t(
                  "متابعة الطالب خطوة بخطوة وبالوقت نفسه الطالب يتابع نفسه ويرى تقدمه على أقرانه أو عكس ذلك أول بأول",
                )}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "المنافسة هي النقطة التي تزيد الفاعلية والهمة عند الطالب وتجعله يسعى للتفوق.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light"
            style={{
              left: "510px",
              top: "0px",
              width: "282px",
              height: "520px",
            }}
          >
            <div
              className="fvis"
              style={{
                backgroundImage:
                  "linear-gradient(139.4deg,#f8eeee 0%,#f1e9df 71.429%)",
              }}
            >
              <span
                className="a flayer"
                style={{
                  left: "50.04px",
                  top: "58px",
                  background: "rgba(142, 44, 44,0.08)",
                }}
              ></span>
              <span
                className="a flayer"
                style={{
                  left: "68.04px",
                  top: "44px",
                  background: "rgba(142, 44, 44,0.13)",
                }}
              ></span>
              <span
                className="a flayer"
                style={{
                  left: "86.04px",
                  top: "30px",
                  background: "rgba(142, 44, 44,0.18)",
                }}
              ></span>
              <span
                className="a fglass fglass--light"
                style={{
                  left: "89.5px",
                  top: "71.5px",
                  width: "73px",
                  height: "73px",
                  borderRadius: "20px",
                }}
              >
                <img
                  src="/assets/img/f-book-red.svg"
                  alt={t("")}
                  style={{ width: "34px", height: "34px" }}
                />
              </span>
              <span className="a fchip">{t("12")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h4">
                {t("لنا منهاج خاص بنا ولا نقوم بتقليد أي سلسلة لغوية.")}
              </h3>
              <div className="ftext ftext--sm">
                <p>
                  {t(
                    "تصب أكاديمية اللغات كل خبراتها في الدعم اللغوي للطالب، والمناهج والمفردات الخاصة بالأكاديمية لخدمة اللغة العربية غنية عن التعريف وأشهرها كتاب مفتاح العربية.",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article
            className="a fcard fcard--light"
            style={{ left: "0px", top: "0px", width: "486px", height: "520px" }}
          >
            <div className="fvis fvis--photo">
              <img
                className="cover"
                src="/assets/img/yarmouk.jpg"
                alt={t("منظر طبيعي في الأردن")}
              />
              <span className="fill fscrim"></span>
              <span
                className="a fglass fglass--glass"
                style={{
                  right: "16px",
                  bottom: "16px",
                  width: "75px",
                  height: "75px",
                  borderRadius: "21px",
                }}
              >
                <img
                  src="/assets/img/f-pin-w35.svg"
                  alt={t("")}
                  style={{ width: "35px", height: "35px" }}
                />
              </span>
              <span className="a fchip fchip--ink">{t("13")}</span>
              <SiteLink href="#" className="a farrow" aria-label={t("المزيد")}>
                <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
              </SiteLink>
            </div>
            <div className="fbody">
              <h3 className="ftitle ftitle--h3">
                {t(
                  "جعل الطالب يزور عائلة أردنية ليوم كامل من الصباح للمساء لوحده في نهاية المخيم.",
                )}
              </h3>
              <div className="ftext ftext--reg">
                <p>
                  {t(
                    "إيمانا منا بأخوة الإيمان مع اختلاف اللغات؛ نسعى لتوثيق هذه الأخوة من خلال إستضافة عائلة أردنية موثوقة لدينا لطالب لمدة يوم واحد. يجد نفسه مجبرا على ممارسة اللغة لوحده مع عائلة عربية.(غير إلزامي)",
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection16() {
  const { t } = useLocale();
  return (
    <div className="band band--d-cta1">
      <section className="sec d-cta1">
        <SiteLink className="d-cta1__link" href="#d-register">
          <span className="a d-cta1__text w6">{t("سجل الان")}</span>
          <span className="a d-cta1__btn" aria-hidden="true">
            <img
              src="/assets/img/icon-arrow-f-64.svg"
              alt={t("")}
              width="64"
              height="64"
            />
          </span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeDesktopSection19() {
  const { t } = useLocale();
  return (
    <div className="band band--d-program">
      <FeaturedPrograms />
    </div>
  );
}
function HomeDesktopSection22() {
  const { t } = useLocale();
  return (
    <div className="band band--d-adv">
      <section className="sec d-adv" aria-labelledby="d-adv-title">
        <figure className="a d-adv__overlap">
          <img
            className="cover"
            src="/assets/img/yarmouk.jpg"
            alt={t("منظر طبيعي لمنطقة اليرموك")}
          />
        </figure>
        <h2 id="d-adv-title" className="a d-adv__title w6 tr">
          {t("اكتشف عالم المغامرات والتحدي في الاردن")}
        </h2>
        <Track
          className="a d-adv__track swipe-x js-track"
          id="d-adv-track"
          tabIndex="0"
          aria-label={t("وجهات الرحلات")}
          as="div"
        >
          <div className="d-adv__rail">
            <article className="a dest" style={{ right: "120px" }}>
              <img
                className="cover"
                src="/assets/img/irbid.jpg"
                alt={t("إربد")}
                loading="lazy"
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("01")}</span>
                  <h3 className="dest__name w5">{t("إربد")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="8HLZ1SXBIxU"
                  aria-label={t("تشغيل فيديو إربد")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "474px" }}>
              <img
                className="cover"
                src="/assets/img/yarmouk.jpg"
                alt={t("معركة اليرموك")}
                loading="lazy"
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("02")}</span>
                  <h3 className="dest__name w5">{t("معركة اليرموك")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="mJPPGJhMBHs"
                  aria-label={t("تشغيل فيديو معركة اليرموك")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "828px" }}>
              <img
                className="cover"
                src="/assets/img/jerash.jpg"
                alt={t("جرش علجون")}
                loading="lazy"
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("03")}</span>
                  <h3 className="dest__name w5">{t("جرش علجون")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="QJCdWPgF6e8"
                  aria-label={t("تشغيل فيديو جرش علجون")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "1182px" }}>
              <img
                className="cover"
                src="/assets/img/salt.jpg"
                alt={t("السلط")}
                loading="lazy"
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("04")}</span>
                  <h3 className="dest__name w5">{t("السلط")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="DZecz5uDfVA"
                  aria-label={t("تشغيل فيديو السلط")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "1536px" }}>
              <img
                className="cover"
                src="/assets/img/dead-sea.jpg"
                alt={t("مؤتة و البحر الميت")}
                loading="lazy"
                style={{ objectPosition: "center 45%" }}
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("05")}</span>
                  <h3 className="dest__name w5">{t("مؤتة و البحر الميت")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="HIk8-CUCvgw"
                  aria-label={t("تشغيل فيديو مؤتة و البحر الميت")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "1890px" }}>
              <img
                className="cover"
                src="/assets/img/petra-treasury.jpg"
                alt={t("البتراء")}
                loading="lazy"
                style={{ objectPosition: "58% center" }}
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("06")}</span>
                  <h3 className="dest__name w5">{t("البتراء")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="z67tBYnJTkg"
                  aria-label={t("تشغيل فيديو البتراء")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <article className="a dest" style={{ right: "2244px" }}>
              <img
                className="cover"
                src="/assets/img/wadi-rum.jpg"
                alt={t("العقبة و وادي رم")}
                loading="lazy"
                style={{ objectPosition: "35% center" }}
              />
              <span className="a dest__panel"></span>
              <div className="a dest__content">
                <div className="dest__row">
                  <span className="dest__pill">{t("07")}</span>
                  <h3 className="dest__name w5">{t("العقبة و وادي رم")}</h3>
                </div>
                <button
                  type="button"
                  className="dest__play js-yt"
                  data-yt="2X6HCP7nCMs"
                  aria-label={t("تشغيل فيديو العقبة و وادي رم")}
                >
                  <img
                    src="/assets/img/icon-play-red.svg"
                    alt={t("")}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </article>
            <span className="a d-adv__route"></span>
            <img
              className="a"
              src="/assets/img/adv-node1.svg"
              alt={t("")}
              style={{
                right: "276px",
                top: "521px",
                width: "18px",
                height: "18px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "633px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "987px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "1341px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "1695px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "2049px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
            <img
              className="a"
              src="/assets/img/adv-node2.svg"
              alt={t("")}
              style={{
                right: "2403px",
                top: "524px",
                width: "12px",
                height: "12px",
              }}
            />
          </div>
        </Track>
        <div className="a d-adv__nav">
          <button
            type="button"
            className="d-roundbtn js-track-next"
            data-track="d-adv-track"
            aria-label={t("التالي")}
          >
            <img
              src="/assets/img/icon-chev-f-w.svg"
              alt={t("")}
              width="24"
              height="24"
            />
          </button>
          <button
            type="button"
            className="d-roundbtn js-track-prev"
            data-track="d-adv-track"
            aria-label={t("السابق")}
          >
            <img
              src="/assets/img/icon-chev-b-w.svg"
              alt={t("")}
              width="24"
              height="24"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection25() {
  const { t } = useLocale();
  return (
    <div className="band band--d-articles">
      <ContentSection kind="articles" home />
    </div>
  );
}
function HomeDesktopSection28() {
  const { t } = useLocale();
  return (
    <div className="band band--d-companions">
      <section className="sec d-companions" aria-labelledby="d-comp-title">
        <h2 id="d-comp-title" className="a d-companions__title w6 tr">
          {t("رفقاء مخيمات اللغة العربية في الاردن")}
        </h2>
        <figure
          className="a d-comp"
          style={{
            left: "1020px",
            top: "330px",
            width: "300px",
            height: "430px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/companion-1.jpg"
            alt={t("")}
            loading="lazy"
          />
          <span className="a d-comp__scrim" style={{ top: "290px" }}></span>
          <figcaption
            className="a d-comp__name w5 tr"
            style={{ top: "375px", width: "260px" }}
          >
            {t("نوراي")}
          </figcaption>
        </figure>
        <figure
          className="a d-comp"
          style={{
            left: "810px",
            top: "440px",
            width: "240px",
            height: "330px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/companion-2.jpg"
            alt={t("")}
            loading="lazy"
          />
          <span className="a d-comp__scrim" style={{ top: "190px" }}></span>
          <figcaption
            className="a d-comp__name w5 tr"
            style={{ top: "275px", width: "200px" }}
          >
            {t("نجلاء اولمز")}
          </figcaption>
        </figure>
        <figure
          className="a d-comp"
          style={{
            left: "560px",
            top: "320px",
            width: "280px",
            height: "390px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/companion-3.jpg"
            alt={t("")}
            loading="lazy"
          />
          <span className="a d-comp__scrim" style={{ top: "250px" }}></span>
          <figcaption
            className="a d-comp__name w5 tr"
            style={{ top: "335px", width: "240px" }}
          >
            {t("مليحه أوزدامير")}
          </figcaption>
        </figure>
        <figure
          className="a d-comp"
          style={{
            left: "360px",
            top: "470px",
            width: "230px",
            height: "310px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/companion-4.jpg"
            alt={t("")}
            loading="lazy"
          />
          <span className="a d-comp__scrim" style={{ top: "170px" }}></span>
          <figcaption
            className="a d-comp__name w5 tr"
            style={{ top: "255px", width: "190px" }}
          >
            {t("مدينة جاكر")}
          </figcaption>
        </figure>
        <figure
          className="a d-comp"
          style={{
            left: "130px",
            top: "380px",
            width: "260px",
            height: "360px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/companion-5.jpg"
            alt={t("")}
            loading="lazy"
          />
          <span className="a d-comp__scrim" style={{ top: "220px" }}></span>
          <figcaption
            className="a d-comp__name w5 tr"
            style={{ top: "305px", width: "220px" }}
          >
            {t("الاء الشريف")}
          </figcaption>
        </figure>
        <SiteLink
          className="a d-news__more d-more--light"
          style={{ left: "120px", top: "840px" }}
          href="#"
        >
          <img
            src="/assets/img/icon-chev-f-cream.svg"
            alt={t("")}
            width="24"
            height="24"
          />
          <span>{t("المزيد")}</span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeDesktopSection31() {
  const { t } = useLocale();
  return (
    <div className="band band--d-book">
      <section className="sec d-book" aria-labelledby="d-book-title">
        <div className="a d-book__desk" aria-hidden="true"></div>
        <img
          className="a d-book__cover"
          src="/assets/img/book-cover.webp"
          alt={t("غلاف كتاب دليل السياحة التعليمية")}
          loading="lazy"
        />
        <div className="a d-book__col">
          <SiteLink className="d-book__link" href="#">
            <img
              src="/assets/img/icon-arrow-f-28.svg"
              alt={t("")}
              width="28"
              height="28"
            />
            <span>{t("انقر هنا لقراءة الكتاب")}</span>
          </SiteLink>
          <h2 id="d-book-title" className="d-book__title w6 tr">
            {t("كتابنا الذي صنعناه كدليل لرحلاتنا في الاردن")}
          </h2>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection34() {
  const { t } = useLocale();
  return (
    <div className="band band--d-pull">
      <section className="sec d-pull" aria-labelledby="d-pull-title">
        <div className="a d-pull__col tr">
          <h2 id="d-pull-title" className="d-pull__h w5">
            {t("معا نتعلم اللغة ونعيش الثقافة الاردنية")}
          </h2>
          <p className="d-pull__p">
            {t(
              "تعلم اللغة العربية والثقافة العربية أمران ممتعان ومفيدان, نحن سعداء لمساعدتك في هذه الرحلة.",
            )}
          </p>
        </div>
        <div className="a d-pull__rule" aria-hidden="true"></div>
        <blockquote className="a d-pull__quote w6 tr">
          {t("أنا متحمس للبدء في هذه الرحلة معك!")}
        </blockquote>
      </section>
    </div>
  );
}
function HomeDesktopSection37() {
  const { t } = useLocale();
  return (
    <div className="band band--d-support">
      <section className="sec d-support" aria-labelledby="d-support-title">
        <div className="a d-support__head">
          <h2 id="d-support-title" className="d-support__title w6 tr">
            {t("لا نكل ولا نمل في الدعم العلمي والفني والاستراتيجي")}
          </h2>
          <SiteLink className="btn btn--primary" href="#d-register">
            {t("سجل الان")}
          </SiteLink>
        </div>
        <div className="a d-support__rule" aria-hidden="true"></div>
        <ol className="a d-support__bento">
          <li className="d-support__row">
            <div
              className="sp sp--brand"
              style={{ width: "792px", minHeight: "260px" }}
            >
              <span className="sp__n sp__n--xl w3">{t("1")}</span>
              <p className="sp__t sp__t--h2 w6" style={{ width: "728px" }}>
                {t(
                  "خمسة أيام بالأسبوع … تطبيق خارج البيئة الصفية … إجمالي ساعات الدورة تتجاوز ",
                )}
                <em>{t("200 ساعة")}</em>
                {t(" عمل.")}
              </p>
            </div>
          </li>
          <li className="d-support__row">
            <div
              className="sp sp--deep"
              style={{ minHeight: "240px", alignSelf: "stretch" }}
            >
              <span className="sp__n w3">{t("3")}</span>
              <p className="sp__t sp__t--h3 w5">
                {t("نضمن الانتاجية القصوى للطالب من خلال برنامج يملئ ")}
                <em className="w6">{t("١٤ ساعة")}</em>
                {t(" يوميا من وقت الطالب.")}
              </p>
            </div>
            <div
              className="sp sp--ghost sp--gap"
              style={{ minHeight: "240px" }}
            >
              <span className="sp__n w3">{t("2")}</span>
              <p className="sp__t sp__t--body">
                {t("دروس عملية تطبيقية خارجة عن المألوف.")}
              </p>
            </div>
          </li>
          <li className="d-support__row">
            <div
              className="sp sp--ghost"
              style={{ minHeight: "200px", alignSelf: "stretch" }}
            >
              <span className="sp__n w3">{t("5")}</span>
              <p className="sp__t sp__t--body">
                {t("شراكات لغوية وزيارات عائلية")}
              </p>
            </div>
            <div
              className="sp sp--light"
              style={{ minHeight: "200px", alignSelf: "stretch" }}
            >
              <span className="sp__n w3">{t("4")}</span>
              <p className="sp__t sp__t--body">
                {t("نضمن المتابعة الجادة من خلال نظام إلكتروني متكامل.")}
              </p>
            </div>
          </li>
          <li className="d-support__row">
            <div
              className="sp sp--night"
              style={{ width: "792px", minHeight: "180px" }}
            >
              <span className="sp__n w3">{t("6")}</span>
              <p className="sp__t sp__t--body" style={{ width: "728px" }}>
                {t(
                  "منهاج مميز خاص بنا يراعي جميع المجالات الثقافية، ذا فلسفة خاصة، يستخدم القواعد الوظيفية مزود بموقع شامل.",
                )}
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}
function HomeDesktopSection40() {
  const { t } = useLocale();
  return (
    <div className="band band--d-stats">
      <section className="sec d-stats" aria-labelledby="d-stats-title">
        <h2 id="d-stats-title" className="a d-stats__title w6 tr">
          {t("نجاحنا مستمر بفضلكم")}
        </h2>
        <SiteLink
          className="a btn btn--secondary"
          style={{ left: "1185px", top: "210px" }}
          href="#d-register"
        >
          {t("سجل الان")}
        </SiteLink>
        <div className="a d-stats__main">
          <div className="d-stats__value">
            <span className="d-stats__plus w3">{t("+")}</span>
            <Counter className="d-stats__big w6 js-count" data-to="10321">
              {t("10321")}
            </Counter>
          </div>
          <p className="d-stats__label w6">{t("طالبا")}</p>
          <p className="d-stats__sub">{t("مسجلين لدينا")}</p>
        </div>
        <div className="a d-stats__photo" aria-hidden="true"></div>
        <div className="a d-stats__row">
          <div className="d-stat">
            <Counter className="d-stat__n w6 js-count" data-to="14">
              {t("14")}
            </Counter>
            <p className="d-stat__l w5">{t("رحلة")}</p>
            <p className="d-stat__s">{t("دولية الى الاردن")}</p>
          </div>
          <div className="d-stat">
            <Counter className="d-stat__n w6 js-count" data-to="125">
              {t("125")}
            </Counter>
            <p className="d-stat__l w5">{t("معلم")}</p>
            <p className="d-stat__s">{t("للغة العربية")}</p>
          </div>
          <div className="d-stat">
            <Counter className="d-stat__n w6 js-count" data-to="42">
              {t("42")}
            </Counter>
            <p className="d-stat__l w5">{t("مشاركين")}</p>
            <p className="d-stat__s">{t("من مختلف الدول")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection43() {
  const { t } = useLocale();
  return (
    <div className="band band--d-team">
      <section className="sec d-team" aria-labelledby="d-team-title">
        <img
          className="a"
          src="/assets/img/team-glow.svg"
          alt={t("")}
          style={{
            left: "170px",
            top: "-120px",
            width: "1100px",
            height: "700px",
          }}
        />
        <img
          className="a"
          src="/assets/img/team-arc.svg"
          alt={t("")}
          style={{
            left: "340px",
            top: "-300px",
            width: "760px",
            height: "760px",
          }}
        />
        <h2 id="d-team-title" className="a d-team__title w6 tc">
          {t("فريق العمل")}
        </h2>
        <Track
          className="a d-team__track swipe-x js-track"
          id="d-team-track"
          data-progress="d-team-progress"
          as="div"
        >
          <div className="d-team__rail">
            <div className="tm" aria-label={t("عضو الفريق")}>
              <img
                src="/assets/img/team-member.svg"
                alt={t("")}
                width="250"
                height="400"
              />
            </div>
            <div className="tm tm--active" aria-label={t("عضو الفريق")}>
              <span className="a tm-grid-v" style={{ left: "34.71px" }}></span>
              <span className="a tm-grid-v" style={{ left: "70.43px" }}></span>
              <span className="a tm-grid-v" style={{ left: "106.14px" }}></span>
              <span className="a tm-grid-v" style={{ left: "141.86px" }}></span>
              <span className="a tm-grid-v" style={{ left: "177.57px" }}></span>
              <span className="a tm-grid-v" style={{ left: "213.29px" }}></span>
              <span className="a tm-grid-h" style={{ top: "49px" }}></span>
              <span className="a tm-grid-h" style={{ top: "99px" }}></span>
              <span className="a tm-grid-h" style={{ top: "149px" }}></span>
              <span className="a tm-grid-h" style={{ top: "199px" }}></span>
              <span className="a tm-grid-h" style={{ top: "249px" }}></span>
              <span className="a tm-grid-h" style={{ top: "299px" }}></span>
              <span className="a tm-grid-h" style={{ top: "349px" }}></span>
              <span
                className="a"
                style={{
                  left: "77px",
                  top: "25px",
                  width: "150px",
                  height: "18px",
                  background: "rgba(246, 241, 232,.95)",
                  borderRadius: "4px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "131px",
                  top: "57px",
                  width: "96px",
                  height: "11px",
                  background: "rgba(240, 217, 217,.8)",
                  borderRadius: "4px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "21px",
                  top: "229px",
                  width: "206px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "29px",
                  top: "249px",
                  width: "198px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "23px",
                  top: "269px",
                  width: "204px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "37px",
                  top: "289px",
                  width: "190px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "19px",
                  top: "309px",
                  width: "208px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
              <span
                className="a"
                style={{
                  left: "107px",
                  top: "329px",
                  width: "120px",
                  height: "9px",
                  background: "rgba(246, 241, 232,.8)",
                  borderRadius: "3px",
                }}
              ></span>
            </div>
            <div className="tm" aria-label={t("عضو الفريق")}>
              <img
                src="/assets/img/team-member.svg"
                alt={t("")}
                width="250"
                height="400"
              />
            </div>
            <div className="tm" aria-label={t("عضو الفريق")}>
              <img
                src="/assets/img/team-member.svg"
                alt={t("")}
                width="250"
                height="400"
              />
            </div>
          </div>
        </Track>
        <button
          type="button"
          className="a d-team__arrow js-track-next"
          data-track="d-team-track"
          style={{ left: "104px" }}
          aria-label={t("التالي")}
        >
          <img src="/assets/img/icon-chevron-forward-22.svg" alt={t("")} />
        </button>
        <button
          type="button"
          className="a d-team__arrow js-track-prev"
          data-track="d-team-track"
          style={{ left: "1288px" }}
          aria-label={t("السابق")}
        >
          <img src="/assets/img/icon-chevron-back-22.svg" alt={t("")} />
        </button>
        <div className="a d-team__progress" id="d-team-progress">
          <i></i>
        </div>
      </section>
    </div>
  );
}
function HomeDesktopSection46() {
  const { t } = useLocale();
  return (
    <div className="band band--d-trip">
      <section className="sec d-trip" aria-labelledby="d-trip-title">
        <div className="fill d-trip__poster" aria-hidden="true"></div>
        <div className="fill d-trip__scrim-l" aria-hidden="true"></div>
        <div className="a d-trip__scrim-b" aria-hidden="true"></div>
        <button
          type="button"
          className="a d-trip__play js-video"
          data-yt="6U7VriFoPvg"
          aria-label={t("تشغيل فيديو رحلتنا الى الاردن 2023")}
        >
          <img
            className="a"
            src="/assets/img/trip-play-ring.svg"
            alt={t("")}
            style={{ left: "0", top: "0", width: "260px", height: "260px" }}
          />
          <img
            className="a"
            src="/assets/img/trip-play-button.svg"
            alt={t("")}
            style={{
              left: "35px",
              top: "35px",
              width: "190px",
              height: "190px",
            }}
          />
          <img
            className="a"
            src="/assets/img/icon-play-80.svg"
            alt={t("")}
            style={{ left: "90px", top: "90px", width: "80px", height: "80px" }}
          />
        </button>
        <div className="a d-trip__heads w6 tr">
          <p className="d-trip__kicker">{t("لقطات فيديو من")}</p>
          <h2
            id="d-trip-title"
            className="d-trip__big"
            style={{ color: "var(--text-inverse)" }}
          >
            {t("رحلتنا الى")}
          </h2>
          <p className="d-trip__big" style={{ color: "var(--terracotta-200)" }}>
            {t("الاردن 2023")}
          </p>
        </div>
        <SiteLink
          className="a btn btn--primary"
          style={{ left: "1188px", top: "545px" }}
          href="#d-register"
        >
          {t("سجل الان")}
        </SiteLink>
        <div className="a d-trip__track" aria-hidden="true"></div>
        <div className="a d-trip__played" aria-hidden="true"></div>
      </section>
    </div>
  );
}
function HomeDesktopSection49() {
  const { t } = useLocale();
  return (
    <div className="band band--d-testi">
      <section className="sec d-testi" aria-labelledby="d-testi-title">
        <h2 id="d-testi-title" className="a d-testi__title w6 tr">
          {t("قالو عنا")}
        </h2>
        <figure className="a d-testi__photo">
          <img
            className="cover"
            src="/assets/img/testimonial-yaser.jpg"
            alt={t("محمد ياسر")}
            loading="lazy"
          />
        </figure>
        <span className="a d-testi__mark w6" aria-hidden="true">
          <span>{t("”")}</span>
        </span>
        <figure className="a d-testi__featured tr">
          <blockquote className="d-testi__quote w5">
            <p>
              {t("كمدرس لديه خبرة في تركيا مع الطلاب ، يمكنني أن أقول ما يلي")}
            </p>
            <p>
              {t(
                "لقد كانت تجربة لا ينبغي تفويتها، سواء من حيث جودة المحتوى التعليمي، ومساهمة الدروس العملية التي عقدت في الفصول الدراسية ومع المشرفين، ومن حيث التعرف على الأردن وشعبه",
              )}
            </p>
          </blockquote>
          <figcaption className="d-testi__byline">
            <span className="d-testi__name w6">{t("محمد ياسر")}</span>
            <span className="d-testi__role">{t("أستاذ")}</span>
          </figcaption>
        </figure>
        <div className="a d-testi__nav">
          <button
            type="button"
            className="d-roundbtn d-roundbtn--ink js-track-next"
            data-track="d-testi-track"
            aria-label={t("التالي")}
          >
            <img
              src="/assets/img/icon-chev-f-red.svg"
              alt={t("")}
              width="24"
              height="24"
            />
          </button>
          <button
            type="button"
            className="d-roundbtn d-roundbtn--ink js-track-prev"
            data-track="d-testi-track"
            aria-label={t("السابق")}
          >
            <img
              src="/assets/img/icon-chev-b-red.svg"
              alt={t("")}
              width="24"
              height="24"
            />
          </button>
          <span
            className="d-testi__count w5"
            id="d-testi-count"
            aria-live="polite"
          >
            {t("01 / 10")}
          </span>
        </div>
        <Track
          className="a d-testi__track swipe-x js-track"
          id="d-testi-track"
          data-counter="d-testi-count"
          data-total="10"
          as="div"
        >
          <div className="d-testi__rail">
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-2.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "ذهبت إلى الأردن لمعسكر اللغة العربية، وكنت حينها لا أعرف شيئا على الإطلاق، ولكن بفضل الفعاليات والأشخاص الذين التقينا بهم تحسنت لغتي بشكل واضح، كان التعليم حقا ذا جودة عالية وذا متعة مختلفة.",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("مصطفى غونيش")}</span>
                <span className="d-tq__role w5">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-3.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "كانت رحلتي التعليمية مع أكاديمية إسطنبول رحلة مكثفة من الصباح حتى المساء، دروس صباحية ونظرية ودروس عملية تطبيقية مع الاختلاط بالناس بشكل مباشر",
                  )}
                </p>
                <p>
                  {t(
                    "أود أن أشركر الأستاذ أحمد وأكاديمية إسطنبول على تنظيم هذه الفعالية وأشكر الشعب الأردني المضياف؛ ولا أنسى أن أوصي بالالتحاق بمثل هذه البرامج مع الأكاديمية",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("أحمد صوي")}</span>
                <span className="d-tq__role w5">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-4.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "عندي خلفية جيدة عن اللغة العربية لكن عندا وجدت الفرصة لتطويرها من خلال المخيم التحقت فورا، برأيي كان المخيم منظما للغاية ليس فيه فراغ ولا ملل، أوصي بهذا البرنامج بشدة وخصوصا مع الأستاذ أحمد بلهوان",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("محمد فريد أردوغمش")}</span>
                <span className="d-tq__role w5">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-5.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "بارك الله بكم، لم يكن مخيما عاديا فحسب، كانت بيننا أواصر الأخوة، أي مشكلة تعترضنا تحاولنا حلها كما لو كانت مشكلتكم، شكرا جزيلا حقا؛ وآمل أن تتاح لنا فرصة أخرى للسفر معكم مرة ثانية ونتمنى أن لا تنسونا",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("بايبرس")}</span>
                <span className="d-tq__role w5">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-6.png"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "أود أن أشكركم كثيرا على محاولتكم جعلنا نشعر بالراحة في بلد أجنبي، كان الأستاذ أحمد أظرف أستاذ أراه في حياتي",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("أديبة سارى شتر")}</span>
                <span className="d-tq__role w5">{t("طالبة")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-7.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "أستاذ أحمد جزاكم الله عنا كل خير لقد استفادت أديبة استفادة كبيرة وكانت ممتنة جدا من طريقة التعليم لذلك نود أن نشكركم من كل قلبنا",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">
                  {t("والد الطالبة أديبة سارى شَتِر")}
                </span>
                <span className="d-tq__role w5">{t("مهندس")}</span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-8.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "قبل المخيم كان هناك تردد حقيقي من الطلاب وأوليائهم حول جدوى المخيم؛ لكن الآن أستطيع أن أقول بكل قوة أن هناك تقدما كبيرا لطلابنا من كثير من النواحي سواء اللغوية أو الثقافية أو من ناحية الثقة بالنفس؛ ويظهر ذلك واضحا من خلال تعاملهم مع المواقف التي رأيناهم فيها وهذا ما أشعرنا بسعادة بالغة عند رؤية تصرفاتهم في المواقف. طبعا وهذا أثر بشكل واضح على عائلاتهم وشعرنا بذلك من خلال الرسائل التي كانت تأتينا من أولياء الأمور والتي تتحدث عن طلابنا وجودة التعليم الذي حصلوه.",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">
                  {t("الأستاذ حكمت فريدون أكسو")}
                </span>
                <span className="d-tq__role w5">
                  {t("مدير مدرسة 15 تموز للأئمة والخطباء")}
                </span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-9.png"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "قبل إرسال الطلاب، كان لديهم شيء من التردد، وعندما زرنا طلابنا واستمعنا لهم وآرائهم. رأينا التحسن الملحوظ بأم أعيننا الذي حصل لطلابنا، ونرى ذلك عندما نسمعهم يتحدثون العربية بطلاقة الآن.",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">{t("الأستاذ بيرم كفيلي")}</span>
                <span className="d-tq__role w5">
                  {t("مدير مدرسة إسطنبول رجب طيب أردوغان للأئمة والخطباء")}
                </span>
              </figcaption>
            </figure>
            <figure className="d-tq">
              <img
                className="d-tq__avatar"
                src="/assets/img/testimonial-10.jpg"
                alt={t("")}
                loading="lazy"
              />
              <blockquote className="d-tq__text">
                <p>
                  {t(
                    "لاحظت أن هناك فرق كبير في المستوى الذي يأتي فيه الطلاب إلى الأردن وعند عودتهم، الطالب في البداية مع أن عنده خلفية لغوية إلا أنه لا يستطيع التعبير بوضوح؛ لكن الفرق يكون واضحا في نهاية المخيم عندما تراه يتحدث بطلاقة وثقة.",
                  )}
                </p>
              </blockquote>
              <figcaption>
                <span className="d-tq__name w5">
                  {t("الأستاذ هارون أكدمير")}
                </span>
                <span className="d-tq__role w5">
                  {t("مدير سكن المعارف في الأردن")}
                </span>
              </figcaption>
            </figure>
          </div>
        </Track>
        <SiteLink
          className="a d-book__link"
          style={{ left: "1170px", top: "1482px" }}
          href="#"
        >
          <img
            src="/assets/img/icon-arrow-f-28.svg"
            alt={t("")}
            width="28"
            height="28"
          />
          <span>{t("جميع التعليقات")}</span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeDesktopSection52() {
  const { t } = useLocale();
  return (
    <div className="band band--d-register">
      <section
        className="sec d-register"
        id="d-register"
        aria-label={t("سجل الان")}
      >
        <div className="a d-register__backdrop" aria-hidden="true">
          <img
            className="cover"
            src="/assets/img/manuscript.jpg"
            alt={t("")}
            loading="lazy"
          />
        </div>
        <div className="a d-register__tint" aria-hidden="true"></div>
        <figure
          className="a d-hero__photo"
          style={{
            left: "124px",
            top: "361px",
            width: "250px",
            height: "410px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/irbid.jpg"
            alt={t("")}
            loading="lazy"
          />
        </figure>
        <figure
          className="a d-hero__photo"
          style={{
            left: "437px",
            top: "436px",
            width: "273px",
            height: "388px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/yarmouk.jpg"
            alt={t("")}
            loading="lazy"
          />
        </figure>
        <figure
          className="a d-hero__photo"
          style={{
            left: "54px",
            top: "111px",
            width: "320px",
            height: "210px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/manuscript.jpg"
            alt={t("")}
            loading="lazy"
          />
        </figure>
        <div className="a d-register__scrim" aria-hidden="true"></div>
        <div className="a d-register__trail" aria-hidden="true"></div>
        <img
          className="a"
          src="/assets/img/reg-node.svg"
          alt={t("")}
          style={{
            left: "1307px",
            top: "210px",
            width: "26px",
            height: "26px",
          }}
        />
        <SiteLink
          className="d-register__link"
          href="tel:+905347308092"
          aria-label={t("سجل الان — اتصل بنا")}
        >
          <span className="a d-register__text w6">{t("سجل الان")}</span>
          <span className="a d-register__btn" aria-hidden="true">
            <img
              src="/assets/img/icon-arrow-f-72.svg"
              alt={t("")}
              width="72"
              height="72"
            />
          </span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeDesktopSection55() {
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
          <SiteLink href="#d-home">{t("الرئيسية")}</SiteLink>
          <SiteLink href="#d-features">{t("المميزات")}</SiteLink>
          <SiteLink href="programs.html">{t("البرامج")}</SiteLink>
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
function HomeDesktop() {
  return (
    <div className="page page--desktop" id="desktop">
      <HomeDesktopSection1 />
      <HomeDesktopSection4 />
      <HomeDesktopSection7 />
      <HomeDesktopSection10 />
      <HomeDesktopSection13 />
      <HomeDesktopSection16 />
      <HomeDesktopSection19 />
      <HomeDesktopSection22 />
      <HomeDesktopSection25 />
      <HomeDesktopSection28 />
      <HomeDesktopSection31 />
      <HomeDesktopSection34 />
      <HomeDesktopSection37 />
      <HomeDesktopSection40 />
      <HomeDesktopSection43 />
      <HomeDesktopSection46 />
      <HomeDesktopSection49 />
      <HomeDesktopSection52 />
      <HomeDesktopSection55 />
    </div>
  );
}
function HomeMobileSection2() {
  const { t } = useLocale();
  return (
    <div className="band band--m-hero">
      <section className="sec m-hero" id="m-home" aria-label={t("الرئيسية")}>
        <div className="a m-hero__backdrop" aria-hidden="true">
          <img className="cover" src="/assets/img/manuscript.jpg" alt={t("")} />
        </div>
        <div className="a m-hero__tint" aria-hidden="true"></div>
        <figure
          className="a m-hero__photo"
          style={{ left: "12px", top: "127px", width: "92px", height: "152px" }}
        >
          <img
            className="cover"
            src="/assets/img/yarmouk.jpg"
            alt={t("منظر طبيعي لمنطقة اليرموك")}
          />
        </figure>
        <figure
          className="a m-hero__photo"
          style={{
            left: "194px",
            top: "95px",
            width: "184px",
            height: "196px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/irbid.jpg"
            alt={t("برج الساعة في إربد")}
          />
        </figure>
        <figure
          className="a m-hero__photo"
          style={{
            left: "100px",
            top: "187px",
            width: "148px",
            height: "104px",
          }}
        >
          <img
            className="cover"
            src="/assets/img/manuscript.jpg"
            alt={t("مخطوطة عربية وكوب شاي")}
          />
        </figure>
        <div className="a m-hero__scrim-b" aria-hidden="true"></div>
        <div className="a m-hero__scrim-t" aria-hidden="true"></div>
        <div className="a m-hero__pager" aria-hidden="true">
          <i style={{ width: "14px" }}></i>
          <i style={{ width: "14px" }}></i>
          <i style={{ width: "30px" }}></i>
        </div>
        <div className="a m-hero__content">
          <h1 className="m-hero__h1 w6 tr">
            {t("معا نتعلم اللغة ")}
            <span className="m-hero__h1b">{t("ونعيش الثقافة الاردنية")}</span>
          </h1>
          <div className="m-hero__intro tr">
            <p>
              {t(
                "نحن فخورون بتقديم أفضل مخيم لغوي للطلاب من جميع الأعمار والمستويات. مخيمنا فريد من نوعه لأنه يجمع بين التعليم والترفيه بطريقة ممتعة وتفاعلية.",
              )}
            </p>
            <p>
              {t(
                "إذا كنت تبحث عن مخيم لغوي يوفر لك تجربة تعليمية غنية وممتعة، فإن مخيمنا هو الخيار الأمثل لك.",
              )}
            </p>
            <p>
              {t(
                "تذكر أن تعلم اللغة العربية هو استثمار في مستقبلك. ستفتح لك اللغة العربية فرصًا جديدة في التعليم والعمل والترفيه.",
              )}
            </p>
          </div>
          <p className="m-hero__emph w6 tr">
            {t("كن مستعدًا لتجربة أشياء جديدة.")}
          </p>
          <SiteLink className="btn btn--primary" href="tel:+905347308092">
            {t("الاتصال بنا الان")}
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection5() {
  const { t } = useLocale();
  return (
    <div className="band band--m-bridge">
      <div className="sec m-bridge" aria-hidden="true">
        <img
          src="/assets/img/m-bridge.svg"
          alt={t("")}
          width="390"
          height="80"
        />
      </div>
    </div>
  );
}
function HomeMobileSection8() {
  const { t } = useLocale();
  return (
    <div className="band band--m-listen">
      <section className="sec m-listen" aria-labelledby="m-listen-title">
        <div className="m-listen__head tr">
          <h2 id="m-listen-title" className="m-listen__title w6">
            {t("استمع وشاهد")}
          </h2>
          <p className="m-listen__sub w5">
            {t("المشرف العام")}
            <br />
            {t("وهو يشرح البرنامج")}
            <br />
            {t("بكل بساطة")}
          </p>
        </div>
        <button
          type="button"
          className="m-listen__video js-video"
          data-yt="AoOTpDCN2tM"
          aria-label={t("تشغيل فيديو: المشرف العام وهو يشرح البرنامج")}
        >
          <span className="a m-listen__poster"></span>
          <span className="a m-listen__scrim"></span>
          <img
            className="a"
            src="/assets/img/m-play-ring.svg"
            alt={t("")}
            style={{
              left: "143px",
              top: "163px",
              width: "104px",
              height: "104px",
            }}
          />
          <img
            className="a"
            src="/assets/img/m-play-button.svg"
            alt={t("")}
            style={{
              left: "157px",
              top: "177px",
              width: "76px",
              height: "76px",
            }}
          />
          <img
            className="a"
            src="/assets/img/icon-play-32.svg"
            alt={t("")}
            style={{
              left: "179px",
              top: "199px",
              width: "32px",
              height: "32px",
            }}
          />
          <span className="a m-listen__track"></span>
          <span className="a m-listen__played"></span>
          <img
            className="a"
            src="/assets/img/m-knob.svg"
            alt={t("")}
            style={{
              left: "251px",
              top: "392px",
              width: "11px",
              height: "11px",
            }}
          />
        </button>
        <span
          className="a m-trail"
          style={{ left: "368px", top: "0", height: "100px" }}
          aria-hidden="true"
        ></span>
        <img
          className="a"
          src="/assets/img/m-trail-node.svg"
          alt={t("")}
          style={{ left: "362px", top: "94px", width: "14px", height: "14px" }}
        />
      </section>
    </div>
  );
}
function HomeMobileSection11() {
  const { t } = useLocale();
  return (
    <div className="band band--m-academy">
      <section className="sec m-academy" aria-labelledby="m-academy-title">
        <h2 id="m-academy-title" className="m-academy__title w6 tr">
          {t("معا نتعلم اللغة ونعيش الثقافة الاردنية")}
        </h2>
        <p className="m-academy__text tr">
          {t("إن أكاديمية إسطنبول التي تأسست عام ")}
          <strong className="w6">{t("2009")}</strong>
          {t(
            " والتي تعتبر أكبر مركز في مجال تعليم اللغة العربية والتركية للأجانب قد سجلت حتى اليوم نجاحات باهرة في التدريب والتعليم داخل مبناها من جهة وفيما تقدمه من خدمات للمؤسسات الأخرى من جهة ثانية.",
          )}
        </p>
        <SiteLink
          className="m-academy__link"
          href="programs.html"
          aria-label={t("اقرأ المزيد عن البرنامج")}
        >
          <img
            src="/assets/img/icon-arrow-f-28.svg"
            alt={t("")}
            width="28"
            height="28"
          />
          <span className="m-academy__rule"></span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection14() {
  const { t } = useLocale();
  return (
    <div className="band band--m-features">
      <section
        className="sec m-features"
        id="m-features"
        aria-label={t("المميزات")}
      >
        <article className="mf mf--accent">
          <div className="mf__top">
            <SiteLink
              href="#"
              className="mf__arrow mf__arrow--light"
              aria-label={t("المزيد")}
            >
              <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
            </SiteLink>
            <div className="mf__idx">
              <span>{t("01")}</span>
              <span className="mf__chip mf__chip--glass">
                <img
                  src="/assets/img/mf-pin-22.svg"
                  alt={t("")}
                  style={{ width: "22px", height: "22px" }}
                />
              </span>
            </div>
          </div>
          <h3 className="mf__title mf__title--h3 w5">
            {t("الرحلات مدروسة متناغمة مع الدروس الصباحية وليست منفصلة عنها")}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "بمعنى أن الرحلة ليست بهدف الزيارة وإنما بهدف ممارسة ما تعلمه الطالب صباحا، لذلك الرحلة المسائية تكون متعلقا بشكل مباشر أو غير مباشر بالدروس الصباحية، ضمن برنامج معد مسبقا.",
              )}
            </p>
            <p>
              {t(
                "كل رحلة غير مرتبطة بمادة علمية لغوية هي رحلة للمتعة فقط وخارجة عن إطار هدفنا",
              )}
            </p>
          </div>
        </article>
        <article className="mf mf--card">
          <div className="mf__panel">
            <span className="mf__num w3">{t("02")}</span>
            <span className="mf__bigicon">
              <img src="/assets/img/mf-users-32.svg" alt={t("")} />
            </span>
          </div>
          <h3 className="mf__title mf__title--h4 w5">
            {t(
              "الكادر التعليمي هم في الأصل أصحاب رسالة ويرغبون بتعليم العربية لغة القرآن الكريم",
            )}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "المعلم هو ركيزة العمل في المؤسسات التعليمية؛ لذلك فنحن نبحث عن معلمين يحملون لواء العلم والتعليم كرسالة وليس كمهنة فقط.",
              )}
            </p>
          </div>
          <div className="mf__linkrow">
            <SiteLink href="#" className="mf__arrow" aria-label={t("المزيد")}>
              <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
            </SiteLink>
          </div>
        </article>
        <div className="mf-pair">
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("04")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-check-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t("الطالب في حال نشاط من بداية المخيم لنهايته")}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "عندما نقوم ببرنامج يتماشى مع الهدف الذي جاء من أجله الطالب وتكون البرامج والخطط متناغمة فإن الطالب يشعر بسعادة كبيرة عند إنتاجه للغة جديدة وتحصيله المستمر الذي يجعله في حال نشاط دائم.",
                )}
              </p>
            </div>
          </article>
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("03")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-users-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t("كادر تدريسي عنده روح عالية ويقدم أفضل ما عنده؛")}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "نحن نؤمن بأن كل معلم ممكن أن يكون ناجح أو العكس؛ وهذا باعتبار البيئة التي يعمل بها المعلم. فاختيار المعلم الناجح وتهيئة البيئة المريحة له تجعله يبدع في عمله ويعمل بحب وهذا هو مفتاح نجاح كل المؤسسات.",
                )}
              </p>
            </div>
          </article>
        </div>
        <article className="mf mf--card">
          <div className="mf__panel">
            <span className="mf__num w3">{t("05")}</span>
            <span className="mf__bigicon">
              <img src="/assets/img/mf-clock-32.svg" alt={t("")} />
            </span>
          </div>
          <h3 className="mf__title mf__title--h4 w5">
            {t("الانتهاء من مستوى لغوي متكامل في مدة وجيزة.")}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "هدفنا من إجراء مخيم لغوي في الأردن هو هدف لغوي بالدرجة الأولى؛ لذلك التركيز على الإنتاج اللغوي والتعلم وكسر حاجز اللغة، يكون قبل التفكير في الترفيه أو غيره مع الاهتمام به.",
              )}
            </p>
          </div>
          <div className="mf__linkrow">
            <SiteLink href="#" className="mf__arrow" aria-label={t("المزيد")}>
              <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
            </SiteLink>
          </div>
        </article>
        <div className="mf-pair">
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("07")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-book-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t("دورات وورشات عمل مستمرة من الأكاديمية للكادر التعليمي.")}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "رأس المال البشري هو أهم نقطة في المؤسسات لذلك نسعى وبشكل دائم لتطوير والنهوض بالقدرات التي معنا.",
                )}
              </p>
            </div>
          </article>
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("06")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-globe-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t("محادثة مع المعلمين والمشرفين قبل زيارة الأردن عبر النت.")}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "نستفيد من هذا الأمر في كسر حاجز الخوف والرهبة من الطالب قبل زيارة الأردن، أو الإجابة على جميع تساؤلاته قبل الوصول.",
                )}
              </p>
            </div>
          </article>
        </div>
        <article className="mf mf--dark">
          <div className="mf__top">
            <SiteLink
              href="#"
              className="mf__arrow mf__arrow--light"
              aria-label={t("المزيد")}
            >
              <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
            </SiteLink>
            <div className="mf__idx">
              <span>{t("08")}</span>
              <span className="mf__chip mf__chip--glass">
                <img
                  src="/assets/img/mf-cal-22.svg"
                  alt={t("")}
                  style={{ width: "22px", height: "22px" }}
                />
              </span>
            </div>
          </div>
          <h3 className="mf__title mf__title--h3 w5">
            {t("برنامجنا مرن ويماشي جميع الأعمار والمستويات.")}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "تم إعداد البرنامج من قبل أساتذة لهم باع طويل في هذا المجال مما يجعل المرونة أمر بسيط بالنسبة لهم.",
              )}
            </p>
          </div>
        </article>
        <article className="mf mf--card">
          <div className="mf__panel">
            <span className="mf__num w3">{t("09")}</span>
            <span className="mf__bigicon">
              <img src="/assets/img/mf-clock-32.svg" alt={t("")} />
            </span>
          </div>
          <h3 className="mf__title mf__title--h4 w5">
            {t("البرنامج مكثف من قبل الفطور حتى الساعة العاشرة مساء")}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "لا يكون غمسا لغويا بدون تعرض الطالب لوقت طويل للغة؛ وباعتبار الفترة التي نزور فيها الأردن مؤقتة لذلك نسعى للاستفادة من كل دقيقة في الأردن.",
              )}
            </p>
          </div>
          <div className="mf__linkrow">
            <SiteLink href="#" className="mf__arrow" aria-label={t("المزيد")}>
              <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
            </SiteLink>
          </div>
        </article>
        <article className="mf mf--accent">
          <div className="mf__top">
            <SiteLink
              href="#"
              className="mf__arrow mf__arrow--light"
              aria-label={t("المزيد")}
            >
              <img src="/assets/img/f-arrow-w.svg" alt={t("")} />
            </SiteLink>
            <div className="mf__idx">
              <span>{t("10")}</span>
              <span className="mf__chip mf__chip--glass">
                <img
                  src="/assets/img/mf-users-22.svg"
                  alt={t("")}
                  style={{ width: "22px", height: "22px" }}
                />
              </span>
            </div>
          </div>
          <h3 className="mf__title mf__title--h3 w5">
            {t(
              "المشرف العام للمخيم هو في الأصل معلم لغة للناطقين بغير العربية ويعرف أدق التفاصيل المطلوبة.",
            )}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "عندما تعمل في المجال الذي أنت متخصص فيه؛ أنتظر منك الإبداع، وعندما تعمل في مجال غير مجالك أنتظر منك تنفيذ مهام وفقط.",
              )}
            </p>
          </div>
        </article>
        <article className="mf mf--card">
          <div className="mf__panel">
            <span className="mf__num w3">{t("11")}</span>
            <span className="mf__bigicon">
              <img src="/assets/img/mf-check-32.svg" alt={t("")} />
            </span>
          </div>
          <h3 className="mf__title mf__title--h4 w5">
            {t(
              "متابعة الطالب خطوة بخطوة وبالوقت نفسه الطالب يتابع نفسه ويرى تقدمه على أقرانه أو عكس ذلك أول بأول",
            )}
          </h3>
          <div className="mf__text mf__text--reg">
            <p>
              {t(
                "المنافسة هي النقطة التي تزيد الفاعلية والهمة عند الطالب وتجعله يسعى للتفوق.",
              )}
            </p>
          </div>
          <div className="mf__linkrow">
            <SiteLink href="#" className="mf__arrow" aria-label={t("المزيد")}>
              <img src="/assets/img/f-arrow-red.svg" alt={t("")} />
            </SiteLink>
          </div>
        </article>
        <div className="mf-pair">
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("13")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-pin-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t(
                "جعل الطالب يزور عائلة أردنية ليوم كامل من الصباح للمساء لوحده في نهاية المخيم.",
              )}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "إيمانا منا بأخوة الإيمان مع اختلاف اللغات؛ نسعى لتوثيق هذه الأخوة من خلال إستضافة عائلة أردنية موثوقة لدينا لطالب لمدة يوم واحد. يجد نفسه مجبرا على ممارسة اللغة لوحده مع عائلة عربية.(غير إلزامي)",
                )}
              </p>
            </div>
          </article>
          <article className="mf mf--card mf--compact">
            <div className="mf__top mf__top--compact">
              <SiteLink
                href="#"
                className="mf__arrow mf__arrow--sm"
                aria-label={t("المزيد")}
              >
                <img src="/assets/img/mf-arrow-16.svg" alt={t("")} />
              </SiteLink>
              <div className="mf__idx mf__idx--compact">
                <span>{t("12")}</span>
                <span className="mf__chip mf__chip--subtle">
                  <img src="/assets/img/mf-book-18.svg" alt={t("")} />
                </span>
              </div>
            </div>
            <h3 className="mf__title mf__title--sm w5">
              {t("لنا منهاج خاص بنا ولا نقوم بتقليد أي سلسلة لغوية.")}
            </h3>
            <div className="mf__text mf__text--sm">
              <p>
                {t(
                  "تصب أكاديمية اللغات كل خبراتها في الدعم اللغوي للطالب، والمناهج والمفردات الخاصة بالأكاديمية لخدمة اللغة العربية غنية عن التعريف وأشهرها كتاب مفتاح العربية.",
                )}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection17() {
  const { t } = useLocale();
  return (
    <div className="band band--m-cta1">
      <section className="sec m-cta1">
        <SiteLink className="m-cta1__row" href="#m-register">
          <span className="m-cta1__btn" aria-hidden="true">
            <img
              src="/assets/img/m-cta-arrow.svg"
              alt={t("")}
              width="28"
              height="28"
            />
          </span>
          <span className="m-cta1__text w6">{t("سجل الان")}</span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection20() {
  const { t } = useLocale();
  return (
    <div className="band band--m-program">
      <FeaturedPrograms />
    </div>
  );
}
function HomeMobileSection23() {
  const { t } = useLocale();
  return (
    <div className="band band--m-adv">
      <section className="sec m-adv" aria-labelledby="m-adv-title">
        <div className="m-pad">
          <h2 id="m-adv-title" className="m-adv__title w6 tr">
            {t("اكتشف عالم المغامرات والتحدي في الاردن")}
          </h2>
        </div>
        <Track
          className="m-adv__viewport swipe-x js-track"
          id="m-adv-track"
          data-dots="m-adv-dots"
          aria-label={t("وجهات الرحلات")}
          as="div"
        >
          <div className="m-adv__rail">
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/irbid.jpg"
                alt={t("إربد")}
                loading="lazy"
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("01")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="8HLZ1SXBIxU"
                aria-label={t("تشغيل فيديو إربد")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("إربد")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/yarmouk.jpg"
                alt={t("معركة اليرموك")}
                loading="lazy"
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("02")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="mJPPGJhMBHs"
                aria-label={t("تشغيل فيديو معركة اليرموك")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("معركة اليرموك")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/jerash.jpg"
                alt={t("جرش علجون")}
                loading="lazy"
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("03")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="QJCdWPgF6e8"
                aria-label={t("تشغيل فيديو جرش علجون")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("جرش علجون")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/salt.jpg"
                alt={t("السلط")}
                loading="lazy"
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("04")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="DZecz5uDfVA"
                aria-label={t("تشغيل فيديو السلط")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("السلط")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/dead-sea.jpg"
                alt={t("مؤتة و البحر الميت")}
                loading="lazy"
                style={{ objectPosition: "center 45%" }}
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("05")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="HIk8-CUCvgw"
                aria-label={t("تشغيل فيديو مؤتة و البحر الميت")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("مؤتة و البحر الميت")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/petra-treasury.jpg"
                alt={t("البتراء")}
                loading="lazy"
                style={{ objectPosition: "58% center" }}
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("06")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="z67tBYnJTkg"
                aria-label={t("تشغيل فيديو البتراء")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("البتراء")}</h3>
            </article>
            <article className="mdest">
              <img
                className="cover"
                src="/assets/img/wadi-rum.jpg"
                alt={t("العقبة و وادي رم")}
                loading="lazy"
                style={{ objectPosition: "35% center" }}
              />
              <span className="a mdest__scrim"></span>
              <span className="a mdest__n w5">{t("07")}</span>
              <button
                type="button"
                className="a mdest__play js-yt"
                data-yt="2X6HCP7nCMs"
                aria-label={t("تشغيل فيديو العقبة و وادي رم")}
              >
                <img
                  src="/assets/img/icon-play-22.svg"
                  alt={t("")}
                  width="22"
                  height="22"
                />
              </button>
              <h3 className="a mdest__name w5">{t("العقبة و وادي رم")}</h3>
            </article>
          </div>
        </Track>
        <div className="m-pad">
          <div className="m-pager">
            <button
              type="button"
              className="m-pager__next js-track-next"
              data-track="m-adv-track"
              aria-label={t("التالي")}
            >
              <img
                src="/assets/img/icon-chev-f-28-w.svg"
                alt={t("")}
                width="28"
                height="28"
              />
            </button>
            <div className="m-pager__segs" id="m-adv-dots">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection26() {
  const { t } = useLocale();
  return (
    <div className="band band--m-articles">
      <ContentSection kind="articles" home />
    </div>
  );
}
function HomeMobileSection29() {
  const { t } = useLocale();
  return (
    <div className="band band--m-companions">
      <section className="sec m-companions" aria-labelledby="m-comp-title">
        <h2 id="m-comp-title" className="m-companions__title w6 tr">
          {t("رفقاء مخيمات اللغة العربية في الاردن")}
        </h2>
        <div className="m-companions__wall">
          <div className="m-companions__col" style={{ paddingTop: "64px" }}>
            <figure className="m-comp" style={{ height: "196px" }}>
              <img
                className="cover"
                src="/assets/img/companion-2.jpg"
                alt={t("")}
                loading="lazy"
              />
              <span className="a m-comp__scrim" style={{ top: "106px" }}></span>
              <figcaption
                className="a m-comp__name w5 tr"
                style={{ top: "158px" }}
              >
                {t("نجلاء اولمز")}
              </figcaption>
            </figure>
            <figure className="m-comp" style={{ height: "250px" }}>
              <img
                className="cover"
                src="/assets/img/companion-4.jpg"
                alt={t("")}
                loading="lazy"
              />
              <span className="a m-comp__scrim" style={{ top: "160px" }}></span>
              <figcaption
                className="a m-comp__name w5 tr"
                style={{ top: "212px" }}
              >
                {t("مدينة جاكر")}
              </figcaption>
            </figure>
          </div>
          <div className="m-companions__col">
            <figure className="m-comp" style={{ height: "240px" }}>
              <img
                className="cover"
                src="/assets/img/companion-1.jpg"
                alt={t("")}
                loading="lazy"
              />
              <span className="a m-comp__scrim" style={{ top: "150px" }}></span>
              <figcaption
                className="a m-comp__name w5 tr"
                style={{ top: "202px" }}
              >
                {t("نوراي")}
              </figcaption>
            </figure>
            <figure className="m-comp" style={{ height: "196px" }}>
              <img
                className="cover"
                src="/assets/img/companion-3.jpg"
                alt={t("")}
                loading="lazy"
              />
              <span className="a m-comp__scrim" style={{ top: "106px" }}></span>
              <figcaption
                className="a m-comp__name w5 tr"
                style={{ top: "158px" }}
              >
                {t("مليحه أوزدامير")}
              </figcaption>
            </figure>
            <figure className="m-comp" style={{ height: "230px" }}>
              <img
                className="cover"
                src="/assets/img/companion-5.jpg"
                alt={t("")}
                loading="lazy"
              />
              <span className="a m-comp__scrim" style={{ top: "140px" }}></span>
              <figcaption
                className="a m-comp__name w5 tr"
                style={{ top: "192px" }}
              >
                {t("الاء الشريف")}
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="m-footrow">
          <SiteLink className="m-more m-more--pink" href="#">
            <img
              src="/assets/img/icon-chev-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("المزيد")}</span>
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection32() {
  const { t } = useLocale();
  return (
    <div className="band band--m-book">
      <section className="sec m-book" aria-labelledby="m-book-title">
        <div className="m-book__surface">
          <div className="m-book__cover">
            <img
              src="/assets/img/book-cover.webp"
              alt={t("غلاف كتاب دليل السياحة التعليمية")}
              loading="lazy"
            />
          </div>
        </div>
        <SiteLink className="m-book__link" href="#">
          <img
            src="/assets/img/icon-arrow-f-22.svg"
            alt={t("")}
            width="22"
            height="22"
          />
          <span className="w5">{t("انقر هنا لقراءة الكتاب")}</span>
        </SiteLink>
        <h2 id="m-book-title" className="m-book__title w6 tr">
          {t("كتابنا الذي صنعناه كدليل لرحلاتنا في الاردن")}
        </h2>
      </section>
    </div>
  );
}
function HomeMobileSection35() {
  const { t } = useLocale();
  return (
    <div className="band band--m-pull">
      <section className="sec m-pull" aria-labelledby="m-pull-title">
        <span className="a m-pull__rule" aria-hidden="true"></span>
        <h2 id="m-pull-title" className="m-pull__h w5 tr">
          {t("معا نتعلم اللغة ونعيش الثقافة الاردنية")}
        </h2>
        <p className="m-pull__p tr">
          {t(
            "تعلم اللغة العربية والثقافة العربية أمران ممتعان ومفيدان, نحن سعداء لمساعدتك في هذه الرحلة.",
          )}
        </p>
        <blockquote className="m-pull__quote w6 tr">
          {t("أنا متحمس للبدء في هذه الرحلة معك!")}
        </blockquote>
      </section>
    </div>
  );
}
function HomeMobileSection38() {
  const { t } = useLocale();
  return (
    <div className="band band--m-support">
      <section className="sec m-support" aria-labelledby="m-support-title">
        <h2 id="m-support-title" className="m-support__title w6 tr">
          {t("لا نكل ولا نمل في الدعم العلمي والفني والاستراتيجي")}
        </h2>
        <ol className="m-ledger">
          <li className="m-ledger__row">
            <p
              className="m-ledger__t w5"
              style={{ fontSize: "var(--size-heading-h3)" }}
            >
              {t(
                "خمسة أيام بالأسبوع … تطبيق خارج البيئة الصفية … إجمالي ساعات الدورة تتجاوز ",
              )}
              <em className="w6">{t("200 ساعة")}</em>
              {t(" عمل.")}
            </p>
            <span className="m-ledger__n m-ledger__n--lg w5">{t("1")}</span>
          </li>
          <li className="m-ledger__row">
            <p
              className="m-ledger__t"
              style={{ fontSize: "var(--size-body-large)" }}
            >
              {t("دروس عملية تطبيقية خارجة عن المألوف.")}
            </p>
            <span className="m-ledger__n w5">{t("2")}</span>
          </li>
          <li className="m-ledger__row">
            <p
              className="m-ledger__t w5"
              style={{ fontSize: "var(--size-heading-h4)" }}
            >
              {t("نضمن الانتاجية القصوى للطالب من خلال برنامج يملئ ")}
              <em className="w6">{t("١٤ ساعة")}</em>
              {t(" يوميا من وقت الطالب.")}
            </p>
            <span className="m-ledger__n m-ledger__n--lg w5">{t("3")}</span>
          </li>
          <li className="m-ledger__row">
            <p
              className="m-ledger__t"
              style={{ fontSize: "var(--size-body-large)" }}
            >
              {t("نضمن المتابعة الجادة من خلال نظام إلكتروني متكامل.")}
            </p>
            <span className="m-ledger__n w5">{t("4")}</span>
          </li>
          <li className="m-ledger__row">
            <p
              className="m-ledger__t w5"
              style={{ fontSize: "var(--size-heading-h4)" }}
            >
              {t("شراكات لغوية وزيارات عائلية")}
            </p>
            <span className="m-ledger__n m-ledger__n--lg w5">{t("5")}</span>
          </li>
          <li className="m-ledger__row">
            <p
              className="m-ledger__t"
              style={{ fontSize: "var(--size-body-regular)" }}
            >
              {t(
                "منهاج مميز خاص بنا يراعي جميع المجالات الثقافية، ذا فلسفة خاصة، يستخدم القواعد الوظيفية مزود بموقع شامل.",
              )}
            </p>
            <span className="m-ledger__n w5">{t("6")}</span>
          </li>
        </ol>
        <SiteLink
          className="btn btn--primary m-support__btn"
          href="#m-register"
        >
          {t("سجل الان")}
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection41() {
  const { t } = useLocale();
  return (
    <div className="band band--m-stats">
      <section className="sec m-stats" aria-labelledby="m-stats-title">
        <h2 id="m-stats-title" className="m-stats__title w6 tr">
          {t("نجاحنا مستمر بفضلكم")}
        </h2>
        <SiteLink className="btn btn--secondary" href="#m-register">
          {t("سجل الان")}
        </SiteLink>
        <span className="m-stats__spacer" aria-hidden="true"></span>
        <div className="m-stat">
          <div className="m-stat__value">
            <span className="m-stat__plus w3">{t("+")}</span>
            <Counter className="m-stat__n w6 js-count" data-to="10321">
              {t("10321")}
            </Counter>
          </div>
          <p className="m-stat__l w6">{t("طالبا")}</p>
          <p className="m-stat__s">{t("مسجلين لدينا")}</p>
        </div>
        <div className="m-stat">
          <div className="m-stat__value">
            <Counter className="m-stat__n w6 js-count" data-to="42">
              {t("42")}
            </Counter>
          </div>
          <p className="m-stat__l w6">{t("مشاركين")}</p>
          <p className="m-stat__s">{t("من مختلف الدول")}</p>
        </div>
        <div className="m-stat">
          <div className="m-stat__value">
            <Counter className="m-stat__n w6 js-count" data-to="125">
              {t("125")}
            </Counter>
          </div>
          <p className="m-stat__l w6">{t("معلم")}</p>
          <p className="m-stat__s">{t("للغة العربية")}</p>
        </div>
        <div className="m-stat">
          <div className="m-stat__value">
            <Counter className="m-stat__n w6 js-count" data-to="14">
              {t("14")}
            </Counter>
          </div>
          <p className="m-stat__l w6">{t("رحلة")}</p>
          <p className="m-stat__s">{t("دولية الى الاردن")}</p>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection44() {
  const { t } = useLocale();
  return (
    <div className="band band--m-team">
      <section className="sec m-team" aria-labelledby="m-team-title">
        <div className="m-pad">
          <h2 id="m-team-title" className="m-team__title w6 tr">
            {t("فريق العمل")}
          </h2>
        </div>
        <div className="m-team__viewport swipe-x">
          <div className="m-team__rail">
            <div className="m-tm" aria-label={t("عضو الفريق")}>
              <span
                className="m-tm__photo"
                style={{
                  backgroundImage:
                    "linear-gradient(138.91deg,#aa5050 0%,#702222 72.464%)",
                }}
              ></span>
              <i className="m-tm__name"></i>
              <i className="m-tm__role"></i>
            </div>
            <div className="m-tm" aria-label={t("عضو الفريق")}>
              <span
                className="m-tm__photo"
                style={{
                  backgroundImage:
                    "linear-gradient(138.91deg,#aa5050 0%,#471616 72.464%)",
                }}
              ></span>
              <i className="m-tm__name"></i>
              <i className="m-tm__role"></i>
            </div>
            <div className="m-tm" aria-label={t("عضو الفريق")}>
              <span
                className="m-tm__photo"
                style={{
                  backgroundImage:
                    "linear-gradient(138.91deg,#c9a46a 0%,#8f8574 72.464%)",
                }}
              ></span>
              <i className="m-tm__name"></i>
              <i className="m-tm__role"></i>
            </div>
            <div className="m-tm" aria-label={t("عضو الفريق")}>
              <span
                className="m-tm__photo"
                style={{
                  backgroundImage:
                    "linear-gradient(138.91deg,#8e2c2c 0%,#471616 72.464%)",
                }}
              ></span>
              <i className="m-tm__name"></i>
              <i className="m-tm__role"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function HomeMobileSection47() {
  const { t } = useLocale();
  return (
    <div className="band band--m-trip">
      <section className="sec m-trip" aria-labelledby="m-trip-title">
        <div className="fill m-trip__poster" aria-hidden="true"></div>
        <div className="a m-trip__scrim-t" aria-hidden="true"></div>
        <div className="a m-trip__scrim-b" aria-hidden="true"></div>
        <div className="a m-trip__heads tr">
          <p className="m-trip__kicker w5">{t("لقطات فيديو من")}</p>
          <h2
            id="m-trip-title"
            className="m-trip__big w6"
            style={{ color: "var(--text-inverse)" }}
          >
            {t("رحلتنا الى")}
          </h2>
          <p
            className="m-trip__big w6"
            style={{ color: "var(--terracotta-200)" }}
          >
            {t("الاردن 2023")}
          </p>
        </div>
        <button
          type="button"
          className="a m-trip__play js-video"
          data-yt="6U7VriFoPvg"
          aria-label={t("تشغيل فيديو رحلتنا الى الاردن 2023")}
        >
          <img
            className="a"
            src="/assets/img/m-trip-ring.svg"
            alt={t("")}
            style={{ left: "0", top: "0", width: "128px", height: "128px" }}
          />
          <img
            className="a"
            src="/assets/img/m-trip-button.svg"
            alt={t("")}
            style={{ left: "18px", top: "18px", width: "92px", height: "92px" }}
          />
          <img
            className="a"
            src="/assets/img/icon-play-40.svg"
            alt={t("")}
            style={{ left: "44px", top: "44px", width: "40px", height: "40px" }}
          />
        </button>
        <span className="a m-trip__track" aria-hidden="true"></span>
        <span className="a m-trip__played" aria-hidden="true"></span>
        <SiteLink
          className="a btn btn--primary"
          style={{ left: "238px", top: "580px" }}
          href="#m-register"
        >
          {t("سجل الان")}
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection50() {
  const { t } = useLocale();
  return (
    <div className="band band--m-testi">
      <section className="sec m-testi" aria-labelledby="m-testi-title">
        <div className="m-pad">
          <h2 id="m-testi-title" className="m-testi__title w6 tr">
            {t("قالو عنا")}
          </h2>
        </div>
        <Track
          className="m-testi__viewport swipe-x js-track"
          id="m-testi-track"
          data-dots="m-testi-dots"
          as="div"
        >
          <div className="m-testi__rail">
            <figure className="m-tq">
              <div className="m-tq__photo m-tq__photo--lg">
                <img
                  className="cover"
                  src="/assets/img/testimonial-yaser.jpg"
                  alt={t("محمد ياسر")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "312px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "كمدرس لديه خبرة في تركيا مع الطلاب ، يمكنني أن أقول ما يلي",
                  )}
                </p>
                <p>
                  {t(
                    "لقد كانت تجربة لا ينبغي تفويتها، سواء من حيث جودة المحتوى التعليمي، ومساهمة الدروس العملية التي عقدت في الفصول الدراسية ومع المشرفين، ومن حيث التعرف على الأردن وشعبه",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("محمد ياسر")}</span>
                <span className="m-tq__role">{t("أستاذ")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-2.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "ذهبت إلى الأردن لمعسكر اللغة العربية، وكنت حينها لا أعرف شيئا على الإطلاق، ولكن بفضل الفعاليات والأشخاص الذين التقينا بهم تحسنت لغتي بشكل واضح، كان التعليم حقا ذا جودة عالية وذا متعة مختلفة.",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("مصطفى غونيش")}</span>
                <span className="m-tq__role">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-3.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-regular)" }}
              >
                <p>
                  {t(
                    "كانت رحلتي التعليمية مع أكاديمية إسطنبول رحلة مكثفة من الصباح حتى المساء، دروس صباحية ونظرية ودروس عملية تطبيقية مع الاختلاط بالناس بشكل مباشر",
                  )}
                </p>
                <p>
                  {t(
                    "أود أن أشركر الأستاذ أحمد وأكاديمية إسطنبول على تنظيم هذه الفعالية وأشكر الشعب الأردني المضياف؛ ولا أنسى أن أوصي بالالتحاق بمثل هذه البرامج مع الأكاديمية",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("أحمد صوي")}</span>
                <span className="m-tq__role">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-4.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "عندي خلفية جيدة عن اللغة العربية لكن عندا وجدت الفرصة لتطويرها من خلال المخيم التحقت فورا، برأيي كان المخيم منظما للغاية ليس فيه فراغ ولا ملل، أوصي بهذا البرنامج بشدة وخصوصا مع الأستاذ أحمد بلهوان",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("محمد فريد أردوغمش")}</span>
                <span className="m-tq__role">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-5.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "بارك الله بكم، لم يكن مخيما عاديا فحسب، كانت بيننا أواصر الأخوة، أي مشكلة تعترضنا تحاولنا حلها كما لو كانت مشكلتكم، شكرا جزيلا حقا؛ وآمل أن تتاح لنا فرصة أخرى للسفر معكم مرة ثانية ونتمنى أن لا تنسونا",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("بايبرس")}</span>
                <span className="m-tq__role">{t("طالب")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-6.png"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "أود أن أشكركم كثيرا على محاولتكم جعلنا نشعر بالراحة في بلد أجنبي، كان الأستاذ أحمد أظرف أستاذ أراه في حياتي",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("أديبة سارى شتر")}</span>
                <span className="m-tq__role">{t("طالبة")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-7.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "أستاذ أحمد جزاكم الله عنا كل خير لقد استفادت أديبة استفادة كبيرة وكانت ممتنة جدا من طريقة التعليم لذلك نود أن نشكركم من كل قلبنا",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">
                  {t("والد الطالبة أديبة سارى شَتِر")}
                </span>
                <span className="m-tq__role">{t("مهندس")}</span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-8.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-regular)" }}
              >
                <p>
                  {t(
                    "قبل المخيم كان هناك تردد حقيقي من الطلاب وأوليائهم حول جدوى المخيم؛ لكن الآن أستطيع أن أقول بكل قوة أن هناك تقدما كبيرا لطلابنا من كثير من النواحي سواء اللغوية أو الثقافية أو من ناحية الثقة بالنفس؛ ويظهر ذلك واضحا من خلال تعاملهم مع المواقف التي رأيناهم فيها وهذا ما أشعرنا بسعادة بالغة عند رؤية تصرفاتهم في المواقف. طبعا وهذا أثر بشكل واضح على عائلاتهم وشعرنا بذلك من خلال الرسائل التي كانت تأتينا من أولياء الأمور والتي تتحدث عن طلابنا وجودة التعليم الذي حصلوه.",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">
                  {t("الأستاذ حكمت فريدون أكسو")}
                </span>
                <span className="m-tq__role">
                  {t("مدير مدرسة 15 تموز للأئمة والخطباء")}
                </span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-9.png"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "قبل إرسال الطلاب، كان لديهم شيء من التردد، وعندما زرنا طلابنا واستمعنا لهم وآرائهم. رأينا التحسن الملحوظ بأم أعيننا الذي حصل لطلابنا، ونرى ذلك عندما نسمعهم يتحدثون العربية بطلاقة الآن.",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("الأستاذ بيرم كفيلي")}</span>
                <span className="m-tq__role">
                  {t("مدير مدرسة إسطنبول رجب طيب أردوغان للأئمة والخطباء")}
                </span>
              </figcaption>
            </figure>
            <figure className="m-tq">
              <div className="m-tq__photo">
                <img
                  className="cover"
                  src="/assets/img/testimonial-10.jpg"
                  alt={t("")}
                  loading="lazy"
                />
              </div>
              <span
                className="a m-tq__mark w6"
                style={{ top: "272px" }}
                aria-hidden="true"
              >
                {t("”")}
              </span>
              <span className="m-tq__spacer"></span>
              <blockquote
                className="m-tq__text"
                style={{ fontSize: "var(--size-body-large)" }}
              >
                <p>
                  {t(
                    "لاحظت أن هناك فرق كبير في المستوى الذي يأتي فيه الطلاب إلى الأردن وعند عودتهم، الطالب في البداية مع أن عنده خلفية لغوية إلا أنه لا يستطيع التعبير بوضوح؛ لكن الفرق يكون واضحا في نهاية المخيم عندما تراه يتحدث بطلاقة وثقة.",
                  )}
                </p>
              </blockquote>
              <figcaption className="m-tq__by w5">
                <span className="m-tq__name">{t("الأستاذ هارون أكدمير")}</span>
                <span className="m-tq__role">
                  {t("مدير سكن المعارف في الأردن")}
                </span>
              </figcaption>
            </figure>
          </div>
        </Track>
        <div className="m-testi__pager">
          <div className="m-pager__segs m-pager__segs--sand" id="m-testi-dots">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <SiteLink className="m-testi__all" href="#">
          <img
            src="/assets/img/icon-arrow-f-24.svg"
            alt={t("")}
            width="24"
            height="24"
          />
          <span className="w5">{t("جميع التعليقات")}</span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection53() {
  const { t } = useLocale();
  return (
    <div className="band band--m-register">
      <section
        className="sec m-register"
        id="m-register"
        aria-label={t("سجل الان")}
      >
        <div className="a m-register__bg" aria-hidden="true"></div>
        <img
          className="a"
          src="/assets/img/m-reg-scrim.svg"
          alt={t("")}
          style={{ left: "0", top: "54px", width: "390px", height: "240px" }}
        />
        <span className="a m-register__trail" aria-hidden="true"></span>
        <img
          className="a"
          src="/assets/img/m-reg-node.svg"
          alt={t("")}
          style={{ left: "358px", top: "113px", width: "22px", height: "22px" }}
        />
        <SiteLink
          className="a m-register__cta"
          href="tel:+905347308092"
          aria-label={t("سجل الان — اتصل بنا")}
        >
          <span className="m-register__btn" aria-hidden="true">
            <img
              src="/assets/img/icon-arrow-f-36.svg"
              alt={t("")}
              width="36"
              height="36"
            />
          </span>
          <span className="m-register__text w6">{t("سجل الان")}</span>
        </SiteLink>
      </section>
    </div>
  );
}
function HomeMobileSection56() {
  const { t } = useLocale();
  return (
    <div className="band band--m-footer">
      <footer className="sec m-footer" id="m-contact">
        <p className="m-footer__brand w6">{t("دروب العربية")}</p>
        <nav className="m-footer__nav" aria-label={t("روابط التذييل")}>
          <SiteLink className="m-footer__link" href="#m-home">
            <img
              src="/assets/img/icon-arrow-f-20-pink.svg"
              alt={t("")}
              width="20"
              height="20"
            />
            <span>{t("الرئيسية")}</span>
          </SiteLink>
          <SiteLink className="m-footer__link" href="#m-features">
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
function HomeMobile() {
  return (
    <div className="page page--mobile" id="mobile">
      <HomeMobileSection2 />
      <HomeMobileSection5 />
      <HomeMobileSection8 />
      <HomeMobileSection11 />
      <HomeMobileSection14 />
      <HomeMobileSection17 />
      <HomeMobileSection20 />
      <HomeMobileSection23 />
      <HomeMobileSection26 />
      <HomeMobileSection29 />
      <HomeMobileSection32 />
      <HomeMobileSection35 />
      <HomeMobileSection38 />
      <HomeMobileSection41 />
      <HomeMobileSection44 />
      <HomeMobileSection47 />
      <HomeMobileSection50 />
      <HomeMobileSection53 />
      <HomeMobileSection56 />
    </div>
  );
}
export default function Home() {
  const { t } = useLocale();
  return (
    <>
      <HomeDesktop />
      <HomeMobile />
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
        <SiteLink href="programs.html" className="m-nav__item">
          <img src="/assets/img/icon-cal-w.svg" alt={t("")} />
          <span>{t("البرامج")}</span>
        </SiteLink>
        <SiteLink href="#m-features" className="m-nav__item">
          <img src="/assets/img/icon-check-w.svg" alt={t("")} />
          <span>{t("المميزات")}</span>
        </SiteLink>
        <SiteLink
          href="#m-home"
          className="m-nav__item is-active"
          aria-current="page"
        >
          <img src="/assets/img/icon-home.svg" alt={t("")} />
          <span>{t("الرئيسية")}</span>
        </SiteLink>
      </MobileNavigation>
    </>
  );
}
