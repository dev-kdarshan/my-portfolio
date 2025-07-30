import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const apiBase = process.env.REACT_APP_API_BASE;
const adminToken = sessionStorage.getItem('adminToken');


const AdminDashboard = () => {
  const [responses, setResponses] = useState([]);
  const [reply, setReply] = useState({ to: '', subject: '', message: '' });
  const [showModal, setShowModal] = useState(false); 
  useEffect(() => {
    fetchResponses();
  }, []);


  const fetchResponses = async () => {
    try {
      const res = await axios.get(`${apiBase}/admin/responses`, {
        headers: { 'x-admin-token': adminToken },
      });
      setResponses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    await axios.delete(`${apiBase}/admin/responses/${id}`, {
      headers: { 'x-admin-token': adminToken },
    });
    fetchResponses();
  };

  const handleReply = async () => {
    if (!reply.to || !reply.subject || !reply.message)
      return alert('Fill all fields');

    try {
      await axios.post(`${apiBase}/admin/reply`, reply, {
        headers: { 'x-admin-token': adminToken },
      });

      const respondedUser = responses.find(res => res.email === reply.to);
      if (respondedUser) {
        await axios.delete(`${apiBase}/admin/responses/${respondedUser._id}`, {
          headers: { 'x-admin-token': adminToken },
        });
      }

      alert('Email Sent successfully');
      setReply({ to: '', subject: '', message: '' });
      setShowModal(false);
      fetchResponses(); 
    } catch (err) {
      console.error(err);
      alert('Something went wrong while replying or deleting.');
    }
  };


  return (
    <div className="dashboard-container">
      <div className="welcome-greet">
        <div className="headline">
          <p className="hello-text">welcome,Darshan</p>
        </div>
        <div className="subline">
          <p className="hello-msg">Here are some new form responses waiting!</p>
          <button className=" btn-refresh" onClick={fetchResponses}>
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
      </div>

      <div className="table-holder">
        <table className="response-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Detail</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res, index) => (
              <tr key={index}>
                <td>{res.name}</td>
                <td>{res.detail || '-'}</td>
                <td>{res.email}</td>
                <td>{new Date(res.createdAt).toLocaleString()}</td>
                <td>
                  <div className="actionButtons">
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(res._id)}
                    >
                    <i className="bi bi-archive"></i> Delete
                    </button>
                    <button
                      className="btn btn-reply"
                      onClick={() => {
                        setReply({ ...reply, to: res.email });
                        setShowModal(true);
                      }}
                    >
                      <i className="bi bi-chat-square-text"></i> Reply
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="reply-modal">
            <button style={{fontWeight:"bolder"}} className="btn-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2 className='replytoText'><p style={{fontWeight:"bolder"}}>Reply to</p> {reply.to}</h2>
            <input
              className="input"
              placeholder="Subject"
              value={reply.subject}
              onChange={(e) =>
                setReply({ ...reply, subject: e.target.value })
              }
            />
            <textarea
              className="textarea"
              placeholder="Message"
              value={reply.message}
              onChange={(e) =>
                setReply({ ...reply, message: e.target.value })
              }
            ></textarea>
            <div className='sendbutton'>
              <button className="btn btn-send" onClick={handleReply}>
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
