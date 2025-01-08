import React from 'react';
import { ExternalLink } from 'lucide-react';

export function Documentation() {
  const links = [
    {
      title: 'Official Documentation',
      description: 'Complete documentation for Backstage setup and configuration',
      url: 'https://backstage.io/docs',
    },
    {
      title: 'Architecture Overview',
      description: 'Learn about Backstage\'s architecture and design principles',
      url: 'https://backstage.io/docs/overview/architecture-overview',
    },
    {
      title: 'Configuration',
      description: 'Detailed guide on configuring your Backstage instance',
      url: 'https://backstage.io/docs/conf',
    },
    {
      title: 'Authentication',
      description: 'Learn how to set up authentication in Backstage',
      url: 'https://backstage.io/docs/auth/',
    },
    {
      title: 'Integrations',
      description: 'Available integrations and how to configure them',
      url: 'https://backstage.io/docs/integrations/',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-lg mb-8">
          Backstage is an open platform for building developer portals. It's based on the developer portal we've been using 
          internally at Spotify for over four years. The idea behind Backstage is to provide a better developer experience by 
          centralizing your services, tools, documentation, and more.
        </p>

        <div className="grid gap-6 mb-8">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors no-underline"
            >
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold m-0">{link.title}</h2>
                <ExternalLink className="w-4 h-4" />
              </div>
              <p className="text-muted-foreground m-0">{link.description}</p>
            </a>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <ul className="space-y-2">
          <li>
            <a href="https://github.com/backstage/backstage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              GitHub Repository <ExternalLink className="w-4 h-4" />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/backstage-687207715902193673" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Discord Community <ExternalLink className="w-4 h-4" />
            </a>
          </li>
          <li>
            <a href="https://backstage.io/blog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Backstage Blog <ExternalLink className="w-4 h-4" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}