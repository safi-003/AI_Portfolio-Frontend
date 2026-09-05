export const resumeDocument = {
  filename: "resume.pdf",
  title: "Resume",
} as const;

export function getResumeDocumentUrl(download = false) {
  const base = `/api/documents/${encodeURIComponent(resumeDocument.filename)}`;
  return download ? `${base}?download=1` : base;
}
