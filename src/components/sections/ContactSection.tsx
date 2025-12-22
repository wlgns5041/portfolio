import { contactLinks } from "../../data/links";
import { SectionTitle } from "../common/SectionTitle";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-slate-950 flex items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionTitle
          eyebrow="Contact"
          title="함께할 기회를 기다리고 있습니다"
          description="아래 채널을 통해 언제든 편하게 연락 주세요."
        />

        <div className="mt-16 flex flex-col gap-8">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              className="text-2xl font-semibold text-slate-300 hover:text-teal-400 transition"
            >
              {link.label} →
            </a>
          ))}
        </div>

        <p className="mt-24 text-sm text-slate-500">
          © {new Date().getFullYear()} Jihoon Kim
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
