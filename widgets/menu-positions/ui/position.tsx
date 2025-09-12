import { cn } from "@/shared/utils";

export function Position({
  names,
  className,
}: {
  names?: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-xl font-semibold tracking-wider",
        className
      )}
    >
      {names ? (
        names.map((name, index) => <span key={index}>{name}</span>)
      ) : (
        <span>Text</span>
      )}
    </div>
  );
}
