import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgIcecream } from '@bspk/icons/Icecream';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgLightbulb } from '@bspk/icons/Lightbulb';
import { SvgOpportunities } from '@bspk/icons/Opportunities';
import { SvgSignLanguage } from '@bspk/icons/SignLanguage';

import { ChipGroupUtilityProps } from '../../ChipGroupUtility';
import { ComponentExample } from '../utils';

export const ChipGroupUtilityExample: ComponentExample<ChipGroupUtilityProps> = {
    presets: [
        {
            label: 'wrap',
            propState: {
                items: [
                    { label: 'chip 1' },
                    { label: 'chip 2' },
                    { label: 'chip 3' },
                    { label: 'chip 4' },
                    { label: 'chip 5' },
                    { label: 'chip 6' },
                    { label: 'chip 7' },
                ],
                wrap: true,
            },
        },
        {
            label: 'scroll',
            propState: {
                items: [
                    { label: 'chip 1' },
                    { label: 'chip 2' },
                    { label: 'chip 3' },
                    { label: 'chip 4' },
                    { label: 'chip 5' },
                    { label: 'chip 6' },
                    { label: 'chip 7' },
                ],
                wrap: false,
            },
        },
        {
            label: 'suggestion',
            propState: {
                items: [
                    { label: 'chip 1' },
                    { label: 'chip 2' },
                    { label: 'chip 3' },
                    { label: 'chip 4' },
                    { label: 'chip 5' },
                    { label: 'chip 6' },
                    { label: 'chip 7' },
                ],
                wrap: false,
            },
        },
        {
            label: 'assist',
            propState: {
                items: [
                    { label: 'chip 1', leadingIcon: <SvgOpportunities /> },
                    { label: 'chip 2' },
                    { label: 'chip 3', leadingIcon: <SvgLightbulb /> },
                    { label: 'chip 4' },
                    { label: 'chip 5', leadingIcon: <SvgSignLanguage /> },
                    { label: 'chip 6' },
                    { label: 'chip 7', leadingIcon: <SvgIcecream /> },
                ],
                wrap: false,
            },
        },
        {
            label: 'input',
            propState: {
                items: [
                    { label: 'chip 1', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
                    { label: 'chip 2', trailingIcon: <SvgClose /> },
                    { label: 'chip 3', leadingIcon: <SvgLightbulb /> },
                    { label: 'chip 4' },
                    { label: 'chip 5', leadingIcon: <SvgSignLanguage /> },
                    { label: 'chip 6' },
                    { label: 'chip 7', leadingIcon: <SvgIcecream /> },
                ],
                wrap: false,
            },
        },
        {
            label: 'filter',
            propState: {
                items: [
                    { label: 'chip 1', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
                    { label: 'chip 2', trailingIcon: <SvgKeyboardArrowDown /> },
                    { label: 'chip 3', leadingIcon: <SvgLightbulb />, trailingIcon: <SvgChevronRight /> },
                    { label: 'chip 4' },
                    { label: 'chip 5', leadingIcon: <SvgSignLanguage /> },
                    { label: 'chip 6' },
                    { label: 'chip 7', leadingIcon: <SvgIcecream /> },
                ],
                wrap: false,
            },
        },
    ],
};
