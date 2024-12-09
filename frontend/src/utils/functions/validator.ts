interface IsValidPassword {
    isValidLength: boolean,
    hasUppercase: boolean,
    hasLowercase: boolean,
    hasDigit: boolean,
    hasSpecialChar: boolean,
    isValidPwd: boolean
}

export const isValidPassword = (password: string): IsValidPassword => {
    const isValidLength = /^.{12,}$/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\\\/]/.test(password);
    const isValidPwd = isValidLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar
    return { isValidLength, hasUppercase, hasLowercase, hasDigit, hasSpecialChar, isValidPwd }
}