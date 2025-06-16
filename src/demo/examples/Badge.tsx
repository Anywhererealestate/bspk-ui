import { Avatar } from '../../Avatar';
import { BadgeProps } from '../../Badge';
import { ComponentExample } from '../utils';

export const BadgeExample: ComponentExample<BadgeProps> = {
    containerStyle: { width: '100%' },
    render: ({ props, Component, preset }) => {
        if (preset?.label === 'Borders') return <ExampleBadgeVariants Component={Component} props={props} />;

        if (preset?.label === 'With Context') {
            return (
                <>
                    <Component {...props}>
                        <Avatar image="/profile.jpg" name="Andre Giant" />
                    </Component>
                </>
            );
        }
        return <Component {...props} />;
    },
    presets: [
        {
            label: 'With Context',
        },
        {
            label: 'Borders',
        },
    ],
};

function ExampleBadgeVariants({
    Component,
    ...props
}: {
    Component: React.ComponentType<Record<string, unknown>>;
    props: BadgeProps;
}) {
    const cells = [
        ['', 'Small', 'X-Small'],
        ['None', { size: 'small', surfaceBorder: false }, { size: 'x-small', surfaceBorder: false }],
        ['Border', { size: 'small', surfaceBorder: true }, { size: 'x-small', surfaceBorder: true }],
    ] as (BadgeProps | string)[][];

    let border = false;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {cells.flat().map((content, idx) => {
                if (typeof content === 'string' && content === 'Border') border = true;
                return (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            background:
                                typeof content !== 'string' && border ? 'var(--surface-neutral-t3-low)' : 'transparent',
                        }}
                    >
                        {typeof content === 'string'
                            ? content
                            : [9, 99, 999].map((count, idx2) => (
                                  <Component count={count} key={idx2} {...props} {...(content as BadgeProps)} />
                              ))}
                    </div>
                );
            })}
        </div>
    );
}
