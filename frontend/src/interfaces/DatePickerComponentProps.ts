import { Dayjs } from "dayjs";

export interface DatePickerComponentProps {
    label: string;
    onDateChange?: (date: Dayjs | null) => void;
    initialDate?: Dayjs | null;
}