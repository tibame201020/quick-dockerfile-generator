import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DockerfileService {
  dockerFileContent = '';
  constructor() { }

  generateDockerFileContent(obj: any) {
    let dockerFileContent = '';
    if (obj.builderEnv && obj.builderSourceDir && obj.builderRun) {
      if (obj.builderEnv) {
        dockerFileContent = 'FROM ' + obj.builderEnv + ' as builder'
      }
      dockerFileContent = dockerFileContent + '\r\n';
      if (obj.builderSourceDir) {
        dockerFileContent = dockerFileContent + 'COPY ' + obj.builderSourceDir + ' /buildDir'
      } else {
        dockerFileContent = dockerFileContent + 'COPY . /buildDir'
      }
      dockerFileContent = dockerFileContent + '\r\n';
      dockerFileContent = dockerFileContent + 'WORKDIR /buildDir';
      dockerFileContent = dockerFileContent + '\r\n';
      if (obj.builderRun) {
        dockerFileContent = dockerFileContent + 'RUN ' + obj.builderRun;
      } else {
        dockerFileContent = dockerFileContent + 'RUN ' + '${what ur package commad}';
      }
      dockerFileContent = dockerFileContent + '\r\n';
    }
    if (obj.containerEnv) {
      dockerFileContent = dockerFileContent + 'FROM ' + obj.containerEnv;
    } else {
      dockerFileContent = dockerFileContent + 'FROM ' + '${where ur container env}';
    }
    dockerFileContent = dockerFileContent + '\r\n';

    if (obj.containerSource && obj.containerTarget) {
      dockerFileContent = dockerFileContent + 'COPY ' + obj.containerSource + ' ' + obj.containerTarget;
    } else {
      dockerFileContent = dockerFileContent + 'COPY ${where ur container source} ${where ur container target}';
    }

    if (obj.containerRun) {
      dockerFileContent = dockerFileContent + '\r\n';
      dockerFileContent = dockerFileContent + 'RUN ' + obj.containerRun;
    }

    if (!obj.containerEnv.includes('nginx')) {
      dockerFileContent = dockerFileContent + '\r\n';
      dockerFileContent = dockerFileContent + 'WORKDIR /app';
    }
    dockerFileContent = dockerFileContent + '\r\n';

    if (obj.containerEnv.includes('nginx')) {
      dockerFileContent = dockerFileContent + `COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf.template` + '\r\n';
      dockerFileContent = dockerFileContent + 'CMD '
      dockerFileContent = dockerFileContent + obj.containerEntry;
    } else {
      if (obj.containerEntry.length) {
        let arr = obj.containerEntry.split(",");
        dockerFileContent = dockerFileContent + 'ENTRYPOINT ['
        arr.forEach((element: string) => {
          dockerFileContent = dockerFileContent + "\"" + element.trim() + "\", "
        });
        dockerFileContent = dockerFileContent.substring(0, dockerFileContent.length - 2);
        dockerFileContent = dockerFileContent + ']';
      } else {
        dockerFileContent = dockerFileContent + 'ENTRYPOINT ${ur entryPoint}';
      }
    }

    return dockerFileContent;
  }

  generateDockerBuild(obj: any) {

    if (obj.imageName) {
      return 'docker build -t ' + obj.imageName +' .';
    } else {
      return 'docker build -t ${u want docker image name} .';
    }
  }
  generateDockerRun(obj: any) {
    let command = 'docker run -it ';
    if (obj.applicationPort && obj.exposePort) {
      command = command + '-p ' + obj.exposePort + ':' + obj.applicationPort + ' '
    }
    if (obj.imageName) {
      command = command + obj.imageName;
    } else {
      command = command + '${ur docker image name}'
    }

    return command;
  }
}
