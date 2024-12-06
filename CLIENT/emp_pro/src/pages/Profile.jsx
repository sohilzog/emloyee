// import React, { useState, useEffect } from 'react';
// import { viewProfile, changePassword } from '../services/fetchApi'; // Assuming changePassword is defined in fetchApi

// function Profile() {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [passwordError, setPasswordError] = useState(null);
//   const [passwordSuccess, setPasswordSuccess] = useState(null);

//   useEffect(() => {
//     const header = {
//       Authorization: `Token ${sessionStorage.getItem('token')}`,
//     };

//     viewProfile(header)
//       .then((response) => {
//         const data = response.data;
//         setProfileData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to fetch profile');
//         setLoading(false);
//       });
//   }, []);

//   const handlePasswordChange = (e) => {
//     setPasswordData({
//       ...passwordData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitPasswordChange = (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordError('New passwords do not match');
//       return;
//     }

//     const header = {
//       Authorization: `Token ${sessionStorage.getItem('token')}`,
//     };

//     changePassword(passwordData, header)
//       .then(() => {
//         setPasswordSuccess('Password changed successfully');
//         setPasswordError(null);
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//         });
//       })
//       .catch(() => {
//         setPasswordError('Failed to change password');
//         setPasswordSuccess(null);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>User Profile</h1>
//       {profileData ? (
//         <div>
//           <p><strong>Username:</strong> {profileData.username}</p>
//           <p><strong>Email:</strong> {profileData.email}</p>
//         </div>
//       ) : (
//         <p>No profile data available.</p>
//       )}

//       <h2>Change Password</h2>
//       <form onSubmit={handleSubmitPasswordChange}>
//         <div>
//           <label>Current Password:</label>
//           <input
//             type="password"
//             name="currentPassword"
//             value={passwordData.currentPassword}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={passwordData.newPassword}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm New Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={passwordData.confirmPassword}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
//         {passwordSuccess && <div style={{ color: 'green' }}>{passwordSuccess}</div>}
//         <button type="submit">Change Password</button>
//       </form>
//     </div>
//   );
// }

// export default Profile;



import React, { useState, useEffect } from 'react';
import '../css/profile.css'; // Ensure this import is correct

import { viewProfile, changePassword } from '../services/fetchApi'; // Assuming changePassword is defined in fetchApi
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [showInlineForm, setShowInlineForm] = useState(false); // To toggle inline form

  useEffect(() => {
    const header = {
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    };

    viewProfile(header)
      .then((response) => {
        const data = response.data;
        setProfileData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch profile');
        setLoading(false);
      });
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const header = {
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    };

    changePassword(passwordData, header)
      .then(() => {
        setPasswordSuccess('Password changed successfully');
        toast.success("Password changed successfully")
        setPasswordError(null);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowInlineForm(false); // Hide inline form after successful change
      })
      .catch(() => {
        setPasswordError('Failed to change password');
        setPasswordSuccess(null);
      });
  };

  const toggleInlineForm = () => {
    setShowInlineForm((prev) => !prev); // Toggle visibility of inline form
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {profileData.username}!</h1>
      {profileData ? (
        <div className="profile-card">
          <h3>Your Details</h3>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}

      <h2 className="change-password-heading">Change Password</h2>
      
      {/* Option: Inline Form */}
      <Button variant="secondary" onClick={toggleInlineForm}>
        Change Password
      </Button>

      {/* Inline Form for Password Change */}
      {showInlineForm && (
        <div className="inline-form" >
          <h3>Change Password </h3>
          <Form onSubmit={handleSubmitPasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            {passwordSuccess && <div style={{ color: 'green' }}>{passwordSuccess}</div>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Profile;
