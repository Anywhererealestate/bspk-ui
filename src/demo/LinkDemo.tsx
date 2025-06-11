import { Fragment, useId } from 'react';

import { Link, LinkProps } from '../Link';
import { Txt } from '../Txt';

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
