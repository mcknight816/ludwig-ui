export interface Flow {
  id:string | null;
  name:string | null;
  locked:boolean | null;
  activities:Array<FlowActivity> | null;
  connections:Array<Connection> | null;
  connectionMaps:Array<ConnectionMap> | null;
}
export interface FlowActivity {
  id:string | null;
  x:number | null;
  y:number | null;
  icon:string | null;
  name:string | null;
  category:string | null;
  description:string | null;
  activityClass:string | null;
  context:string | null;
  hasError:boolean | null;
  input:any | null;
  output:any | null;
}
export interface Connection {
  src:string | null;
  tgt:string | null;
}
export interface ConnectionMap {
  src:string | null;
  tgt:string | null;
  targetPath:ConnectionPath | null;
  sourcePath:ConnectionPath | null;
}
export interface ConnectionPath {
  flowActivityId:string | null;
  fieldType:string | null;
  path:string | null;
}

export interface Activity {
  icon:string | null;
  name:string | null;
  activityClass:string | null;
  category:string | null;
  input:any | null;
  output:any | null;
  fireAndForget:boolean | null;
  schema: any;
}
export interface ActivityConfig {


}
