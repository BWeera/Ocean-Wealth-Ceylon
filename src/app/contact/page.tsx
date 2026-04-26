'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const payload = {
        name: `${formData.get('first-name')} ${formData.get('last-name')}`,
        email: formData.get('email'),
        company: 'N/A', // Contact form doesn't actually have company right now, unless we add it
        message: formData.get('message'),
        source: 'Main Contact Form',
        details: `Subject: ${formData.get('subject')}`,
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSuccess(true)
        form.reset()
        setTimeout(() => setSuccess(false), 5000)
      } else {
        alert('Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
            Whether you have a question about our products, pricing, or sustainability practices, our team is ready to answer all your questions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Information */}
          <div className="bg-blue-50 p-10 sm:p-16 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-8">
                Contact Information
              </h2>
              <dl className="mt-8 space-y-6 text-base text-gray-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-gray-900">Email</dt>
                    <dd className="mt-2 text-blue-600 hover:text-blue-500 cursor-pointer">
                      oceanwealthceylon@gmail.com
                    </dd>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-gray-900">Phone</dt>
                    <dd className="mt-2">+94 764727770</dd>
                    <dd className="mt-1">+94 774335594</dd>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-gray-900">Address</dt>
                    <dd className="mt-2">
                      <p>No. 7/4, Wewala,</p>
                      <p>Hikkaduwa,</p>
                      <p>Sri Lanka.</p>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            
            {/* Socials / Footer element */}
            <div className="mt-12 text-sm text-gray-500">
              <p>Office Hours: Monday - Friday, 9:00 AM - 5:00 PM (LKT)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 sm:p-16">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-8">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">First name</label>
                  <div className="mt-2">
                    <input type="text" name="first-name" id="first-name" required className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">Last name</label>
                  <div className="mt-2">
                    <input type="text" name="last-name" id="last-name" required className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                <div className="mt-2">
                  <input type="email" name="email" id="email" required className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900">Inquiry Type / Subject</label>
                <div className="mt-2">
                  <select name="subject" id="subject" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all bg-white" required>
                    <option value="" disabled>Select an option</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="export">Export Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                <div className="mt-2">
                  <textarea id="message" name="message" rows={4} required className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all"></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition w-full sm:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </div>

              {success && (
                <div className="mt-4 p-4 rounded-md bg-green-50 text-green-800 border border-green-200 text-sm flex items-center gap-2 transition-all">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Thank you! Your message has been sent successfully. Our team will get back to you shortly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
