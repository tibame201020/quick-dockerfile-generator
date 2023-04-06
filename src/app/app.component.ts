import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quick-dockerfile-generator';
  mainCodeBlock = ' ';
  buildCommand = '';
  runCommand = ' ';
  type = 'shell'
  generator_type ='dockerfile';
  constructor(){}
  nginxExternal = false;

  changeGeneratorType(generator_type:string) {
    this.generator_type = generator_type;
    this.mainCodeBlock = ' ';
    this.buildCommand = '';
    this.runCommand = ' ';
  }

  addDockerFileContent(dockerFileContent: string) {

    if (dockerFileContent.includes('nginx')) {
      this.nginxExternal = true;
    } else{
      this.nginxExternal = false;
    }

    this.mainCodeBlock = dockerFileContent;
  }
  addDockerBuildCommand(command:string) {
    this.buildCommand = command;
  }
  addDockerRunCommand(command: string){
    this.runCommand = command;
  }

}
