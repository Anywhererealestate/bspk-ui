import { useEffect, useState } from 'react';

/**
 * A hook to manage the state of a modal.
 *
 * @example
 *     import { Modal } from '@bspk/ui/Modal';
 *     import { useModalState } from '@bspk/ui/hooks/useModalState';
 *
 *     function Example() {
 *     const modalProps = useModalState(false);
 *     return <Modal  {...modalProps}>...</Modal>
 *     }
 *
 * @param parentValue - The value of the parent state.
 * @param setParentState - A function to set the parent state.
 * @returns An object with the open state and the `onClose` and `onOpen` callbacks.
 */
export function useModalState(parentValue: boolean = false, setParentState?: (next: boolean) => void) {
    const [open, setOpen] = useState(parentValue);

    useEffect(() => setOpen(parentValue), [parentValue]);

    return {
        open,
        onClose: () => {
            setOpen(false);
            setParentState?.(false);
        },
        onOpen: () => {
            setOpen(true);
            setParentState?.(true);
        },
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
