export function scrollToId(id?: string) {
    if(!id) {
        return;
    }
    
    const el = document.getElementById(id);

    if (el) {
        el.classList.remove("blink");
        el.scrollIntoView({behavior: 'smooth', block: "center"});
        el.classList.add("blink");
    }
}