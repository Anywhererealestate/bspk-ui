import { Brand } from '-/types/common';

export const BRANDS: {
    /** The title of the brand. */
    title: string;
    /** The slug of the brand, used in URLs and identifiers. */
    slug: Brand | 'example';
}[] = [
    {
        title: 'Anywhere',
        slug: 'anywhere',
    },
    {
        title: 'Better Homes & Gardens',
        slug: 'better-homes-gardens',
    },
    {
        title: 'Cartus',
        slug: 'cartus',
    },
    {
        title: 'Century 21',
        slug: 'century-21',
    },
    {
        title: 'Coldwell Banker',
        slug: 'coldwell-banker',
    },
    {
        title: 'Corcoran',
        slug: 'corcoran',
    },
    {
        title: 'Denali Boss',
        slug: 'denali-boss',
    },
    {
        title: 'ERA',
        slug: 'era',
    },
    {
        title: "Sotheby's",
        slug: 'sothebys',
    },
    {
        title: 'Example',
        slug: 'example',
    },
] as const;
