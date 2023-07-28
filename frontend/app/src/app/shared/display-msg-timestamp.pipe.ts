import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayMsgTimestamp'
})
export class DisplayMsgTimestampPipe implements PipeTransform {

  transform(value: Date): string {
    const day = value.getDate();
    const month = value.getMonth() + 1; // JavaScript months are 0-based counting
    const year = value.getFullYear();
    const hours = value.getHours();
    const minutes = value.getMinutes();
    const formattedDate = `sent the ${day}/${month}/${year} at ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    return formattedDate;
  }
}
