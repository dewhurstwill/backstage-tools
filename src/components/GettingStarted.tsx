import React from 'react';
import { ArrowRight } from 'lucide-react';

export function GettingStarted() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
      
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4">Using the Config Generator</h2>
        
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">1. Choose Your Configuration Type</h3>
            <p>The config generator supports two main configuration types:</p>
            <ul className="mt-2">
              <li><strong>catalog-info.yaml</strong> - Component metadata configuration</li>
              <li><strong>app-config.yaml</strong> - Application and infrastructure configuration</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">2. Fill in the Configuration</h3>
            <p>For catalog-info.yaml:</p>
            <ul className="mt-2">
              <li>Enter component name, description, and owner</li>
              <li>Select the appropriate lifecycle stage</li>
              <li>Choose the component type</li>
            </ul>
            <p className="mt-4">For app-config.yaml:</p>
            <ul className="mt-2">
              <li>Configure backend settings (URL and port)</li>
              <li>Set up authentication providers</li>
              <li>Add integrations (GitHub, GitLab, etc.)</li>
              <li>Configure organization details</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">3. Copy and Use Configuration</h3>
            <p>Once you've filled in all the required fields:</p>
            <ol className="mt-2">
              <li>Review the generated YAML in the preview section</li>
              <li>Click "Copy to Clipboard" to copy the configuration</li>
              <li>Paste the configuration into the appropriate file in your Backstage project</li>
            </ol>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Next Steps</h2>
        <div className="space-y-4">
          <a 
            href="https://backstage.io/docs/getting-started/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            Follow the Backstage installation guide <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="https://backstage.io/docs/features/software-catalog/configuration" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            Learn more about catalog configuration <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="https://backstage.io/docs/conf/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            Explore advanced configuration options <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}