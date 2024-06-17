export function Title({title}:{title?: string}) {
    return <h1 className='text-primary font-bold text-3xl'>{title ?? "Title"}</h1>
}