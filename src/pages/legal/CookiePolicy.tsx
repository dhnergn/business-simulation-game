import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400">
          Cookie Policy content will be rendered here.
          See <code>/legal-compliance/shared/policies/COOKIE_POLICY_EN.md</code>
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;
