import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import HeroSections1 from '../../components/HeroSections/HeroSections1';
import HeroSections2 from '../../components/HeroSections/HeroSections2';
import HeroSections3 from '../../components/HeroSections/HeroSections3';
import HeroSections4 from '../../components/HeroSections/HeroSections4';
import HeroSections5 from '../../components/HeroSections/HeroSections5';
import HeroSections6 from '../../components/HeroSections/HeroSections6';
import HeroSections7 from '../../components/HeroSections/HeroSections7';
import HeroSections8 from '../../components/HeroSections/HeroSections8';
import HeroSections9 from '../../components/HeroSections/HeroSections9';
import HeroSections10 from '../../components/HeroSections/HeroSections10';
import HeroSections11 from '../../components/HeroSections/HeroSections11';
import HeroSections12 from '../../components/HeroSections/HeroSections12';
export default function HeroSections() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Hero sections"
        titleDescription="Create stunning presentation website and hero sections with these examples."
      />

      <ExampleWrapperSimple sectionHeading="Hero section 1">
        <HeroSections1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 2">
        <HeroSections2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 3">
        <HeroSections3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 4">
        <HeroSections4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 5">
        <HeroSections5 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 6">
        <HeroSections6 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 7">
        <HeroSections7 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 8">
        <HeroSections8 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 9">
        <HeroSections9 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 10">
        <HeroSections10 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 11">
        <HeroSections11 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Hero section 12">
        <HeroSections12 />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
