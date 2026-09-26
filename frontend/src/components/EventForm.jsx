import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatInputDate } from '../utils/dateFormatter';

export const EventForm = ({ initialData = null, onSubmit, submitText = 'Save Event' }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    details: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        date: formatInputDate(initialData.date),
        details: initialData.details || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    } else if (formData.name.trim().length > 200) {
      newErrors.name = 'Event name cannot exceed 200 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const parsed = new Date(formData.date);
      if (isNaN(parsed.getTime())) {
        newErrors.date = 'Please enter a valid date';
      }
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Event details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        name: formData.name.trim(),
        date: formData.date,
        details: formData.details.trim(),
      });
    } catch (err) {
      setServerError(err.message || 'Failed to submit event. Please check inputs.');
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="alert alert-error">
          <span>{serverError}</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Event Name <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`form-input ${errors.name ? 'is-invalid' : ''}`}
          placeholder="e.g. Annual Tech Conference"
          maxLength={200}
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Event Date <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className={`form-input ${errors.date ? 'is-invalid' : ''}`}
          value={formData.date}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.date && <div className="form-error">{errors.date}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="details" className="form-label">
          Event Details <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className={`form-textarea ${errors.details ? 'is-invalid' : ''}`}
          placeholder="Provide event details, schedule, agenda, or location information..."
          value={formData.details}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.details && <div className="form-error">{errors.details}</div>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
              Processing...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
