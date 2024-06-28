import React, { useState } from 'react';
import '/styles.css'; // Assuming you have an App.css file for styling

export default function App() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateEmail();
        validatePassword();

        if (!emailError && !passwordError) {
            console.log('Form submitted successfully!');
            // Here you can add your form submission logic
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        className="form-control"
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        className="form-control"
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>

                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
}
