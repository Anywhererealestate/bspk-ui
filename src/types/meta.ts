/**
 * This file is used to build the meta types for the project. It's used in the build-meta.ts file and also copied in to
 * the meta output file.
 */

export const COMPONENT_PHASES: Record<
    ComponentPhase,
    {
        title: string;
        id: ComponentPhase;
        description: string;
    }
> = {
    Backlog: {
        title: 'Backlog',
        id: 'Backlog',
        description:
            'The component has been initiated but is currently on hold. It awaits further development and is not actively being worked on at this time.',
    },
    Dev: {
        title: 'Development',
        id: 'Dev',
        description:
            'The component is actively under development. This phase includes the creation of visual elements and integration tests to ensure comprehensive functionality.',
    },
    UXReview: {
        title: 'UX Review',
        id: 'UXReview',
        description:
            'The component is being carefully evaluated by our Bespoke UX team. They are ensuring that it aligns with our high standards of aesthetics and user experience and is accessible to all users.',
    },
    Stable: {
        title: 'Stable',
        id: 'Stable',
        description:
            'The component has successfully passed all reviews and is ready for use. It is now officially released and ready for use in a production environment.',
    },
    Utility: {
        title: 'Utility',
        id: 'Utility',
        description: "The component progress isn't tracked as it's a utility component.",
    },
};

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
    arrayType?: string;
};

export type BlockConfig = {
    name: string;
    component: string;
    pattern: string;
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
    generated?: boolean;
    blockConfigs?: BlockConfig[];
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

export type ComponentPhase = 'Backlog' | 'Dev' | 'Stable' | 'Utility' | 'UXReview';

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
