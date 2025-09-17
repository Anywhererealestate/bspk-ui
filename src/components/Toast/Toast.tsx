import './toast.scss';
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

type ToastInput = {
    message: string;
    timeout?: number | null;
    actionLabel?: string;
    onAction?: () => void;
};
type ToastData = ToastInput & { id: string };

type ToastContextType = {
    toasts: ToastData[];
    showToast: (toast: ToastInput) => string;
    clearToast: (id: string) => void;
    clearAll: () => void;
};

export type ToastProps = {
    /** The content of the Toast component, typically your app. */
    children: ReactNode;
    /**
     * Default time in milliseconds after which a toast will auto dismiss. If a toast is sent with a timeout property
     * that value will be used instead. If you want to disable the timeout for a specific toast, set its timeout to
     * null.
     */
    defaultTimeout?: number;
    /** Maximum number of toasts to show at once. */
    maxToasts?: number;
};

/**
 * Toasts are brief messages that inform users about an operation's status. They appear temporarily, often at the
 *
 * @example
 *     import React from 'react';
 *     import { Toast, useToast } from '@bspk/ui/Toast';
 *
 *     function DemoComponent() {
 *         const { showToast } = useToast();
 *
 *         return (
 *             <button
 *                 onClick={() =>
 *                     showToast({
 *                         message: 'This is an accessible toast!',
 *                         actionLabel: 'Undo',
 *                         onAction: () => alert('Undo action!'),
 *                     })
 *                 }
 *             >
 *                 Show Toast
 *             </button>
 *         );
 *     }
 *
 *     export default function ExampleToastUsage() {
 *         return (
 *             <Toast>
 *                 <DemoComponent />
 *             </Toast>
 *         );
 *     }
 *
 * @name Toast
 * @phase Dev
 */

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within a ToastProvider');
    return ctx;
}

export function Toast({ children, defaultTimeout = 5000, maxToasts = 3 }: ToastProps) {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [liveMessage, setLiveMessage] = useState<string | null>(null);
    const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // Show a new toast
    const showToast = (toast: ToastInput): string => {
        const id = Math.random().toString(36).slice(2, 10);
        setToasts((prev) => [...prev, { ...toast, id }]);
        const timeout = toast.timeout ?? defaultTimeout;
        if (timeout !== null && timeout > 0) {
            const timer = setTimeout(() => clearToast(id), timeout);
            timeouts.current.set(id, timer);
        }
        return id;
    };

    // Clear a toast
    const clearToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timer = timeouts.current.get(id);
        if (timer) clearTimeout(timer);
        timeouts.current.delete(id);
    };

    // Clear all toasts
    const clearAll = () => {
        setToasts([]);
        timeouts.current.forEach(clearTimeout);
        timeouts.current.clear();
    };

    // Clean up on unmount
    useEffect(() => {
        return () => clearAll();
    }, []);

    // Accessible live region for screen readers
    useEffect(() => {
        if (toasts.length > 0) {
            setLiveMessage(null);
            const timer = setTimeout(() => setLiveMessage(toasts[0].message), 100);
            return () => clearTimeout(timer);
        } else {
            setLiveMessage(null);
            return undefined;
        }
    }, [toasts]);

    // Only show up to maxToasts at once
    const visibleToasts = toasts.slice(0, maxToasts);

    return (
        <ToastContext.Provider data-bspk="toast" value={{ toasts, showToast, clearToast, clearAll }}>
            {/* Visually hidden live region */}
            {liveMessage && (
                <div
                    aria-atomic="true"
                    aria-live="polite"
                    role="status"
                    style={{
                        position: 'absolute',
                        left: '-9999px',
                        width: 1,
                        height: 1,
                        overflow: 'hidden',
                    }}
                >
                    {liveMessage}
                </div>
            )}
            {/* Toasts UI */}
            <div
                aria-live="off"
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}
            >
                {visibleToasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="alert"
                        style={{
                            background: '#222',
                            color: '#fff',
                            padding: '12px 20px',
                            borderRadius: 4,
                            minWidth: 200,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <span style={{ flex: 1 }}>{toast.message}</span>
                        {toast.actionLabel && (
                            <button
                                onClick={() => {
                                    toast.onAction?.();
                                    clearToast(toast.id);
                                }}
                                style={{
                                    background: 'transparent',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {toast.actionLabel}
                            </button>
                        )}
                        <button
                            aria-label="Dismiss"
                            onClick={() => clearToast(toast.id)}
                            style={{
                                background: 'transparent',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 18,
                                marginLeft: 4,
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
