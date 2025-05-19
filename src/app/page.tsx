'use client';

import { useState, useEffect } from 'react';
import type { Extension } from '@/types';
import { mockExtensions } from '@/data/extensions';

import { AppHeader } from '@/components/AppHeader';
import { ExtensionList } from '@/components/extension/ExtensionList';
import { AllowedExtensionsDisplay } from '@/components/admin/AllowedExtensionsDisplay';
import { ExtensionSuggester } from '@/components/ai/ExtensionSuggester';
import { SimpleCodeEditor } from '@/components/editor/SimpleCodeEditor';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function ExtensionWardenPage() {
  const [allExtensions, setAllExtensions] = useState<Extension[]>([]);
  const [allowedExtensions, setAllowedExtensions] = useState<Set<string>>(
    new Set(['ms-python.python']) // Initial allowed extension
  );
  const { toast } = useToast();

  // Load mock extensions on component mount
  useEffect(() => {
    setAllExtensions(mockExtensions);
  }, []);

  const toggleAllowExtension = (extensionId: string) => {
    const extension = allExtensions.find(ext => ext.id === extensionId);
    if (!extension) return;

    setAllowedExtensions((prevAllowed) => {
      const newAllowed = new Set(prevAllowed);
      if (newAllowed.has(extensionId)) {
        newAllowed.delete(extensionId);
        toast({
          title: `${extension.name} Removed`,
          description: `${extension.name} has been removed from the allow-list.`,
        });
      } else {
        newAllowed.add(extensionId);
        toast({
          title: `${extension.name} Added`,
          description: `${extension.name} has been added to the allow-list.`,
          variant: 'default',
        });
      }
      return newAllowed;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8 space-y-12">
        
        <section id="extension-catalog">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Extension Catalog</h2>
          <ExtensionList
            extensions={allExtensions}
            allowedExtensions={allowedExtensions}
            onToggleAllow={toggleAllowExtension}
          />
        </section>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section id="admin-panel" className="space-y-6">
             <h2 className="text-2xl font-semibold text-foreground">Admin Dashboard</h2>
            <AllowedExtensionsDisplay
              allowedIds={allowedExtensions}
              allExtensions={allExtensions}
            />
          </section>

          <section id="ai-suggester" className="space-y-6">
             <h2 className="text-2xl font-semibold text-foreground">Discover Extensions</h2>
            <ExtensionSuggester />
          </section>
        </div>
        
        <Separator className="my-8" />

        <section id="code-editor">
           <h2 className="text-2xl font-semibold mb-6 text-foreground">Development Sandbox</h2>
          <SimpleCodeEditor />
        </section>

      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Extension Warden. All rights reserved.
      </footer>
    </div>
  );
}
