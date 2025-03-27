export function getMimeType(format) {
  switch (format.toLowerCase()) {
    case "pdf":
      return "application/pdf";
    case "html":
      return "text/html";
    case "md":
      return "text/markdown";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}
