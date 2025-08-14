import React, { useState, useRef } from 'react';
import './Prepare.css';

const Prepare = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const printRef = useRef();
  
  const [checklist, setChecklist] = useState({
    documents: [
      { id: 1, item: 'Passport (6+ months validity)', completed: true },
      { id: 2, item: 'Visa documents', completed: false },
      { id: 3, item: 'Travel insurance', completed: false },
      { id: 4, item: 'Flight tickets', completed: true }
    ],
    packing: [
      { id: 5, item: 'Universal adapter', completed: true },
      { id: 6, item: 'Medications', completed: false },
      { id: 7, item: 'Toiletries', completed: false },
      { id: 8, item: 'Reusable water bottle', completed: true }
    ],
    essentials: [
      { id: 9, item: 'Phone charger', completed: true },
      { id: 10, item: 'Power bank', completed: false },
      { id: 11, item: 'Emergency contacts', completed: false },
      { id: 12, item: 'Local currency', completed: true }
    ]
  });

  const toggleItem = (category, id) => {
    setChecklist(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const calculateProgress = () => {
    const allItems = [...checklist.documents, ...checklist.packing, ...checklist.essentials];
    const completed = allItems.filter(item => item.completed).length;
    return Math.round((completed / allItems.length) * 100);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Travel Preparation Checklist</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            .print-checklist { margin-top: 20px; }
            .print-item { margin-bottom: 8px; padding-left: 20px; position: relative; }
            .print-item.completed:before { 
              content: "✓"; 
              position: absolute; 
              left: 0; 
              color: #2ecc71; 
              font-weight: bold; 
            }
            .category { margin-top: 25px; font-weight: bold; color: #3498db; }
            .progress { margin-bottom: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Travel Preparation Checklist</h2>
          <div class="progress">Completion: ${calculateProgress()}%</div>
          
          <div class="category">📝 Documents</div>
          <div class="print-checklist">
            ${checklist.documents.map(item => `
              <div class="print-item ${item.completed ? 'completed' : ''}">
                ${item.item}
              </div>
            `).join('')}
          </div>
          
          <div class="category">🧳 Packing</div>
          <div class="print-checklist">
            ${checklist.packing.map(item => `
              <div class="print-item ${item.completed ? 'completed' : ''}">
                ${item.item}
              </div>
            `).join('')}
          </div>
          
          <div class="category">🔌 Essentials</div>
          <div class="print-checklist">
            ${checklist.essentials.map(item => `
              <div class="print-item ${item.completed ? 'completed' : ''}">
                ${item.item}
              </div>
            `).join('')}
          </div>
          
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="prepare-container" ref={printRef}>
      <h2>Travel Preparation Checklist</h2>
      <p className="progress">Completion: {calculateProgress()}%</p>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          📝 Documents
        </button>
        <button 
          className={`tab ${activeTab === 'packing' ? 'active' : ''}`}
          onClick={() => setActiveTab('packing')}
        >
          🧳 Packing
        </button>
        <button 
          className={`tab ${activeTab === 'essentials' ? 'active' : ''}`}
          onClick={() => setActiveTab('essentials')}
        >
          🔌 Essentials
        </button>
      </div>

      <div className="checklist">
        {checklist[activeTab].map(item => (
          <div 
            key={item.id} 
            className={`checklist-item ${item.completed ? 'completed' : ''}`}
            onClick={() => toggleItem(activeTab, item.id)}
          >
            <span className="checkbox">
              {item.completed ? '✓' : ''}
            </span>
            {item.item}
          </div>
        ))}
      </div>

      <button className="print-btn" onClick={handlePrint}>Print Checklist</button>
    </div>
  );
};

export default Prepare;