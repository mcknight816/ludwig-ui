import {Component, OnInit} from '@angular/core';
import SwaggerUI from 'swagger-ui';
import {ApplicationService} from "../../services/application.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OpenApiService} from "../../services/open-api.service";
@Component({
  selector: 'app-app-open-api',
  templateUrl: './app-open-api.component.html',
  styleUrls: ['./app-open-api.component.scss']
})
export class AppOpenApiComponent implements OnInit{
  constructor(private openApiService: OpenApiService, private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('appId');
    if (id) {
      this.openApiService.getApiJson(id).subscribe(d=>{
        SwaggerUI({
          domNode: document.getElementById('swagger-ui-item'),
          spec:d
         // url: 'https://petstore.swagger.io/v2/swagger.json'
        });
      });
    }
  }

}
