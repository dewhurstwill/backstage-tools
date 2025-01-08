import React, { useState } from "react";
import { Settings, FileJson } from "lucide-react";
import { ConfigType, CatalogEntity, AppConfig } from "../types";
import yaml from "js-yaml";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CatalogForm } from "./CatalogForm";
import { AppConfigForm } from "./AppConfigForm";

const defaultAppConfig: AppConfig = {
  app: {
    title: "Backstage",
    baseUrl: "http://localhost:3000",
    packageName: "",
    experimental: {
      packages: "none",
    },
  },
  backend: {
    baseUrl: "http://localhost:7007",
    listen: {
      port: 7007,
    },
    database: {
      client: "better-sqlite3",
      connection: ":memory:",
    },
  },
  organization: {
    name: "My Company",
  },
  auth: {
    environment: "development",
  },
};

export function ConfigEditor() {
  const [configType, setConfigType] = useState<ConfigType>("catalog-info");
  const [catalogEntity, setCatalogEntity] = useState<CatalogEntity>({
    apiVersion: "backstage.io/v1alpha1",
    kind: "Component",
    metadata: {
      name: "",
      description: "",
      labels: {},
      annotations: {},
      tags: [],
      links: [],
    },
    spec: {
      type: "service",
      lifecycle: "production",
      owner: "",
      system: "",
      subcomponentOf: "",
      providesApis: [],
      consumesApis: [],
      dependsOn: [],
      dependencyOf: [],
    },
  });

  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig);

  const getConfigData = () => {
    if (configType === "catalog-info") {
      return catalogEntity;
    }

    // Create a copy of the config
    const config = JSON.parse(JSON.stringify(appConfig));

    // Remove packageName if empty
    if (config.app.packageName === "") {
      delete config.app.packageName;
    }

    // Remove experimental if packages is 'none'
    if (config.app.experimental?.packages === "none") {
      delete config.app.experimental;
    }

    return config;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Backstage Config Generator</h1>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <Button
              variant={configType === "catalog-info" ? "default" : "secondary"}
              onClick={() => setConfigType("catalog-info")}
              className="gap-2"
            >
              <FileJson className="w-5 h-5" />
              catalog-info.yaml
            </Button>
            <Button
              variant={configType === "app-config" ? "default" : "secondary"}
              onClick={() => setConfigType("app-config")}
              className="gap-2"
            >
              <Settings className="w-5 h-5" />
              app-config.yaml
            </Button>
          </div>

          {configType === "catalog-info" ? (
            <CatalogForm entity={catalogEntity} onChange={setCatalogEntity} />
          ) : (
            <AppConfigForm config={appConfig} onChange={setAppConfig} />
          )}
        </div>

        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Generated YAML</h3>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(yaml.dump(getConfigData()))
              }
              variant="outline"
            >
              Copy to Clipboard
            </Button>
          </div>
          <pre
            className={cn(
              "bg-muted rounded-md p-4 text-sm text-muted-foreground font-mono overflow-x-auto",
              "border border-border",
            )}
          >
            {yaml.dump(getConfigData())}
          </pre>
        </div>
      </div>
    </div>
  );
}
