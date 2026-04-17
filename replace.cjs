const fs = require('fs');
const path = require('path');

const replacements = {
  "'API Gateway Kong'": "'API Gateway'",
  "'Java Spring Boot'": "'Spring Boot'",
  "'React & Frontend'": "'Frontend'",
  "'Docker & Kubernetes'": "'Docker & K8s'",
  "'CI/CD & DevOps'": "'DevOps'",
  "'AWS Cloud'": "'AWS'",
  "'Git & Version Control'": "'Git'",
  "'Observability & Monitoring'": "'Monitoring'",
  "'AI & Machine Learning'": "'AI & ML'",
  "'Data Structures & Algorithms'": "'DSA'"
};

const files = [
  'src/data.ts',
  'src/data2.ts',
  'src/data3.ts',
  'src/data4.ts',
  'src/data_premium.ts',
  'src/components/Sidebar.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [oldStr, newStr] of Object.entries(replacements)) {
      if (content.includes(oldStr)) {
        content = content.split(oldStr).join(newStr);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
