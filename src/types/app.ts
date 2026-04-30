import type { LucideIcon } from 'lucide-react';

export type TabId =
  | 'home'
  | 'comms'
  | 'people'
  | 'services'
  | 'knowledge'
  | 'processes'
  | 'procedures'
  | 'forms'
  | 'policies'
  | 'space'
  | 'payroll'
  | 'certifications'
  | 'vacations'
  | 'profile'
  | 'team'
  | 'benefits';

export type MaturityId = 'human' | 'assisted' | 'agentic';
export type RoleId = 'collaborator' | 'leader';

export type NavSubItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

export type NavItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
  roles: RoleId[];
  children?: NavSubItem[];
};

export type SummaryItem = {
  tab: TabId;
  title: string;
  value: string;
  detail: string;
  tone: string;
  icon: LucideIcon;
};
