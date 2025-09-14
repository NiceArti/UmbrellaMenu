import { CollectionsButton } from "@/components/collections-button/collections-button";
import { useUploadFile } from "@/components/collections-button/hooks/use-upload-file";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { useUploadModal } from "./hooks/use-upload-modal";

export function UploadFileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { openPickerAndUpload, isLoading: isUploading } = useUploadFile();

  const {
    onBackdropMouseDown,
    jsonText,
    setJsonText,
    isSubmitting,
    handleSubmitText,
    isJsonParsable,
    isSchemaValid,
  } = useUploadModal({
    isOpen,
    onClose,
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4",
        !isOpen && "hidden"
      )}
      onMouseDown={onBackdropMouseDown}
    >
      <div
        className="relative flex flex-col gap-4 p-10 bg-[#101010] overflow-y-auto h-full max-h-[600px] w-full max-w-[448px] rounded-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Button
          title="Закрыть"
          className="bg-transparent hover:bg-transparent rounded-full px-3 py-2 absolute top-2 right-2"
          onClick={onClose}
        >
          ❌
        </Button>
        <div className="flex flex-col gap-2 m-2 h-full">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className={cn(
              "flex-1 min-h-[400px] bg-white text-black resize-none p-2 rounded border focus:outline-none focus:ring-2 focus:ring-transparent",
              jsonText
                ? isJsonParsable
                  ? isSchemaValid
                    ? "border-green-500 border-2"
                    : "border-red-500 border-2"
                  : "border-red-500 border-2"
                : "border-transparent"
            )}
            placeholder="Вставьте JSON для загрузки"
          />
          <CollectionsButton
            onClick={handleSubmitText}
            disabled={!isSchemaValid || isSubmitting}
            isLoading={isSubmitting}
            text="Загрузить JSON"
          />
          <CollectionsButton
            onClick={openPickerAndUpload}
            isLoading={isUploading}
            text="Прикрепить JSON файл"
          />
        </div>
      </div>
    </div>
  );
}
