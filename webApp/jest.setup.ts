import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder in Jest (Node)
import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;