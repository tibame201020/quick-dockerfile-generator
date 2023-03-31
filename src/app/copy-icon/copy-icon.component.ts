import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-icon',
  templateUrl: './copy-icon.component.html',
  styleUrls: ['./copy-icon.component.css']
})
export class CopyIconComponent {
  @Input() text!: string;
  copy_status: string = 'content_copy';
  copy_text = 'copy';
  copyState = false;
  constructor(private clipboardService: ClipboardService) { }

  copyCode() {
    if (this.copyState) {
      return;
    }

    this.copyState = true;
    this.copy_text = 'copied!';
    this.copy_status = 'playlist_add_check';
    this.clipboardService.copy(this.text);

    this.resumeCopyStatus()
  }

  resumeCopyStatus() {
    setTimeout(() => {
      this.copy_text = 'copy';
      this.copy_status = 'content_copy';
      this.copyState = false;
    }, 800);
  }
}
