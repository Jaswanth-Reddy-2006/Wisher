import { supabase, isSupabaseConfigured } from './supabase';
import type { WishData } from '../templates/types';
import { deserializeWishData } from '../utils/serialization';

const LOCAL_STORAGE_KEY = 'wisher_wishes';

const generateShortId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getLocalWishes = (): Record<string, WishData> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLocalWish = (id: string, data: WishData): void => {
  try {
    const wishes = getLocalWishes();
    wishes[id] = data;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishes));
  } catch (error) {
    console.error('Failed to save wish locally:', error);
  }
};

export const wishService = {
  /**
   * Saves a wish configuration.
   * If Supabase is active, inserts a record and returns the ID.
   * Otherwise, generates a random short ID, saves the state to localStorage, and returns it.
   */
  async saveWish(data: WishData): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      console.log('[WishService] Saving to Supabase...');
      try {
        const { data: record, error } = await supabase
          .from('wishes')
          .insert([{ data }])
          .select()
          .single();

        if (!error && record) {
          return record.id;
        }
        console.error('[WishService] Supabase insert error:', error);
      } catch (error) {
        console.error('[WishService] Supabase insert failed, falling back to local storage:', error);
      }
    }

    const shortId = generateShortId();
    console.warn(`[WishService] Supabase not active. Saving locally with ID: ${shortId}`);
    saveLocalWish(shortId, data);
    return shortId;
  },

  /**
   * Fetches a wish configuration by ID.
   * Also checks if the ID itself is a compressed lz-string block (backward compatibility).
   */
  async getWish(id: string): Promise<WishData | null> {
    // 1. Check if ID is a compressed LZ string itself
    const decompressed = deserializeWishData(id);
    if (decompressed) {
      console.log('[WishService] Successfully loaded wish configuration directly from URL token.');
      return decompressed;
    }

    // 2. Fetch from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      console.log(`[WishService] Loading wish ${id} from Supabase...`);
      try {
        const { data: record, error } = await supabase
          .from('wishes')
          .select('data')
          .eq('id', id)
          .single();

        if (!error && record) {
          return record.data as WishData;
        }
        console.warn(`[WishService] Wish ID ${id} not found in Supabase. Checking local storage...`);
      } catch (error) {
        console.error('[WishService] Supabase fetch error, checking local storage:', error);
      }
    }

    // 3. Check local storage
    const localWishes = getLocalWishes();
    if (localWishes[id]) {
      console.log(`[WishService] Loaded wish ${id} from local storage.`);
      return localWishes[id];
    }

    return null;
  }
};
