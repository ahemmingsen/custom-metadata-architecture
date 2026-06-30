const BANNED_PATTERNS = [
  /delve/i,
  /testament to/i,
  /synergy/i,
  /utilize/i,
  /dynamic paradigm/i
];

function auditTextBody(filePath, textContent) {
  // Strip YAML frontmatter to audit only the human prose
  const bodyText = textContent.replace(/^---([\s\S]*?)---/, '');
  let violations = [];

  BANNED_PATTERNS.forEach(pattern => {
    if (pattern.test(bodyText)) {
      violations.push(pattern.source);
    }
  });

  if (violations.length > 0) {
    console.error(`🚨 Baph-Bot Alert in [${filePath}]: Linguistic devaluation detected.`);
    console.error(`   Please remove cheapened patterns: ${violations.join(', ')}\n`);
    return false;
  }
  return true;
}

module.exports = { auditTextBody };
