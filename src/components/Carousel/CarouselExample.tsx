import { CarouselProps } from '.';
import { Button } from '-/components/Button';

import { COLOR_VARIANTS } from '-/utils/colorVariants';
import { ComponentExampleFn } from '-/utils/demo';

export const CarouselExample: ComponentExampleFn<CarouselProps> = ({ action }) => {
    const Slide = ({ number }: { number: number }) => (
        <div
            data-color={COLOR_VARIANTS[(number + 3) % COLOR_VARIANTS.length]}
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                borderRadius: '8px',
                minHeight: '180px',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            Slide {number}
            <Button label="Click me" onClick={() => action(`Slide ${number} clicked`)} variant="tertiary" />
        </div>
    );

    return {
        containerStyle: { width: '375px', padding: '16px 0' },
        render: ({ props, Component }) => (
            <Component {...props}>
                <Slide number={1} />
                <Slide number={2} />
                <Slide number={3} />
                <Slide number={4} />
                <Slide number={5} />
                <Slide number={6} />
                <Slide number={7} />
            </Component>
        ),
        sections: [],
        variants: false,
    };
};
