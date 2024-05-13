import dayjs from "dayjs";
export const getCurrentYear = (): number => {
    return dayjs().year()
}