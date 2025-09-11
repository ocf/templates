import React, { useState, useEffect } from 'react';
import { all_templates as templates } from './template';

type TemplateName = keyof typeof templates;

export default function Templates() {
  const [selectedTemplateName, setSelectedTemplateName] = useState<TemplateName>("lost-and-found");
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  // Use a useEffect hook to initialize state when the selected template changes
  useEffect(() => {
    const template = templates[selectedTemplateName];
    const initialValues = template.fields.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {} as Record<string, string>);
    setVariableValues(initialValues);
  }, [selectedTemplateName]);

  const handleLinkClick = (name: TemplateName) => {
    setSelectedTemplateName(name);
  };

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariableValues(prev => ({ ...prev, [name]: value }));
  };

  const selectedTemplate = templates[selectedTemplateName];
  const renderedText = selectedTemplate.render(variableValues as any);

  return (
    <div>
      <div>
        <ul>
          {Object.keys(templates).map(name => (
            <li 
              key={name}
              style={{ display: 'inline-block', marginRight: '15px' }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(name as TemplateName);
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {selectedTemplate.fields.map(field => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={variableValues[field] || ''}
              onChange={handleVariableChange}
            />
          </div>
        ))}
      </div>
      <textarea
        readOnly
        value={renderedText}
        style={{ width: '100%', height: '80vh' }}
      />
    </div>
  );
}