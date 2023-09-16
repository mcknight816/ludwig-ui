import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {Router} from "@angular/router";
import {Plan} from "../../auth/saasy-service";

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls      : ['./pricing-plan.component.scss'],
  encapsulation  : ViewEncapsulation.None,
})
export class PricingPlanComponent implements OnInit {
    yearlyBilling: boolean = true;
    @Input()
    plans: Array<Plan>=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  subscribe(plan:Plan) {
      this.router.navigateByUrl('/subscribe/' + plan.planId);
  }
}
