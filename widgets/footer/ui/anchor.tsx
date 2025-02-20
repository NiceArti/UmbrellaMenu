import { InstagramAsset } from "@/shared/images";
import { Url } from "next/dist/shared/lib/router/router";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";


export function Anchor({href, item, text, target}:{href?: Url, item?: StaticImageData, text?: string, target?: HTMLAttributeAnchorTarget}) {
    return (
        <Link href={href ?? "#"} target={target} className="inline-flex gap-6 items-center text-xl font-semibold tracking-wide">
            <Image
                src={item ? item.src : InstagramAsset.src}
                width={item ? item.width : InstagramAsset.width}
                height={item ? item.height : InstagramAsset.height}
                alt="Anchor"
                quality={100}
            />
            <span>{text ?? "Instagram"}</span>
        </Link>
    )
}
