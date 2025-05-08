import { SvgCheck } from '@bspk/icons/Check';
import { css } from '@emotion/react';

import { ElementProps } from '.';

/** A progress stepper item is a single step in the progress bar. */
export type ProgressionStepperItem = {
    /**
     * The name of the step.
     *
     * @type string
     * @required
     */
    name: string;
    /**
     * The subtext of the step.
     *
     * @type multiline
     */
    subtext?: string;
    /**
     * The link to navigate to when the step is clicked.
     *
     * @type {label: string; onClick: () => void}
     */
    touchLink?: { label: string; onClick: () => void };
};

export type ProgressionStepperProps = {
    /**
     * The steps to display in the progress bar.
     *
     * @type ProgressionStepperItem[]
     * @required
     */
    steps: ProgressionStepperItem[];
    /**
     * The current step in the progress bar.
     *
     * If the current step is greater than the number of steps, all steps with be completed.
     *
     * If the current step is less than 1, all steps will be incomplete.
     *
     * @default 0
     * @minimum 0
     */
    currentStep?: number;
    /**
     * The variant of the progress bar. Can be either horizontal, vertical, or widget.
     *
     * When on small width screens, the default will automatically switch to widget.
     *
     * @default horizontal
     */
    variant?: 'horizontal' | 'vertical' | 'widget';
};

/**
 * A progress stepper is a horizontal visual indicator that let’s the user know the progression of the current process.
 *
 * @name ProgressionStepper
 */
function ProgressionStepper({
    steps = [],
    currentStep: currentStepProp = 0,
    variant = 'horizontal',
    ...containerProps
}: ElementProps<ProgressionStepperProps, 'div'>) {
    const currentStep = Math.max(0, Math.min(currentStepProp, steps.length + 1));
    return (
        <div {...containerProps} css={style} data-progress-stepper="" data-variant={variant}>
            {variant === 'widget' && (
                <label>
                    <span data-title>{steps[Math.max(0, Math.min(currentStep - 1, steps.length - 1))].name}</span>
                    <span data-subtitle>
                        {currentStep >= steps.length ? (
                            'Completed'
                        ) : (
                            <>
                                Step {currentStep} of {steps.length}
                            </>
                        )}
                    </span>
                </label>
            )}
            <ol>
                {steps.flatMap(({ name, subtext }, index) => {
                    const stepNum = index + 1;
                    let status: 'complete' | 'current' | 'incomplete' = 'incomplete';
                    if (stepNum < currentStep) status = 'complete';
                    else if (stepNum === currentStep) status = 'current';

                    return (
                        <li data-status={status} data-step={stepNum} key={`step-${index}`}>
                            <span aria-hidden data-line-circle>
                                <span data-line="before" />
                                <span data-circle>
                                    <span>{stepNum}</span>
                                    {status === 'complete' && <SvgCheck />}
                                </span>
                                <span data-line="after" />
                            </span>
                            {variant !== 'widget' && (
                                <span data-content>
                                    <span data-name>{name}</span>
                                    {subtext && <span data-subtext>{subtext}</span>}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

ProgressionStepper.bspkName = 'ProgressionStepper';

export { ProgressionStepper };

export const style = css`
    width: 100%;
    --circle-width: var(--spacing-sizing-09);

    --active-background-color: var(--surface-brand-primary);
    --active-foreground-color: var(--foreground-brand-on-primary);
    --inactive-background-color: var(--surface-neutral-t3-low);
    --inactive-foreground-color: var(--foreground-neutral-on-surface);

    ol {
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;

        li {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: var(--spacing-sizing-02);
            [data-line-circle] {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;

                [data-line] {
                    background-color: var(--inactive-background-color);
                    height: 2px;
                    flex-grow: 1;
                }

                [data-circle] {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: var(--circle-width);
                    height: var(--circle-width);
                    border-radius: 50%;
                    background-color: none;
                    border: 2px solid var(--inactive-background-color);
                    font: var(--labels-large);

                    svg {
                        display: none;
                        width: var(--spacing-sizing-06);
                        height: var(--spacing-sizing-06);
                    }
                }
            }

            [data-content] {
                display: flex;
                padding: 0 var(--spacing-sizing-10);
                font: var(--body-small);
            }

            &:first-of-type {
                [data-line='before'] {
                    visibility: hidden;
                }
            }

            &:last-of-type {
                [data-line='after'] {
                    visibility: hidden;
                }
            }

            &[data-status='complete'] {
                [data-line] {
                    background-color: var(--active-background-color);
                }
                [data-circle] {
                    background-color: var(--active-background-color);
                    border: 1px solid var(--active-background-color);
                    color: var(--active-foreground-color);

                    span {
                        display: none;
                    }
                    svg {
                        display: block;
                    }
                }
            }

            &[data-status='current'] {
                [data-line='before'] {
                    background-color: var(--active-background-color);
                }

                [data-circle] {
                    border-color: var(--active-background-color);
                }
            }
        }
    }

    &[data-variant='vertical'] {
        ol {
            flex-direction: column;
        }

        li {
            flex-direction: row;

            [data-line-circle] {
                flex-direction: column;
                width: var(--circle-width);

                [data-line] {
                    width: 2px;
                    height: auto;
                }
            }
            [data-content] {
                flex-direction: column;
                padding: var(--spacing-sizing-10) 0;
            }
        }
    }

    &[data-variant='widget'] {
        --circle-width: var(--spacing-sizing-05);

        label {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sizing-02);
            margin-bottom: var(--spacing-sizing-03);
            font: var(--body-small);

            [data-title] {
                font: var(--labels-base);
                color: var(--foreground-neutral-on-surface);
            }

            [data-subtitle] {
                font: var(--body-x-small);
                color: var(--foreground-neutral-on-surface-variant-02);
            }
        }

        ol {
            align-items: center;
            min-height: var(--spacing-sizing-09);

            li {
                [data-line-circle] {
                    [data-line] {
                        width: 10px;
                    }
                }

                &[data-status='current'] {
                    --circle-width: var(--spacing-sizing-09);
                }

                &[data-status='incomplete'] {
                    [data-circle] {
                        span {
                            display: none;
                        }
                    }
                }
            }
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
