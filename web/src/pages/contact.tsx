import { useState, useEffect } from 'react';

import { client } from '../sanityClient'; 
import '../styles/ContactPage.css';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';

interface ContactMember {
  _key: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  bio?: string;
  image: string;
}

export default function ContactCards() {
  const [members, setMembers] = useState<ContactMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<ContactMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const query = `*[_type == "contactCards"][0]{
          cards[]{
            _key,
            name,
            role,
            email,
            phone,
            bio,
            "image": image.asset->url
          }
        }`;
        const result = await client.fetch(query);
        setMembers(result?.cards || []);
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="contact-loading">Loading Team...</div>;

  return (
    <main className="contact-page">
        <Header />
    <div className="contact-page-container">
      <h1 className="contact-main-title">Contact Us</h1>
      
      <div className="contact-grid">
        {members.map((member) => (
          <div 
            key={member._key} 
            className="contact-card" 
            onClick={() => setSelectedMember(member)}
          >
            <div className="contact-card-inner">
              <img src={member.image} alt={member.name} className="contact-card-img" />
              <div className="contact-card-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="email-link">{member.email}</p>
                <span className="show-more">show more</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Overlay Modal */}
      {selectedMember && (
        <div className="contact-overlay" onClick={() => setSelectedMember(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMember(null)}>×</button>
            
            <div className="modal-top">
              <img src={selectedMember.image} alt={selectedMember.name} className="modal-img" />
              <div className="modal-header-text">
                <h2>{selectedMember.name}</h2>
                <p className="modal-role">{selectedMember.role}</p>
                <p className="modal-contact-item"><strong>email:</strong> {selectedMember.email}</p>
                {selectedMember.phone && <p className="modal-contact-item"><strong>phone:</strong> {selectedMember.phone}</p>}
              </div>
            </div>
            
            <div className="modal-bio">
              <p>{selectedMember.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </main>
  );
}