# Developer Guidelines

## Typescript

### Basics

- Use `type` over `interface` to define object shapes. Types are more flexible and can define primitive, intersection,

```typescript
export type CheckboxOptionProps = Pick<
    CheckboxProps,
    'checked' | 'disabled' | 'indeterminate' | 'name' | 'onChange' | 'readOnly' | 'value'
> & InvalidPropsLibrary &
    Pick<ToggleOptionProps, 'description' | 'label'>;
```

union, tuple, or different types of data. Interfaces can only be used to describe the shape of an object.

- Use `unknown` instead of `any` when the type is not known.
- Use `Object.freeze` to mark properties that should not be reassigned.
- Use `as const` over `enum` for related constants.
- Use `handleClick` over `onClick` for event handlers. See: https://react.dev/learn/responding-to-events#adding-event-handlers

## Components

- Every Component gets a JSDoc.
- Use `function Component() {}` over `const Component = () => {}`. This is honestly just a preference, looks cleaner.
- Every Component get a Bespoke Name: `ComponentX.bspkName = 'ComponentX'`. It should be the same name as the Component.

## Styles

### Z-Indexes

- **Tooltip / Popover**: `1100`
- **Dialog**: `1000`
- **Dropdown**: `900`
- **Fab**: `800`
- **Navbar**: `700`
- **Footer**: `600`

<!--- Copyright 2025 Anywhere Real Estate - CC BY 4.0 -->
