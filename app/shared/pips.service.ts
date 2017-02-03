import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChatDatePipe' })
export class ChatDatePipe implements PipeTransform {
    transform(value: String): String {
        let _re = value.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        return _re[4] + ":" + _re[5]
    }
}
