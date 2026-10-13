import React, { useState } from "react";
import { useLocale } from "../locale.jsx";
import { PREVIEW_MODE } from "../config.js";
import { api } from "../api/client.js";
export function EnquiryForm() {
  const { lang, t } = useLocale(),
    [group, setGroup] = useState(false),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [sent, setSent] = useState(false);
  const field = (name, label, type = "text") => (
    <label className="contact-field">
      <span>{t(label)}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={
          name === "name" ? "name" : name === "email" ? "email" : "tel"
        }
      />
    </label>
  );
  const options = (name, label, items) => (
    <fieldset>
      <legend>{t(label)}</legend>
      <div className="contact-options">
        {items.map(([value, label]) => (
          <label key={value}>
            <input
              type="radio"
              name={name}
              value={value}
              required
              onChange={() => {
                if (name === "participation") setGroup(value === "group");
              }}
            />
            <span>{t(label)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
  return sent ? (
    <div className="contact-success" role="status">
      {t("تم إرسال استفسارك بنجاح. شكراً لتواصلك معنا.")}
    </div>
  ) : (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (PREVIEW_MODE) {
          setStatus(
            lang === "ar"
              ? "النموذج جاهز للربط. لن يُرسل الاستفسار حتى يتم توصيل الخادم."
              : "Form bağlantıya hazır. Sunucu bağlanana kadar mesaj gönderilmez.",
          );
          return;
        }
        setBusy(true);
        setStatus("");
        try {
          await api.contact({
            ...Object.fromEntries(new FormData(e.currentTarget)),
            language: lang,
          });
          setSent(true);
        } catch {
          setStatus(
            lang === "ar"
              ? "تعذّر الإرسال. حاول مجدداً."
              : "Gönderilemedi. Tekrar deneyin.",
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      {field("name", "الاسم و الكنية")}
      {field("email", "عنوان بريد إلكتروني", "email")}
      {field("phone", "رقم الهاتف", "tel")}
      {options(
        "level",
        "مستوى اللغة المقدر لديك",
        ["A1", "A2", "B1", "B2", "C1"]
          .map((v) => [v, v])
          .concat([["other", "غير ذلك"]]),
      )}
      {options("program", "برنامجك المفضل", [
        ["spring", "الربيع"],
        ["summer", "البرنامج الصيفي"],
      ])}
      {options("participation", "عدد الاشخاص", [
        ["individual", "سأشارك بشكل فردي"],
        ["group", "سوف نشارك كمجموعة"],
      ])}
      {options("attendance", "حالة المشاركة", [
        ["certain", "سأحضر بالتأكيد"],
        ["undecided", "أنا متردد"],
      ])}
      {group && (
        <label className="contact-field">
          <span>{t("عدد الأشخاص إذا كنت ستشارك كمجموعة")}</span>
          <input name="group-size" type="number" min="2" max="100" required />
        </label>
      )}
      <label className="contact-field">
        <span>{t("هل لديك أي أسئلة أو طلبات؟")}</span>
        <textarea name="message" rows="4" />
      </label>
      <button className="contact-submit" disabled={busy}>
        {t("ارسال ↗")}
      </button>
      <p role="status">{status}</p>
    </form>
  );
}
