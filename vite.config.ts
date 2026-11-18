import path from 'path';
import { defineConfig } from '@lark-apaas/coding-preset-vite-react';

const isStatic = process.env.VITE_STATIC_MODE === 'true';

const staticHtmlPlugin = () => ({
  name: 'static-html',
  order: 'pre' as const,
  transformIndexHtml(html: string) {
    if (!isStatic) return html;
    let result = html
      .replace(/\{\{\{?__platform__\}\}\}?/g, '{}')
      .replace(/window\.appId = "\{\{appId\}\}";/, "window.appId = 'static-app';")
      .replace(/window\.userId = "\{\{userId\}\}";/, "window.userId = '';")
      .replace(/window\.tenantId = "\{\{tenantId\}\}";/, "window.tenantId = '';")
      .replace(/window\.userName = "\{\{userName\}\}";/, "window.userName = '';")
      .replace(/window\.csrfToken = "\{\{csrfToken\}\}";/, "window.csrfToken = '';")
      .replace(/window\.ENVIRONMENT = "\{\{environment\}\}";/, "window.ENVIRONMENT = 'production';")
      .replace(/window\.__BASENAME__ = "\{\{basename\}\}";/, "window.__BASENAME__ = '/';")
      .replace(/name: "\{\{appName\}\}",/, "name: '',")
      .replace(/avatar: "\{\{\{appAvatar\}\}\}",/, "avatar: '',")
      .replace(/description: "\{\{appDescription\}\}",/, "description: '',")
      .replace(/<title>.*?<\/title>/, '<title>智能任务管理</title>')
      .replace('rel="icon" href=""', 'rel="icon" href="/favicon.svg"')
      .replace('rel="icon" href="{{{appAvatar}}}"', 'rel="icon" href="/favicon.svg"')
      .replace(/\{\{\{?[^}]+\}\}\}?/g, '')
      .replace(
        'src="/client/src/index.tsx"',
        'src="/src/index.static.tsx"',
      );
    return result;
  },
});

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },
  plugins: [staticHtmlPlugin()],
  base: isStatic ? '/' : undefined,
  ...(isStatic
    ? {
        build: {
          outDir: path.resolve(__dirname, 'dist-static'),
          emptyOutDir: true,
        },
      }
    : {}),
});
