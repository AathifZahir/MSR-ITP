import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../Product/Header'


const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    raw_material_type: '',
    color: '',
    received_stock: '',
    date: '', // Date field
    unit_price: '',
    retailer_name: '',
    name: '',
    description: '',
    used_stock: 0 // Default value for used_stock
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8075/inventory/upload", formData);
      // Reset form data after successful submission
      setFormData({
        raw_material_type: '',
        color: '',
        received_stock: '',
        date: '', // Reset date value
        unit_price: '',
        retailer_name: '',
        name: '',
        description: '',
        used_stock: 0 // Reset used_stock value
      });
    
        // Assuming the submission is successful, display the success message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Item added successfully.',
          confirmButtonText: 'OK',
          customClass: {
              container: 'custom-swal-container',
              content: 'custom-swal-content',
              confirmButton: 'custom-swal-confirm-button'
          },
          style: {
              fontFamily: 'Arial, sans-serif',
              padding: '20px'
          }
      });
    } catch (error) {
      console.error('Error adding inventory item:', error);
      alert('Error adding inventory item');
    }
  };

  const maxDate = () => { // Function to get today's date in the format required by the date input element
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div>
        <Header/>
      </div>
      <div style={{ margin: 'auto', maxWidth: '400px', padding: '30px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '65px', marginBottom: '45px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '45px', color: '#333', marginTop: '25px' , textDecoration:'underline' }}>Add New Stock</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
       <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Raw Material Type:</label>
            <select name="raw_material_type" value={formData.raw_material_type} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }}>
              <option value="">Select Raw Material Type</option>
              <option value="Material">Material</option>
              <option value="Button">Button</option>
              <option value="Threads">Threads</option>
              <option value="Other">Other</option>
            </select>
        </div>
        {formData.raw_material_type === 'Other' && (
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Type:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }} />
          </div>
        )}
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Color:</label>
              <select name="color" value={formData.color} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }}>
                <option value="">Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Purple">Purple</option>
                <option value="Pink">Pink</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>
            </div>
      <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Received Stock:</label>
          <input type="number" name="received_stock" value={formData.received_stock} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} max={maxDate()} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Unit Price:</label>
        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Retailer Name:</label>
        <input type="text" name="retailer_name" value={formData.retailer_name} onChange={handleChange} required style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Description:</label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="If it's multicolor or any different designs in it, mention it"
          style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', minHeight: '100px' }}
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px 0', border: 'none', backgroundColor: 'black', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
    </form>
    </div>

      </div>
    );
  };

export default AddInventoryForm;



