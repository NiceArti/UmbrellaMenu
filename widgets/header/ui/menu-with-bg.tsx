import Image from "next/image";
import { LogoAsset } from "@/shared/images";
import { CollectionsButton } from "@/components/collections-button/collections-button";
import { useDownloadFile } from "@/components/collections-button/hooks/use-download-file";
import {
  COLLECTIONS_FILE_NAME,
  COLLECTIONS_FILE_PATH,
} from "@/shared/constants";
import { UploadFileButton } from "@/widgets/upload-file-modal/upload-file-button";
import { useState } from "react";
import { UploadFileModal } from "@/widgets/upload-file-modal/upload-file-modal";

export function MenuWithBg({
  title = "Меню",
  isEditMode,
}: {
  title?: string;
  isEditMode?: boolean;
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { downloadFile, isLoading } = useDownloadFile();

  return (
    <div className="relative w-full">
      <div className="w-full h-full">
        <Image
          className="w-full"
          src={LogoAsset.src}
          width={LogoAsset.width}
          height={LogoAsset.height}
          quality={100}
          alt="Umbrella Logo"
        />
      </div>
      <h1 className="title absolute bottom-[25%] left-1/2 -translate-x-1/2 font-bold tracking-widest text-[3rem] md:text-[3.5rem] 2xl:text-[4rem]">
        {title}
      </h1>
      {isEditMode && (
        <div className="absolute bottom-[11%] left-1/2 -translate-x-1/2 flex gap-4 md:gap-10">
          <CollectionsButton
            onClick={() =>
              downloadFile(COLLECTIONS_FILE_PATH, COLLECTIONS_FILE_NAME)
            }
            isLoading={isLoading}
            text="Скачать JSON"
          />
          <UploadFileButton onClick={() => setIsUploadModalOpen(true)} />
        </div>
      )}
      <UploadFileModal
        onClose={() => setIsUploadModalOpen(false)}
        isOpen={isUploadModalOpen}
      />
    </div>
  );
}
