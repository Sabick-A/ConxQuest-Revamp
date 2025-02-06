import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blackw bg-opacity-80 backdrop-blur-sm">
          <div className="text-center p-8 bg-whitesmoke rounded-2xl border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)] max-w-[95vw]">
            <h1 className="text-2xl font-game tracking-wider text-green-700 mb-6 pb-2 border-b-2 border-green-700 border-opacity-30">
              SYSTEM ERROR ENCOUNTERED
            </h1>
            <p className="text-gray-600 mb-6">We apologize for the interruption in your quest. Please choose your next action:</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-game tracking-wide border-2 border-green-700 border-opacity-30 hover:border-opacity-50"
              >
                Reload Current Quest
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-[#2a7299] bg-opacity-10 text-green-700 px-6 py-3 rounded-lg hover:bg-opacity-20 transition-colors font-game tracking-wide border-2 border-green-700 border-opacity-30 hover:border-opacity-50"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
