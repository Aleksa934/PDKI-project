import type { Plant } from '@/models/plant.model';

export const plantService = {
  async fetchPlants(): Promise<Plant[]> {
    try {
      const res = await fetch('https://plants.pequla.com/api/plants');
      if (!res.ok) throw new Error('API server unavailable');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.content || []);
    } catch (err) {
      console.warn('Greška pri učitavanju sa API-ja:', err);
      return [];
    }
  },

  async fetchPlantById(id: number): Promise<Plant | null> {
    try {
      const res = await fetch(`https://plants.pequla.com/api/plants/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn(`Greška pri učitavanju biljke ID ${id}:`, err);
      return null;
    }
  }
};