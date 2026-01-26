/**
 * STREAMS OF COLOR - DATA HUB
 * Central data exports for the color analysis methodology
 */

// Kabbalistic Color System - TypeScript definitions and data
export * from './kabbalisticSystem';

// Raw JSON data for Kabbalistic system
import kabbalisticColorData from './kabbalisticColorData.json';
export { kabbalisticColorData };

// Complete color analysis algorithm with all 40 subtypes
export * from './algorithm';
import algorithmData from './algorithm';
export { algorithmData };
