"use client"

import { Title } from "@/shared/ui";
import { cn } from "@/shared/utils";

export function MenuPositions({ title, names, prices, tag, tableView }: { title?: string, names?: string[], prices?: string[], tag?: string, tableView?: boolean }) {
    return (
        <div id={tag} className='flex flex-col gap-5 w-full h-auto'>
            {names && prices ?
                <>
                    <Title title={title} />
                    {tableView ? 
                        <PositionsTableView names={names} prices={prices}/>
                    :
                        <div className="inline-flex justify-between">
                            {names && names.length ?
                                <Position
                                    className="grow max-w-[304px]"
                                    names={names}
                                />
                                :
                                <></>
                            }

                            {prices && prices.length ?
                                <Position
                                    className="border-l-2 border-primary max-w-20 w-20 justify-center items-end"
                                    names={prices}
                                />
                                :
                                <></>
                            }
                        </div>
                    }
                </>
                :
                <div className="inline-flex justify-between">
                    <Title title={title} />

                    {prices && prices.length ?
                        <Position
                            className="border-l-2 border-primary w-20 justify-center items-end max-w-[304px]"
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



const PositionsTableView = ({names, prices}:{names: string[], prices: string[]}) => {
    return (
        <table className="w-full">
            <tbody>
                {names.map((name, index) => (
                    <tr key={index} className="inline-flex justify-between w-full text-xl font-semibold tracking-wider">
                        <td className="grow max-w-[304px]">
                            {name}
                        </td>
                        <td className="border-l-2 border-primary min-w-[80px] w-20 justify-center items-end text-right">
                            {index < prices.length ? prices[index] : ""}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Position({names, className}:{names?: string[], className?: string}) {
    return (
        <div className={cn("flex flex-col gap-2 text-xl font-semibold tracking-wider", className)}>
            {names ?
                names.map((name, index) => 
                    <span key={index}>{name}</span>
                )
                :
                <span>Text</span>
            }
        </div>
    )
}