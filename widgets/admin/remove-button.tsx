import { cn } from "@/shared/utils";

export function RemoveButton({
    title,
    className,
    onClick,
}: {
    title?: string,
    className?: string,
    onClick?: () => void,
}) {

    return (
        <button
            type="button"
            className={cn("px-2 py-1 border text-sm", className)}
            onClick={onClick}
            aria-label="Удалить"
            title={title ?? "Удалить"}
        >
            ✖ {title}
        </button>
    );
}