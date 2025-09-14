import { Button } from "@/shared/ui";
import { Loader } from "lucide-react";

export function CollectionsButton({
  onClick,
  isLoading = false,
  isError = false,
  text = "Скачать JSON",
}: {
  onClick?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  text?: string;
}) {
  return (
    <div className="relative">
      <Button
        className="absolute left-1/2 bottom-[70px] -translate-x-1/2 h-8 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl rounded-none focus-visible:bg-red-950"
        onClick={onClick}
        disabled={isLoading}
      >
        {!isLoading && <span>{text}</span>}
        {isLoading && (
          <span className="flex flex-row items-center justify-center gap-2 !text-sm flex-wrap">
            <Loader className="animate-spin" size={20} /> Загрузка
          </span>
        )}
      </Button>
      {isError && !isLoading && (
        <span className="absolute left-1/2 font-semibold bottom-[40px] -translate-x-1/2 text-red-500">
          Ошибка, повторите попытку...
        </span>
      )}
    </div>
  );
}
