const { auditTextBody } = require('./banned-jargon.js');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(fs.readFileSync('./schemas/asset-core.schema.json', 'utf8'));
const validate = ajv.compile(schema);

function checkDirectory(dir) {
  let hasErrors = false;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (checkDirectory(fullPath)) hasErrors = true;
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Extract everything between the first pair of --- lines
      const match = content.match(/^---([\s\S]*?)---/);
      
      if (!match) {
        console.error(`❌ Error in ${fullPath}: Missing YAML frontmatter bounds.`);
        hasErrors = true;
        return;
      }

      try {
        const metadata = yaml.load(match[1]);
        const valid = validate(metadata);
        
        if (!valid) {
          console.error(`❌ Metadata validation failed for: ${fullPath}`);
          console.error(validate.errors);
          hasErrors = true;
        } else {
          console.log(`✅ ${fullPath} passed structural validation.`);
        }
      } catch (e) {
        console.error(`❌ Invalid YAML format in ${fullPath}:`, e.message);
        hasErrors = true;
      }
    }
  });
  return hasErrors;
}

const errorsFound = checkDirectory('./content');
if (errorsFound) {
  process.exit(1); // Tells GitHub actions that the build failed
} else {
  console.log('\n🎉 All content assets match the metadata schema perfectly!');
}
