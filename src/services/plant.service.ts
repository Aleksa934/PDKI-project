import type { Plant } from '@/models/plant.model';
import { plants } from '@/data/plants';

export const plantService = {
  async fetchPlants(): Promise<Plant[]> {
    return plants;
  },

  async fetchPlantById(id: number): Promise<Plant | null> {
    return plants.find(plant => plant.id === id) ?? null;
  }
};