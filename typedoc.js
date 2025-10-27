import { OptionDefaults } from 'typedoc';

/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
    // Other TypeDoc options
    blockTags: [
        ...OptionDefaults.blockTags,
        //
        '@generated',
        '@phase',
        '@required',
        '@name',
        '@element',
        '@minimum',
        '@maximum',
        '@exampleDescription',
        '@options',
        '@exampleType',
    ],
};

export default config;
