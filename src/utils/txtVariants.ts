export type TxtVariant =
    | 'body-base'
    | 'body-large'
    | 'body-small'
    | 'body-x-small'
    | 'display-regular-large'
    | 'display-regular-medium'
    | 'display-regular-small'
    | 'display-semibold-large'
    | 'display-semibold-medium'
    | 'display-semibold-small'
    | 'heading-h1'
    | 'heading-h2'
    | 'heading-h3'
    | 'heading-h4'
    | 'heading-h5'
    | 'heading-h6'
    | 'labels-base'
    | 'labels-large'
    | 'labels-small'
    | 'labels-x-small'
    | 'subheader-large'
    | 'subheader-medium'
    | 'subheader-x-large'
    | 'subheader-xx-large'
    | 'subheader-xxx-large';
export const TXT_VARIANTS: TxtVariant[] = [
    'body-base',
    'body-large',
    'body-small',
    'body-x-small',
    'labels-base',
    'labels-large',
    'labels-small',
    'labels-x-small',
    'display-regular-large',
    'display-regular-medium',
    'display-regular-small',
    'display-semibold-large',
    'display-semibold-medium',
    'display-semibold-small',
    'heading-h1',
    'heading-h2',
    'heading-h3',
    'heading-h4',
    'heading-h5',
    'heading-h6',
    'subheader-large',
    'subheader-medium',
    'subheader-x-large',
    'subheader-xx-large',
    'subheader-xxx-large',
] as const;
