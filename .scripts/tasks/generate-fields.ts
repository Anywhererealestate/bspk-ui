/**
 * This script generates Field components for various input types.
 *
 * $ npx tsx .scripts/tasks/generate-fields.ts
 */
import fs from 'fs';

const CONTROLS = [
    //
    'DatePicker',
    'Input',
    'InputNumber',
    'InputPhone',
    'Password',
    'Select',
    'Textarea',
    'TimePicker',
];

CONTROLS.map((name) => {
    const content = `import { ${name}, ${name}Props } from './${name}';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type ${name}FieldProps = FormFieldControlProps<${name}Props>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and ${name} component.
 *
 * @name ${name}Field
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function ${name}Field({ label, helperText, labelTrailing, errorMessage, ...controlProps }: ${name}FieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <${name} {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`;

    const path = `./src/components/${name}/Field.tsx`;

    fs.writeFileSync(path, content, 'utf8');

    // ensure index file exports the new Field component
    const indexPath = `./src/components/${name}/index.tsx`;

    const indexContent = fs.readFileSync(indexPath, 'utf8');

    const exportStatement = `export * from './Field';\n`;

    if (!indexContent.includes(exportStatement)) {
        fs.appendFileSync(indexPath, exportStatement, 'utf8');
    }
});
