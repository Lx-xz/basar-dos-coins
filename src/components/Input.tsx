import { forwardRef, useState } from 'react'

interface InputProps {
    id?: string
    className?: string
    name: string
    type: string
    placeholder?: string
    onChange?: (() => void) | ((e: any) => void)
    icon?: string
    min?: number
    max?: number
    step?: number
    value?: string | number
}

const Input = forwardRef<HTMLInputElement, InputProps>(({id, className, name, type, placeholder, onChange, icon, min, max, step, value }, ref) => {
    const i = `fi fi-sr-${icon}`

    const lowercased = () => {
        if (name === 'email') {
            return 'lowercase'
        }
        else {
            return 'none'
        }
    }
    
    let [eye, setEye] = useState('fi fi-rs-eye')
    let [inputType, setType] = useState(type)
    const peakPassword = () => {
        if (name === 'password') {
            return (
                <button type='button' className='btPeakPassword' onClick={() => {
                    if (eye === 'fi fi-rs-eye') {
                        setEye('fi fi-rs-crossed-eye')
                        setType('text')
                    }
                    else {
                        setEye('fi fi-rs-eye')
                        setType('password')
                    }
                }}>
                    <i className={eye}></i>
                </button>
            )
        }
    }

    return (
        <i className={i} style={{display:'flex', alignItems:'center', gap: '1rem', position: 'relative'}}>
            <input
                id={id}
                className={className}
                name={name}
                type={inputType}
                placeholder={placeholder}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                value={value}

                ref={ref}

                style={{textTransform: lowercased()}}
            />

            {peakPassword()}
        </i>
    )
})

export default Input