'use client';

import { useState } from 'react';
import { suggestExtensions, type SuggestExtensionsOutput } from '@/ai/flows/suggest-extensions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Lightbulb, AlertTriangleIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ExtensionSuggester() {
  const [projectDescription, setProjectDescription] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestExtensionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDescription.trim()) {
      setError('Please provide a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const result = await suggestExtensions({ projectDescription });
      setSuggestions(result);
      toast({
        title: "Suggestions Ready!",
        description: "AI has generated extension suggestions for your project.",
      });
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get suggestions: ${errorMessage}`);
      toast({
        title: "Error",
        description: `Failed to get suggestions: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl">AI Extension Suggester</CardTitle>
      </CardHeader>
      <CardDescription className="px-6 pb-2 text-sm">
        Describe your project, and our AI will suggest helpful extensions to enhance code quality, security, and development speed.
      </CardDescription>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="e.g., A web application using Next.js, TypeScript, and Tailwind CSS for an e-commerce platform..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={5}
              className="bg-background/70 focus:bg-background"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Suggestions...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Suggest Extensions
              </>
            )}
          </Button>
        </form>

        {error && (
           <Alert variant="destructive" className="mt-6">
             <AlertTriangleIcon className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        )}

        {suggestions && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Suggested Extensions:</h3>
            {suggestions.suggestedExtensions.length > 0 ? (
               <ul className="list-disc list-inside space-y-2 p-4 bg-card-foreground/5 rounded-md">
                {suggestions.suggestedExtensions.map((ext, index) => (
                  <li key={index} className="text-foreground/90">{ext}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No specific extensions suggested based on the description.</p>
            )}
            
            <h4 className="text-md font-semibold text-foreground pt-2">Reasoning:</h4>
            <p className="text-sm text-foreground/80 p-4 bg-card-foreground/5 rounded-md whitespace-pre-wrap">{suggestions.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
