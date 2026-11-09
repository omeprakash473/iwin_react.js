import InformationPage from '../components/InformationPage.jsx';
import DocumentBlocks from '../components/DocumentBlocks.jsx';
import {faqDocument} from '../data/faqDocument.js';

export {faqCategories} from '../data/faqCategories.js';

export default function Faqs() {
  return <InformationPage title="Frequently Asked Questions" description="Clear answers for students and parents about the I-WIN Pathway."><article className="information-article faqs-page"><DocumentBlocks blocks={faqDocument}/></article></InformationPage>;
}
