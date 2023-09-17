
export class FlowIcons {

  public static iconMap:any = {
    'mongofind':'energy_savings_leaf',
    'mongosave':'energy_savings_leaf',
    'mongoget':'energy_savings_leaf',
    'mongodelete':'energy_savings_leaf',
    'mongocolumns':'energy_savings_leaf',
    'couchfind':'download',
    'couchsave':'download',
    'couchget':'download',
    'couchdelete':'download',
    'couchcolumns':'download',
    'post':'send',
    'get':'arrow_left_alt',
    'getbyid':'reply',
    'columns':'toc',
    'delete':'delete',
    'copyfile':'file_copy',
    'httpresponse':'http',
    'input':'input',
    'conduit':'settings',
    'couch':'download',
    'files':'description',
    'output':'output',
    'sql':'table_rows_narrow',
    'timer':'timer',
    'upload':'upload',
    'file':'file_open',
    'hotfolder':'folder_open',
    'listener':'energy_savings_leaf',
    'counter':'exposure_plus_1',
    'javascript':'javascript',
    'template':'article',
    'mail':'mail',
    'validation':'verified',
    'httpclient':'http',
    'publisher':'publish',
  };
  public static get(icon: string | null): string {
    return icon && this.iconMap[icon.toLowerCase()] ? this.iconMap[icon.toLowerCase()] : 'settings';
  }

}
