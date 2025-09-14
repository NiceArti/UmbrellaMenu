import { useState } from "react";
import { toast } from "sonner";

export const useDownloadFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      setIsLoading(true);
      const downloadUrl = filePath.endsWith("/download")
        ? filePath
        : `${filePath.replace(/\/$/, "")}/download`;

      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.setAttribute("download", fileName);
      anchor.setAttribute("target", "_self");
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      toast.success("Файл успешно скачан");
    } catch (error) {
      toast.error((error as Error)?.message || "Ошибка при скачивании файла");
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadFile, isLoading };
};
