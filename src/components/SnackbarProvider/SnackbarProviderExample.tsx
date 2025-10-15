import { useRef, useState } from 'react';
import { SnackbarProvider, SnackbarProviderProps } from './SnackbarProvider';
import { Button } from '-/components/Button';
import { CheckboxGroup } from '-/components/Checkbox';
import { Field, FieldLabel } from '-/components/Field';
import { Input } from '-/components/Input';
import { InputNumber } from '-/components/InputNumber';
import { Txt } from '-/components/Txt';
import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample } from '-/utils/demo';
import './snackbar-provider-example.scss';

export const SnackbarProviderExample: ComponentExample<SnackbarProviderProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props }) => (
        <SnackbarProvider countLimit={props.countLimit} timeout={props.timeout || 5000}>
            <ExampleForm />
        </SnackbarProvider>
    ),
    sections: [],
    variants: {},
};

function ExampleForm() {
    const countRef = useRef(0);
    const [snackbarText, setSnackbarText] = useState('Full send!');
    const [options, setOptions] = useState<string[]>(['enableTimeout']);
    const [dismissButtonText, setDismissButtonText] = useState('Dismiss');
    const [timeout, setTimeout] = useState(5000);

    const { sendSnackbar } = useSnackbarContext();

    const enableTimeout = options.includes('enableTimeout');
    const enableDismiss = options.includes('dismissButton');
    const enableCount = options.includes('showCount');

    const onButtonClick = () => {
        if (enableCount) {
            countRef.current += 1;
        }

        sendSnackbar({
            text: snackbarText + (enableCount ? ` (${countRef.current})` : ''),
            timeout: enableTimeout ? timeout : null,
            button: enableDismiss
                ? {
                      label: dismissButtonText,
                      onClick: 'close',
                  }
                : undefined,
        });
    };

    return (
        <div data-snackbar-provider-example="">
            <Field>
                <FieldLabel>Snackbar Text</FieldLabel>
                <Input
                    aria-label="Snackbar Text"
                    id="text"
                    name="text"
                    onChange={setSnackbarText}
                    size="small"
                    value={snackbarText}
                />
            </Field>

            <CheckboxGroup
                aria-label="Example Checkbox Group"
                name="example-checkbox-group"
                onChange={(nextValues: string[]) => {
                    setOptions(nextValues);
                }}
                options={[
                    { label: 'Enable timeout', value: 'enableTimeout' },
                    {
                        label: 'Include dismiss button',
                        value: 'dismissButton',
                    },
                    {
                        label: 'Count sends (diagnostic)',
                        value: 'showCount',
                    },
                ]}
                values={options}
            />

            {enableTimeout && (
                <Field>
                    <FieldLabel>Timeout (ms)</FieldLabel>
                    <InputNumber
                        aria-label="Timeout"
                        id="timeout"
                        max={60000}
                        min={0}
                        name="timeout"
                        onChange={(val) => setTimeout(parseInt(`${val}`) || 0)}
                        size="small"
                        step={1000}
                        value={timeout}
                    />
                </Field>
            )}

            {enableDismiss && (
                <Field>
                    <FieldLabel>Dismiss Button Text</FieldLabel>
                    <Input
                        aria-label="Dismiss button Text"
                        id="text"
                        name="text"
                        onChange={setDismissButtonText}
                        size="small"
                        value={dismissButtonText}
                    />
                </Field>
            )}

            {!enableDismiss && !enableTimeout && (
                <Txt data-warning="" variant="body-small">
                    Note: Without a timeout or dismiss button the snackbar can only be closed programatically using the
                    useSnackbarContext hook.
                </Txt>
            )}

            <div data-button-wrapper="">
                <Button label="Send it!" onClick={onButtonClick} size="medium" title="Snackbar" />
            </div>
        </div>
    );
}
