export interface KnowledgeBase {
  id: string | undefined;
  name:string | null;
  openAiConfig: string | undefined;
  description: string | null;
}

export interface Knowledge {
  id: string | undefined;
  baseId: string | undefined;
  text:string | undefined;
  description:string | undefined;
  processed:boolean;
}
