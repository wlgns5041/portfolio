import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

import { contactLinks } from "../../data/links";
import { SectionTitle } from "../common/SectionTitle";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" }); 

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isValid = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const msgOk = form.message.trim().length >= 1;
    return nameOk && emailOk && msgOk;
  }, [form]);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.currentTarget;
  setForm((prev) => ({ ...prev, [name]: value }));
  setStatus({ type: "", text: "" });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        type: "error",
        text: "EmailJS 환경변수 설정이 누락됐습니다. (.env 확인 필요)",
      });
      return;
    }

    if (!isValid || sending) return;

    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus({ type: "success", text: "메시지가 전송되었습니다! 감사합니다 🙇‍♂️" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
      console.error("EmailJS error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-slate-950">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-28">
        <SectionTitle
          eyebrow="Contact"
          title="저의 포트폴리오를 봐주셔서 감사합니다!"
          description="관심있게 보셨다면 아래를 통해 저에게 연락주세요 🙇‍♂️"
        />
      </div>

      <div className="mt-32 w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-24 pb-28">
        <div className="flex justify-center">
          <div className="ml-24 mr-24 grid grid-cols-2 sm:grid-cols-2 gap-12 w-fit">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="
                  group relative
                  w-[220px] h-[160px]
                  rounded-[12px]
                  bg-slate-900/40
                  border border-slate-800/60
                  shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                  overflow-hidden
                  flex flex-col items-center justify-center
                  transition-all duration-300
                  hover:shadow-[0_35px_110px_rgba(0,0,0,0.7)]
                  hover:bg-slate-700/40
                "
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />

                <div
                  className="
                    absolute right-2 top-2
                    w-8 h-8 rounded-[8px]
                    bg-slate-900/50
                    border border-slate-700/50
                    flex items-center justify-center
                    text-slate-300
                    transition group-hover:text-slate-100
                  "
                  aria-hidden
                >
                  ↗
                </div>

                <div className="w-12 h-12 flex items-center justify-center">
                  {link.icon ? (
                    <img
                      src={link.icon}
                      alt={link.label}
                      draggable={false}
                      className={`
                        w-12 h-12 object-contain
                        ${link.type === "github" ? "invert" : ""}
                      `}
                    />
                  ) : (
                    <span className="text-3xl">◎</span>
                  )}
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-200">
                  {link.label}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* 메일 폼 박스 */}
        <div
          className="
            mt-16
            rounded-[12px]
            bg-slate-900/30
            border border-slate-800/60
            shadow-[0_35px_120px_rgba(0,0,0,0.6)]
            p-6 md:p-8
          "
        >
          <p className="text-sm text-slate-400 text-center">
            작성한 메시지는{" "}
            <span className="text-indigo-300 font-semibold">
              wlgns6921@gmail.com
            </span>
            으로 전송됩니다.
          </p>

          {/* 상태 메시지 */}
          {status.text && (
            <div
              className={`
                mt-4 rounded-lg border px-4 py-3 text-sm
                ${
                  status.type === "success"
                    ? "border-emerald-500/30 text-emerald-200 bg-emerald-500/10"
                    : "border-rose-500/30 text-rose-200 bg-rose-500/10"
                }
              `}
              role="status"
              aria-live="polite"
            >
              {status.text}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full rounded-[8px]
                bg-slate-950/40
                border border-slate-800/70
                px-5 py-4
                text-slate-200
                placeholder:text-slate-500
                outline-none
                focus:border-indigo-400/60
              "
              placeholder="보내는 사람"
              autoComplete="name"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="
                w-full rounded-[8px]
                bg-slate-950/40
                border border-slate-800/70
                px-5 py-4
                text-slate-200
                placeholder:text-slate-500
                outline-none
                focus:border-indigo-400/60
              "
              placeholder="이메일"
              autoComplete="email"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={7}
              className="
                w-full rounded-[8px]
                bg-slate-950/40
                border border-slate-800/70
                px-5 py-4
                text-slate-200
                placeholder:text-slate-500
                outline-none
                focus:border-indigo-400/60
                resize-none
              "
              placeholder="메시지 내용"
            />

            <button
              type="submit"
              disabled={!isValid || sending}
              className="
                w-full rounded-[4px]
                bg-indigo-600
                py-4 font-semibold text-white
                shadow-[0_20px_60px_rgba(79,70,229,0.35)]
                transition
                hover:bg-indigo-500
                active:scale-[0.99]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {sending ? "전송 중..." : "메시지 보내기"}
            </button>
          </form>
        </div>

        <p className="mt-16 text-sm text-slate-600 text-center">
          © {new Date().getFullYear()} Jihoon Kim
        </p>
      </div>
    </section>
  );
};

export default ContactSection;