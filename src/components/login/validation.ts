
export const usernameIsValid = (username: string): boolean => username !== ""

export const passwordIsValid = (password: string): boolean => password !== ""

export const newUsernameIsUnique = (username: string): boolean => {
    return false
}