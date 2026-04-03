import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon } from 'lucide-react';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import { Logo } from '@/components/logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo size="sm" />,
    },
    links: [
      {
        icon: <BookIcon />,
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        type: 'custom',
        children: <GithubInfo owner="jocage" repo="launchframe" />,
      },
    ],
  };
}
