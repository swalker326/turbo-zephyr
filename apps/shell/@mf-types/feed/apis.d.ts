
    export type RemoteKeys = 'feed/routes';
    type PackageType<T> = T extends 'feed/routes' ? typeof import('feed/routes') :any;