import { useState } from "react";
import { toast } from "sonner";
import { uploadCollections } from "@/shared/utils/upload-collections";

export const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const openPickerAndUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const isJsonExt = file.name.toLowerCase().endsWith(".json");
      if (!isJsonExt) {
        toast.error("Неверный формат данных");
        return;
      }

      try {
        setIsLoading(true);
        const text = await file.text();
        const parsed = JSON.parse(text);

        const result = await uploadCollections(parsed);
        if (!result.ok) {
          toast.error(result.error || "Неверный формат данных");
          return;
        }

        window.location.reload();
      } catch (e: unknown) {
        toast.error((e as Error)?.message || "Ошибка загрузки файла");
      } finally {
        setIsLoading(false);
        input.remove();
      }
    };
    document.body.appendChild(input);
    input.click();
  };

  return { openPickerAndUpload, isLoading };
};
