import { forwardRef } from 'react'

interface LinkProps {
    id?: string
    className?: string
    href: string
    text: string | JSX.Element
    onClick?: () => void
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ id, className, href, text, onClick }, ref) => {
    return (
        <a id={id} className={className} href={href} onClick={onClick} ref={ref}>
            {text}
        </a>
    )
})

export default Link