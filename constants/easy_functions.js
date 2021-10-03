export const sanitizePhone = (number) => {
    return number.replace(/[^\d]/g, "").replace(/^.*(\d{10})$/, "$1");
}