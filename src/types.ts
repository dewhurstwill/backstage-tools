interface DatadogRum {
  clientToken: string;
  applicationId: string;
  site?: string;
  env?: string;
  sessionSampleRate?: number;
  sessionReplaySampleRate?: number;
}

interface SupportLink {
  url: string;
  title: string;
}

interface SupportItem {
  title: string;
  icon: string;
  links: SupportLink[];
}

interface BackendDatabaseConfig {
  client: string;
  connection: string;
}

interface BackendCorsConfig {
  origin: string;
  methods: string[];
  credentials: boolean;
}

interface BackendCspConfig {
  "connect-src": string[];
}

interface BackendReadingAllowConfig {
  host: string;
}

interface BackendReadingConfig {
  allow: BackendReadingAllowConfig[];
  workingDirectory?: string;
}

interface FrontendConfig {
  title: string;
  baseUrl: string;
  listen?: {
    port?: number;
    host?: string;
  };
  experimental?: {
    packages: "all" | "none";
  };
  datadogRum?: DatadogRum;
  support?: {
    url: string;
    items: SupportItem[];
  };
  packageName?: string;
}

interface BackendConfig {
  baseUrl: string;
  listen?: {
    port?: number;
    host?: string;
  };
  database: BackendDatabaseConfig;
  cors?: BackendCorsConfig;
  csp?: BackendCspConfig;
  reading?: BackendReadingConfig;
}

interface ProxyEndpoint {
  target: string;
  headers?: {
    [key: string]: string;
  };
}

export interface AppConfig {
  app: FrontendConfig;
  backend: BackendConfig;
  proxy?: {
    endpoints?: {
      [key: string]: ProxyEndpoint;
    };
  };
  organization: {
    name: string;
  };
  techdocs?: {
    builder: string;
    publisher: {
      type: string;
    };
  };
  auth: {
    keyStore?: {
      provider: string;
      firestore?: {
        projectId: string;
        path: string;
      };
    };
    providers?: {
      guest?: object;
    };
    environment: string;
  };
}
