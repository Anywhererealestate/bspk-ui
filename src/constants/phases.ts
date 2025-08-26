import { ComponentPhase } from '-/types/meta';
import { ColorVariant } from '-/utils/colorVariants';

export const COMPONENT_PHASE_COLORS: Record<ComponentPhase, ColorVariant> = {
    Backlog: 'grey',
    Dev: 'blue',
    QA: 'yellow',
    UXReview: 'purple',
    Stable: 'green',
    Utility: 'magenta',
};
