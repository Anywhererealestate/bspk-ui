import { CarouselProps } from '.';

import { ComponentExample } from '-/utils/demo';

export const CarouselExample: ComponentExample<CarouselProps> = {
    render: ({ props, Component }) => (
        <Component
            {...props}
            itemGap={props.itemGap || 16}
            itemWidth={props.itemWidth || 180}
            unitOfMeasure={props.unitOfMeasure || 'px'}
        >
            <div
                style={{
                    background: '#F6DBFA',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 1
            </div>
            <div
                style={{
                    background: '#E7D9FC',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 2
            </div>
            <div
                style={{
                    background: '#DFE9FD',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 3
            </div>
            <div
                style={{
                    background: '#D9ECEB',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 4
            </div>
            <div
                style={{
                    background: '#FEF5E0',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 5
            </div>
            <div
                style={{
                    background: '#FCE7D9',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 6
            </div>
            <div
                style={{
                    background: '#F9DEEC',
                    borderRadius: '8px',
                    minHeight: '180px',
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                Slide 7
            </div>
        </Component>
    ),
    sections: [],
    variants: false,
};
