import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';

import {Router} from "@angular/router";
import {MatCarouselSlideComponent} from "../carousel/carousel-slide/carousel-slide.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public slides = [
        {image:'assets/images/carousel/header_one.jpg',
            header:"FEATURE 1 HEADER",
            text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            action:"action1",
            buttonText:"Take Action"},
        {image:'assets/images/carousel/header_two.jpg',
            header:"FEATURE 2 HEADER",
            text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            action:"action2",
            buttonText:"Take Action"}
        ];

     @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<MatCarouselSlideComponent>;

    takeAction(action:any){
      switch(action){
        case 'action1': this.router.navigate(['/dashboard']); break;
        case 'action2': this.router.navigate(['/dashboard']); break;
      }

    }

    constructor(private router: Router) {
      this.carouselSlides = new QueryList<MatCarouselSlideComponent>();
    }

  ngOnInit() {
  }

}
