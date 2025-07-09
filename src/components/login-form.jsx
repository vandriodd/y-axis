import { useState } from 'react';
import { useLocation } from 'wouter';
import { Icon } from '@iconify/react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [, setLocation] = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Login successful!'
      });

      setFormData({ username: '', password: '' });

      setLocation("/home");

    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fix the errors above'
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {formStatus.submitted && (
          <div className={`flex items-center gap-2 text-sm p-2 rounded ${formStatus.success ? 'bg-green/10 text-green' : 'bg-red-500/10 text-red-500'} mb-2`}>
            {formStatus.success ? <Icon icon="solar:check-circle-bold" /> : <Icon icon="solar:close-circle-bold" />}
            {formStatus.message}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`bg-green/10 rounded-md p-3 focus:outline-none focus:ring-1 ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border border-transparent focus:border-green/30 focus:ring-green'}`}
          />
          {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-green/10 rounded-md p-3 w-full pr-10 focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border border-transparent focus:border-green/30 focus:ring-green'}`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-green focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <Icon icon="heroicons-solid:eye" width="20" height="20" />
              ) : (
                <Icon icon="heroicons-solid:eye-off" width="20" height="20" />
              )}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
        </div>

        <button
          type="submit"
          className="bg-green text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 cursor-pointer hover:bg-green/80 mt-4"
        >
          Log In
        </button>
      </form>

      <div className="flex items-center w-full my-6">
        <div className="flex-grow h-px bg-gold/70"></div>
        <span className="px-4 text-sm text-gold">or</span>
        <div className="flex-grow h-px bg-gold/70"></div>
      </div>

      <div className="text-center md:text-left">
        <small className="text-gold">Don't have an account? <a href="#" className="font-semibold underline hover:text-gold/80 transition-colors">Sign up</a></small>
      </div>
    </>
  );
}
