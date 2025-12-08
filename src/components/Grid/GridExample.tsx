import { GridProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const GridExample: ComponentExample<GridProps> = {
    defaultState: {
        children: (
            <>
                <div>Cell 1</div>
                <div>Cell 2</div>
            </>
        ),
        columns: [1, 2],
    },
};
