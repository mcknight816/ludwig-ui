

export interface FlowConfig {
  id: string | null;
  name:string | null;
  configClass: string | null;
  config:any;
}

export interface ActivityConfig {
  name: string | null;
  configClass:string | null;
  category: string | null;
  schema:any;
}

export interface ConfigTestResult {
    success : boolean;
    error : boolean;
    warning: boolean;
    message : string;
    hint: string;
}
