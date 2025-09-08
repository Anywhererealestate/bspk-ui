import { CarouselProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const CarouselExample: ComponentExample<CarouselProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => (
        <Component {...props}>
            <div style={{ padding: 20, textAlign: 'center' }}>Slide 1</div>
            <div style={{ padding: 20, textAlign: 'center' }}>Slide 2</div>
            <div style={{ padding: 20, textAlign: 'center' }}>Slide 3</div>
            <div style={{ padding: 20, textAlign: 'center' }}>Slide 4</div>
            <div style={{ padding: 20, textAlign: 'center' }}>Slide 5</div>
        </Component>
    ),
    sections: [],
    variants: {},
};
