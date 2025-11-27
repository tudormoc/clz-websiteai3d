/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface Laureate {
  name: string;
  image: string; // placeholder url
  role: string;
  desc: string;
}

export type AnatomyPartKey = 'cover' | 'spine' | 'headband' | 'endpapers' | 'block' | 'ribbon' | 'hinge';

export const bindingTypeKeys = ['perfect', 'swiss', 'bodonian', 'halfleather', 'leporello', 'octavius'] as const;
export type BindingTypeKey = typeof bindingTypeKeys[number];

export interface ProjectProps {
  category: string;
  title: string;
  client: string;
  year: string;
  specs: { label: string, value: string }[];
  style: string;
  spineColor: string;
}