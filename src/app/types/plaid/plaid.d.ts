declare module 'plaid' {
    export interface ConfigurationParameters {
      basePath?: string;
      baseOptions?: RequestInit; // Use Fetch API type
      formDataCtor?: new () => FormData; // Specific constructor type
    }
  
    export class Configuration {
      constructor(config?: ConfigurationParameters);
    }
    
    export enum PlaidEnvironments {
      production = 'https://production.plaid.com',
      sandbox = 'https://sandbox.plaid.com',
      development = 'https://development.plaid.com'
    }
  }
  