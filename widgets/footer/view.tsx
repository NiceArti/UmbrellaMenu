"use client";

import {
  ArrowAsset,
  InstagramAsset,
  LocationAsset,
  PhoneAsset,
} from "@/shared/images";
import { Button } from "@/shared/ui";
import Image from "next/image";
import { Anchor } from "./ui";
import { scrollToId } from "@/shared/utils";

export function Footer() {
  return (
    <div className="flex flex-col gap-12 w-full outline-none">
      <div className="px-8">
        <Button
          onClick={() => scrollToId("hookah")}
          className="inline-flex gap-6 items-baseline text-xl w-fit h-fit bg-transparent hover:bg-transparent p-0 tracking-widest"
        >
          <Image
            src={ArrowAsset.src}
            width={ArrowAsset.width}
            height={ArrowAsset.height}
            alt="Arrow Up"
            quality={100}
          />
          <span>Наверх</span>
        </Button>
      </div>

      <div className="flex flex-col gap-2 px-8">
        <Anchor
          target="_blank"
          href={"https://yandex.com/maps/-/CHu4iUM3"}
          item={LocationAsset}
          text={"20-летия октября, 103"}
        />

        <Anchor
          target="_blank"
          href={"https://instagram.com/umbrella_vrn?igshid=MTk0NTkyODZkYg=="}
          item={InstagramAsset}
          text={"Umbrella_vrn"}
        />

        <Anchor
          href={"tel:+74732286758"}
          item={PhoneAsset}
          text={"228 67 58"}
        />
      </div>

      <div className="inline-flex bg-primary h-20 w-full justify-center items-center text-2xl font-bold tracking-widest">
        <span>Желаем приятного отдыха!</span>
      </div>
    </div>
  );
}
