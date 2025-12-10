import { contactLinks } from "../../data/links";
import { SectionTitle } from "../common/SectionTitle";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-24 bg-slate-900 text-slate-50 flex flex-col justify-center"
    >
      <SectionTitle
        eyebrow="Contact"
        title="함께할 기회를 기다리고 있습니다"
        description="아래 링크를 통해 언제든 연락 주세요."
      />

      <div className="flex gap-6 mt-10">
        {contactLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            className="text-lg font-medium text-teal-400 hover:text-teal-300 transition"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-12 text-slate-500 text-sm">
        © {new Date().getFullYear()} Jihoon Kim
      </p>
    </section>
  );
};

export default ContactSection;