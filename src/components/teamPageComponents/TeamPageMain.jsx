import React, { useState } from "react";
import "./TeamPage.css";
import profile from './indexImages';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const facultyMembers = [
    {
        name: 'Dr. Rajesh Khanna',
        role: 'President',
        description:
            "Dr. Rajesh Khanna, Professor at Thapar since 1999, has been a guiding force behind ISTE’s success. His mentorship and dedication continue to inspire and shape our journey.",
        image: profile.rajesh,
    },
    {
        name: 'Ms. Suman Bhullar',
        role: 'Vice-President',
        description:
            "Ms. Suman Bhullar, Assistant Professor at Thapar since 2013, brings passion and problem-solving excellence to ISTE as our Vice President. Her support for students’ ideas and growth makes her an invaluable asset to the chapter.",
        image: profile.suman,
    },
];

const executiveBoard = [
    { name: 'Lakshita Gupta', role: 'General Secretary', image: profile.lakshita, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Kaushik Arora', role: 'General Secretary', image: profile.kaushik, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Bhavya', role: 'Finance Secretary', image: profile.bhavya, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Sakshat Jain', role: 'Joint Secretary', image: profile.sakshat, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Saarthi Arora', role: 'Joint Secretary', image: profile.Saarthi, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Ishita Singh Oberoi', role: 'Joint Secretary', image: profile.ishita, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Abhinivesh Sharma', role: 'Joint Secretary', image: profile.abhinivesh, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Ishan Pathak', role: 'Technical Secretary', image: profile.ishaanP, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Ishaan Sharma', role: 'Convener', image: profile.ishaan, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Haryiank Kumra', role: 'External Secretary', image: profile.haryiank, github: 'githublink', linkedin: 'linkedinlink' },
];

const executiveCommittee = [
    { name: 'Tanishq Soni', role: 'Software Executive', image: profile.tanishq, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Rishabh Garg', role: 'Media Executive', image: profile.rishabh, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Garv Chopra', role: 'Technical Executive', image: profile.garv, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Ayush Garg', role: 'Design Executive', image: profile.ayush, github: 'githublink', linkedin: 'linkedinlink' },
    { name: 'Dixant', role: 'Marketing Executive', image: profile.dixant, github: 'githublink', linkedin: 'linkedinlink' },
];

const coreMembers = [
    { name: "Happy Singh Rajpurohit", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.Happy },
    { name: "Pulkit", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.pulkit },
    { name: "Yuvraj", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.yuvraj },
    { name: "Arjites", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.arjites },
    { name: "Prisha Acharya", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.prishaAcharya },
    // { name: "Shaina Gera", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.shainaGera },
    { name: "Mehar Ahuja", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.meharAhuja },
    // { name: "Anshika Rathore", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.anshikaRathore },
    { name: "Lakshya Goyal", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.Lakshya },
    { name: "Saanvi", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.saanvi },
    // { name: "Rudraksh Chugh", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.rudrakshChugh },
    { name: "Aryan Sharma", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.aryanSharma },
    { name: "Divyam Mittal", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.divyamMittal },
    { name: "Devyansh Arya", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.devyanshArya },
    { name: "Marushika", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.marushika },
    { name: "Aryan Pal", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.aryanPal },
    { name: "Arshia", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.arshia },
    { name: "Arpit", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.arpit },
    { name: "Manya", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.manya },
    { name: "Geetika Parakh", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.geetikaParakh },
    // { name: "Navjot", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.navjot },
    
    { name: "Nishika", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.nishika },
    { name: "Molika", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.molika },
    { name: "Aditya", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.aditya },
    // { name: "Deepak Kumar", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.deepakKumar },
    { name: "Ashit", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.ashit },
    { name: "Udhey", role: "Core Member", github: "githublink", linkedin: "linkedinlink", image: profile.udhey }
    
];

export default function TeamPage() {
    const [activeSection, setActiveSection] = useState("Faculty");

    const sections = [
        { key: "Faculty", label: "Faculty" },
        { key: "Executive Board", label: "EB" },
        { key: "Executive Committee", label: "EC" },
        { key: "Core", label: "Core" },
    ];

    return (
        <div className="team-page">
            <h1 className="team-heading">Meet Our Team</h1>

            <div className="button-group">
                {sections.map(sec => (
                    <button
                        key={sec.key}
                        className={activeSection === sec.key ? "active" : ""}
                        onClick={() => setActiveSection(sec.key)}
                    >
                        {sec.label}
                    </button>
                ))}
            </div>

            <div className="team">
                <h2 className="team-section-heading">
                    <h2>OUR</h2>
                    <h2>Team</h2>
                </h2>
                <div className="team-sections">
                    {/* Faculty */}
                    <div className={`team-section scrollable-team ${activeSection === "Faculty" ? "active" : "hidden"}`}>
                        {facultyMembers.map((member, i) => (
                            <div key={i} className="faculty-card">
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                                <p className="desc">{member.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Executive Board */}
                    <div className={`team-section scrollable-team ${activeSection === "Executive Board" ? "active" : "hidden"}`}>
                        {executiveBoard.map((member, i) => (
                            <div key={i} className="member-card">
                                <div className="cardInfo">
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                                </div>
                                <div className="social-icons">
                                    <a href={member.github}><FaGithub /></a>
                                    <a href={member.linkedin}><FaLinkedin /></a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Executive Committee */}
                    <div className={`team-section scrollable-team ${activeSection === "Executive Committee" ? "active" : "hidden"}`}>
                        {executiveCommittee.map((member, i) => (
                            <div key={i} className="member-card">
                                <div className="cardInfo">
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                                </div>
                                <div className="social-icons">
                                    <a href={member.github}><FaGithub /></a>
                                    <a href={member.linkedin}><FaLinkedin /></a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Core Members */}
                    <div className={`team-section scrollable-team ${activeSection === "Core" ? "active" : "hidden"}`}>
                        {coreMembers.map((member, i) => (
                            <div key={i} className="core-card">
                                <div className="cardInfo">                                    
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                </div>
                                <div className="social-icons">
                                    <a href={member.github}><FaGithub /></a>
                                    <a href={member.linkedin}><FaLinkedin /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}