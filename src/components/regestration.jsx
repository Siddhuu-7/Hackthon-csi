import React, { useState, useEffect } from 'react';
import { X, Users, CheckCircle, Plus, MoveRight, MoveLeft, Loader2, Save, CheckCheck } from 'lucide-react';
import { replace, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// import { teamService } from '../lib/appwrite'; // Removed

export default function Registration({ setform, onsubmit }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'
  const [teamId, setTeamId] = useState(null);
  const [formData, setFormData] = useState({
    teamcode: `${Date.now()}`,
    teamName: '',
    collegeType: 'srkr',
    otherCollege: '',
    teamLead: {
      name: '',
      gender: "",
      email: '',
      mobile: '',
      department: '',
      year: '1st Year',
      location: '',
      tshirtSize: '',
      isCsi: null,
      price: "",
      transactionId: ""
    },
    teamMembers: []
  });

  // Load existing team data on mount
  useEffect(() => {
    const loadExistingData = async () => {
      if (user) {
        if (user) {
          // Mock data loading or just do nothing
          setLoading(false);
        }
      }
    };
    loadExistingData();
  }, [user]);

  // Auto-save function
  const autoSave = async () => {
    if (!user || !formData.teamName || !formData.teamLead.name) return;

    setSaveStatus('saving');
    setSaveStatus('saving');
    // Mock save
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 500);
  };

  // Debounced auto-save on form changes
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      if (formData.teamName && formData.teamLead.name) {
        autoSave();
      }
    }, 2000); // Save 2 seconds after last change
    return () => clearTimeout(timer);
  }, [formData.teamName, formData.collegeType, formData.otherCollege, formData.teamLead, loading]);

  const addTeamMember = async () => {
    if (formData.teamMembers.length < 5) {
      const newMember = {
        id: Date.now(),
        name: '',
        email: '',
        mobile: '',
        department: '',
        year: '1st Year',
        tshirtSize: '',
        location: '',
        isCsi: null,
        price: ""
      };

      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, newMember]
      });
    }
  };
  const navigate = useNavigate()

  const deleteTeamMember = async (id) => {
    const member = formData.teamMembers.find(m => m.id === id);

    // If member has a database ID, delete from database
    // Mock delete
    if (member?.dbId) {
      console.log("Mock delete member", member.dbId);
    }

    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(member => member.id !== id)
    });
  };

  // Save team member to database
  const saveTeamMember = async (member) => {
    if (!teamId || !member.name || !member.email) return;

    try {
      // Mock save member
      // const savedMember = await teamService.saveTeamMember(teamId, member, member.dbId);
      console.log("Mock save member", member);
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const updateTeamLead = (field, value) => {
    setFormData({
      ...formData,
      teamLead: {
        ...formData.teamLead,
        [field]: value
      }
    });
  };

  const updateTeamMember = (id, field, value) => {
    const updatedMembers = formData.teamMembers.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    );

    setFormData({
      ...formData,
      teamMembers: updatedMembers
    });
  };

  // Save member when they blur out of a field (debounced)
  const handleMemberBlur = async (member) => {
    if (teamId && member.name && member.email) {
      await saveTeamMember(member);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Mock submit
      // const savedTeam = await teamService.saveTeam(user.$id, formData);
      console.log("Mock submit form", formData);

      setform(formData);
      onsubmit();
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("Error saving registration. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your registration data...</p>
        </div>
      </div>
    );
  }

  const isCSi = (email, name) => {

  }
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-3 text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-[#0f2027] via-[#1d2a38] to-[#203a43] bg-clip-text animate-gradient">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition"
                >
                  <MoveLeft size={24} />
                </button>
                Team Registration
              </h1>

              {/* Save status indicator */}
              {saveStatus && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${saveStatus === 'saving' ? 'bg-blue-100 text-blue-700' :
                  saveStatus === 'saved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saveStatus === 'saved' && <CheckCheck className="w-4 h-4" />}
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'}
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm md:text-base lg:text-lg">
              Enter the Team Lead details and add team members. Minimum 4 members total (including team lead), maximum 6 members total.
              {teamId && <span className="text-green-600 ml-2">✓ Your progress is auto-saved</span>}
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 transition-all duration-300 hover:shadow-lg" style={{ borderColor: '#0f2027' }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Users className="animate-pulse" style={{ color: '#d97706' }} size={24} />
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#d97706' }}>
                  Team Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Team Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your team name"
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
               focus:border-[#203a43] focus:outline-none transition-all
               duration-300 bg-gray-50 hover:bg-white"
                  />

                  {checking && (
                    <p className="text-sm text-gray-500 mt-1">Checking availability...</p>
                  )}

                  {!checking && teamStatus === true && (
                    <p className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <CheckCircle size={16} />
                      <span>Team name is available</span>
                    </p>

                  )}

                  {!checking && teamStatus === false && (
                    <p className=" flex items-center gap-1 text-sm text-red-600 mt-1">
                      <XCircle size={16} /> Team name already taken
                    </p>
                  )}
                </div>


                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    College Type
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="college"
                        value="srkr"
                        checked={formData.collegeType === 'srkr'}
                        onChange={(e) => setFormData({ ...formData, collegeType: e.target.value })}
                        className="w-4 h-4 accent-[#0f2027]"
                      />
                      <span className="text-gray-700 group-hover:text-[#0f2027] transition-colors">SRKR College</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="college"
                        value="others"
                        checked={formData.collegeType === 'others'}
                        onChange={(e) => setFormData({ ...formData, collegeType: e.target.value })}
                        className="w-4 h-4 accent-[#0f2027]"
                      />
                      <span className="text-gray-700 group-hover:text-[#0f2027] transition-colors">Others</span>
                    </label>
                  </div>
                  {formData.collegeType === 'others' && (
                    <div className="animate-slideIn">
                      <input
                        type="text"
                        placeholder="Enter college name"
                        value={formData.otherCollege}
                        onChange={(e) => setFormData({ ...formData, otherCollege: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 transition-all duration-300 hover:shadow-lg" style={{ borderColor: '#1d2a38' }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <CheckCircle className="animate-pulse" style={{ color: '#d97706' }} size={24} />
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#d97706' }}>
                  Team Lead
                </h2>
                <span className="ml-auto inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-700">
                  {
                    "-/₹850"
                  }
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Team Lead Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.teamLead.name}
                    onChange={(e) => updateTeamLead('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.teamLead.gender}
                    onChange={(e) => updateTeamLead('gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Team Lead Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.teamLead.email}
                    onChange={(e) => updateTeamLead('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Team Lead Mobile No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="98xxxxx78"
                    value={formData.teamLead.mobile}
                    onChange={(e) => updateTeamLead('mobile', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.teamLead.department}
                    onChange={(e) => updateTeamLead('department', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    <option value="">Select department</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AIML">AIML</option>
                    <option value="CSIT">CSIT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="CSBS">CSBS</option>
                    <option value="CSG">CSG</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="MECH">MECH</option>
                    <option value="CIC">CIC</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Year of Study
                  </label>
                  <select
                    value={formData.teamLead.year}
                    onChange={(e) => updateTeamLead('year', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Bhimavaram, Andhra Pradesh"
                    value={formData.teamLead.location}
                    onChange={(e) => updateTeamLead('location', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    T-Shirt Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.teamLead.tshirtSize}
                    onChange={(e) => updateTeamLead('tshirtSize', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    <option value="">Select size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>

                {/* <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={"Yes"} 
                      checked={formData.teamLead.isCsi || false}
                     onChange={(e) => {
                      updateTeamLead("isCsi",e.target.checked);
                     }}
                      className="sr-only peer"/>
                      <div
                  className="
                    relative w-9 h-5
                    bg-neutral-quaternary
                    border border-gray-400
                    peer-focus:outline-none
                    peer-focus:ring-2 peer-focus:ring-brand-soft
                    rounded-full
                    peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full
                    after:content-['']
                    after:absolute after:top-[2px] after:start-[2px]
                    after:bg-black after:rounded-full after:h-4 after:w-4
                    after:transition-all
                    peer-checked:bg-brand
                    peer-checked:border-brand
                  "
                ></div>

                      <span className="select-none ms-3 text-sm font-medium text-heading">Are You CSi Member?</span>
                    </label> */}

              </div>
            </div>

            {formData.teamMembers.map((member, index) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 transition-all duration-300 hover:shadow-lg animate-slideIn" style={{ borderColor: '#203a43' }}>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Users style={{ color: '#d97706' }} size={24} />
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#d97706' }}>
                      Team Member {index + 1}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteTeamMember(member.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <X size={20} />
                  </button>
                  <span className="ml-auto inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-700">
                    {
                      "/850"
                    }
                  </span>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Member Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Member name"
                      value={member.name}
                      onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={member.gender}
                      onChange={(e) => updateTeamMember(member.id, 'gender', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>

                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={member.email}
                      onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Mobile No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="98xxxxxx78"
                      value={member.mobile}
                      onChange={(e) => updateTeamMember(member.id, 'mobile', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={member.department}
                      onChange={(e) => updateTeamMember(member.id, 'department', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                    >
                      <option value="">Select department</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="AIML">AIML</option>
                      <option value="CSIT">CSIT</option>
                      <option value="AIDS">AIDS</option>
                      <option value="CSBS">CSBS</option>
                      <option value="CSG">CSG</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="MECH">MECH</option>
                      <option value="CIC">CIC</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Year of Study
                    </label>
                    <select
                      value={member.year}
                      onChange={(e) => updateTeamMember(member.id, 'year', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      T-Shirt Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={member.tshirtSize}
                      onChange={(e) => updateTeamMember(member.id, 'tshirtSize', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                    >
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Bhimavaram, Andhra Pradesh"
                      value={member.location}
                      onChange={(e) => updateTeamMember(member.id, "location", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#203a43] focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  {/* <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value={"Yes"} 
                      checked={member.isCsi || false}
                     onChange={(e) => {
                      updateTeamMember(member.id,"isCsi",e.target.checked)
                      updateTeamMember(member.id,"price",e.target.checked?"750":"850")
                     }}
                      className="sr-only peer"/>
                      <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 
                      peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full
                       rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] 
                       after:absolute after:top-[2px] after:start-[2px] 
                       after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                      <span className="select-none ms-3 text-sm font-medium text-heading">Are You CSi Member?</span>
                    </label> */}

                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={addTeamMember}
                disabled={formData.teamMembers.length >= 5}
                className="group relative px-6 md:px-8 py-3 md:py-4 border-2 border-dashed rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md hover:scale-105 w-full sm:w-auto"
                style={{
                  borderColor: '#d97706',
                  color: '#d97706'
                }}
              >
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-base md:text-lg font-semibold">Add Team Member</span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 md:py-4 text-white font-bold text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                background: 'linear-gradient(135deg, #0f2027, #1d2a38, #203a43)',
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <MoveRight className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Continue to Payment</span>
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}