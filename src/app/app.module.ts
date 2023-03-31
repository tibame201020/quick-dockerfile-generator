import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CopiedBoardComponent } from './copied-board/copied-board.component';
import { CopyIconComponent } from './copy-icon/copy-icon.component';
import { DockerfileGeneratorComponent } from './dockerfile-generator/dockerfile-generator.component';
import { DockerComposeGeneratorComponent } from './docker-compose-generator/docker-compose-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    CopiedBoardComponent,
    CopyIconComponent,
    DockerfileGeneratorComponent,
    DockerComposeGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
