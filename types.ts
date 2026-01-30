
export type FileType = 'html' | 'css' | 'javascript';

export type ViewType = 'editor' | 'privacy' | 'terms' | 'disclaimer' | 'contact';

export interface ProjectFiles {
  html: string;
  css: string;
  javascript: string;
}

export interface ProjectMetadata {
  name: string;
  lastSaved: string;
}
