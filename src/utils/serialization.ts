import LZString from 'lz-string';
import type { WishData } from '../templates/types';

/**
 * Serializes WishData object into compressed base64 URI component
 */
export const serializeWishData = (data: WishData): string => {
  try {
    const jsonString = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonString);
  } catch (error) {
    console.error('Failed to serialize wish data:', error);
    return '';
  }
};

/**
 * Deserializes compressed base64 token back into WishData object
 */
export const deserializeWishData = (token: string): WishData | null => {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(token);
    if (!decompressed) return null;
    return JSON.parse(decompressed) as WishData;
  } catch (error) {
    console.error('Failed to deserialize wish data:', error);
    return null;
  }
};
