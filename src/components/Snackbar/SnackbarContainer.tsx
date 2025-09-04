import { Snackbar } from './Snackbar';

import './snackbar.scss';
import { SnackbarData } from './snackbarContext';

export type SnackbarContainerProps = {
    edgeOffset?: number;
    spacing?: number;
    clearSnackbar: (key: string) => void;
    maxCount?: number;
    snackbars: SnackbarData[];
};

export function SnackbarContainer({
    spacing = 8,
    edgeOffset = 8,
    clearSnackbar,
    maxCount,
    snackbars,
}: SnackbarContainerProps) {
    return (
        <div data-bspk="snackbar-container">
            <div data-snackbar-wrapper="" style={{ pointerEvents: 'none', gap: spacing, padding: edgeOffset }}>
                {snackbars.slice(0, maxCount ?? 5).map((snackbar) => (
                    <Snackbar data={snackbar} key={snackbar.id} onClose={() => clearSnackbar(snackbar.id)} />
                ))}
            </div>
        </div>
    );
}
