import { useRef, useState } from 'react';
import { SnackbarProvider } from './SnackbarContextProvider';
import { SnackbarProps } from '.';
import { Button } from '-/components/Button';
import { CheckboxGroup } from '-/components/CheckboxGroup';
import { NumberField } from '-/components/NumberField';
import { SelectField } from '-/components/SelectField';
import { TextField } from '-/components/TextField';
import { Txt } from '-/components/Txt';
import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample } from '-/utils/demo';

export const SnackbarExample: ComponentExample<SnackbarProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: () => (
        <SnackbarProvider>
            <Example />
        </SnackbarProvider>
    ),
    sections: [],
    variants: {},
};

function Example() {
    const countRef = useRef(0);
    const [snackbarText, setSnackbarText] = useState('Full send!');
    const [variant, setVariant] = useState<'default' | 'error' | 'success' | 'warning'>('default');
    const [options, setOptions] = useState<string[]>(['enableTimeout']);
    const [dismissButtonText, setDismissButtonText] = useState('Dismiss');
    const [timeout, setTimeout] = useState(5000);

    const { sendSnackbar } = useSnackbarContext();

    const enableTimeout = options.includes('enableTimeout');
    const enableDismiss = options.includes('dismissButton');
    const enableCount = options.includes('showCount');

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column', width: '300px', flex: 1 }}>
                <TextField
                    aria-label="Snackbar Text"
                    controlId="text"
                    label="Snackbar Text"
                    name="text"
                    onChange={setSnackbarText}
                    size="small"
                    value={snackbarText}
                />
                <SelectField
                    controlId="foo"
                    label="Variant"
                    name="variant-select"
                    onChange={([val]) => setVariant(val as 'default' | 'error' | 'success' | 'warning')}
                    options={[
                        { value: 'default', label: 'Default' },
                        { value: 'error', label: 'Error' },
                        { value: 'success', label: 'Success' },
                        { value: 'warning', label: 'Warning' },
                    ]}
                    size="small"
                    value={[variant]}
                />
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
                    <NumberField
                        aria-label="Timeout"
                        buttonIncrement={1000}
                        controlId="timeout"
                        label="Timeout (ms)"
                        max={60000}
                        min={0}
                        name="timeout"
                        onChange={(val) => setTimeout(parseInt(`${val}`) || 0)}
                        size="small"
                        value={timeout}
                    />
                )}
                {enableDismiss && (
                    <TextField
                        aria-label="Dismiss button Text"
                        controlId="text"
                        label="Dismiss Button Text"
                        name="text"
                        onChange={setDismissButtonText}
                        size="small"
                        value={dismissButtonText}
                    />
                )}
                {!enableDismiss && !enableTimeout && (
                    <Txt style={{ color: '#e26b7d' }} variant="body-small">
                        Note: Without a timeout or dismiss button the snackbar cannot be closed.
                    </Txt>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                    <Button
                        label="Send it!"
                        onClick={() => {
                            if (enableCount) {
                                countRef.current += 1;
                            }
                            sendSnackbar({
                                text: snackbarText + (enableCount ? ` (${countRef.current})` : ''),
                                variant,
                                timeout: enableTimeout ? timeout : null,
                                button: enableDismiss
                                    ? {
                                          text: dismissButtonText,
                                          onClick: 'close',
                                      }
                                    : undefined,
                            });
                        }}
                        size="medium"
                        title="Snackbar"
                    />
                </div>
            </div>
        </div>
    );
}
