import React from 'react';

export default function DocumentBlocks({blocks}) {
  const sections = [];
  let section;
  for (const block of blocks) {
    if (block.type === 'heading' || !section) {section = {heading:block.type === 'heading' ? block.text : null, blocks:[]};sections.push(section);}
    if (block.type === 'heading') continue;
    const previous = section.blocks[section.blocks.length - 1];
    if (block.type === 'bullet') {
      if (previous?.type === 'list') previous.items.push(block.text);
      else section.blocks.push({type:'list',items:[block.text]});
    } else section.blocks.push(block);
  }
  return <>{sections.map((section,index) => <section key={section.heading || index}>
    {section.heading && <h2>{section.heading}</h2>}
    {section.blocks.map((block,blockIndex) => block.type === 'list' ? <ul key={blockIndex}>{block.items.map((item,itemIndex) => <li key={itemIndex}>{item}</li>)}</ul> : block.type === 'subheading' ? <h3 key={blockIndex}>{block.text}</h3> : <p key={blockIndex}>{block.text}</p>)}
  </section>)}</>;
}
