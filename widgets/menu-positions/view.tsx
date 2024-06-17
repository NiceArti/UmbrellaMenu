"use client"

import { Position, Title } from "./ui"

export function MenuPositions({title, names, prices, tag}:{title?: string, names?: string[], prices?: string[], tag?: string}) {
    return (
        <div id={tag} className='flex flex-col gap-5 w-full h-auto'>
            {names && prices ?
                <>
                    <Title title={title}/>
                    <div className="inline-flex justify-between">
                        {names && names.length ?
                            <Position 
                                className="grow"
                                names={names}
                            />
                            :
                            <></>
                        }

                        {prices && prices.length ?
                            <Position 
                                className="border-l-2 border-primary w-24 justify-center items-center"
                                names={prices}
                            />
                            :
                            <></>
                        }
                    </div>
                </>
            :
            <div className="inline-flex justify-between">
                <Title title={title}/>

                {prices && prices.length ?
                    <Position 
                        className="border-l-2 border-primary w-24 justify-center items-center"
                        names={[prices[0]]}
                    />
                    :
                    <></>
                }
            </div>
            }
            
        </div>
    )
}