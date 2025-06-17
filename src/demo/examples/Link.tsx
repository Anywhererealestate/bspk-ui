import { Fragment, useId } from 'react';

import { LinkProps, Link } from '../../Link';
import { Txt } from '../../Txt';
import { ComponentExample } from '../utils';

export const LinkExample: ComponentExample<LinkProps> = {
    containerStyle: {
        width: '100%',
    },
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Pseudo States') return <LinkDemo props={props} />;

        return (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    background: props.variant === 'subtle-inverse' ? 'black' : '',
                    minHeight: 'var(--spacing-sizing-24)',
                }}
            >
                <Component {...props} />
            </div>
        );
    },
    presets: [
        {
            label: 'Pseudo States',
            state: {},
        },
    ],
};

/**
 * This component demonstrates the different pseudo states of the Link component.
 *
 * It is used in the LinkExample preset "Pseudo States", and also the Typography page.
 */
export function LinkDemo(params: { props?: LinkProps }) {
    const states = ['default', 'hover', 'active', 'disabled', 'visited', 'focus'];

    const id = useId();

    return (
        <div data-links-grid>
            <div />
            {states.map((state) => (
                <Txt key={state} variant="labels-large">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                </Txt>
            ))}
            {['default', 'subtle', 'subtle-inverse'].map((kind) => (
                <Fragment key={`${kind}-row`}>
                    <Txt key={`${kind}-title`} variant="labels-large">
                        {kind.charAt(0).toUpperCase() + kind.slice(1)}
                    </Txt>
                    {states.map((state) => {
                        const attr: Record<string, unknown> = {};

                        if (state === 'disabled') {
                            attr['disabled'] = true;
                        } else if (state !== 'default') {
                            attr[`data-pseudo`] = state;
                        }

                        if (kind !== 'default') attr[`data-${kind}`] = true;

                        return (
                            <div data-kind={kind} key={`${kind}-${state}`}>
                                {!params.props ? (
                                    <a href={`https://bspk.dev/fake-link/${id}+${kind}+${state}`} {...attr}>
                                        Link Text
                                    </a>
                                ) : (
                                    <Link
                                        {...params.props}
                                        label="Link Text"
                                        {...attr}
                                        variant={kind as LinkProps['variant']}
                                    />
                                )}
                            </div>
                        );
                    })}
                </Fragment>
            ))}
        </div>
    );
}
