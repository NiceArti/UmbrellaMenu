import { Button } from "@/shared/ui";
import { Loader } from "lucide-react";

export function CollectionsButton({
  onClick,
  isLoading = false,
  disabled = false,
  text = "Скачать JSON",
}: {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        className={
          "relative h-8 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl rounded-none focus-visible:bg-red-950"
        }
        onClick={onClick}
        disabled={isLoading || disabled}
      >
        {!isLoading && <span>{text}</span>}
        {isLoading && (
          <span className="flex w-[110px] items-center justify-center gap-2 !text-sm flex-wrap">
            <Loader className="animate-spin" size={20} /> Загрузка
          </span>
        )}
      </Button>
    </div>
  );
}
