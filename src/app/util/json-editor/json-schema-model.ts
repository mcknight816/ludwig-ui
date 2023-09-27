
export interface Schema {
  type: string;
  title: string;
  description: string | null;
  properties: { [key: string ] : Schema } | undefined;
  required: Array<string> | null;
  format: string | null;
  value: any | null;
  meta: any | null;
  'default':any | null;
  enum: Array<any> | null;
}

