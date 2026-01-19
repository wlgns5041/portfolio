import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// ✅ pdf.js worker (Vite 기준)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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

  // ✅ 모바일 여부
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // ✅ PC iframe용 viewerUrl
  const viewerUrl = useMemo(() => {
    const base = pdfUrl.includes("#") ? pdfUrl.split("#")[0] : pdfUrl;
    return `${base}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  }, [pdfUrl]);

  // ✅ "프로젝트 PDF만" 모바일에서 안내 + 버튼으로 새탭 유도
  const isProjectPdf = useMemo(() => {
    return pdfUrl === "/pdfs/petory.pdf";
  }, [pdfUrl]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // ✅ 모바일/PC 상관없이: 모달 열리면 로고 숨김 플래그 ON
    document.body.setAttribute("data-modal-open", "true");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.removeAttribute("data-modal-open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  // ✅ 새 탭 열기 "로딩 애니메이션"
  const [openingNewTab, setOpeningNewTab] = useState(false);

  const openInNewTabWithLoading = () => {
    // ✅ 기존처럼: PDF 파일 자체를 새탭으로 열기
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  // ================== ✅ 모바일(이력서/자소서 등) pdfjs 렌더 ==================
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  // ✅ file/options memoize (경고/불필요 reload 방지)
  const pdfFile = useMemo(() => ({ url: pdfUrl }), [pdfUrl]);
  const pdfOptions = useMemo(
    () => ({ disableRange: true, disableStream: true }),
    []
  );

  useEffect(() => {
    if (!open) return;

    rememberScrollAndReset();
  }, [open, pdfUrl, isMobile]);

  function rememberScrollAndReset() {
    // ✅ PDF 바뀌거나 모달 열릴 때 상태 초기화
    setNumPages(0);
    setPageWidth(0);
    setOpeningNewTab(false);
  }

  useEffect(() => {
    if (!open) return;
    if (!isMobile) return;
    if (isProjectPdf) return; // 프로젝트는 모바일에서 렌더 안 하니 폭 계산 불필요

    // 모바일 pdfjs 폭 계산 (잘림 방지: 여유 더 줌)
    const calc = () => {
      const w = Math.min(window.innerWidth, 768);
      setPageWidth(Math.max(0, w - 28)); // ✅ 테두리/오차까지 고려해서 -28
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [open, isMobile, isProjectPdf]);

  // ================== UI ==================
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
          onMouseDown={handleClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-6xl h-[80vh] md:h-[90vh] rounded-2xl border border-slate-700/40 bg-slate-950 shadow-[0_40px_140px_rgba(0,0,0,0.75)] overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* top bar */}
            <div className="h-14 px-4 flex items-center border-b border-slate-800/60 bg-slate-950/70">
              {/* 제목 영역: 남는 공간만 사용 + 말줄임 */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-sm md:text-base font-semibold text-slate-100 truncate">
                  {title}
                </div>
              </div>

              {/* 버튼 영역: 크기 고정, 줄어들지 않음 */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={openInNewTabWithLoading}
                  className="px-3 h-10 rounded-xl bg-slate-800/40 text-slate-100 hover:bg-slate-700/50 transition text-xs font-semibold whitespace-nowrap"
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
                  onClick={handleClose}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/40 text-slate-100 hover:bg-slate-700/50 transition"
                  aria-label="닫기"
                >
                  <CloseRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>

            {/* body */}
            <div className="h-[calc(80vh-56px)] md:h-[calc(90vh-56px)] bg-black overflow-hidden">
              {/* ✅ PC: 기존 그대로 iframe */}
              {!isMobile ? (
                <iframe
                  title={`${title} PDF`}
                  src={viewerUrl}
                  className="w-full h-full"
                />
              ) : (
                <>
                  {/* ✅ 모바일: 프로젝트 PDF는 "지원하지 않음" + 버튼(클릭해야 새탭) */}
                  {isProjectPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-slate-200">
                      <p className="text-sm opacity-90 text-center leading-relaxed">
                        PDF의 용량이 커서 모바일에서는 지원하지 않습니다.
                        <br />
                        용량에 따라 로딩 시간이 길어질 수 있습니다.
                        <br />
                        아래 버튼을 눌러 새 탭에서 열어주세요.
                      </p>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={openInNewTabWithLoading}
                          className="px-4 h-10 rounded-xl bg-slate-800/50 hover:bg-slate-700/60 transition text-sm font-semibold"
                        >
                          {openingNewTab ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-block w-4 h-4 rounded-full border-2 border-slate-200/40 border-t-slate-200 animate-spin" />
                              여는 중...
                            </span>
                          ) : (
                            "새 탭에서 열기"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleDownload}
                          className="px-4 h-10 rounded-xl bg-slate-800/50 hover:bg-slate-700/60 transition text-sm font-semibold"
                        >
                          다운로드
                        </button>
                      </div>
                    </div>
                  ) : (
                    // ✅ 모바일: 다른 PDF는 pdfjs 렌더 (가장자리 둥근효과 제거)
                    <div className="w-full h-full overflow-y-auto overscroll-contain">
                      <Document
                        file={pdfFile}
                        options={pdfOptions}
                        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                        loading={
                          <div className="text-slate-200 text-sm opacity-80 text-center py-10">
                            PDF 로딩 중...
                          </div>
                        }
                        error={
                          <div className="text-slate-200 text-sm opacity-80 text-center py-10">
                            PDF를 불러오지 못했어요. “새 탭에서 열기”를 이용해
                            주세요.
                          </div>
                        }
                      >
                        <div className="flex flex-col gap-4 items-center px-0 py-0">
                          {Array.from(
                            { length: numPages },
                            (_, i) => i + 1
                          ).map((pageNum) => (
                            <div
                              key={`p-${pageNum}`}
                              className="w-full flex justify-center"
                            >
                              {/* ✅ 둥근/테두리/카드 효과 제거 */}
                              <Page
                                pageNumber={pageNum}
                                width={pageWidth || undefined}
                                renderTextLayer
                                renderAnnotationLayer
                              />
                            </div>
                          ))}
                        </div>
                      </Document>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPdfModal;
