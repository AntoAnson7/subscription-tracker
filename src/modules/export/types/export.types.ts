export type ExportFormat = 'csv' | 'print';

export type ExportScope = 'all' | 'active' | 'family';

export interface ExportConfig {
  format: ExportFormat;
  scope: ExportScope;
  includeNotes: boolean;
}
