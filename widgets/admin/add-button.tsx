import { cn } from "@/shared/utils";

export function AddButton({
    className,
    onClick,
    title = "Добавить строку"
}:{
    title?: string
    className?: string,
    onClick?: () => void,
}) {
    return (
        <button
            type="button"
            className={cn("px-3 py-1 border", className)}
            onClick={onClick}
        >
            ➕ {title}
        </button>
    );
}