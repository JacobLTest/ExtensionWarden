import type { Extension } from '@/types';
import { ExtensionCard } from './ExtensionCard';

interface ExtensionListProps {
  extensions: Extension[];
  allowedExtensions: Set<string>;
  onToggleAllow: (extensionId: string) => void;
}

export function ExtensionList({ extensions, allowedExtensions, onToggleAllow }: ExtensionListProps) {
  if (extensions.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No extensions to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {extensions.map((ext) => (
        <ExtensionCard
          key={ext.id}
          extension={ext}
          isAllowed={allowedExtensions.has(ext.id)}
          onToggleAllow={onToggleAllow}
        />
      ))}
    </div>
  );
}
