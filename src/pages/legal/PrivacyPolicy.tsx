import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {/* Content loaded from PRIVACY_POLICY_EN.md */}
        <p className="text-gray-600 dark:text-gray-400">
          Privacy Policy content will be rendered here. 
          See <code>/legal-compliance/shared/policies/PRIVACY_POLICY_EN.md</code>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
