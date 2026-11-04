import React from 'react';
import InformationPage from '../components/InformationPage.jsx';
import DocumentBlocks from '../components/DocumentBlocks.jsx';
import {aboutDocument} from '../data/staticDocuments.js';

export default function AboutUs() {
  return <InformationPage title="About Us" description="Discover the I-WIN Pathway Program."><article><DocumentBlocks blocks={aboutDocument}/></article></InformationPage>;
}
