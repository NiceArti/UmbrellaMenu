export function scrollToId(id?: string) {
    if(!id) {
        return;
    }

    
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView({behavior: 'smooth'});
    }
}