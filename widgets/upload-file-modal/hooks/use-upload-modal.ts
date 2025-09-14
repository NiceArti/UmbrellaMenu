import { uploadCollections } from "@/shared/utils/upload-collections";
import { validateCollections } from "@/shared/utils/validate-collections";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function useUploadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [jsonText, setJsonText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isJsonParsable, isSchemaValid } = useMemo(() => {
    if (!jsonText.trim())
      return { isJsonParsable: false, isSchemaValid: false };
    try {
      const parsed = JSON.parse(jsonText);
      const v = validateCollections(parsed);
      return { isJsonParsable: true, isSchemaValid: v.ok };
    } catch {
      return { isJsonParsable: false, isSchemaValid: false };
    }
  }, [jsonText]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmitText = async () => {
    try {
      setIsSubmitting(true);
      const parsed = JSON.parse(jsonText);
      const result = await uploadCollections(parsed);
      if (!result.ok) {
        toast.error(result.error || "Ошибка, повторите попытку...");
        return;
      }
      window.location.reload();
    } catch (e: unknown) {
      toast.error((e as Error)?.message || "Ошибка, повторите попытку...");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    onBackdropMouseDown,
    jsonText,
    setJsonText,
    isSubmitting,
    handleSubmitText,
    isJsonParsable,
    isSchemaValid,
  };
}
