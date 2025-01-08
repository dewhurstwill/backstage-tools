import React from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { CatalogEntity, CatalogKind } from '../types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface CatalogFormProps {
  entity: CatalogEntity;
  onChange: (entity: CatalogEntity) => void;
}

export function CatalogForm({ entity, onChange }: CatalogFormProps) {
  const handleMetadataChange = (field: string, value: any) => {
    onChange({
      ...entity,
      metadata: {
        ...entity.metadata,
        [field]: value
      }
    });
  };

  const handleSpecChange = (field: string, value: any) => {
    onChange({
      ...entity,
      spec: {
        ...entity.spec,
        [field]: value
      }
    });
  };

  const addArrayItem = (field: 'tags' | 'providesApis' | 'consumesApis' | 'dependsOn' | 'dependencyOf') => {
    if (field === 'tags') {
      handleMetadataChange('tags', [...(entity.metadata.tags || []), '']);
    } else {
      handleSpecChange(field, [...(entity.spec[field] || []), '']);
    }
  };

  const removeArrayItem = (field: 'tags' | 'providesApis' | 'consumesApis' | 'dependsOn' | 'dependencyOf', index: number) => {
    if (field === 'tags') {
      const newTags = [...(entity.metadata.tags || [])];
      newTags.splice(index, 1);
      handleMetadataChange('tags', newTags);
    } else {
      const newArray = [...(entity.spec[field] || [])];
      newArray.splice(index, 1);
      handleSpecChange(field, newArray);
    }
  };

  const updateArrayItem = (field: 'tags' | 'providesApis' | 'consumesApis' | 'dependsOn' | 'dependencyOf', index: number, value: string) => {
    if (field === 'tags') {
      const newTags = [...(entity.metadata.tags || [])];
      newTags[index] = value;
      handleMetadataChange('tags', newTags);
    } else {
      const newArray = [...(entity.spec[field] || [])];
      newArray[index] = value;
      handleSpecChange(field, newArray);
    }
  };

  const renderArrayField = (field: 'tags' | 'providesApis' | 'consumesApis' | 'dependsOn' | 'dependencyOf', label: string) => {
    const values = field === 'tags' ? (entity.metadata.tags || []) : (entity.spec[field] || []);
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(field)}
            className="h-8"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => updateArrayItem(field, index, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem(field, index)}
                className="h-9 w-9"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Select 
        value={entity.kind} 
        onValueChange={(value: CatalogKind) => onChange({ ...entity, kind: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select kind" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Component">Component</SelectItem>
          <SelectItem value="Template">Template</SelectItem>
          <SelectItem value="API">API</SelectItem>
          <SelectItem value="Group">Group</SelectItem>
          <SelectItem value="User">User</SelectItem>
          <SelectItem value="Resource">Resource</SelectItem>
          <SelectItem value="System">System</SelectItem>
          <SelectItem value="Domain">Domain</SelectItem>
          <SelectItem value="Location">Location</SelectItem>
        </SelectContent>
      </Select>

      {/* Metadata Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          Metadata
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={entity.metadata.name}
              onChange={(e) => handleMetadataChange('name', e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={entity.metadata.description}
              onChange={(e) => handleMetadataChange('description', e.target.value)}
              rows={3}
            />
          </div>
          {renderArrayField('tags', 'Tags')}
        </CollapsibleContent>
      </Collapsible>

      {/* Spec Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold w-full">
          <ChevronDown className="w-5 h-5" />
          Specification
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="type">Type</Label>
              <Select
                value={entity.spec.type}
                onValueChange={(value) => handleSpecChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lifecycle">Lifecycle</Label>
              <Select
                value={entity.spec.lifecycle}
                onValueChange={(value) => handleSpecChange('lifecycle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lifecycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="experimental">Experimental</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="owner">Owner</Label>
            <Input
              id="owner"
              value={entity.spec.owner}
              onChange={(e) => handleSpecChange('owner', e.target.value)}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="system">System</Label>
            <Input
              id="system"
              value={entity.spec.system}
              onChange={(e) => handleSpecChange('system', e.target.value)}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="subcomponentOf">Subcomponent Of</Label>
            <Input
              id="subcomponentOf"
              value={entity.spec.subcomponentOf}
              onChange={(e) => handleSpecChange('subcomponentOf', e.target.value)}
            />
          </div>

          {renderArrayField('providesApis', 'Provides APIs')}
          {renderArrayField('consumesApis', 'Consumes APIs')}
          {renderArrayField('dependsOn', 'Depends On')}
          {renderArrayField('dependencyOf', 'Dependency Of')}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}