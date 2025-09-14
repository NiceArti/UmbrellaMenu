import { CollectionsButton } from "@/components/collections-button/collections-button";

export function UploadFileButton({
  onClick,
  text = "Загрузить JSON",
}: {
  onClick?: () => void;
  text?: string;
}) {
  return <CollectionsButton onClick={onClick} text={text} />;
}
