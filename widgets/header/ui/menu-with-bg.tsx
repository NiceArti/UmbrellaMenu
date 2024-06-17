import Image from 'next/image';
import { LogoAsset } from '@/shared/images';

export function MenuWithBg() {
    return (
        <div className='relative w-full'>
            <div className='w-full h-full'>
                <Image
                    className='w-full'
                    src={LogoAsset.src}
                    width={LogoAsset.width}
                    height={LogoAsset.height}
                    quality={100}
                    alt="Umbrella Logo"
                />
            </div>
            <h1 className="title absolute bottom-[25%] left-1/2 -translate-x-1/2 font-bold tracking-widest text-[3rem] md:text-[3.5rem] 2xl:text-[4rem]">
                Меню
            </h1>
        </div>
    )
}