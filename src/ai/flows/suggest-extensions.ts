// src/ai/flows/suggest-extensions.ts
'use server';
/**
 * @fileOverview Extension suggestion flow for admins to discover reputable extensions based on project type.
 *
 * - suggestExtensions - A function that suggests extensions based on a project description.
 * - SuggestExtensionsInput - The input type for the suggestExtensions function.
 * - SuggestExtensionsOutput - The return type for the suggestExtensions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestExtensionsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A description of the project for which to suggest extensions.'),
});
export type SuggestExtensionsInput = z.infer<typeof SuggestExtensionsInputSchema>;

const SuggestExtensionsOutputSchema = z.object({
  suggestedExtensions: z
    .array(z.string())
    .describe('A list of suggested extensions for the project.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested extensions.'),
});
export type SuggestExtensionsOutput = z.infer<typeof SuggestExtensionsOutputSchema>;

export async function suggestExtensions(input: SuggestExtensionsInput): Promise<SuggestExtensionsOutput> {
  return suggestExtensionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestExtensionsPrompt',
  input: {schema: SuggestExtensionsInputSchema},
  output: {schema: SuggestExtensionsOutputSchema},
  prompt: `You are an expert in software development and know a lot about extensions that enhance code quality, security, and development speed.

  Based on the following project description, suggest a list of extensions that would be helpful for the project.

  Project Description: {{{projectDescription}}}

  Consider extensions that promote code quality, improve security, and accelerate development.
  Provide a brief reasoning for each suggested extension.
  Format the output as a JSON object with 'suggestedExtensions' and 'reasoning' fields.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const suggestExtensionsFlow = ai.defineFlow(
  {
    name: 'suggestExtensionsFlow',
    inputSchema: SuggestExtensionsInputSchema,
    outputSchema: SuggestExtensionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
