import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const normalizeRuleEntry = (entry) => {
  if (Array.isArray(entry)) return entry;
  if (['off', 'warn', 'error'].includes(entry)) return entry;
  return ['error', entry];
};

function createRuleNameNormalizer(pluginName) {
  if (!pluginName) return (ruleName) => ruleName;
  const pluginPrefix = `${pluginName}/`;
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
}

const normalizeRules = (pluginName, rules) => {
  const normalizeRuleName = createRuleNameNormalizer(pluginName);
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => {
      return [normalizeRuleName(ruleName), normalizeRuleEntry(ruleValue)];
    }),
  );
};

const eslintRules = normalizeRules(null, {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
});

const stylisticRules = normalizeRules('@stylistic', {
  indent: 2,
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'padded-blocks': 'off',
});

const typescriptRules = normalizeRules('@typescript-eslint', {
  'array-type': {
    default: 'array-simple',
    readonly: 'array-simple',
  },
});

const stylisticPluginConfig = stylistic.configs.customize({
  semi: true,
  quotes: 'single',
  quoteProps: 'as-needed',
  arrowParens: true,
  braceStyle: '1tbs',
});

const typescriptPluginConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: ['**/*.{js,cjs,mjs}'], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  stylisticPluginConfig,
  ...typescriptPluginConfig,
  { rules: { ...eslintRules, ...stylisticRules, ...typescriptRules } },
);
