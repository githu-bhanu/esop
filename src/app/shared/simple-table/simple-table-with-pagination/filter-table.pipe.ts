import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// tslint:disable:ter-prefer-arrow-callback no-parameter-reassignment align

@Pipe({
  name: 'filterTable',
  pure: false,
})
export class FilterTablePipe implements PipeTransform {

  transform(items: any, filter: any, searchProp?: any): any {
    if (!filter) {  
      return items;
    }
    if (!Array.isArray(items)) {
      return items;
    }
    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      if (!filterKeys.length) {
        return items;
      }
      return items.filter((item) => {
        return filterKeys.some((keyName) => {
          if (item[keyName] && item[keyName].constructor === Object) {
            return new RegExp(filter[keyName], 'gi').test(item[keyName][searchProp]) || filter[keyName] === '';
          }
          return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '';

        });
      });

    }
  }
}


@Pipe({
  name: 'dateTransForm'
})
export class DateTransFormPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, format?: string): any {
      if (!value) {
          return '';
      }
      format = format || 'short';
      if (value.constructor === Array) {
          if (value.length) {
              const firstIndValue = value[0] ? new Date(value[0]) : '';
              const secondIndValue = value[1] ? new Date(value[1]) : '';
              return (firstIndValue ? this.datePipe.transform(new Date(value[0]), format) : '') + ' - ' + (secondIndValue ? this.datePipe.transform(value[1], format) : '');
          }
          return [];
      }
      if (value.constructor === Date) {
          return value && typeof (value) === 'object' ? this.datePipe.transform(value, format) : '';
      }
      if (value && typeof (value) === 'object') {
          return this.datePipe.transform(new Date(value), format);
      }
      if (value && typeof (value) === 'string') {
          const dateValue = new Date(value).getTime();
          if (isNaN(dateValue)) {
              return value;
          }
          return this.datePipe.transform(new Date(value), format);
      }
      if (value && typeof (value) === 'number') {
          const intLength = this.getlength(value);
          if (intLength === 13) {
              return this.datePipe.transform(new Date(value), format);
          }
          if (intLength === 10) {
              const dateValue = value * 1000;
              return this.datePipe.transform(new Date(dateValue), format);
          }
      }
      return '';
  }

  getlength(number) {
      return number.toString().length;
  }
}