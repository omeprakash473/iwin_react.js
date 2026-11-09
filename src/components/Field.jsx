import React, { useState } from 'react';

export default function Field({ label, id, icon, type, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-wrap">{icon && <img src={icon} alt="" />}<input id={id} {...props} type={isPassword && visible ? 'text' : type} />{isPassword && <button className="password-toggle" type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-controls={id} onClick={() => setVisible(value => !value)}>{visible ? 'Hide' : 'Show'}</button>}</div></div>;
}
