
import Hookah from '../../app/Hookah/Hookah';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

import { PageLayout } from '@/shared/ui';
import { MenuPositions } from '@/widgets/menu-positions';
import { additivesForTeaAndCoffee, beer, blackTeas, chineseTeas, coffee, coldDrinks, glintwein, greenTeas, hotTeas, laysStax, lemonades, mangoshake, matchaLatte, milkshakes, ratte, snacks, teaDrinks } from '@/shared/config/positions';

export function HomePage() {
    return (
        <PageLayout className='bg-stone-texture gap-24'>
            <Header />
            <Hookah />

            <div className='flex flex-col gap-20 w-full px-8'>
                {[
                    coffee,
                    ratte,
                    matchaLatte,
                    glintwein,
                    additivesForTeaAndCoffee,
                    lemonades,
                    chineseTeas,
                    blackTeas,
                    greenTeas,
                    coldDrinks,
                    milkshakes,
                    mangoshake,
                    snacks,
                    laysStax,
                    beer,
                ].map((position, index) => 
                    <MenuPositions
                        key={index}
                        tag={position.tag}
                        title={position.title}
                        names={position.names} 
                        prices={position.prices}
                    />
                )}
            </div>

            <Footer />
        </PageLayout>
    )
}
