import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copied-board',
  templateUrl: './copied-board.component.html',
  styleUrls: ['./copied-board.component.css']
})
export class CopiedBoardComponent {
  @Input() type!: string;
  @Input() text!:string;
  copy_status:string = 'copy_all';
  constructor(private clipboardService: ClipboardService) { }

  copyCode() {
    this.clipboardService.copy(this.text);
  }

}
