/**
 * This file is used to build the meta types for the project. It's used in the build-meta.ts file and also copied in to
 * the meta output file.
 */

export type BaseMeta = {
    name: string;
    description?: string;
    file?: string;
    example?: string;
};

export type TypeMeta = BaseMeta & {
    id: string;
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
    example?: string;
};

export type ComponentMeta = BaseMeta & {
    slug: string;
    dependencies: string[];
    css: string;
    hasTouchTarget: boolean;
    usage?: {
        code: string;
        description?: string;
    };
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
