import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragEnd, CdkDragMove, CdkDragStart, Point} from "@angular/cdk/drag-drop";
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../services/app-model";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  @Output('add-activity-event') addActivityEvent = new EventEmitter<{activity:Activity,location:Point}>();

  constructor(private activityService: ActivityService ) { }
  types:any[] = [{text:"Activity"},{text:'Actvivty 2'}]
  activities:Map<string | null,Array<Activity>> = new Map<string, Array<Activity>>();
  placeHolder:HTMLElement | null = null;
  ngOnInit(): void {
    this.placeHolder =  document.getElementById('place-holder');
    this.hidePlaceHolder();
    this.activityService.list().subscribe(activities=>{
      activities.forEach(a=> {
        if(!this.activities.has(a.category)){
          this.activities.set(a.category,[]);
        }
        this.activities.get(a.category)?.push(a);
      });
    });
  }

  hidePlaceHolder(){
    if(this.placeHolder){
      this.placeHolder.style.display = "none";
    }
  }
  showPlaceHolder(){
    if(this.placeHolder){
      this.placeHolder.style.display = "block";
    }
  }
  dragMoved(event: CdkDragMove<any>) {
      console.log(event.pointerPosition.x + "," + event.pointerPosition.y);
      if(this.placeHolder){
        this.placeHolder.style.left = String(event.pointerPosition.x - 25) + 'px';
        this.placeHolder.style.top = String(event.pointerPosition.y -85) + 'px';
      }
  }

  dragStart(event: CdkDragStart) {
    this.showPlaceHolder();
  }

  dragEnd(event: CdkDragEnd) {
    this.addActivityEvent.emit({activity:event.source.data,location:{x:event.dropPoint.x,y:event.dropPoint.y}});
    this.hidePlaceHolder();
  }
}
