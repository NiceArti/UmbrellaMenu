import { Tag } from "../config/tags";
import { scrollToId } from "../utils";
import { hapticsImpactMedium } from "../utils/haptic-feedback";
import { Button } from "./button";


export function ScrollableButton({value, tag, className}:{value?: string, tag?: Tag, className?: string}) {
    return (
        <Button
            onTouchStart={async () => navigator.vibrate(200)}
            onClick={() => scrollToId(tag)}
            className={className} 
        >
            {value ?? "Click Me"}
        </Button>
    )
}
