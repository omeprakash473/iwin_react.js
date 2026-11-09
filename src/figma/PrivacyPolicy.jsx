import React from 'react';
import InformationPage from '../components/InformationPage.jsx';
import DocumentBlocks from '../components/DocumentBlocks.jsx';
import {privacyDocument} from '../data/staticDocuments.js';

export default function PrivacyPolicy() {
  return <InformationPage title="Privacy Policy" description="How I-WIN collects, uses and protects personal information."><article><DocumentBlocks blocks={privacyDocument}/></article></InformationPage>;
}
