import { Pipe, PipeTransform } from '@angular/core';
import { marked } from "marked";
import { DomSanitizer } from "@angular/platform-browser";
@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any): any {
    if (value && value.length > 0) {
      return this.sanitizer.bypassSecurityTrustHtml(marked(value));
    }
    return value;
  }
}
