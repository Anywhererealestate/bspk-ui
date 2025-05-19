export type BaseMeta = {
    name: string;
    description?: string;
    file?: string;
};

export type TypeMeta = BaseMeta & {
    id: string;
    example?: string;
    references?: string[];
    properties?: TypeProperty[];
};

export type TypeProperty = {
    name: string;
    description?: string;
    type?: string[] | string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    properties?: TypeProperty[];
    references?: string[];
    minimum?: number;
    maximum?: number;
};

export type ComponentMeta = BaseMeta & {
    slug: string;
    dependencies: string[];
    modified: string;
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
    example?: string;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
