import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileCode } from 'lucide-react';

export function SimpleCodeEditor() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <FileCode className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl">Code Editor</CardTitle>
      </CardHeader>
      <CardDescription className="px-6 pb-2 text-sm">
        A simple code editor placeholder. Full debugging capabilities are an advanced feature.
      </CardDescription>
      <CardContent>
        <Textarea
          placeholder="// Your code here..."
          rows={15}
          className="font-mono text-sm bg-background/70 focus:bg-background border-border"
        />
      </CardContent>
    </Card>
  );
}
