import Image from 'next/image';
import { UnionAsset, HookahAsset } from '@/shared/images';
import { Title } from '@/shared/ui';


export default function Hookah() {
    return (
        <div className='w-full px-8'>
            <Title title='Кальяны'/>

            <div className='flex flex-col'>
                <div className='inline-flex items-center justify-between h-14'>
                    <div className='inline-flex gap-2 w-1/3'>
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>   
                        <Image src={UnionAsset} alt='human'/>
                    </div>
                    <p className='text-center text-xl font-semibold w-1/3 leading-tight'>
                        1-3<br/>чел.
                    </p>
                    <div className='w-1/3'>
                        <Image src={HookahAsset} alt='hookan'/>
                    </div>

                    <p className='h-full text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 py-3'>
                        1500
                    </p>
                </div>

                <div className='inline-flex items-center justify-between h-14'>
                    <div className='inline-flex gap-2 w-1/3'>
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>   
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>
                    </div>
                    <p className='text-center text-lg font-semibold w-1/3 flex flex-col leading-tight'>
                        4-6<br />чел.
                    </p>
                    <div className='w-1/3 inline-flex gap-2'>
                        <Image src={HookahAsset} alt='hookan'/>
                        <Image src={HookahAsset} alt='hookan'/>
                    </div>

                    <p className='h-full text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 py-3'>
                        2700
                    </p>
                </div>

                <div className='inline-flex items-center justify-between h-14'>
                    <p className='text-left text-lg font-semibold w-full flex flex-col leading-tight'>
                        Электронный кальян ENSO
                    </p>

                    <p className='h-full text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 py-3'>
                        2500
                    </p>
                </div>

            </div>

            <p className='text-center text-sm italic tracking-wider mt-12'>
                Ограничение времени бронирования стола - 90 мин.<br />
                Отсчёт времени начинается после подачи кальяна.<br />
                Курит гость или нет - цена кальяна не меняется.
            </p>
        </div>
    )
}
