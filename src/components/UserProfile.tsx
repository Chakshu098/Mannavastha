import React, { useState } from 'react';
import { User, Settings, Shield, Bell, Download, Trash2, Save, LogOut } from 'lucide-react';

interface UserProfileProps {
  onClearData: () => void;
  onExportData: () => void;
  onLogout: () => void;
}

export function UserProfile({ onClearData, onExportData, onLogout }: UserProfileProps) {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('20:00');
  const [shareData, setShareData] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save to backend/localStorage
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '✅ Settings saved successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-brand-500 to-serenity-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Wellness Profile</h2>
            <p className="text-brand-100">Manage your Manavastha experience</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-elegant-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-brand-50 rounded-lg">
              <Bell className="w-5 h-5 text-brand-500" />
            </div>
            <h3 className="text-lg font-semibold text-elegant-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-elegant-900">Push Notifications</p>
                <p className="text-sm text-elegant-600">Receive wellness tips and reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-elegant-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-elegant-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-elegant-900">Daily Check-in Reminders</p>
                <p className="text-sm text-elegant-600">Remind me to log my daily mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dailyReminders}
                  onChange={(e) => setDailyReminders(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-elegant-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-elegant-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>

            {dailyReminders && (
              <div className="ml-4 p-3 bg-elegant-50 rounded-lg">
                <label className="block text-sm font-medium text-elegant-700 mb-2">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-2 border border-elegant-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-elegant-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-serenity-50 rounded-lg">
              <Shield className="w-5 h-5 text-serenity-500" />
            </div>
            <h3 className="text-lg font-semibold text-elegant-900">Privacy & Data</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Your Privacy Matters</h4>
              <p className="text-sm text-blue-800">
                All your data is stored securely and locally. We never share your personal mental health information with third parties.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-elegant-900">Anonymous Usage Analytics</p>
                <p className="text-sm text-elegant-600">Help improve Manavastha with anonymous usage data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareData}
                  onChange={(e) => setShareData(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-elegant-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-elegant-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-elegant-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-serenity-50 rounded-lg">
              <Settings className="w-5 h-5 text-serenity-500" />
            </div>
            <h3 className="text-lg font-semibold text-elegant-900">Data Management</h3>
          </div>

          <div className="space-y-3">
            <button
              onClick={onExportData}
              className="w-full flex items-center justify-center space-x-2 p-3 border border-elegant-300 rounded-lg hover:bg-elegant-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export My Data</span>
            </button>

            <button
              onClick={onClearData}
              className="w-full flex items-center justify-center space-x-2 p-3 border border-vitality-300 text-vitality-600 rounded-lg hover:bg-vitality-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleSaveSettings}
            className="flex-1 flex items-center justify-center space-x-2 bg-brand-500 text-white py-3 px-4 rounded-lg hover:bg-brand-600 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center justify-center space-x-2 bg-elegant-500 text-white py-3 px-4 rounded-lg hover:bg-elegant-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}