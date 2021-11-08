export const requiredField = (value: string) => {
    if (value) return undefined
    return "Field is required"
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    console.log(value)
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}