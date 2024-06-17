"use client"

import { navItems } from '@/shared/config';
import { MenuWithBg, NavButtonGroup } from './ui';


export function Header() {
    return (
        <div className='flex flex-col gap-1 justify-between relative w-full h-auto'>
            <MenuWithBg />
            <NavButtonGroup items={navItems} />
        </div>
    )
}