import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
    strictPort: true, // Prevents auto-selecting a different port
    host: true // Allows access from other devices on the network
  },
});
