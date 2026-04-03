import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { GitHubLink } from '@/components/github-link';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo size="sm" />,
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        type: 'custom',
        children: <GitHubLink owner="jocage" repo="launchframe" />,
      },
    ],
  };
}
