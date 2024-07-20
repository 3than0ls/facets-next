import React from 'react'
import { useFormStatus } from 'react-dom'
import { TbSend, TbLoader2 } from 'react-icons/tb'

type SendButtonProps = {
    disabled: boolean
    className: string
}

const SendButton = ({ disabled, className }: SendButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <button disabled={disabled} type="submit" className={className}>
            {pending ? (
                <TbLoader2
                    size={24}
                    color="white"
                    className="m-1 animate-spin"
                />
            ) : (
                <TbSend size={24} color="white" className="m-1" />
            )}
        </button>
    )
}

export default SendButton
