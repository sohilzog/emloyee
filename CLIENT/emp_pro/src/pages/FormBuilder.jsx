
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../services/fetchApi'; // Assuming this is where the API is located
import '../css/form.css'; // Ensure this import is correct
// Import the CSS file for styling

const FormBuilder = () => {
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState([{ label: '', type: 'text', required: false }]);
  const navigate = useNavigate();

  const addField = () => {
    setFields([...fields, { label: '', type: 'text', required: false }]);
  };

  const handleFieldChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate the form before submission
    if (!formName || !formDescription || fields.some(field => !field.label)) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const formData = {
      name: formName,
      description: formDescription,
      fields: fields.map((field, index) => ({
        ...field,
        field_type: field.type, // Change 'type' to 'field_type'
        order: index + 1, // Ensure order is a number, not an array
      })),
    };
  
    // Use the createForm API to submit the form data
    createForm(formData)
      .then(response => {
        toast.success('Form created successfully!');
        navigate('/formlist'); // Redirect to form list after successful submission
      })
      .catch(error => {
        toast.error('Error creating form');
        console.error('Error creating form:', error.response?.data || error.message);
      });
  };

  return (
    <div className="form-builder">
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Form Name</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            placeholder="Enter form name"
          />
        </div>
        <div className="form-group">
          <label>Form Description</label>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter form description"
          />
        </div>

        {fields.map((field, index) => (
          <div className="field-group" key={index}>
            <h4>Field {index + 1}</h4>
            <div className="form-group">
              <label>Field Label</label>
              <input
                type="text"
                name="label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, e)}
                required
                placeholder="Enter field label"
              />
            </div>
            <div className="form-group">
              <label>Field Type</label>
              <select
                name="type"
                value={field.type}
                onChange={(e) => handleFieldChange(index, e)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="password">Password</option>
              </select>
            </div>
            <div className="form-group">
              <label>Required</label>
              <input
                type="checkbox"
                name="required"
                checked={field.required}
                onChange={(e) => handleFieldChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="button-group">
          <button type="button" onClick={addField}>Add Field</button>
          <button type="submit">Submit Form</button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;

// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { createForm } from '../services/fetchApi'; // Assuming this is where the API is located
// import '../css/form.css'; // Ensure this import is correct

// const FormBuilder = () => {
//   const [formName, setFormName] = useState('');
//   const [formDescription, setFormDescription] = useState('');
//   const [fields, setFields] = useState([{ label: '', type: 'text', required: false }]);
//   const navigate = useNavigate();

//   const addField = () => {
//     setFields([...fields, { label: '', type: 'text', required: false }]);
//   };

//   const handleFieldChange = (index, event) => {
//     const newFields = [...fields];
//     newFields[index][event.target.name] = event.target.value;
//     setFields(newFields);
//   };

//   const handleCheckboxChange = (index, event) => {
//     const newFields = [...fields];
//     newFields[index].required = event.target.checked;
//     setFields(newFields);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validate the form before submission
//     if (!formName || !formDescription || fields.some(field => !field.label)) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const formData = {
//       name: formName,
//       description: formDescription,
//       fields: fields.map((field, index) => ({
//         label: field.label,
//         field_type: field.type,  // Make sure to use field_type to match backend
//         required: field.required,
//         order: index + 1,  // Ensure the order is properly set
//       })),
//     };

//     // Use the createForm API to submit the form data
//     createForm(formData)
//       .then(response => {
//         toast.success('Form created successfully!');
//         navigate('/formlist'); // Redirect to form list after successful submission
//       })
//       .catch(error => {
//         toast.error('Error creating form');
//         console.error('Error creating form:', error.response?.data || error.message);
//       });
//   };

//   return (
//     <div className="form-builder">
//       <h2>Create New Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Form Name</label>
//           <input
//             type="text"
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//             required
//             placeholder="Enter form name"
//           />
//         </div>
//         <div className="form-group">
//           <label>Form Description</label>
//           <textarea
//             value={formDescription}
//             onChange={(e) => setFormDescription(e.target.value)}
//             placeholder="Enter form description"
//           />
//         </div>

//         {fields.map((field, index) => (
//           <div className="field-group" key={index}>
//             <h4>Field {index + 1}</h4>
//             <div className="form-group">
//               <label>Field Label</label>
//               <input
//                 type="text"
//                 name="label"
//                 value={field.label}
//                 onChange={(e) => handleFieldChange(index, e)}
//                 required
//                 placeholder="Enter field label"
//               />
//             </div>
//             <div className="form-group">
//               <label>Field Type</label>
//               <select
//                 name="type"
//                 value={field.type}
//                 onChange={(e) => handleFieldChange(index, e)}
//               >
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="date">Date</option>
//                 <option value="password">Password</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Required</label>
//               <input
//                 type="checkbox"
//                 name="required"
//                 checked={field.required}
//                 onChange={(e) => handleCheckboxChange(index, e)}
//               />
//             </div>
//           </div>
//         ))}

//         <div className="button-group">
//           <button type="button" onClick={addField}>Add Field</button>
//           <button type="submit">Submit Form</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormBuilder;

