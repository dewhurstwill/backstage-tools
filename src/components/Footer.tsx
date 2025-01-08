import React from "react";
import { Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Built with ❤️ for the Backstage community
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/backstage/backstage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              Backstage
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/dewhurstwill/backstage-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              Contribute
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://backstage.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Documentation
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
