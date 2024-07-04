type validReturnType = {
    valid: boolean,
    invalidReason?: string
}


export const validateUsername = (username: string): validReturnType => {
    if (username === "")
        return { valid: false, invalidReason: "Username must not be empty" }

    // check if username already exists, probably with Prisma

    return { valid: true }
}

export const validatePassword = (password: string) => {
    if (password === "")
        return { valid: false, invalidReason: "Password must not be empty" }

    if (password.length < 6)
        return { valid: false, invalidReason: "Password must be at least 6 characters" }

    return { valid: true }
}
