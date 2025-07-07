/**
 * This file is used to build the meta types for the project. It's used in the build-meta.ts file and also copied in to
 * the meta output file.
 */

export type BaseMeta = {
    name: string;
    description?: string;
    file: string;
    example?: string;
};

export type TypeMeta = BaseMeta & {
    id: string;
    references?: string[];
    properties?: TypeProperty[];
    components?: string[];
};

export type TypeProperty = {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
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
    phase: ComponentPhase;
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

export type ComponentPhase =
    | 'AccessibilityReview'
    | 'Backlog'
    | 'DesignReview'
    | 'ProductionReady'
    | 'Utility'
    | 'WorkInProgress';

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
