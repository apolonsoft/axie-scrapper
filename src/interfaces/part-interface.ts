import { AbilityInterface } from './ability.interface';

export interface PartInterface {
  id: string;
  name: string;
  class: string;
  type: string;
  specialGenes: string;
  stage: number;
  abilities: AbilityInterface[];
}
