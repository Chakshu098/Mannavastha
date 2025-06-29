import React, { useState } from 'react';
import { Video, Calendar, Clock, Star, User, Phone, MessageCircle, Shield, Award, CheckCircle } from 'lucide-react';

export function VideoConsult() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialty: 'Clinical Psychologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 324,
      languages: ['English', 'Mandarin'],
      price: 120,
      image: '👩‍⚕️',
      bio: 'Specializes in anxiety, depression, and cognitive behavioral therapy. Licensed clinical psychologist with extensive experience in telehealth.',
      availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
      verified: true
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialty: 'Psychiatrist',
      experience: '15 years',
      rating: 4.8,
      reviews: 256,
      languages: ['English', 'Spanish'],
      price: 150,
      image: '👨‍⚕️',
      bio: 'Board-certified psychiatrist specializing in mood disorders, ADHD, and medication management. Telehealth certified.',
      availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      verified: true
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      specialty: 'Therapist (LMFT)',
      experience: '8 years',
      rating: 4.9,
      reviews: 189,
      languages: ['English'],
      price: 100,
      image: '👩‍💼',
      bio: 'Licensed Marriage and Family Therapist with expertise in relationship counseling, trauma therapy, and mindfulness-based interventions.',
      availability: ['8:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'],
      verified: true
    },
    {
      id: '4',
      name: 'Dr. David Kim',
      specialty: 'Behavioral Therapist',
      experience: '10 years',
      rating: 4.7,
      reviews: 142,
      languages: ['English', 'Korean'],
      price: 110,
      image: '👨‍💻',
      bio: 'Specializes in behavioral therapy, addiction counseling, and stress management. Expert in evidence-based treatment approaches.',
      availability: ['9:30 AM', '1:30 PM', '4:30 PM', '7:00 PM'],
      verified: true
    }
  ];

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTimeSlot) {
      setShowBookingForm(true);
    }
  };

  const handleConfirmBooking = () => {
    setShowBookingForm(false);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '🎉 Video consultation booked successfully! Check your email for details.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  };

  const selectedDoctorData = doctors.find(doc => doc.id === selectedDoctor);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Video Consultations
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with licensed mental health professionals from the comfort of your home. Secure, private, and convenient.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
            <p className="text-sm text-gray-600">End-to-end encrypted video calls ensuring your privacy and security</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Licensed Professionals</h3>
            <p className="text-sm text-gray-600">All therapists are licensed and verified mental health professionals</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-sm text-gray-600">Book appointments that fit your schedule, including evenings and weekends</p>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Mental Health Professional</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  selectedDoctor === doctor.id
                    ? 'border-red-500 bg-red-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    {doctor.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                      {doctor.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-red-600 font-semibold mb-1">{doctor.specialty}</p>
                    <p className="text-sm text-gray-600 mb-2">{doctor.experience} experience</p>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">${doctor.price}/session</div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{doctor.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang) => (
                        <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDoctor && selectedDoctorData && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Time Slots - {selectedDoctorData.name}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedDoctorData.availability.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTimeSlot === time
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{time}</span>
                  </div>
                  <p className="text-xs mt-1">Today</p>
                </button>
              ))}
            </div>
            
            {selectedTimeSlot && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    Selected: {selectedTimeSlot} with {selectedDoctorData.name}
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Session fee: ${selectedDoctorData.price} (50 minutes)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Book Appointment Button */}
        {selectedDoctor && selectedTimeSlot && (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleBookAppointment}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              <Video className="w-6 h-6" />
              <span>Book Video Consultation</span>
            </button>
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && selectedDoctorData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Confirm Your Appointment</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-900">{selectedDoctorData.name}</p>
                  <p className="text-sm text-gray-600">{selectedDoctorData.specialty}</p>
                  <p className="text-sm text-gray-600">Time: {selectedTimeSlot}</p>
                  <p className="text-sm text-gray-600">Fee: ${selectedDoctorData.price}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for consultation (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of what you'd like to discuss..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}