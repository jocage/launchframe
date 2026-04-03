import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

const mdxSource = createMDXSource(docs, meta);

// fumadocs-mdx types say `files` is an array, but runtime returns a function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const files = (mdxSource as any).files();

export const source = loader({ files } as any, {
  baseUrl: '/docs',
});
