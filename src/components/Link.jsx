import React from 'react';
export default function Link({href, ...props}) {
 const target = href?.startsWith('/') && !href.startsWith('//') ? import.meta.env.BASE_URL + href.slice(1) : href;
 return <a {...props} href={target} />;
}
