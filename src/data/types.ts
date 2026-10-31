// Shared types for ARCHAEOLOGIST OS

export type EvidenceStatus = 'Verified' | 'Disputed' | 'Fragmentary' | 'Lost';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Unknown';

export interface Discovery {
  id: string;
  name: string;
  region: string;
  period: string;
  dateRange: string;
  category: string;
  significance: string;
  principles: string;
  evidence: EvidenceStatus;
  summary: string;
  description: string[];
  references: string[];
  /** slug used to resolve an illustration glyph */
  glyph: string;
  color: string;
}

export interface ArchiveDoc {
  id: string;
  title: string;
  author: string;
  year: string;
  category:
    | 'Manuscript'
    | 'Blueprint'
    | 'Illustration'
    | 'Patent'
    | 'Diagram'
    | 'Material Record';
  period: string;
  language: string;
  pages: number;
  abstract: string;
  fiction: boolean;
  glyph: string;
}

export interface ReconstructionTech {
  id: string;
  name: string;
  overview: string;
  methods: string[];
  materials: { name: string; spec: string; note: string }[];
  principles: string[];
  components: {
    id: string;
    name: string;
    role: string;
    material: string;
    status: 'Complete' | 'In Progress' | 'Hypothetical';
  }[];
  buildSteps: string[];
  progress: number;
}

export interface CaseFile {
  id: string;
  title: string;
  subject: string;
  status: 'Open' | 'Active' | 'Cold' | 'Closed';
  created: number;
  updated: number;
  notes: { id: string; text: string; created: number }[];
  linkedDiscoveries: string[];
  reconstructProgress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'gemma' | 'system';
  text: string;
  citations?: { label: string; type: 'evidence' | 'inference' | 'hypothesis' | 'unknown' }[];
  ts: number;
}
