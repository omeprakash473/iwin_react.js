import React from 'react';

export default function Logo({className='',...props}) {
 return <img className={'iwin-logo '+className} src={import.meta.env.BASE_URL+'assets/brand/iwin-emblem.png'} alt="I-WIN" width="1293" height="1216" decoding="async" {...props}/>;
}
