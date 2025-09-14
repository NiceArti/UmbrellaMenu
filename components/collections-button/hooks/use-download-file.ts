import { useState } from "react";

export const useDownloadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetch(filePath);
      if (!response.ok) {
        setIsError(true);
        return;
      }

      const data = await response.json();
      const jsonData = JSON.stringify(data, null, 2);

      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadFile, isLoading, isError };
};
