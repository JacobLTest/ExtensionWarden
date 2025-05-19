import type { Extension } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListChecks, ShieldCheck } from 'lucide-react';

interface AllowedExtensionsDisplayProps {
  allowedIds: Set<string>;
  allExtensions: Extension[];
}

export function AllowedExtensionsDisplay({ allowedIds, allExtensions }: AllowedExtensionsDisplayProps) {
  const allowed = allExtensions.filter(ext => allowedIds.has(ext.id));

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <ListChecks className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl">Currently Allowed Extensions</CardTitle>
      </CardHeader>
      <CardContent>
        {allowed.length === 0 ? (
          <p className="text-muted-foreground">No extensions are currently on the allow-list.</p>
        ) : (
          <ul className="space-y-2">
            {allowed.map((ext) => (
              <li key={ext.id} className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span>{ext.name} <span className="text-xs text-muted-foreground">({ext.id})</span></span>
                </div>
                <Badge variant="default" className="bg-green-600 text-xs">Allowed</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
