import Image from 'next/image';
import type { Extension } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, PlusCircle, MinusCircle, Puzzle } from 'lucide-react';

interface ExtensionCardProps {
  extension: Extension;
  isAllowed: boolean;
  onToggleAllow: (extensionId: string) => void;
}

export function ExtensionCard({ extension, isAllowed, onToggleAllow }: ExtensionCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <Image 
          src={extension.iconUrl} 
          alt={`${extension.name} icon`} 
          width={48} 
          height={48} 
          className="rounded-md"
          data-ai-hint={extension.dataAiHint || 'abstract icon'}
        />
        <div className="flex-1">
          <CardTitle className="text-lg mb-1">{extension.name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            By {extension.publisher} - v{extension.version}
          </CardDescription>
        </div>
        {isAllowed ? (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white ml-auto whitespace-nowrap">
            <CheckCircle2 className="mr-1 h-4 w-4" /> Allowed
          </Badge>
        ) : (
          <Badge variant="secondary" className="ml-auto whitespace-nowrap">
            Not Allowed
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-foreground/80 line-clamp-3">{extension.description}</p>
        <Badge variant="outline" className="mt-3 text-xs">{extension.category}</Badge>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onToggleAllow(extension.id)}
          variant={isAllowed ? 'destructive' : 'default'}
          size="sm"
          className="w-full transition-all duration-300"
        >
          {isAllowed ? <MinusCircle className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
          {isAllowed ? 'Remove from Allow-list' : 'Add to Allow-list'}
        </Button>
      </CardFooter>
    </Card>
  );
}
