import { Tag } from "../config/tags";
import { scrollToId } from "../utils";
import { Button } from "./button";


export function ScrollableButton({value, tag, className}:{value?: string, tag?: Tag, className?: string}) {
    return (
        <Button
            onClick={() => scrollToId(tag)}
            className={className} 
        >
            {value ?? "Click Me"}
        </Button>
    )
}
