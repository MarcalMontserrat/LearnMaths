import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getRepositoryName = () => {
  const actionRepository = process.env.GITHUB_REPOSITORY;

  if (actionRepository) {
    return actionRepository.split('/')[1] ?? null;
  }

  try {
    const remoteUrl = execSync('git remote get-url origin', {
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim();
    const match = remoteUrl.match(/\/([^/]+?)(?:\.git)?$/);

    return match?.[1] ?? null;
  } catch (error) {
    return null;
  }
};

export default defineConfig(({ command }) => {
  const repositoryName = getRepositoryName();
  const base =
    command === 'build' && repositoryName ? `/${repositoryName}/` : '/';

  return {
    base,
    plugins: [react({ include: /\.(js|jsx|ts|tsx)$/ })],
    oxc: {
      include: /\.(js|jsx|ts|tsx)$/
    },
    test: {
      environment: 'jsdom',
      globals: true
    }
  };
});
