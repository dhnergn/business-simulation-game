/**
 * Consent Management System for React/Vite Applications
 * KVKK/GDPR/ISO 27001 Compliant
 * Supports: Turkish & English
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';

// ============================================
// TYPES
// ============================================

export type Language = 'en' | 'tr';

export type ConsentCategory =
  | 'necessary'
  | 'functional'
  | 'analytics'
  | 'marketing';

export interface ConsentPreferences {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean; // We don't use, but keep for compliance
  version: string;
  timestamp: string;
  language: Language;
  ipHash?: string; // Anonymized
}

export interface ConsentContextType {
  preferences: ConsentPreferences | null;
  hasConsented: boolean;
  showConsentModal: boolean;
  setShowConsentModal: (show: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  updateCategory: (category: ConsentCategory, value: boolean) => void;
  resetConsent: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ============================================
// CONSTANTS
// ============================================

const CONSENT_STORAGE_KEY = 'kvkk_consent_preferences';
const CONSENT_VERSION = '1.0';
const CONSENT_LANGUAGE_KEY = 'kvkk_consent_language';

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  language: 'en',
};

// ============================================
// TRANSLATIONS
// ============================================

const translations: Record<Language, Record<string, string>> = {
  en: {
    consentTitle: 'Privacy & Cookie Consent',
    consentDescription: 'We respect your privacy. Choose which categories you consent to. You can change these anytime in Settings.',
    necessary: 'Strictly Necessary',
    necessaryDesc: 'Required for the app to function (authentication, security, session). Cannot be disabled.',
    functional: 'Functional',
    functionalDesc: 'Remember your preferences (language, theme, region).',
    analytics: 'Analytics',
    analyticsDesc: 'Anonymous usage statistics to improve the app. No personal data collected.',
    marketing: 'Marketing',
    marketingDesc: 'We do not use marketing cookies.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject Optional',
    savePreferences: 'Save Preferences',
    settings: 'Privacy Settings',
    learnMore: 'Learn More',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    termsOfService: 'Terms of Service',
    kvkkInfo: 'KVKK Compliant • GDPR Compliant • ISO 27001 Aligned',
    dataController: 'Data Controller: Aixoratechnology',
    contactDPO: 'Contact DPO: dpo@aixoratechnology.com',
  },
  tr: {
    consentTitle: 'Gizlilik ve Çerez Rızası',
    consentDescription: 'Gizliliğinize saygı duyuyoruz. Onay vereceğiniz kategorileri seçin. Ayarlar\'dan 언제든지 değiştirebilirsiniz.',
    necessary: 'Kesinlikle Gerekli',
    necessaryDesc: 'Uygulamanın çalışması için zorunlu (kimlik doğrulama, güvenlik, oturum). Devre dışı bırakılamaz.',
    functional: 'İşlevsel',
    functionalDesc: 'Tercihlerinizi hatırlar (dil, tema, bölge).',
    analytics: 'Analitik',
    analyticsDesc: 'Uygulamayı iyileştirmek için anonim kullanım istatistikleri. Kişisel veri toplanmaz.',
    marketing: 'Pazarlama',
    marketingDesc: 'Pazarlama çerezleri kullanmıyoruz.',
    acceptAll: 'Tümünü Kabul Et',
    rejectAll: 'İsteğe Bağlıları Reddet',
    savePreferences: 'Tercihleri Kaydet',
    settings: 'Gizlilik Ayarları',
    learnMore: 'Daha Fazla Bilgi',
    privacyPolicy: 'Gizlilik Politikası',
    cookiePolicy: 'Çerez Politikası',
    termsOfService: 'Hizmet Şartları',
    kvkkInfo: 'KVKK Uyumlu • GDPR Uyumlu • ISO 27001 Uyumlu',
    dataController: 'Veri Sorumlusu: Aixoratechnology',
    contactDPO: 'VKS İletişim: dpo@aixoratechnology.com',
  },
};

// ============================================
// UTILITIES
// ============================================

function generateIpHash(): string {
  // In production, this would be a server-side anonymized hash
  // Client-side: we don't actually collect IP, just a random session identifier
  return 'anon_' + Math.random().toString(36).substring(2, 15);
}

function loadPreferences(): ConsentPreferences | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate version
      if (parsed.version === CONSENT_VERSION) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load consent preferences:', e);
  }
  return null;
}

function savePreferences(prefs: ConsentPreferences): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    // Also set individual cookies for middleware access
    if (prefs.functional) {
      document.cookie = 'consent_functional=true; max-age=31536000; path=/; SameSite=Lax; Secure';
    } else {
      document.cookie = 'consent_functional=; max-age=0; path=/; SameSite=Lax; Secure';
    }
    if (prefs.analytics) {
      document.cookie = 'consent_analytics=true; max-age=31536000; path=/; SameSite=Lax; Secure';
    } else {
      document.cookie = 'consent_analytics=; max-age=0; path=/; SameSite=Lax; Secure';
    }
  } catch (e) {
    console.error('Failed to save consent preferences:', e);
  }
}

// ============================================
// CONTEXT
// ============================================

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function useConsent(): ConsentContextType {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}

// ============================================
// PROVIDER
// ============================================

interface ConsentProviderProps {
  children: ReactNode;
  onConsentChange?: (prefs: ConsentPreferences) => void;
  autoShowModal?: boolean; // Default: true for first visit
}

export function ConsentProvider({
  children,
  onConsentChange,
  autoShowModal = true,
}: ConsentProviderProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem(CONSENT_LANGUAGE_KEY) as Language) || 'en';
    } catch {
      return 'en';
    }
  });
  const [initialized, setInitialized] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const loaded = loadPreferences();
    const storedLang = localStorage.getItem(CONSENT_LANGUAGE_KEY) as Language | null;
    
    if (loaded) {
      setPreferences(loaded);
      if (loaded.language) {
        setLanguageState(loaded.language);
      }
      // Don't show modal if already consented
      if (autoShowModal) {
        setShowModal(false);
      }
    } else if (autoShowModal) {
      // First visit - show modal
      setShowModal(true);
    }
    
    if (storedLang) {
      setLanguageState(storedLang);
    }
    
    setInitialized(true);
  }, [autoShowModal]);

  const t = useCallback((key: string) => {
    return translations[language][key] || translations.en[key] || key;
  }, [language]);

  const hasConsented = preferences !== null;

  const acceptAll = useCallback(() => {
    const newPrefs: ConsentPreferences = {
      ...DEFAULT_PREFERENCES,
      functional: true,
      analytics: true,
      marketing: false, // We don't use marketing
      language,
      ipHash: generateIpHash(),
    };
    setPreferences(newPrefs);
    savePreferences(newPrefs);
    setShowModal(false);
    onConsentChange?.(newPrefs);
  }, [language, onConsentChange]);

  const rejectAll = useCallback(() => {
    const newPrefs: ConsentPreferences = {
      ...DEFAULT_PREFERENCES,
      functional: false,
      analytics: false,
      marketing: false,
      language,
      ipHash: generateIpHash(),
    };
    setPreferences(newPrefs);
    savePreferences(newPrefs);
    setShowModal(false);
    onConsentChange?.(newPrefs);
  }, [language, onConsentChange]);

  const updateCategory = useCallback((category: ConsentCategory, value: boolean) => {
    if (category === 'necessary') return; // Cannot disable
    if (category === 'marketing') return; // We don't use
    
    setPreferences(prev => {
      if (!prev) return prev;
      const newPrefs = {
        ...prev,
        [category]: value,
        timestamp: new Date().toISOString(),
        language,
        ipHash: generateIpHash(),
      };
      savePreferences(newPrefs);
      onConsentChange?.(newPrefs);
      return newPrefs;
    });
  }, [language, onConsentChange]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(CONSENT_LANGUAGE_KEY);
    document.cookie = 'consent_functional=; max-age=0; path=/; SameSite=Lax; Secure';
    document.cookie = 'consent_analytics=; max-age=0; path=/; SameSite=Lax; Secure';
    setPreferences(null);
    setShowModal(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(CONSENT_LANGUAGE_KEY, lang);
    setPreferences(prev => prev ? { ...prev, language: lang } : null);
  }, []);

  const value = useMemo(() => ({
    preferences,
    hasConsented,
    showConsentModal: showModal && initialized,
    setShowConsentModal: setShowModal,
    acceptAll,
    rejectAll,
    updateCategory,
    resetConsent,
    language,
    setLanguage,
    t,
  }), [
    preferences,
    hasConsented,
    showModal,
    initialized,
    acceptAll,
    rejectAll,
    updateCategory,
    resetConsent,
    language,
    setLanguage,
    t,
  ]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

// ============================================
// CONSENT MODAL COMPONENT
// ============================================

interface ConsentModalProps {
  className?: string;
}

export function ConsentModal({ className = '' }: ConsentModalProps) {
  const {
    showConsentModal,
    setShowConsentModal,
    acceptAll,
    rejectAll,
    updateCategory,
    preferences,
    t,
    language,
    setLanguage,
  } = useConsent();

  if (!showConsentModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Don't close on overlay click - require explicit action
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="consent-title" className="text-2xl font-bold">{t('consentTitle')}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm ${language === 'en' ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30'}`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-3 py-1 rounded text-sm ${language === 'tr' ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30'}`}
                aria-pressed={language === 'tr'}
              >
                TR
              </button>
            </div>
          </div>
          <p className="text-blue-100 text-lg">{t('consentDescription')}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Necessary - Always enabled */}
          <ConsentCategoryRow
            category="necessary"
            title={t('necessary')}
            description={t('necessaryDesc')}
            enabled={true}
            disabled
          />

          <div className="border-t border-gray-100 pt-4 space-y-4">
            {/* Functional */}
            <ConsentCategoryRow
              category="functional"
              title={t('functional')}
              description={t('functionalDesc')}
              enabled={preferences?.functional ?? false}
              onChange={(v) => updateCategory('functional', v)}
            />

            {/* Analytics */}
            <ConsentCategoryRow
              category="analytics"
              title={t('analytics')}
              description={t('analyticsDesc')}
              enabled={preferences?.analytics ?? false}
              onChange={(v) => updateCategory('analytics', v)}
            />

            {/* Marketing - Disabled/Info only */}
            <ConsentCategoryRow
              category="marketing"
              title={t('marketing')}
              description={t('marketingDesc')}
              enabled={false}
              disabled
            />
          </div>

          {/* Links */}
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
            <p className="font-medium">{t('learnMore')}</p>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {t('privacyPolicy')}
              </a>
              <a href="/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {t('cookiePolicy')}
              </a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {t('termsOfService')}
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={rejectAll}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t('rejectAll')}
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('acceptAll')}
            </button>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>{t('kvkkInfo')}</p>
            <p>{t('dataController')}</p>
            <p>{t('contactDPO')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONSENT CATEGORY ROW
// ============================================

interface ConsentCategoryRowProps {
  category: ConsentCategory;
  title: string;
  description: string;
  enabled: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

function ConsentCategoryRow({
  category,
  title,
  description,
  enabled,
  onChange,
  disabled = false,
}: ConsentCategoryRowProps) {
  const isNecessary = category === 'necessary';

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {isNecessary && (
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-medium">
              Required
            </span>
          )}
          {category === 'marketing' && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
              Not Used
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <ToggleSwitch
        checked={enabled}
        onChange={onChange}
        disabled={disabled || isNecessary || category === 'marketing'}
        aria-label={title}
      />
    </div>
  );
}

// ============================================
// TOGGLE SWITCH
// ============================================

interface ToggleSwitchProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function ToggleSwitch({ checked, onChange, disabled, ariaLabel }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        aria-hidden="true"
      />
    </button>
  );
}

// ============================================
// PRIVACY SETTINGS COMPONENT (for Settings page)
// ============================================

export function PrivacySettings() {
  const {
    preferences,
    updateCategory,
    resetConsent,
    language,
    setLanguage,
    t,
  } = useConsent();

  if (!preferences) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('consentDescription')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-900">{language === 'en' ? 'Language' : 'Dil'}</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <ConsentCategoryRow
          category="necessary"
          title={t('necessary')}
          description={t('necessaryDesc')}
          enabled={true}
          disabled
        />

        <ConsentCategoryRow
          category="functional"
          title={t('functional')}
          description={t('functionalDesc')}
          enabled={preferences.functional}
          onChange={(v) => updateCategory('functional', v)}
        />

        <ConsentCategoryRow
          category="analytics"
          title={t('analytics')}
          description={t('analyticsDesc')}
          enabled={preferences.analytics}
          onChange={(v) => updateCategory('analytics', v)}
        />

        <ConsentCategoryRow
          category="marketing"
          title={t('marketing')}
          description={t('marketingDesc')}
          enabled={false}
          disabled
        />
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-4">
        <button
          onClick={resetConsent}
          className="px-6 py-3 text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors"
        >
          {language === 'en' ? 'Reset Consent & Show Modal Again' : 'Rızayı Sıfırla ve Tekrar Göster'}
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-2">{language === 'en' ? 'Your Rights (KVKK Art. 11 / GDPR Art. 15-22)' : 'Haklarınız (KVKK Md. 11 / GDPR Md. 15-22)'}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{language === 'en' ? 'Access, rectify, delete your data' : 'Verilerinize erişim, düzeltme, silme'}</li>
          <li>{language === 'en' ? 'Restrict or object to processing' : 'İşlemi kısıtlama veya itiraz etme'}</li>
          <li>{language === 'en' ? 'Data portability' : 'Veri taşınabilirliği'}</li>
          <li>{language === 'en' ? 'Withdraw consent anytime' : 'Rızayı her an geri çekme'}</li>
          <li>{language === 'en' ? 'Lodge complaint with KVKK/DPA' : 'KVKK/AB kurumuna şikayet'}</li>
        </ul>
        <p className="mt-3">
          <a href="mailto:privacy@aixoratechnology.com" className="underline hover:text-blue-600">
            {language === 'en' ? 'Contact DPO: privacy@aixoratechnology.com' : 'VKS ile iletişim: privacy@aixoratechnology.com'}
          </a>
        </p>
      </div>
    </div>
  );
}

