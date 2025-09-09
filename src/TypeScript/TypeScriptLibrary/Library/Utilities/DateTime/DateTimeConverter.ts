import type { DateTime } from 'luxon';
export class DateTimeConverter {

    public toBinary(dateTime: DateTime): number
    {
        const utc = dateTime.toUTC();
        return 0;
    }
}