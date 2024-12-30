import React from 'react'

interface LinkProps {
    id?: string
    className?: string
    href: string
    text: string
    onClick?: () => void
}

const Link: React.FC<LinkProps> = ({ id, className, href, text, onClick }) => {
    return (
        <a id={id} className={className} href={href} onClick={onClick}>
            {text}
        </a>
    )
}

export default Link