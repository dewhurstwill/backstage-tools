import React from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { AppConfig } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const BACKSTAGE_ICONS = [
  "brokenImage",
  "catalog",
  "chat",
  "dashboard",
  "docs",
  "email",
  "github",
  "group",
  "help",
  "scaffolder",
  "search",
  "techdocs",
  "user",
  "warning",
  "star",
  "unstarred",
];

interface AppConfigFormProps {
  config: AppConfig;
  onChange: (config: AppConfig) => void;
}

export function AppConfigForm({ config, onChange }: AppConfigFormProps) {
  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current = newConfig as any;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    onChange(newConfig);
  };

  const addArrayItem = (path: string[], template: any) => {
    const newConfig = { ...config };
    let current = newConfig as any;

    for (let i = 0; i < path.length; i++) {
      if (!current[path[i]]) {
        current[path[i]] = [];
      }
      current = current[path[i]];
    }

    current.push(template);
    onChange(newConfig);
  };

  const removeArrayItem = (path: string[], index: number) => {
    const newConfig = { ...config };
    let current = newConfig as any;

    for (let i = 0; i < path.length; i++) {
      current = current[path[i]];
    }

    current.splice(index, 1);
    onChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          App Configuration
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="app-title">App Title</Label>
            <Input
              id="app-title"
              value={config.app.title}
              onChange={(e) => updateConfig(["app", "title"], e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="app-baseUrl">Base URL</Label>
            <Input
              id="app-baseUrl"
              value={config.app.baseUrl}
              onChange={(e) => updateConfig(["app", "baseUrl"], e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="app-packageName">Package Name</Label>
            <Input
              id="app-packageName"
              value={config.app.packageName}
              onChange={(e) =>
                updateConfig(["app", "packageName"], e.target.value)
              }
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="app-experimental">Experimental Packages</Label>
            <Select
              value={config.app.experimental?.packages || "none"}
              onValueChange={(value) =>
                updateConfig(["app", "experimental", "packages"], value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select package mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Datadog RUM Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Datadog RUM</Label>
              {!config.app.datadogRum && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateConfig(["app", "datadogRum"], {
                      clientToken: "",
                      applicationId: "",
                      site: "",
                      env: "",
                      sessionSampleRate: 100,
                      sessionReplaySampleRate: 100,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Datadog RUM
                </Button>
              )}
              {config.app.datadogRum && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateConfig(["app", "datadogRum"], undefined)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove Datadog RUM
                </Button>
              )}
            </div>
            {config.app.datadogRum && (
              <div className="space-y-4 p-4 border rounded-md">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Client Token</Label>
                  <Input
                    value={config.app.datadogRum.clientToken}
                    onChange={(e) =>
                      updateConfig(
                        ["app", "datadogRum", "clientToken"],
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Application ID</Label>
                  <Input
                    value={config.app.datadogRum.applicationId}
                    onChange={(e) =>
                      updateConfig(
                        ["app", "datadogRum", "applicationId"],
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Site</Label>
                  <Input
                    value={config.app.datadogRum.site}
                    onChange={(e) =>
                      updateConfig(
                        ["app", "datadogRum", "site"],
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Environment</Label>
                  <Input
                    value={config.app.datadogRum.env}
                    onChange={(e) =>
                      updateConfig(["app", "datadogRum", "env"], e.target.value)
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Session Sample Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={config.app.datadogRum.sessionSampleRate}
                    onChange={(e) =>
                      updateConfig(
                        ["app", "datadogRum", "sessionSampleRate"],
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Session Replay Sample Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={config.app.datadogRum.sessionReplaySampleRate}
                    onChange={(e) =>
                      updateConfig(
                        ["app", "datadogRum", "sessionReplaySampleRate"],
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Support</Label>
              {!config.app.support && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateConfig(["app", "support"], {
                      url: "",
                      items: [],
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Support
                </Button>
              )}
              {config.app.support && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateConfig(["app", "support"], undefined)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove Support
                </Button>
              )}
            </div>
            {config.app.support && (
              <div className="space-y-4 p-4 border rounded-md">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Support URL</Label>
                  <Input
                    value={config.app.support.url}
                    onChange={(e) =>
                      updateConfig(["app", "support", "url"], e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Support Items</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        addArrayItem(["app", "support", "items"], {
                          title: "",
                          icon: "help",
                          links: [],
                        })
                      }
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  {config.app.support.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="space-y-4 p-4 border rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Support Item {itemIndex + 1}</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            removeArrayItem(
                              ["app", "support", "items"],
                              itemIndex,
                            )
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...config.app.support!.items];
                            newItems[itemIndex].title = e.target.value;
                            updateConfig(["app", "support", "items"], newItems);
                          }}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Icon</Label>
                        <Select
                          value={item.icon}
                          onValueChange={(value) => {
                            const newItems = [...config.app.support!.items];
                            newItems[itemIndex].icon = value;
                            updateConfig(["app", "support", "items"], newItems);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {BACKSTAGE_ICONS.map((iconName) => (
                              <SelectItem key={iconName} value={iconName}>
                                {iconName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Links</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newItems = [...config.app.support!.items];
                              if (!newItems[itemIndex].links) {
                                newItems[itemIndex].links = [];
                              }
                              newItems[itemIndex].links.push({
                                url: "",
                                title: "",
                              });
                              updateConfig(
                                ["app", "support", "items"],
                                newItems,
                              );
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Link
                          </Button>
                        </div>
                        {item.links.map((link, linkIndex) => (
                          <div
                            key={linkIndex}
                            className="space-y-2 p-4 border rounded-md"
                          >
                            <div className="flex justify-between items-center">
                              <Label>Link {linkIndex + 1}</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newItems = [
                                    ...config.app.support!.items,
                                  ];
                                  newItems[itemIndex].links.splice(
                                    linkIndex,
                                    1,
                                  );
                                  updateConfig(
                                    ["app", "support", "items"],
                                    newItems,
                                  );
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label>Title</Label>
                              <Input
                                value={link.title}
                                onChange={(e) => {
                                  const newItems = [
                                    ...config.app.support!.items,
                                  ];
                                  newItems[itemIndex].links[linkIndex].title =
                                    e.target.value;
                                  updateConfig(
                                    ["app", "support", "items"],
                                    newItems,
                                  );
                                }}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label>URL</Label>
                              <Input
                                value={link.url}
                                onChange={(e) => {
                                  const newItems = [
                                    ...config.app.support!.items,
                                  ];
                                  newItems[itemIndex].links[linkIndex].url =
                                    e.target.value;
                                  updateConfig(
                                    ["app", "support", "items"],
                                    newItems,
                                  );
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Backend Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          Backend Configuration
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="backend-baseUrl">Backend Base URL</Label>
            <Input
              id="backend-baseUrl"
              value={config.backend.baseUrl}
              onChange={(e) =>
                updateConfig(["backend", "baseUrl"], e.target.value)
              }
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="backend-port">Backend Port</Label>
            <Input
              id="backend-port"
              type="number"
              value={config.backend.listen.port}
              onChange={(e) =>
                updateConfig(
                  ["backend", "listen", "port"],
                  parseInt(e.target.value),
                )
              }
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="backend-database-client">Database Client</Label>
            <Select
              value={config.backend.database?.client || "better-sqlite3"}
              onValueChange={(value) =>
                updateConfig(["backend", "database", "client"], value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select database client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="better-sqlite3">better-sqlite3</SelectItem>
                <SelectItem value="pg">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="backend-database-connection">
              Database Connection
            </Label>
            <Input
              id="backend-database-connection"
              type="text"
              value={config.backend.database.connection}
              onChange={(e) =>
                updateConfig(
                  ["backend", "database", "connection"],
                  parseInt(e.target.value),
                )
              }
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Auth Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          Authentication
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="auth-environment">Environment</Label>
            <Select
              value={config.auth?.environment || "development"}
              onValueChange={(value) =>
                updateConfig(["auth", "environment"], value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Organization Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          Organization
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              value={config.organization.name}
              onChange={(e) =>
                updateConfig(["organization", "name"], e.target.value)
              }
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
