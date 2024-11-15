const prompt = `
Please generate a JSON response containing execution specifications with the following structure:

1. An "ExecutionEnvironmentSpec" schema, which can have:
   - "languageDependencies" - language dependencies for some languages such as python, ruby. example: requests, click, fastapi, rails etc.
      Do not add the actual language as dependency here
   - "systemDependencies" - list of nix packages that are to be added to the environment
   (these dependencies are optional so no need to specify them unless absolutley required)

2. A "ExecSpec" schema that includes:
   - An "environment" field, which contains the "ExecutionEnvironmentSpec"
   - A "code" field (string)
   - A "language" field (string - lowercase, indicates the language in which code is generated)
   - An optional "version" field (string)

3. A "Message" schema containing:
   - A "message" field (string)
   - A "code" field (string, the generated code must always have a usage example)
   - An "execSpec" field, which is the "ExecSpec" schema

The response should be in the exact format of the following TypeScript code snippet:

import { z } from 'zod';

// ExecutionEnvironmentSpec schema
const ExecutionEnvironmentSpecSchema = z.object({
  languageDependencies: z.array(z.string()).optional(),
  systemDependencies: z.array(z.string()).optional(),
  setup: z.string().optional(),
});

// Main schema
const ExecSpec = z.object({
  environment: ExecutionEnvironmentSpecSchema,
  code: z.string(),
  language: z.string(),
  version: z.string().optional(),
  cmdLineArgs: z.string().optional(),
});

const Message = z.object({
    message: z.string(),
    code: z.string(),
    execSpec: ExecSpec
});

export { ExecutionEnvironmentSpecSchema, ExecSpec };
`;

export { prompt };