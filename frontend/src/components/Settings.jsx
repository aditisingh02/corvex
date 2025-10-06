import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Settings = () => {
  // Settings state
  const [settings, setSettings] = useState({
    language: "English",
    twoFactorAuth: true,
    mobilePushNotifications: true,
    desktopNotifications: true,
    emailNotifications: true,
  });

  const handleToggleChange = (settingKey) => {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: !prev[settingKey],
    }));
  };

  const handleDropdownChange = (settingKey, value) => {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: value,
    }));
  };

  const ToggleSwitch = ({ isOn, onToggle }) => {
    return (
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isOn ? "bg-[#5E17EB]" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    );
  };

  const Dropdown = ({ value, options, onChange }) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent min-w-[120px]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Hindi", label: "Hindi" },
    { value: "Chinese", label: "Chinese" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">All Settings here</p>
            </div>

            {/* Settings Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="space-y-8">
                {/* Language Setting */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Language
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Select your language
                    </p>
                  </div>
                  <Dropdown
                    value={settings.language}
                    options={languageOptions}
                    onChange={(value) =>
                      handleDropdownChange("language", value)
                    }
                  />
                </div>

                {/* Two-factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Two-factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Keep your account secure by enabling 2FA via email
                    </p>
                  </div>
                  <ToggleSwitch
                    isOn={settings.twoFactorAuth}
                    onToggle={() => handleToggleChange("twoFactorAuth")}
                  />
                </div>

                {/* Mobile Push Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Mobile Push Notifications
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive push notification
                    </p>
                  </div>
                  <ToggleSwitch
                    isOn={settings.mobilePushNotifications}
                    onToggle={() =>
                      handleToggleChange("mobilePushNotifications")
                    }
                  />
                </div>

                {/* Desktop Notification */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Desktop Notification
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive push notification in desktop
                    </p>
                  </div>
                  <ToggleSwitch
                    isOn={settings.desktopNotifications}
                    onToggle={() => handleToggleChange("desktopNotifications")}
                  />
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive email notification
                    </p>
                  </div>
                  <ToggleSwitch
                    isOn={settings.emailNotifications}
                    onToggle={() => handleToggleChange("emailNotifications")}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      // Here you would typically save settings to backend
                      console.log("Settings saved:", settings);
                      alert("Settings saved successfully!");
                    }}
                    className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;