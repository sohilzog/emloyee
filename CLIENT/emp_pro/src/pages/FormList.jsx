import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllForms } from '../services/fetchApi'; // Assuming this is where the API is located
import '../css/list.css'; // Ensure this import is correct
 // Import the CSS file for styling

const FormList = ({ header }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getAllForms(header);
        setForms(response.data); // Store the form data in the state
      } catch (error) {
        toast.error('Error fetching forms');
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [header]);

  return (
    <div className="form-list">
      <h2>Form List</h2>
      {forms.length === 0 ? (
        <p>No forms available</p>
      ) : (
        <div className="form-container">
          {forms.map((form) => (
            <div key={form.id} className="form-card">
              <h3 className="form-name">{form.name}</h3>
              <p className="form-description">{form.description}</p>
              <div className="fields-list">
                <p><strong>Fields:</strong></p>
                <ul>
                  {form.fields.map((field, index) => (
                    <li key={index}>
                      <strong>{field.label}</strong> ({field.field_type})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;
