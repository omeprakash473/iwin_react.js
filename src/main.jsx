import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return <pre style={{ padding: 32, whiteSpace: 'pre-wrap' }}>{String(this.state.error.stack || this.state.error)}</pre>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(<AppErrorBoundary><App /></AppErrorBoundary>);

