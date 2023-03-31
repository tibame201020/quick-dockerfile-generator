import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DockerfileService } from '../dockerfileGenerator.service';


@Component({
  selector: 'app-dockerfile-generator',
  templateUrl: './dockerfile-generator.component.html',
  styleUrls: ['./dockerfile-generator.component.css']
})
export class DockerfileGeneratorComponent {
  @Output() dockerFileContent = new EventEmitter<string>();
  @Output() dockerBuildCommand = new EventEmitter<string>();
  @Output() dockerRunCommand = new EventEmitter<string>();

  formGroup: FormGroup = this.formBuilder.group({
    imageName:[''],
    builderEnv: [''],
    builderSourceDir: [''],
    builderRun:[''],
    containerEnv:[''],
    containerSource:[''],
    containerTarget: [''],
    containerRun: [''],
    containerEntry:[''],
    applicationPort:[''],
    exposePort:['']
  });
  constructor(private formBuilder: FormBuilder, private dockerfileService:DockerfileService) { }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(
      (value) => {
        this.dockerFileContent.emit(this.dockerfileService.generateDockerFileContent(value));
        this.dockerBuildCommand.emit(this.dockerfileService.generateDockerBuild(value))
        this.dockerRunCommand.emit(this.dockerfileService.generateDockerRun(value))
      }
    )
  }

  modifySpringbootTemplate() {
    this.formGroup.patchValue({
      imageName:'backendImg',
      builderEnv:'maven:3.6.3-jdk-8',
      builderSourceDir: '.',
      builderRun: 'mvn clean package -Dmaven.test.skip=true',
      containerEnv: 'openjdk:8-jdk-alpine',
      containerSource: '--from=builder /buildDir/target/springboot.jar',
      containerTarget: 'springboot.jar',
      containerRun: '',
      containerEntry: ["java", "-jar", "springboot.jar"],
      applicationPort: '8080',
      exposePort: '8081',
    });
  }

  modifyAngularTemplate() {
    this.formGroup.patchValue({
      imageName: 'frontImg',
      builderEnv: '',
      builderSourceDir: '.',
      builderRun: '',
      containerEnv: '',
      containerSource: '',
      containerTarget: '',
      containerRun: '',
      containerEntry: [],
      applicationPort: '',
      exposePort: '',
    });
  }
}
