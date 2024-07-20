type validReturnType = {
    valid: boolean
    invalidReason?: string
}

export const validateTitle = (title: string): validReturnType => {
    if (title === '')
        return { valid: false, invalidReason: "Title can't be empty" }

    if (title.length > 50)
        return { valid: false, invalidReason: 'Title too long' }

    return { valid: true }
}

export const validateText = (text: string) => {
    if (text === '')
        return { valid: false, invalidReason: 'Message must not be empty' }

    if (text.length > 500)
        return {
            valid: false,
            invalidReason: 'Text too long',
        }

    return { valid: true }
}
