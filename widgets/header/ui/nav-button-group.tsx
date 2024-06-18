import { Tag } from "@/shared/config/tags";
import { ScrollableButton } from "@/shared/ui";


export function NavButtonGroup(props?: Props) {
    return (
        <div className='flex flex-wrap w-full gap-1 h-auto'>
            {props && props.items.length ? 
                props.items.map((item, index) => 
                    <ScrollableButton
                        key={index}
                        tag={item.tag}
                        value={item.text}
                        className="grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl w-1/4 rounded-none focus-visible:bg-red-950" 
                    />
                )
            :
                <span className="inline-flex grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl w-full justify-center items-center" id="menu">Меню</span>
            }
        </div>
    )
}

interface Props {
    items: {
        text: string,
        tag: Tag,
    }[]
}