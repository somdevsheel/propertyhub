// src/app/admin/inquiries/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    checkAuth();
    fetchInquiries();
  }, [filter]);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const url = filter === 'all' 
        ? '/api/inquiries' 
        : `/api/inquiries?status=${filter}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Manage Inquiries</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setFilter('New')}
            className={`px-4 py-2 rounded-md ${
              filter === 'New'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setFilter('Read')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Read'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Read
          </button>
          <button
            onClick={() => setFilter('Contacted')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Contacted'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Contacted
          </button>
          <button
            onClick={() => setFilter('Closed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Closed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Closed
          </button>
        </div>

        {/* Inquiries List */}
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">No inquiries found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {inquiry.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {inquiry.email} • {inquiry.phone}
                    </p>
                    {inquiry.propertyName && (
                      <p className="text-sm text-blue-600 mt-1">
                        Property: {inquiry.propertyName}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        inquiry.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'Read'
                          ? 'bg-yellow-100 text-yellow-800'
                          : inquiry.status === 'Contacted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-line">
                    {inquiry.message}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Received: {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}