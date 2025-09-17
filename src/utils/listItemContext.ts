import { AriaRole, createContext } from 'react';

export type ListItemContextProps = {
    role?: AriaRole;
    selectable?: boolean;
};

export const ListItemContext = createContext<ListItemContextProps | undefined>(undefined);
