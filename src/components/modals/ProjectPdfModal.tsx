import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  fileName?: string;
};

const ProjectPdfModal = ({ open, onClose, title, pdfUrl, fileName }: Props) => {
  const downloadName = useMemo(() => {
    const safe = (fileName ?? `${title}.pdf`).replace(/[\\/:*?"<>|]/g, "_");
    return safe.endsWith(".pdf") ? safe : `${safe}.pdf`;
  }, [fileName, title]);

  const viewerUrl = useMemo(() => {
    const base = pdfUrl.includes("#") ? pdfUrl.split("#")[0] : pdfUrl;
    return `${base}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  }, [pdfUrl]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleDownload = async () => {
    const res = await fetch(pdfUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-6xl h-[90vh] rounded-2xl border border-slate-700/40 bg-slate-950 shadow-[0_40px_140px_rgba(0,0,0,0.75)] overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* top bar */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/60 bg-slate-950/70">
              <div className="text-sm md:text-base font-semibold text-slate-100 truncate">
                {title}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.open(pdfUrl, "_blank", "noreferrer")}
                  className="px-3 h-10 rounded-xl bg-slate-800/40 text-slate-100 hover:bg-slate-700/50 transition text-xs font-semibold"
                >
                  새 탭에서 열기
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/40 text-slate-100 hover:bg-slate-700/50 transition"
                  aria-label="다운로드"
                >
                  <DownloadRoundedIcon fontSize="small" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/40 text-slate-100 hover:bg-slate-700/50 transition"
                  aria-label="닫기"
                >
                  <CloseRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>

            <div className="h-[calc(90vh-56px)] bg-black">
              <iframe
                title={`${title} PDF`}
                src={viewerUrl}
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