// ============================================
// HOOKS FOR CONDITIONAL FEATURES
// ============================================

export function useFunctionalConsent(): boolean {
  const { preferences } = useConsent();
  return preferences?.functional ?? false;
}

export function useAnalyticsConsent(): boolean {
  const { preferences } = useConsent();
  return preferences?.analytics ?? false;
}

export function useConsentValue(): ConsentPreferences | null {
  const { preferences } = useConsent();
  return preferences;
}

// ============================================
// ANALYTICS INTEGRATION HELPER
// ============================================

export function initAnalytics(): void {
  // Only initialize analytics if consent given
  const prefs = loadPreferences();
  if (prefs?.analytics) {
    // Initialize your analytics here (Plausible, GA4, etc.)
    // Example for Plausible:
    // const script = document.createElement('script');
    // script.defer = true;
    // script.dataset.domain = 'yourdomain.com';
    // script.src = 'https://plausible.io/js/script.js';
    // document.head.appendChild(script);
    
    console.log('[Consent] Analytics initialized (consent granted)');
  } else {
    console.log('[Consent] Analytics blocked (no consent)');
  }
}

export function initFunctionalCookies(): void {
  const prefs = loadPreferences();
  if (prefs?.functional) {
    // Apply saved preferences (theme, language, etc.)
    console.log('[Consent] Functional preferences applied');
  }
}