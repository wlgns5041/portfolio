import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProjectPdfModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
};

const ProjectPdfModal = ({ open, onClose, title, pdfUrl }: ProjectPdfModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            px-4 py-6
          "
          role="dialog"
          aria-modal="true"
          aria-label={`${title} PDF`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          {/* 배경 dim */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 모달 본체 */}
          <motion.div
            className="
              relative w-full max-w-6xl
              h-[90vh]
              rounded-2xl
              border border-slate-700/40
              bg-slate-950
              shadow-[0_40px_140px_rgba(0,0,0,0.75)]
              overflow-hidden
            "
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 상단 바 */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/60 bg-slate-950/70">
              <div className="text-sm md:text-base font-semibold text-slate-100 truncate">
                {title} – 프로젝트 상세(PDF)
              </div>

              <button
                type="button"
                onClick={onClose}
                className="
                  inline-flex items-center justify-center
                  w-10 h-10 rounded-xl
                  bg-slate-800/40 text-slate-100
                  hover:bg-slate-700/50 transition
                "
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* PDF 뷰어 */}
            <div className="w-full h-[calc(90vh-56px)] bg-black">
              <iframe
                title={`${title} PDF Viewer`}
                src={pdfUrl}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPdfModal;