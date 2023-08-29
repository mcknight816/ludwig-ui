import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService:AuthService,private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.authService.redirect(p).subscribe((redirect)=>{
        setTimeout(() => {
          if(redirect.isUrl){
            this.router.navigateByUrl(decodeURIComponent(redirect && redirect.loc ? redirect.loc : '/'));
          }else{
            this.router.navigate([redirect.loc]);
          }
        },500);
      });
    });
  }

}
