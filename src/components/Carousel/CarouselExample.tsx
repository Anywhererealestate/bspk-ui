import { CarouselProps } from '.';
import { Button } from '-/components/Button';

import { COLOR_VARIANTS } from '-/utils/colorVariants';
import { ComponentExampleFn } from '-/utils/demo';

function ExampleSlide({ number, onClick }: { number: number; onClick?: (message: string) => void }) {
    return (
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
            {onClick && (
                <Button label="Click me" onClick={() => onClick(`Slide ${number} clicked`)} variant="tertiary" />
            )}
        </div>
    );
}

export const CarouselExample: ComponentExampleFn<CarouselProps & { slideCount: number }> = ({ action }) => {
    return {
        containerStyle: { width: '100%', padding: '16px', overflow: 'hidden' },
        render: ({ props, Component }) => (
            <Component {...props}>
                {Array.from({ length: props.slideCount || 7 }, (_, i) => i + 1).map((num) => (
                    <ExampleSlide key={num} number={num} onClick={action} />
                ))}
            </Component>
        ),
        sections: [],
        variants: false,
        presets: [
            {
                label: 'Mobile',
                propState: { style: { width: '375px' }, slideCount: 7, itemWidth: '90%' } as CarouselProps & {
                    slideCount: number;
                },
            },
            {
                label: '300px Width',
                propState: { style: { width: '100%' }, slideCount: 7, itemWidth: '300px' } as CarouselProps & {
                    slideCount: number;
                },
            },
            {
                label: 'Full Width',
                propState: { style: { width: '100%' }, slideCount: 7, itemWidth: '100%' } as CarouselProps & {
                    slideCount: number;
                },
            },
            {
                label: '3/4 Width',
                propState: { style: { width: '100%' }, slideCount: 7, itemWidth: '75%' } as CarouselProps & {
                    slideCount: number;
                },
            },
            {
                label: '1/2 Width',
                propState: { style: { width: '100%' }, slideCount: 7, itemWidth: '50%' } as CarouselProps & {
                    slideCount: number;
                },
            },
            {
                label: '1/4 Width',
                propState: { style: { width: '100%' }, slideCount: 7, itemWidth: '25%' } as CarouselProps & {
                    slideCount: number;
                },
            },
        ],
    };
};
