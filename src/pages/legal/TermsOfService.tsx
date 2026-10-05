import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400">
          Terms of Service content will be rendered here.
          See <code>/legal-compliance/shared/policies/TERMS_OF_SERVICE_EN.md</code>
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
