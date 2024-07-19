// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/aqua-form',
    css: {
        preprocessorOptions: {
            scss: {
                // Пример: импорт глобальных файлов стилей
                // additionalData: `@import "src/styles/variables.scss";`,
            },
        },
    },
});
